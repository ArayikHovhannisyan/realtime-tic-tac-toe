import { TurnType } from '../types';
import { CellContainer } from './styles';

interface Props {
  value: TurnType;
  index: number;
  handleTurnChange: (index: number) => void;
}

const Cell = ({ value, index, handleTurnChange }: Props) => (
  <CellContainer onClick={() => handleTurnChange(index)}>{value}</CellContainer>
);

export default Cell;
