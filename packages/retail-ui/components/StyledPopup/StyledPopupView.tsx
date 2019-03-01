import styled from '../../lib/styled-components';

export const StyledPopupContent = styled.div`
  border-radius: ${({ theme }) => theme.popup['border-radius']};
  overflow: hidden;
`;

export const StyledPopupContentInner = styled.div`
  background: ${({ theme }) => theme.common.colors.base.white};
`;
