import React from 'react';
import QuickValidations from './QuickValidations/QuickValidations';

export default [
    {
        component: QuickValidations,
        url: 'quick-validations',
        caption: 'Быстрые inline-валидации',
    },
    {
        component: () => <span />,
        url: 'validations-builder',
        caption: 'Конструктор валидаций',
    },
]
