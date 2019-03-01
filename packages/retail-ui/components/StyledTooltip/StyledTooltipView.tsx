import styled from '../../lib/styled-components';

export const TooltipContent = styled.div`
  position: relative;
  padding: 15px 20px;
`;

export const TooltipCross = styled.span`
  color: ${({ theme }) => theme.tooltip['close-btn-color']};
  cursor: pointer;
  position: absolute;
  text-align: center;
  top: 0;
  width: 11px;
  right: 0;
  padding: 8px;
  height: 11px;
  white-space: nowrap;
  line-height: 10px;
  box-sizing: content-box;

  &:hover {
    color: ${({ theme }) => theme.tooltip['close-btn-hover-color']};
  }
`;
