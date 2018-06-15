var host = '/iframe.html';

function pathTo(kind, story) {
  return `${host}?selectedKind=${kind}&selectedStory=${story}`;
}

module.exports = {
  pathTo
};
