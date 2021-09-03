import { useEffect, useState } from 'react';
import { HubConnection } from '@microsoft/signalr';
import Board from '../Board';
import SocketConnection from '../../Services/SignalR.service';
import { InputContainer, MainContainer, TitleContainer } from './styles';

const App = () => {
  const [room, setRoom] = useState<string>('');
  const [connected, setConnected] = useState<boolean>(false);
  const [connectionStatus, setConnectionStatus] = useState<string>();
  const [joinedUser, setJoinedUser] = useState<boolean>(false);
  const [isConnectedRoom, setIsConnectedRoom] = useState<boolean>(false);
  const [connection, setConnection] = useState<null | HubConnection>(null);

  const openSocketConnection = async () => {
    const conn = SocketConnection();
    try {
      await conn.start();
      setConnection(conn);
      setConnected(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    openSocketConnection();
  }, []);

  useEffect(() => {
    if (!connection) return;

    connection.onclose(() => {
      setConnectionStatus('No Connection Detected');
      setConnected(false);
    });
    connection.onreconnecting(() => {
      setConnectionStatus('Reconnecting...');
      setConnected(false);
    });
    connection.onreconnected(() => {
      setConnected(true);
      setConnectionStatus('');
    });

    connection.on('UserJoinedNotification', () => {
      setJoinedUser(true);
    });
  }, [connection]);

  const joinRoom = async () => {
    if (connection) await connection.invoke('JoinBoard', room);
    setIsConnectedRoom(true);
  };

  return (
    <MainContainer>
      {isConnectedRoom ? (
        <>
          {joinedUser && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              Player Joined the Board
            </div>
          )}
          <Board
            connection={connection}
            connectionStatus={connectionStatus}
            connected={connected}
            room={room}
          />
        </>
      ) : connected ? (
        <div>
          <TitleContainer>Welcome to Tic Tac Toe!</TitleContainer>
          <InputContainer>
            <input
              onKeyPress={(e) => e.key === 'Enter' && joinRoom()}
              onChange={(e) => setRoom(e.target.value)}
            />
            <button onClick={joinRoom}>Join To A Board</button>
          </InputContainer>
        </div>
      ) : (
        <div>{connectionStatus}</div>
      )}
    </MainContainer>
  );
};

export default App;
