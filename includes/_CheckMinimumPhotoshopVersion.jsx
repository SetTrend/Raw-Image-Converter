/**
 * Check minimum requirement for host version.
 * @description Photoshop should be our target
 *							environment but i just look at
 *							the version
 * @param {number} [minVersion] - Minimum Photoshop version to look for.
 */
function CheckMinimumPhotoshopVersion(minVersion)
{
	var version = parseInt(app.version.split(".")[0], 10);

	if (!isNaN(version) && version < (minVersion || 9))
	{
		var message = s.MustUse.replace("CS 2", "Version " + minVersion);		// patch for original Adobe version message string.

		alert(message);
		throw (message);
	}
}
