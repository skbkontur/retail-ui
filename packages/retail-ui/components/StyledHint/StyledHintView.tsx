import styled, { isTruthyProp } from '../../lib/styled-components';

export const StyledHintContent = styled.div`
  box-sizing: border-box;
  color: #fff;
  font-size: 14px;
  max-width: 200px;
  padding: 6px 8px;
  word-break: break-word;
  overflow-wrap: break-word;
  word-wrap: break-word;

  ${isTruthyProp('contentCenter')`
      text-align: center;
  `};
`;
