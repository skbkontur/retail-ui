// @flow
import React from 'react';

import cn from './Demo.less';

type DemoProps = {
    children?: any;
};

export default function Demo({ children }: DemoProps): React.Element<*> {
    return (
        <div className={cn('root')}>
            {children}
        </div>
    );
}
