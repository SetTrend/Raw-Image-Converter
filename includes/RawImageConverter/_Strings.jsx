var s =
{
	// all the strings that need localized
	Title: localize("$$$/JavaScript/ImageProcessor/Title=Image Processor"),
	LabelSource: localize("$$$/JavaScripts/ImageProcessor/Source=Select the images to process"),
	NoImagesSelected: localize("$$$/JavaScripts/ImageProcessor/NoImagesSelected=No images have been selected"),
	NoFolderSelected: localize("$$$/JavaScripts/ImageProcessor/NoFolderSelected=No folder has been selected"),
	LabelSourceHelp: localize("$$$/JavaScripts/ImageProcessor/SourceHelp=Location of files to process"),
	LabelDestination: localize("$$$/JavaScripts/ImageProcessor/Destination=Select location to save processed images"),
	SaveInSameLocation: localize("$$$/JavaScripts/ImageProcessor/SaveInSameLocation=S&ave in Same Location"),
	SaveInSameLocationHelp: localize("$$$/JavaScripts/ImageProcessor/SaveInSameLocationHelp=Save the new documents next to the original documents"),
	UseOpen: localize("$$$/JavaScripts/ImageProcessor/UseOpen=Use Open &Images"),
	UseOpenHelp: localize("$$$/JavaScripts/ImageProcessor/UseOpenHelp=Use the images that are currently open"),
	ButtonBrowse1: localize("$$$/JavaScripts/ImageProcessor/Browse1=Select &Folder..."),
	ButtonBrowse2: localize("$$$/JavaScripts/ImageProcessor/Browse2=Sele&ct Folder..."),
	ButtonRun: localize("$$$/JavaScripts/ImageProcessor/Run=Run"),
	OpenFirst: localize("$$$/JavaScripts/ImageProcessor/OpenFirst=&Open first image to apply settings"),
	OpenFirstHelp: localize("$$$/JavaScripts/ImageProcessor/OpenFirstHelp=Show the Camera RAW dialog on the first image to apply settings"),
	Bridge: localize("$$$/JavaScripts/ImageProcessor/Bridge=Process files from Bridge only"),
	BridgeHelp: localize("$$$/JavaScripts/ImageProcessor/BridgeHelp=Selected files from Bridge will be processed"),
	ButtonCancel: localize("$$$/JavaScripts/ImageProcessor/Cancel=Cancel"),
	ButtonLoad: localize("$$$/JavaScripts/ImageProcessor/Load=&Load..."),
	ButtonLoadHelp: localize("$$$/JavaScripts/ImageProcessor/LoadHelp=Load a settings file from disk"),
	ButtonSave: localize("$$$/JavaScripts/ImageProcessor/Save=&Save..."),
	ButtonSaveHelp: localize("$$$/JavaScripts/ImageProcessor/SaveHelp=Save the current dialog settings to disk"),
	ICC: localize("$$$/JavaScripts/ImageProcessor/ICC=Inclu&de ICC Profile"),
	ICCHelp: localize("$$$/JavaScripts/ImageProcessor/ICCHelp=Include the ICC Profile when saving the file"),
	FileType: localize("$$$/JavaScripts/ImageProcessor/FileType=File Type"),
	Preferences: localize("$$$/JavaScripts/ImageProcessor/Preferences=Preferences"),
	RunAction: localize("$$$/JavaScripts/ImageProcessor/RunAction=R&un Action:"),
	ActionHelp: localize("$$$/JavaScript/ImageProcessor/ActionHelp=Select an action set and an action"),
	SaveAsJPEG: localize("$$$/JavaScripts/ImageProcessor/SaveAsJPEG=Save as &JPEG"),
	SaveAsJPEGHelp: localize("$$$/JavaScripts/ImageProcessor/SaveAsJPEGHelp=Save a file to the JPEG format"),
	Quality: localize("$$$/JavaScripts/ImageProcessor/Quality=Quality:"),
	ConvertICC: localize("$$$/JavaScripts/ImageProcessor/Convert=Con&vert Profile to sRGB"),
	ConvertICCHelp: localize("$$$/JavaScripts/ImageProcessor/ConvertHelp=Convert the ICC profile to sRGB before saving"),
	ResizeToFit1: localize("$$$/JavaScripts/ImageProcessor/ResizeToFit1=&Resize to Fit"),
	ResizeToFit2: localize("$$$/JavaScripts/ImageProcessor/ResizeToFit2=R&esize to Fit"),
	ResizeToFit3: localize("$$$/JavaScripts/ImageProcessor/ResizeToFit3=Resi&ze to Fit"),
	ResizeToFitHelp: localize("$$$/JavaScripts/ImageProcessor/ResizeToFitHelp=Select to resize for this format"),
	SaveAsPNG: localize(
		{
			en: "Save as P&NG",
			de: "Als P&NG speichern"
		}),
	SaveAsPNGHelp: localize(
		{
			en: "Save a file to the PNG format",
			de: "Datei im PSD-Format speichern"
		}),
	Compression: localize(
		{
			en: "Compression Rate:",
			de: "Kompressionsrate:"
		}),
	Interlaced: localize(
		{
			en: "Interlaced",
			de: "Halbbildverfahren"
		}),
	InterlacedHelp: localize(
		{
			en: "Use interlace rather than progressive mode when saving to PNG format",
			de: "PNG-Bilder im Halbbildverfahren statt fortschreitend speichern"
		}),
	SaveAsPSD: localize("$$$/JavaScripts/ImageProcessor/SaveAsPSD=Save as &PSD"),
	SaveAsPSDHelp: localize("$$$/JavaScripts/ImageProcessor/SaveAsPSDHelp=Save a file to the PSD format"),
	MaxCompat: localize("$$$/JavaScripts/ImageProcessor/Maximize=&Maximize Compatibility"),
	MaxCompatHelp: localize("$$$/JavaScripts/ImageProcessor/MaximizeHelp=Maximize compatibility when saving to PSD format"),
	SaveAsTIFF: localize("$$$/JavaScripts/ImageProcessor/SaveAsTIFF=Save as &TIFF"),
	SaveAsTIFFHelp: localize("$$$/JavaScripts/ImageProcessor/SaveAsTIFFHelp=Save a file to the TIFF format"),
	LZW: localize("$$$/JavaScripts/ImageProcessor/LZW=LZ&W Compression"),
	LZWHelp: localize("$$$/JavaScripts/ImageProcessor/LZWHelp=Use LZW compression when saving in TIFF format"),
	Author: localize(
		{
			en: "Author Information:",
			de: "Autor Informationen:"
		}),
	AuthorHelp: localize(
		{
			en: "Add author metadata to your images",
			de: "Autor Metadaten zu Bildern hinzufügen"
		}),
	Copyright: localize("$$$/JavaScripts/ImageProcessor/Copyright=Copyright Info:"),
	CopyrightHelp: localize("$$$/JavaScripts/ImageProcessor/CopyrightHelp=Add copyright metadata to your images"),
	Resize: localize(
		{
			en: "Size:",
			de: "Größe:"
		}),
	ResizeHelp: localize(
		{
			en: "Select scaling factor for downsizing resulting image",
			de: "Wähle den Skalierungsfaktor, auf den verkleinert werden soll"
		}),
	Crop: localize(
		{
			en: "Crop:",
			de: "Freistellen:"
		}),
	CropHelp: localize(
		{
			en: "Select percentage of image remaining after image border has been cropped",
			de: "Bestimme, wieviel Prozent des Bildes nach dem Beschneiden des Bildrands erhalten bleiben soll"
		}),
	Percent: "%",
	PickXML: localize("$$$/JavaScripts/ImageProcessor/PickXML=Pick an XML file to load"),
	PickXMLWin: localize("$$$/JavaScripts/ImageProcessor/PickXMLWin=XML Files: *.xml"),
	PickXMLSave: localize("$$$/JavaScripts/ImageProcessor/PickXMLSave=Pick an XML file to save"),
	PickSource: localize("$$$/JavaScripts/ImageProcessor/PickSource=Pick a source folder"),
	PickDest: localize("$$$/JavaScripts/ImageProcessor/PickDest=Pick a destination folder"),
	SpecifySource: localize("$$$/JavaScripts/ImageProcessor/SpecifySource=Please specify a source folder."),
	SpecifyDest: localize("$$$/JavaScripts/ImageProcessor/SpecifyDest=Please specify a destination folder."),
	OneType: localize("$$$/JavaScripts/ImageProcessor/OneType=You must save to at least one file type."),
	JPEGQuality: localize("$$$/JavaScripts/ImageProcessor/JPEGQuality=JPEG Quality must be between 0 and 12."),
	PNGCompression: localize(
		{
			en: "PNG compression value must be between 0 and 9.",
			de: "Die PNG-Kompression muss zwischen 0 und 9 liegen."
		}),
	ScalingDlg: localize(
		{
			en: "You must specify a valid scaling factor for {FileType} when using resize image options for {FileType}.",
			de: "Du musst einen gültigen Skalierungsfaktor für {FileType} angeben, wenn für {FileType} die Skalierungsoption aktiviert ist."
		}),
	CroppingDlg: localize(
		{
			en: "You must specify a valid cropping factor for {FileType} when using resize image options for {FileType}.",
			de: "Du musst einen gültigen Freistellungsfaktor für {FileType} angeben, wenn für {FileType} die Skalierungsoption aktiviert ist."
		}),
	Scaling: localize(
		{
			en: "Scaling factor must be defined and valid to use scaling function!",
			de: "Der Skalierungsfaktor muss definiert und gültig sein, damit die Skalierungsfunktion angewendet werden kann."
		}),
	Cropping: localize(
		{
			en: "Scaling factor must be defined and valid to use cropping function!",
			de: "Der Skalierungsfaktor muss definiert und gültig sein, damit die Freistellungsfunktion angewendet werden kann."
		}),
	NoSliderPairFound: localize(
		{
			en: "Pair of 'editnumber' and 'slider' controls expected yet could not be found.",
			de: "Ein Paar aus 'editnumber'- und 'slider'-Steuerlementen wurde erwartet, konnte jedoch nicht gefunden werden."
		}),
	KeepStructure: localize("$$$/JavaScripts/ImageProcessor/KeepStructure=Keep folder structure"),
	IncludeAllSubfolders: localize("$$$/JavaScripts/ImageProcessor/IncludeAll=Include All sub-folders"),
	IncludeAllSubfoldersHelp: localize("$$$/JavaScripts/ImageProcessor/IncludeAllHelp=Process all the folders within the source folder"),
	FileAlreadyExists: localize("$$$/JavaScripts/ImageProcessor/FileAlreadyExists=The file already exists. Do you want to replace?"),
	SavedToCloudWorkarea: localize("$$$/JavaScripts/ImageProcessor/SavedToCloudWorkarea=Processed files for cloud documents were successfully saved to the local cloud document workarea."),
	MustUse: localize("$$$/JavaScripts/ImageProcessor/MustUse=You must use Photoshop CS 2 or later to run this script!"),
	Sorry: localize("$$$/JavaScripts/ImageProcessor/Sorry=Sorry, something major happened and I can't continue! Would you like to see more info?"),
	CouldNotProcess: localize("$$$/JavaScripts/ImageProcessor/CouldNotProcess=Sorry, I could not process the following files:^r"),
	MustSaveOpen: localize("$$$/JavaScripts/ImageProcessor/MustSaveOpen=Open files must be saved before they can be used by the Image Processor."),
	Following: localize("$$$/JavaScripts/ImageProcessor/Following=The following files will not be saved."),
	NoOpenableFiles: localize("$$$/JavaScripts/ImageProcessor/NoOpenableFiles=There were no source files that could be opened by Photoshop."),
	CannotWriteToFolder: localize("$$$/JavaScripts/ImageProcessor/CannotWriteToFolder=I am unable to create a file in this folder. Please check your access rights to this location "),
	CannotWriteConfig: localize(
		{
			en: "I couldn't write current Raw Image Converter settings to configuration file for late reuse.",
			de: "Die aktuellen Einstellungen des Raw Image Converters konnten nicht für eine spätere Wiederverwendung gespeichert werden."
		}),
	Success: localize(
		{
			en: "Files have successfully been processed.",
			de: "Dateien wurden erfolgreich verarbeitet."
		}),
	OK: localize("$$$/AdobePlugin/Shared/OK=OK"),

	// some strings that need localized to define the preferred sizes of items for different languages
	SourceAndDestLength: localize("$$$/locale_specific/JavaScripts/ImageProcessor/SourceAndDestLength=210"),
	ActionDropDownLength: localize("$$$/locale_specific/JavaScripts/ImageProcessor/ActionDropDownLength=165"),
};