import styled from 'styled-components';

export const CellContainer = styled.div`
  border: 0.5px solid black;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 140px;
  &:hover {
    cursor: pointer;
  }
`;
