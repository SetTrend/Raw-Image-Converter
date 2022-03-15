var xmlParser =
{
	/**
	 * Reads the "Tag" of the <Tag>Data</Tag>.
	 * @description A very crude xml parser.
	 * @param {File} file - XML file to parse.
	 */
	ReadTag: function (file)
	{
		var tag, c, buffer = "";

		while (!file.eof && c !== "<") c = file.read(1);
		while (!file.eof && c !== ">") buffer += c = file.read(1);

		if (buffer.length) tag = buffer.substring(0, buffer.length - 1);

		return tag;
	},


	/**
	 * Reads the "Data" of the <Tag>Data</Tag>.
	 * @description A very crude xml parser.
	 * @param {File} file - XML file to parse.
	 */
	ReadData: function (file)
	{
		var data = "", c;

		if (!file.eof)
		{
			while (!file.eof && c !== "<") data += c = file.read(1);

			if (!file.eof) file.seek(-1, 1);
		}

		return data ? data.substring(0, data.length - 1) : data;
	},


	/**
	 * Gets current script name, having all characters
	 * stripped with would be invalid for XML tag name.
	 */
	EscapeScriptNameForXml: function ()
	{
		return s.Title.replace(/[^a-z]/ig, "");
	}
};