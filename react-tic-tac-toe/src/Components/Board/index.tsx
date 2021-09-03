import { useEffect, useMemo, useState } from 'react';
import { HubConnection } from '@microsoft/signalr';
import Cell from '../Cell';
import { getWinner } from '../../Helpers/CalculateWinner';
import { BoardContainer, WinnerContainer } from './styles';
import { BoardData, TurnType } from '../types';

interface Props {
  connection: HubConnection | null;
  connectionStatus: string | undefined;
  connected: boolean | undefined;
  room: string;
}

const Board = (props: Props) => {
  const { connection, connectionStatus, connected, room } = props;

  const [turn, setTurn] = useState<TurnType>('X');
  const [disableBoard, setDisableBoard] = useState<boolean>(false);
  const [cellValues, setCellValues] = useState<Array<TurnType>>(
    Array(9).fill('')
  );

  const winner = useMemo(() => getWinner(cellValues), [cellValues]);

  const onReceiveData = async () => {
    if (!connection) return;

    connection.on('ReceiveBoardData', (data: BoardData) => {
      const figurePlacement = data.figurePlacement;
      const playerTurn = data.nextPlayer == 'X' ? 'O' : 'X';

      setCellValues(figurePlacement);
      setTurn(playerTurn);
      setDisableBoard(false);
    });
  };

  useEffect(() => {
    onReceiveData();
  }, [connection]);

  const handleTurnChange = async (index: number) => {
    if (!connection) return;

    const newValues = [...cellValues];
    newValues[index] = turn;
    await connection.invoke(
      'SendBoardData',
      {
        figurePlacement: newValues,
        nextPlayer: turn,
      },
      room
    );
    setCellValues(newValues);
    setTurn(turn);
    setDisableBoard(true);
  };

  return connected ? (
    <>
      <BoardContainer isDisabled={disableBoard}>
        {cellValues.map((c, i) => (
          <Cell
            key={i}
            value={c}
            index={i}
            handleTurnChange={handleTurnChange}
          />
        ))}
      </BoardContainer>
      {winner && <WinnerContainer>{winner} won</WinnerContainer>}
    </>
  ) : (
    <div>{connectionStatus}</div>
  );
};

export default Board;
