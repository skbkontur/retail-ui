if (global.document) {
  const div = document.createElement('div');
  div.innerHTML = '<!--[if IE 8]>8<![endif]--><!--[if IE 9]>9<![endif]-->';
  const ieVerison = parseInt(div.innerHTML, 10);

  if (ieVerison) {
    document.body.className += ' rt-ie' + ieVerison;
  }
}
