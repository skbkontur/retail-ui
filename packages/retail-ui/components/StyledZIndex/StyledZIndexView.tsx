import styled, { isTruthyProp } from '../../lib/styled-components';

export const StyledZIndexView = styled.div`
  position: absolute;
  min-width: 18px;
  border-radius: ${({ theme }) => theme.popup['border-radius']};
  border: ${({ theme }) => `${theme.popup.border} ${theme.popup['border-color']}`};
  transition: ${props =>
    props.direction === 'top'
      ? 'translateY(10px)'
      : props.direction === 'bottom'
        ? 'translateY(-10px)'
        : props.direction === 'right'
          ? 'translateX(-10px)'
          : props.direction === 'left'
            ? 'translateX(10px)'
            : 'translate(0, 0)'};

  ${isTruthyProp('ignoreHover')`
       pointer-events: none;
  `};

  ${isTruthyProp('shadow')`
      filter: ${({ theme }) => theme.popup['drop-shadow']};
      -webkit-filter: ${({ theme }) => theme.popup['drop-shadow']};
  `};

  ${isTruthyProp('entering')`
      opacity: 0.01;
  `};

  ${isTruthyProp('entered')`
      transition: ${({ theme }) => theme.common.transition['show-transition']};
      opacity: 1;
      transform: translate(0, 0);
  `};

  ${isTruthyProp('exiting')`
      opacity: 0.01;
      transition: ${({ theme }) => theme.common.transition['hide-transition']};
      transform: translate(0, 0);
  `};
`;
