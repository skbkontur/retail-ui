// @ts-check

/**
 * @param {string} filename
 * @returns {boolean}
 */
exports.isTypeScriptSource = function(filename) {
  // Matched .ts and .tsx files
  // Do not matched .d.ts files
  if (filename.endsWith('.d.ts')) {
    return false;
  }
  return /\.tsx?$/.test(filename);
};
