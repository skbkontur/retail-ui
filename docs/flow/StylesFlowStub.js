// @flow

const x: {
    (...args: *[]): string,
    [_: string]: string,
} = function(..._args: *[]): string {
    return "";
};

export default x;
