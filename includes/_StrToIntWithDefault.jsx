/**
 * Converts string value to number value.
 * Returns default value if string is not a number.
 * @param {string} inStr
 * @param {number} defVal
 * @returns string value as number, or default value if string is not a number.
 */
function StrToIntWithDefault(inStr, defVal)
{
	var v = parseInt(inStr);

	return isNaN(v) ? defVal : v;
}
