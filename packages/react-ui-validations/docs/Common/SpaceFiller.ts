import styled from 'styled-components';

export interface SpaceFillerProps {
  height: number;
}

export const SpaceFiller = styled.div<SpaceFillerProps>`
  height: ${props => props.height}px;
  margin: 20px 0;
  border: 1px solid #dee0e3;
  display: flex;
  color: #dee0e3;
  text-shadow: 0 0 20px #ffffff, 0 0 20px #ffffff;
  align-items: center;
  justify-content: center;
  background: repeating-linear-gradient(45deg, #fafafa, #fafafa 10px, #ffffff 10px, #ffffff 20px);
`;
