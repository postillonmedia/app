import aRenderer from './a';
import bRenderer from './b';
import brRenderer from './br';
import hrRenderer from './hr';
import iRenderer from './i';
import spanRenderer from './span';
import iframeRenderer from './iframe';
import imgRenderer from './img';
import listRenderer from './list';
import scriptRenderer from './script';
import tableRenderer from './table';

import wrapperRenderer from './wrapper';
import textwrapperRenderer from './textwrapper';

import adRenderer from './ad';


export const a = aRenderer;

export const b = bRenderer;
export const bold = bRenderer;
export const strong = bRenderer;

export const i = iRenderer;
export const italic = iRenderer;

export const span = spanRenderer;

export const br = brRenderer;
export const hr = hrRenderer;

export const iframe = iframeRenderer;
export const img = imgRenderer;

export const ol = listRenderer;
export const ul = listRenderer;

export const wrapper = wrapperRenderer;
export const textwrapper = textwrapperRenderer;

export const script = scriptRenderer;

export const table = tableRenderer;

export const ad = adRenderer;


export default {
    a,

    b,
    bold,
    strong,

    i,
    italic,

    span,

    br,
    hr,

    iframe,
    img,

    ol,
    ul,

    table,

    wrapper,
    textwrapper,

    ad,

    script,
}