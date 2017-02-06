// @flow
import React from 'react';
import { Link } from 'react-router';

//import { Logotype } from 'ui';

import cn from './Layout.less';

type LayoutProps = {
    children?: any;
};

export default function Layout({ children }: LayoutProps): React.Element<*> {
    return (
        <div className={cn('root')}>
            <div className={cn('navigation-bar')}>
                {/*<Logotype suffix='ритейл' color='#fff' textColor='#fff' />*/}
                <Link activeClassName={cn('active')} to='/ValidationsDemo/OnBlurValidations'>OnBlurValidations</Link>
                <Link activeClassName={cn('active')} to='/ValidationsDemo/OnBlurValidationsWithSubmitValidation'>
                    OnBlurValidationsWithSubmitValidation
                </Link>
                <Link activeClassName={cn('active')} to='/ValidationsDemo/DifferentMessages'>DifferentMessages</Link>
                <Link activeClassName={cn('active')} to='/ValidationsDemo/SimpleTextMessages'>SimpleTextMessages</Link>
                <Link activeClassName={cn('active')} to='/ValidationsDemo/ScrollDifferentMessages'>
                    ScrollDifferentMessages
                </Link>
                <Link activeClassName={cn('active')} to='/ValidationsDemo/ManyEditors'>ManyEditors</Link>
            </div>
            <div className={cn('content')}>
                {children}
            </div>
        </div>
    );
}
