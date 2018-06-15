
import styled from 'styled-components';

type SpaceFillerProps = {
    height: number;
};

const SpaceFiller: ReactClass<SpaceFillerProps> = styled.div`
    height: ${props => props.height};
    margin: 20px 0;
    border: 1px solid #dee0e3;
    display: flex;
    color: #dee0e3;
    text-shadow:
        0 0 20px #ffffff,
        0 0 20px #ffffff;
    align-items: center;
    justify-content: center;
    background:
        repeating-linear-gradient(
            45deg,
            #fafafa,
            #fafafa 10px,
            #ffffff 10px,
            #ffffff 20px
        );
`;

export default SpaceFiller;
