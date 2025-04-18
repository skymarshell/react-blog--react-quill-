function regexImgTag() {
  return /<img[^>]*>/g;
}

/**
 * Extracts a regular expression pattern to match the `src` attribute within an HTML image tag.
 *
 * ใช้กับ string.match -> [1] = src value
 *
 * @function
 * @returns {RegExp} A regular expression to match the `src` attribute and capture its value.
 */
function regexCheckSrc() {
  return /src\s*=\s*"(.*?)"/;
}

/**
 *
 *
 * Capture first found src=""
 *
 * @function
 * @returns {RegExp} /src=""/
 */
function regexCheckFirstEmptySrc() {
  return /src=""/;
}

function regexCheckImgWithSrcEmpty() {
  return /src=""/;
}

module.exports = { regexImgTag, regexCheckSrc, regexCheckFirstEmptySrc };
