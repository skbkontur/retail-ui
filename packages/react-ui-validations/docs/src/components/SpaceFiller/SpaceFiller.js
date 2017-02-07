// @flow
import React from 'react';

import cn from './SpaceFiller.less';

type SpaceFillerProps = {
    height: number;
};

export default function SpaceFiller({ height }: SpaceFillerProps): React.Element<*> {
    return (
        <div style={{ height: height }} className={cn('root')}>
            <span>Заполненное пространство</span>
        </div>
    );
}
