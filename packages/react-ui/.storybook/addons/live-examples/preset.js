function previewAnnotations(entry = []) {
    return [...entry, require.resolve('./preset/preview')];
}

module.exports = {
    previewAnnotations,
};
