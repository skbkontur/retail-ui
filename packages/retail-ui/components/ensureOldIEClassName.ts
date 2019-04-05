let ieVerison: number | undefined;
let isIE: boolean | undefined;
let isEdge: boolean | undefined;

if (typeof(window) !== 'undefined' && window.document) {
  let classes = '';

  const div = document.createElement('div');
  div.innerHTML = '<!--[if IE 8]>8<![endif]--><!--[if IE 9]>9<![endif]-->';
  ieVerison = parseInt(div.innerHTML, 10);
  if (ieVerison) {
    classes += ' rt-ie' + ieVerison;
  }

  const ua = window.navigator.userAgent;
  isIE = !!ieVerison || ua.includes('MSIE ') || ua.includes('Trident/');
  if (isIE) {
    classes += ' rt-ie-any';
  }

  isEdge = ua.includes('Edge/');
  if (isEdge) {
    classes += ' rt-ie-any';
  }

  if (classes) {
    document.documentElement.className += classes;
  }
}

export { ieVerison, isIE, isEdge };
