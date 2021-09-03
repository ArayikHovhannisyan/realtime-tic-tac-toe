import styled from 'styled-components';

interface BoardContainerProps {
  isDisabled: boolean;
}

export const BoardContainer = styled.div<BoardContainerProps>`
  display: grid;
  grid-template-columns: auto auto auto;
  border: 0.5px solid black;
  margin-top: 100px;
  pointer-events: ${(props) => (props.isDisabled ? 'none' : 'auto')};
`;

export const WinnerContainer = styled.div`
  font-size: 30px;
  display: flex;
  justify-content: center;
`;
