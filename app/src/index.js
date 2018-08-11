import { test } from '../../src';

function component() {
  let element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = ['Hello', 'webpack', test].join(' ');

  return element;
}

document.body.appendChild(component());
