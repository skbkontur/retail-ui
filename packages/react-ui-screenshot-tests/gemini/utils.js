var host = "/iframe";

function pathTo(kind, story) {
  return `${host}?selectedKind=${encodeURIComponent(
    kind
  )}&selectedStory=${encodeURIComponent(story)}`;
}

module.exports = {
  pathTo
};
