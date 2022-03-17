var g =
{
	// version number for possible expansion issues
	Version: 1,

	// ok and cancel button
	RunButtonID: 1,
	CancelButtonID: 2,

	// scaling factor boundaries
	MinResize: 5,
	MaxResize: 100,
	DefResize: 100,

	// crop factor boundaries
	MinCrop: 5,
	MaxCrop: 100,
	DefCrop: 100,

	// A list of file extensions and types PS can read
	FileExtensionsToRead: app.windowsFileTypes,
	FileTypesToRead: app.macintoshFileTypes,

	// A list of camera raw extensions, keep them upper case
	FilesForCameraRaw:
		[
			"TIF", "CRW", "NEF", "RAF", "ORF", "MRW", "DCR",
			"MOS", "SRF", "PEF", "DCR", "CR2", "DNG", "ERF",
			"X3F", "RAW", "RW2", "GPR", "3FR", "FFF", "ARW",
			"IIQ", "RWL", "MEF", "NRW", "SRW", "SR2", "KDC",
			"MFW", "DXO", "HEIC", "ARQ", "CR3"
		],

	DefaultParamsFile: new File(app.preferencesFolder + "/" + s.Title + ".xml"),

	ClassActionSet: charIDToTypeID('ASet'),
	ClassAction: charIDToTypeID('Actn'),
	KeyName: charIDToTypeID('Nm  '),
	KeyNumberOfChildren: charIDToTypeID('NmbC'),
};
