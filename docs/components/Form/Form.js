// @flow
import React from 'react';

import cn from './Form.less';

type FormProps = {
    children?: any;
};

function Form({ children }: FormProps): React.Element<*> {
    return (
        <div>
            {children}
        </div>
    );
}

type FormLineProps = {
    children?: any;
    title: string;
};

function FormLine({ children, title }: FormLineProps): React.Element<*> {
    return (
        <div className={cn('line')}>
            <span className={cn('caption')}>{title}</span>
            <span>{children}</span>
        </div>
    );
}

type ActionsBarProps = {
    children?: any;
};

function ActionsBar({ children }: ActionsBarProps): React.Element<*> {
    return (
        <div className={cn('actions-bar')}>
            {children}
        </div>
    );
}

Form.Line = FormLine;
Form.ActionsBar = ActionsBar;
export default Form;
