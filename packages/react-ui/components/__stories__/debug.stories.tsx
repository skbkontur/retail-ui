import React from 'react';

export default { title: 'Debug' };

export const Height = () => (
  <>
    <div>window.innerHeight: {window.innerHeight}</div>
    <div>window.outerHeight: {window.outerHeight}</div>
    <div>document.documentElement.clientHeight: {document.documentElement.clientHeight}</div>
    <div>document.documentElement.offsetHeight: {document.documentElement.offsetHeight}</div>
    <div>document.documentElement.scrollHeight: {document.documentElement.scrollHeight}</div>
  </>
);
