// @flow
import React from 'react';
import { Link } from 'react-router';

import Logotype from 'retail-ui/components/Logotype';

import cn from './Layout.less';

type LayoutProps = {
    children?: any;
};

export default function Layout({ children }: LayoutProps): React.Element<*> {
    return (
        <div className={cn('root')}>
            <div className={cn('navigation-bar')}>
                <div className={cn('logo')}>
                    <Logotype suffix='ui-validations' href='#/' color='#fff' textColor='#fff' />
                </div>
                <div className={cn('sections')}>
                    <Link activeClassName={cn('active')} to='/OnBlurValidations'>OnBlurValidations</Link>
                    <Link activeClassName={cn('active')} to='/OnBlurValidationsWithSubmitValidation'>
                        OnBlurValidationsWithSubmitValidation
                    </Link>
                    <Link activeClassName={cn('active')} to='/DifferentMessages'>DifferentMessages</Link>
                    <Link activeClassName={cn('active')} to='/SimpleTextMessages'>SimpleTextMessages</Link>
                    <Link activeClassName={cn('active')} to='/ScrollDifferentMessages'>
                        ScrollDifferentMessages
                    </Link>
                    <Link activeClassName={cn('active')} to='/ManyEditors'>ManyEditors</Link>
                </div>
            </div>
            <div className={cn('content')}>
                {children}
            </div>
        </div>
    );
}
