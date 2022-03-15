var fileOps =
{
	/**
	 * Find all the files in the given folder recursively.
	 * @param {string} srcFolderStr - Folder path.
	 * @param {File[]} [destArray] - Optional: Array of File objects to add files to.
	 * @returns {File[]} Array of File objects.
	 */
	FindAllFiles: function (srcFolderStr, destArray)
	{
		var fsItems = Folder(srcFolderStr).getFiles();

		if (typeof destArray === "undefined") destArray = [];

		for (var i = 0;i < fsItems.length;i++)
		{
			var fsItem = fsItems[i];

			if (fsItem instanceof File) destArray.push(fsItem);
			else fileOps.FindAllFiles(fsItem.toString(), destArray);
		}

		return destArray;
	},



	// given a file name and a list of extensions
	// determine if this file is in the list of extensions
	/**
	 * See if a file has a extension from a given list.
	 * @param {string} filePath - File, with optional path, to be examined.
	 * @param {string[]} fileExtArray - Array of file extensions to check against.
	 * @returns true, if the file's extension is in the list; false otherwise.
	 */
	IsFileOneOfThese: function (filePath, fileExtArray)
	{
		var lastDot = filePath.lastIndexOf(".");

		if (lastDot >= 0)
		{
			var extension = filePath.substring(lastDot + 1).toUpperCase();

			for (var i = 0;i < fileExtArray.length;i++)
				if (extension === fileExtArray[i])
					return true;
		}

		return false;
	},



	/**
	 * Determine if this file is one of the provided types.
	 * @description Always returns false on platforms other than Mac.
	 * @param {string} filePath - File, with optional path, to be examined.
	 * @param {string[]} fileTypeArray - Array of file types to check against.
	 * @returns true if the file type is in the list; false otherwise.
	 *					Always returns false on platforms other than Mac.
	 */
	IsFileOneOfTheseTypes: function (filePath, fileTypeArray)
	{
		if (fileOps.IsMacintoshOS())
		{
			var file = new File(filePath);

			for (var i = 0;i < fileTypeArray.length;i++)
				if (file.type === fileTypeArray[i])
					return true;
		}

		return false;
	},



	/**
	 * Determines if we are running on an Apple Macintosh.
	 * @returns true, if the current operating system is a
	 *					Macintosh OS; false otherwise.
	 */
	IsMacintoshOS: function ()
	{
		return $.os.toLowerCase() === "macintosh";
	},



	/**
	 * Determines if we are running on a Microsoft Windows machine.
	 * @returns true, if the current operating system is
	 *					Microsoft Windows; false otherwise.
	 */
	IsWindowsOS: function ()
	{
		return $.os.toLowerCase() === "windows";
	},



	/**
	 * Given a folder, filename, and extension, comes up with a unique file name.
	 * @param {any} path - Path to file.
	 * @param {any} fileName - File name without extension.
	 * @param {any} extension - File extension, including leading dot (".").
	 * @returns Unique file path.
	 */
	CreateUniqueFileName: function (path, fileName, extension)
	{
		fileName = fileName.replace(/[:\/\\*\?\"\<\>\|]/g, "_");

		var uniqueFileName = fileOps.ConcatPath(path, fileName + extension);

		for (var fileNumber = 1;File(uniqueFileName).exists;fileNumber++) uniqueFileName = fileOps.ConcatPath(path, fileName + "_" + fileNumber + extension);

		return uniqueFileName;
	},



	/**
	 * Combines path particles into a file or folder path with slashes.
	 * Input arguments may be an arbitrary number of strings,
	 * File or Folder objects, or arrays of these.
	 * @param {any[]} pathParts
	 * @returns {string} A path to a file or folder.
	 * @example
	 * ConcatPath(Folder("C:\"), "Test.txt")
	 * @example
	 * ConcatPath([Folder("C:\"), "Temp"], "Test.txt")
	 * @example
	 * ConcatPath(Folder("C:\"), ["Temp", "Test.txt"])
	 */
	ConcatPath: function (pathParts)
	{
		var particle = [], retVal = "", i, j, separator;

		// spread arguments into a single string array
		for (i = 0;i < arguments.length;++i)
		{
			var arg = arguments[i];

			if (arg instanceof Array) for (j = 0;j < arg.length;++j) particle.push(arg[j].toString());
			else particle.push(arg.toString());
		}

		// change Windows drive letter into Linux format
		if (particle.length > 0) particle[0] = particle[0].replace(/^([a-z]):/i, function (_, drive) { return "/" + drive.toLowerCase(); });

		// concatenate all the particles
		for (i = 0;i < particle.length;++i)
			if (particle[i].length)
			{
				separator = particle[i];
				separator = separator[separator.length - 1];

				if (!(separator === "/" || separator === "\\")) particle[i] += "/";

				retVal += particle[i];
			}

		// strip final separator and canonicalize slashes
		return retVal.length > 0 ? retVal.substring(0, retVal.length - 1).replace("\\", "/") : "";
	},



	/**
	 * Extracts file name, without extension, from a fully qualified path.
	 * @param {any} filePath - File path to use.
	 * @returns File name root, without extension.
	 */
	FileNameRootFromPath: function (filePath)
	{
		return /([^\/\\\.]+)(\.[^\/\\]+)?$/.exec(filePath)[1];
	},



	/**
	 * See if I can write to this folder by making a temp file then deleting it.
	 * @param {string} destPath - Path to folder to be tested.
	 * @returns true, if the folder can be written to; false otherwise.
	 */
	IsFolderWritable: function (destPath)
	{
		var f = new File(fileOps.ConcatPath(destPath, "delete_me.txt"));

		return f.open("w", "TEXT", "????") && f.write("delete me") && f.close() && f.remove();
	}
};
