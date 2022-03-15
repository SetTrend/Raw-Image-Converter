#include "../_XmlParser.jsx";



/**
 * Maintains parameters for processing all images.
 * @constructor
 */
function ProcessParameters()
{
	this.version = g.Version;
	this.useopen = false;
	this.source = "";
	this.includesub = false;
	this.keepstructure = false;
	this.saveinsame = true;
	this.dest = "";
	this.open = false;
	this.jpeg = true;
	this.png = false;
	this.psd = false;
	this.tiff = false;
	this.jpegresize = false;
	this.jpegfactor = g.DefResize;
	this.pngresize = false;
	this.pngfactor = g.DefResize;
	this.psdresize = false;
	this.psdfactor = g.DefResize;
	this.tiffresize = false;
	this.tifffactor = g.DefResize;
	this.jpegq = 5;
	this.jpegconverticc = false;
	this.pngcomp = 5;
	this.pngi = false;
	this.psdmaxcompat = true;
	this.tifflzw = false;
	this.runaction = false;
	this.actionset = "";
	this.action = "";
	this.author = "";
	this.info = "";
	this.icc = true;
}



/**
 * Loads processing parameters from XML file.
 * @param {File} loadFile - XML file to load processing parameters from.
 */
ProcessParameters.prototype.LoadFromXml = function (loadFile)
{
	if (loadFile.exists)
	{
		loadFile.open("r");

		var rootNode = xmlParser.ReadTag(loadFile);

		if (rootNode === xmlParser.EscapeScriptNameForXml())
		{
			while (!loadFile.eof)
			{
				var starter = xmlParser.ReadTag(loadFile);
				var data = xmlParser.ReadData(loadFile);
				var ender = xmlParser.ReadTag(loadFile);

				if (("/" + starter) == ender)
				{
					// force boolean values to boolean types
					if (data === "true" || data === "false") data = data === "true";

					this[starter] = data;
				}
			}
		}

		loadFile.close();

		if (this.version !== g.Version)
		{
			// do something here to fix version conflicts
			// this should do it
			this.version = g.Version;
		}
	}
};



/**
 * Saves processing parameters to XML file.
 * @param {File} saveFile - XML file to save processing parameters to.
 */
ProcessParameters.prototype.SaveToXml = function (saveFile)
{
	var wl = function (text) { if (!saveFile.writeln(text)) throw s.CannotWriteConfig; };

	saveFile.encoding = "UTF8";
	if (!saveFile.open("w", "TEXT", "????")) throw s.CannotWriteConfig;

	// unicode signature, this is UTF16 but will convert to UTF8 "EF BB BF"
	saveFile.write("\uFEFF");
	var rootNode = xmlParser.EscapeScriptNameForXml();
	wl("<" + rootNode + ">");
	for (var p in this)
	{
		if (!(this[p] instanceof Function)) wl("\t<" + p + ">" + this[p] + "</" + p + ">");
	}
	wl("</" + rootNode + ">");

	saveFile.close();
};