// ©2022 Axel Dahmen, Neunkirchen-Seelscheid, GERMANY
// Produced, Directed and Written by Axel Dahmen
// UI Design by Axel Dahmen, based on Julie Meridian's work on Adobe's Image Processor script.

/*
@@@BUILDINFO@@@ Raw Image Converter.jsx 1.0.0.0
*/

/*

// BEGIN__HARVEST_EXCEPTION_ZSTRING

<javascriptresource>
<name>Raw Image Converter...</name>
<category>aaaThisPutsMeAtTheTopOfTheMenu</category>
	<eventid>cf50485c-a756-4e71-bdb4-cc6f636a447f</eventid>
</javascriptresource>

// END__HARVEST_EXCEPTION_ZSTRING

*/


#script "Raw Image Converter";

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop;


// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 1;
// debugger; // launch debugger on next line

$.localize = true;
$.strict = true;


#includepath "includes/RawImageConverter;includes";

#include "_Strings.jsx";
#include "_Globals.jsx";
#include "_CheckMinimumPhotoshopVersion.jsx";
#include "_Parameters.jsx";
#include "_ParametersDialog.jsx";
#include "_ImageProcessor.jsx";
#include "_MessageBox.jsx";



// the main routine
// the ImageProcessor object does most of the work

var gScriptResult = 'cancel';		// quit, returning 'cancel' (dont localize) makes the actions palette not record our script

// gFilesFromBridge is a variable that is defined in photoshop.jsx.
// If the Bridge application is running this script gFilesFromBridge
// contains an array of File objects; otherwise it's undefined.
var filesFromBridge = typeof gFilesFromBridge === "undefined" ? null : gFilesFromBridge;

// remember the dialog modes
var saveDialogMode = app.displayDialogs;
app.displayDialogs = DialogModes.NO;

try
{
	CheckMinimumPhotoshopVersion(13);

	var params = new ProcessParameters();

	params.LoadFromXml(g.DefaultParamsFile);

	var dlg = new ParametersDialog(params, filesFromBridge);

	if (dlg.RunDialog() == g.RunButtonID)
	{
		var imgProc = new ImageProcessor(params, filesFromBridge);

		imgProc.Execute();

		params.SaveToXml(g.DefaultParamsFile);

		gScriptResult = null;
	}

	if (imgProc)
		if (imgProc.HasErrors()) imgProc.ReportErrors();
		else new MessageBox(s.Success).Show();

	$.gc(); // fix crash on quit
}

// Lot's of things can go wrong
// Give a generic alert and see if they want the details
catch (e)
{
	// don't report error on user cancel
	if ((!e.number || e.number !== 8007) && confirm(s.Sorry))
		alert(e.number
			? e.name + ": " + e.message + "\n\nFile \"" + e.fileName + "\", Line " + e.line + "."
			+ (e.description && e.description.toLowerCase() !== e.message.toLowerCase() ? "\nDescription " + e.description : "")
			: e.toString()
		);
}

// restore the dialog modes
app.displayDialogs = saveDialogMode;

// must be the last thing
gScriptResult;
