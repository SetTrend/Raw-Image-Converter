#include "../_GetOpenApplicationDocs.jsx";
#include "../_FileOperations.jsx";



/**
 * Processes a number of images according to parameters provided.
 * @constructor
 * @param {ProcessParameters} params - Image processing parameters.
 * @param {File[]} filesFromBridge - Array of files obtained from Bridge application; or null.
 */
function ImageProcessor(params, filesFromBridge)
{
	this.params = params;		// use this parameter set for exporting
	this.filesFromBridge = filesFromBridge;
	this.runningFromBridge = !!(filesFromBridge && filesFromBridge.length && filesFromBridge.length > 0);		// true, if the Bridge app is running this script
	this.fileErrors = [];
}



/**
 * Loop through all the files and save accordingly.
 */
ImageProcessor.prototype.Execute = function ()
{
	var inputFiles;
	var destFolder;
	var saveMaxCompatSetting;
	var fileProcessed;
	var cloudFolder;
	var firstImageOpened;
	var cameraRawParams = {};
	var p = this.params;


	// ---- get list of files -------------------------

	if (this.runningFromBridge) inputFiles = this.filesFromBridge;
	else if (p.useopen) inputFiles = GetOpenPSApplicationDocs();
	else if (p.includesub) inputFiles = fileOps.FindAllFiles(p.source, inputFiles);
	else inputFiles = Folder(p.source).getFiles();


	// ---- set PSD conversion option -------------------------

	var needMaxPsdCompatibility = p.psdmaxcompat ? QueryStateType.ALWAYS : QueryStateType.NEVER;
	if (p.psd && app.preferences.maximizeCompatibility != needMaxPsdCompatibility)
	{
		saveMaxCompatSetting = app.preferences.maximizeCompatibility;
		app.preferences.maximizeCompatibility = needMaxPsdCompatibility;
	}


	// ---- process each of the input files -------------------------

	try
	{
		for (var i = 0;i < inputFiles.length;i++)
		{
			try
			{
				if (inputFiles[i] instanceof File && !inputFiles[i].hidden || p.useopen)
				{
					// ---- set file and folder path -------------------------

					if (this.runningFromBridge)
					{
						cameraRawParams.fileName = inputFiles[i].absoluteURI;
						p.source = Folder(inputFiles[i].path).absoluteURI;
					}
					else if (p.useopen)
					{
						// inputFiles is an array consisting of Photoshop documents here
						cameraRawParams.fileName = inputFiles[i].fullName.absoluteURI;
						p.source = Folder(inputFiles[i].path).absoluteURI;
					}
					else
					{
						cameraRawParams.fileName = inputFiles[i].absoluteURI;
						p.source = Folder(p.source).absoluteURI;	// convert Windows to Linux format
					}


					// ---- open file -------------------------

					if (fileOps.IsFileOneOfThese(cameraRawParams.fileName, g.FileExtensionsToRead) || fileOps.IsFileOneOfTheseTypes(cameraRawParams.fileName, g.FileTypesToRead))
					{
						fileProcessed = true;

						if (!this.runningFromBridge && p.useopen)
						{
							app.activeDocument = inputFiles[i];

							if (app.activeDocument.cloudDocument) cloudFolder = app.activeDocument.cloudWorkAreaDirectory;

							app.activeDocument.duplicate();
						}
						else
						{
							if (!firstImageOpened && p.open && fileOps.IsFileOneOfThese(cameraRawParams.fileName, g.FilesForCameraRaw))
							{
								// this is the first CR file and the user elected to open it
								// and choose settings to apply to the rest of the CR files
								firstImageOpened = true;

								cameraRawParams.useDescriptor = true;
								this.OpenCameraRaw(cameraRawParams, true);
							}
							else this.OpenCameraRaw(cameraRawParams, false, DialogModes.NO);
						}


						// ---- set copyright information -------------------------

						this.SetCopyrightInfo();


						// ---- save file -------------------------

						if (p.saveinsame)
						{
							destFolder = inputFiles[i].parent;

							if (!this.runningFromBridge && p.useopen)
							{
								if (File(inputFiles[i].fullName).cloudDocument) destFolder = cloudFolder;
								else destFolder = inputFiles[i].fullName.parent;
							}
						}
						else destFolder = Folder(p.dest).absoluteURI;

						this.SaveFile(cameraRawParams.fileName.toString(), destFolder);

						app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
					}
				}
			}
			// don't let one file spoil the party!
			// trying to stop on user cancel is a problem
			// during the open of a large file the error we get is no such element
			// and not the actual cancel 8007
			// it's all about timing, hit the cancel right after a document opens
			// and all is well and you get the cancel and everything stops
			catch (e)
			{
				// If we cancel or encounter an error, don't show the cloud workarea destination alert.
				cloudFolder = null;

				// stop only on cancel
				if (e.number === 8007) break;

				this.fileErrors.push(inputFiles[i]);
			}
		}
	}
	finally
	{
		if (saveMaxCompatSetting != undefined) app.preferences.maximizeCompatibility = saveMaxCompatSetting;
	}

	// report general information to user
	if (!fileProcessed) this.fileErrors = s.NoOpenableFiles;
	else if (cloudFolder && (app.playbackDisplayDialogs == DialogModes.ALL)) this.fileErrors = s.SavedToCloudWorkarea + '\n' + app.preferences.cloudWorkAreaDirectory.fsName;

	// handle crash on quit when running from bridge
	cameraRawParams.desc = null;
	$.gc();
};



// returning the camera raw action desc
/**
 * Opens a camera raw file.
 * @description Camera Raw parameter object will be updated if updateCRDesc parameter is true.
 * @param {object} crParams - Camera Raw parameter object.
 * @param {boolean} updateCRDesc - true, to have the image descriptor read and used for following operations.
 * @param {number} [dialogMode] - Optional. Dialog mode to use for import operation.
 * @returns true, if image was successfully opened by Camera Raw; false otherwise.
 */
ImageProcessor.prototype.OpenCameraRaw = function (crParams, updateCRDesc, dialogMode)
{
	var keyNull = charIDToTypeID('null');
	var keyAs = charIDToTypeID('As  ');
	var adobeCameraRawID = stringIDToTypeID("Adobe Camera Raw");
	var desc = new ActionDescriptor();

	desc.putPath(keyNull, File(crParams.fileName));
	if (crParams.desc && crParams.useDescriptor && fileOps.IsFileOneOfThese(crParams.fileName, g.FilesForCameraRaw))
		desc.putObject(keyAs, adobeCameraRawID, crParams.desc);

	if (typeof dialogMode === "undefined")
	{
		dialogMode = DialogModes.ALL;
		desc.putBoolean(stringIDToTypeID('overrideOpen'), true);	// Suppress choose file dialog.
	}

	var returnDesc = executeAction(charIDToTypeID('Opn '), desc, dialogMode);

	if (returnDesc.hasKey(keyAs))
	{
		if (updateCRDesc) crParams.desc = returnDesc.getObjectValue(keyAs, adobeCameraRawID);

		if (returnDesc.hasKey(keyNull))
		{
			crParams.fileName = returnDesc.getPath(keyNull);

			return true;
		}
	}

	return false;
};



/**
 * Adds copyright information to the image.
 */
ImageProcessor.prototype.SetCopyrightInfo = function ()
{
	if (app.documents.length > 0)
	{
		var docRef = app.activeDocument;
		var p = this.params;

		if (p.author) docRef.info.author = p.author;
		if (p.info)
		{
			docRef.info.copyrightNotice = p.info;
			docRef.info.copyrighted = CopyrightedType.COPYRIGHTEDWORK;
		}
	}
};



/**
 * Save currently active Photoshop document to destination folder
 * in any of the selected file formats.
 * @param {string} filePath - Fully qualified path to current file.
 * @param {string} destFolder - Destination folder to save file to.
 */
ImageProcessor.prototype.SaveFile = function (filePath, destFolder)
{
	var p = this.params;

	if (p.jpeg) this.SaveFileAsJpeg(filePath, destFolder);
	if (p.png) this.SaveFileAsPng(filePath, destFolder);
	if (p.psd) this.SaveFileAsPsd(filePath, destFolder);
	if (p.tiff) this.SaveFileAsTiff(filePath, destFolder);
};



/**
 * Saves the currently active Photoshop document as JPEG file.
 * @param {string} filePath - File path of active Photoshop document.
 * @param {string} destFolder - Destination folder to save image to.
 */
ImageProcessor.prototype.SaveFileAsJpeg = function (filePath, destFolder)
{
	var historyState = app.activeDocument.activeHistoryState;
	var folderPath = this.CreateDestFolder(filePath, destFolder, "JPEG");
	var p = this.params;

	if (p.jpegresize)
	{
		this.CropImage(p.jpegcfactor);
		this.ResizeImage(p.jpegrfactor);
	}

	if (p.jpegconverticc) this.ConvertTosRGBProfile();
	if (p.runaction) doAction(p.action, p.actionset);

	app.activeDocument.flatten();
	app.activeDocument.bitsPerChannel = BitsPerChannelType.EIGHT;
	this.RemoveAlphaChannels();

	if (this.CanWriteToFolder(folderPath, filePath))
	{
		var jpegOptions = new JPEGSaveOptions();
		var uniqueFilePath = fileOps.CreateUniqueFileName(folderPath, fileOps.FileNameRootFromPath(filePath), ".jpg");

		jpegOptions.quality = p.jpegq;
		jpegOptions.embedColorProfile = p.icc;

		app.activeDocument.saveAs(File(uniqueFilePath), jpegOptions);
	}

	app.activeDocument.activeHistoryState = historyState;
};



/**
 * Saves the currently active Photoshop document as PNG file.
 * @param {string} filePath - File path of active Photoshop document.
 * @param {string} destFolder - Destination folder to save image to.
 */
ImageProcessor.prototype.SaveFileAsPng = function (filePath, destFolder)
{
	var historyState = app.activeDocument.activeHistoryState;
	var folderPath = this.CreateDestFolder(filePath, destFolder, "PNG");
	var p = this.params;

	if (p.pngresize)
	{
		this.CropImage(p.pngcfactor);
		this.ResizeImage(p.pngrfactor);
	}

	if (p.runaction) doAction(p.action, p.actionset);

	if (this.CanWriteToFolder(folderPath, filePath))
	{
		var pngOptions = new PNGSaveOptions();
		var uniqueFilePath = fileOps.CreateUniqueFileName(folderPath, fileOps.FileNameRootFromPath(filePath), ".png");

		pngOptions.compression = p.pngcomp;
		pngOptions.interlaced = p.pngi;

		app.activeDocument.saveAs(File(uniqueFilePath), pngOptions);
	}

	app.activeDocument.activeHistoryState = historyState;
};



/**
 * Saves the currently active Photoshop document as PSD file.
 * @param {string} filePath - File path of active Photoshop document.
 * @param {string} destFolder - Destination folder to save image to.
 */
ImageProcessor.prototype.SaveFileAsPsd = function (filePath, destFolder)
{
	var historyState = app.activeDocument.activeHistoryState;
	var folderPath = this.CreateDestFolder(filePath, destFolder, "PSD");
	var p = this.params;

	if (p.psdresize)
	{
		this.CropImage(p.psdcfactor);
		this.ResizeImage(p.psdrfactor);
	}

	if (p.runaction) doAction(p.action, p.actionset);

	if (!fileOps.IsFolderWritable(folderPath)) alert(s.CannotWriteToFolder + File(folderPath).fsName);
	else
	{
		var psdSaveOptions = new PhotoshopSaveOptions();
		var uniqueFileName = fileOps.CreateUniqueFileName(folderPath, fileOps.FileNameRootFromPath(filePath), ".psd");

		psdSaveOptions.embedColorProfile = p.icc;

		app.activeDocument.saveAs(File(uniqueFileName), psdSaveOptions);
	}

	app.activeDocument.activeHistoryState = historyState;
};



/**
 * Saves the currently active Photoshop document as TIFF file.
 * @param {string} filePath - File path of active Photoshop document.
 * @param {string} destFolder - Destination folder to save image to.
 */
ImageProcessor.prototype.SaveFileAsTiff = function (filePath, destFolder)
{
	var historyState = app.activeDocument.activeHistoryState;
	var folderPath = this.CreateDestFolder(filePath, destFolder, "TIFF");
	var p = this.params;

	if (p.tiffresize)
	{
		this.CropImage(p.tiffcfactor);
		this.ResizeImage(p.tiffrfactor);
	}

	if (p.runaction) doAction(p.action, p.actionset);

	if (!fileOps.IsFolderWritable(folderPath)) alert(s.CannotWriteToFolder + File(folderPath).fsName);
	else
	{
		var tiffSaveOptions = new TiffSaveOptions();
		var uniqueFileName = fileOps.CreateUniqueFileName(folderPath, fileOps.FileNameRootFromPath(filePath), ".tif");

		tiffSaveOptions.embedColorProfile = p.icc;
		tiffSaveOptions.imageCompression = p.tifflzw ? TIFFEncoding.TIFFLZW : TIFFEncoding.NONE;

		app.activeDocument.saveAs(File(uniqueFileName), tiffSaveOptions);
	}

	app.activeDocument.activeHistoryState = historyState;
};



/**
 * Computes and creates the folder to store image.
 * @param {string} srcFilePath - File path to existing image file.
 * @param {string} destFolder - Destination folder.
 * @param {string} subFolder -	Sub folder to use if image file is not
 *															supposed to be saved at the original location.
 * @returns {string} Destination folder path.
 */
ImageProcessor.prototype.CreateDestFolder = function (srcFilePath, destFolder, subFolder)
{
	var p = this.params;

	if (!this.runningFromBridge && p.keepstructure && !p.saveinsame)
		srcFilePath = srcFilePath.substring(0, srcFilePath.lastIndexOf("/")).replace(p.source, destFolder);
	else
		srcFilePath = fileOps.ConcatPath(destFolder, subFolder);

	Folder(srcFilePath).create();

	return srcFilePath;
};



/**
 * Determines if the provided folder path can be written to.
 * @param {string} folderPath - Folder path to be examined.
 * @param {string} sourceFilePath - Source file path, for error logging.
 */
ImageProcessor.prototype.CanWriteToFolder = function (folderPath, sourceFilePath)
{
	if (!fileOps.IsFolderWritable(folderPath))
	{
		alert(s.CannotWriteToFolder + "\n\n" + File(folderPath).fsName);
		this.fileErrors.push(sourceFilePath);

		return false;
	}

	return true;
};



/**
 * Converts the current Photoshop document to sRGB profile.
 */
ImageProcessor.prototype.ConvertTosRGBProfile = function ()
{
	app.activeDocument.convertProfile("sRGB IEC61966-2.1", Intent.RELATIVECOLORIMETRIC, true, true);
};



/**
 * Removes alpha channels from the currently active Photoshop document.
 */
ImageProcessor.prototype.RemoveAlphaChannels = function ()
{
	var channels = app.activeDocument.channels;

	for (var channelCount = channels.length - 1;channels[channelCount].kind != ChannelType.COMPONENT;channelCount--)
		channels[channelCount].remove();
};



/**
 * Resizes the image to the given scale.
 * @param {number} factor Percentage of original image dimensions.
 */
ImageProcessor.prototype.ResizeImage = function (factor)
{
	if (isNaN(factor) || factor < g.MinResize || factor > g.MaxResize)
	{
		alert(s.Scaling);
		return;
	}

	if (factor !== 100)
	{
		var doc = app.activeDocument;

		doc.resizeImage(doc.width * factor / 100);
	}
};



/**
 * Crops the image to the given scale.
 * @param {number} factor Percentage of original image dimensions.
 */
ImageProcessor.prototype.CropImage = function (factor)
{
	if (isNaN(factor) || factor < g.MinCrop || factor > g.MaxCrop)
	{
		alert(s.Cropping);
		return;
	}

	if (factor !== 100)
	{
		var doc = app.activeDocument;
		var scale = factor / 100;
		var width = doc.width * scale, height = doc.height * scale, x = (doc.width - width) / 2, y = (doc.height - height) / 2;

		doc.crop([x, y, width + x, height + y]);
	}
};



/**
 * Determines if errors have occured during conversion.
 * @returns true, if errors have occured during conversion; false otherwise.
 */
ImageProcessor.prototype.HasErrors = function ()
{
	return this.fileErrors.length;
};



/**
 * Pop the name of the files we had trouble with or display failure message,
 * depending on whether fileErrors is either array or string.
 */
ImageProcessor.prototype.ReportErrors = function ()
{
	var errors = this.fileErrors;

	if (errors instanceof Array && errors.length)
	{
		var message = s.CouldNotProcess;

		for (var i = 0;i < errors.length;i++) message += "\r" + File(errors[i]).fsName;

		alert(message);
	}
	else if (typeof errors === "string" && errors.length) alert(errors);
};
