var host = "/iframe";

function pathTo(kind, story) {
  return `${host}?selectedKind=${kind}&selectedStory=${story}`;
}

module.exports = {
  pathTo
};
