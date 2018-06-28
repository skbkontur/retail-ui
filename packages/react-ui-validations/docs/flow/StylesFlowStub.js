// @flow

const x: {
    (...args: *[]): string,
    [_: string]: string
} = function(...args: *[]): string { return ''; };

export default x;
