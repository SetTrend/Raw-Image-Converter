#include "../_ActionInfo.jsx";
#include "../_StrToIntWithDefault.jsx";



/**
 * Creates a dialog window for the user to enter processing parameters.
 * @constructor
 * @param {ProcessParameters} params - Image processing parameters.
 * @param {File[]} filesFromBridge - Array of files obtained from Bridge application, or null.
 */
function ParametersDialog(params, filesFromBridge)
{
	this.params = params;		// use this parameter set for the dialog
	this.runningFromBridge = !!(filesFromBridge && filesFromBridge.length && filesFromBridge.length > 0);		// true, if the Bridge app is running this script
	this.actionInfo = new ActionInfo();
	this.marginLeft = 15;	// left indentation

	var t, sg, g1, g2, g3, g4;	// temporarily holds a control for assigning properties
	var borderProperty = { borderStyle: 'topDivider' };		// gray line at the top of a panel
	var rowSpacing = 5;	// row spacing

	// some interesting numbers to help the auto layout, real numbers are in the zstrings
	var sourceAndDestLength = StrToIntWithDefault(s.SourceAndDestLength, 210);
	var actionDropDownLength = StrToIntWithDefault(s.ActionDropDownLength, 165);

	// I use some hidden items as invisible placeholders to help auto layout.
	// Debug option: change this to "true" to see them
	var showHidden = false;


	// ---- dialog window -------------------------

	var d = this.dlgMain = new Window('dialog', s.Title);		// create the main dialog window, this holds all our data

	d.orientation = 'row';	// horizonal layout  (input elements on the left, buttons on the right)
	d.alignChildren = 'fill';


	// ---- input elements column on the left -------------------------

	var l = d.grpLeft = d.add('group');

	l.orientation = 'column';		// vertical layout
	l.alignChildren = 'fill';
	l.spacing = 3;


	// ---- section 1: source image selection -------------------------

	// -- header ------

	sg = l.add('group');
	sg.orientation = 'row';		// horizontal layout
	sg.alignChildren = 'center';

	t = sg.add('image', undefined, 'Step1Icon');
	t.helpTip = s.LabelSource;

	t = sg.add('statictext', undefined, s.LabelSource);
	t.helpTip = s.LabelSource;


	// -- controls ------

	sg = l.grp1Info = l.add('group');
	sg.orientation = 'row';		// horizontal layout
	sg.alignChildren = 'fill';
	sg.margins = [this.marginLeft, 0, 0, 0];


	g1 = sg.add('group');

	t = g1.add('image', undefined, 'SourceFolderIcon');
	t.helpTip = s.LabelSource;


	g1 = sg.grpRight = sg.add('group');
	g1.orientation = 'column';	// vertical layout
	g1.alignChildren = 'left';
	g1.spacing = rowSpacing;

	if (this.runningFromBridge)
	{
		t = g1.add('statictext', undefined, s.Bridge + " (" + filesFromBridge.length + ")");
		t.helpTip = s.BridgeHelp;
	}
	else
	{
		g2 = g1.add('group');
		g2.orientation = 'row';		// horizontal layout

		t = d.rbUseOpen = g2.add('radiobutton', undefined, s.UseOpen);
		t.helpTip = s.UseOpenHelp;

		t = d.cbIncludeSubFolders = g2.add('checkbox', undefined, s.IncludeAllSubfolders);
		t.helpTip = s.IncludeAllSubfoldersHelp;


		g2 = g1.add('group');
		g2.orientation = 'row';		// horizontal layout

		t = d.rbUseFolder = g2.add('radiobutton', undefined, '');
		t.helpTip = s.LabelSource;

		t = d.btnSource = g2.add('button', undefined, s.ButtonBrowse1);
		t.helpTip = s.LabelSource;

		t = d.stSource = g2.add('statictext', undefined, s.NoImagesSelected, { truncate: 'middle' });
		t.helpTip = s.LabelSourceHelp;
		t.preferredSize.width = sourceAndDestLength;
	}

	t = d.cbOpenFirst = g1.add('checkbox', undefined, s.OpenFirst);
	t.helpTip = s.OpenFirstHelp;


	// ---- section 2: destination location selection -------------------------

	l.add('panel', undefined, undefined, borderProperty);


	// -- header ------

	sg = l.add('group');
	sg.orientation = 'row';		// horizontal layout
	sg.alignChildren = 'center';

	t = sg.add('image', undefined, 'Step2Icon');
	t.helpTip = s.LabelDestination;

	t = sg.add('statictext', undefined, s.LabelDestination);
	t.helpTip = s.LabelDestination;


	// -- controls ------

	sg = l.add('group');
	sg.orientation = 'row';		// horizonal layout
	sg.alignChildren = 'fill';
	sg.margins = [this.marginLeft, 0, 0, 0];


	g1 = sg.add('group');

	t = g1.add('image', undefined, 'DestinationFolderIcon');
	t.helpTip = s.LabelDestination;


	g1 = sg.add('group');
	g1.orientation = 'column';	// vertical layout
	g1.alignChildren = 'left';
	g1.spacing = rowSpacing;


	g2 = g1.add('group');
	g2.orientation = 'row';		// horizonal layout
	g2.alignChildren = 'center';

	t = d.rbSaveInSame = g2.add('radiobutton', undefined, s.SaveInSameLocation);
	t.helpTip = s.SaveInSameLocationHelp;

	if (!this.runningFromBridge)
	{
		t = d.cbKeepStructure = g2.add('checkbox', undefined, s.KeepStructure);
		t.helpTip = s.KeepStructure;
	}


	g2 = g1.add('group');
	g2.orientation = 'row';		// horizontal layout
	g2.alignChildren = 'center';

	t = d.rbSaveInNew = g2.add('radiobutton', undefined, '');
	t.helpTip = s.LabelDestination;

	t = d.btnDest = g2.add('button', undefined, s.ButtonBrowse2);
	t.helpTip = s.LabelDestination;

	t = d.stDest = g2.add('statictext', undefined, s.NoFolderSelected, { truncate: 'middle' });
	t.helpTip = s.LabelDestination;
	t.preferredSize.width = sourceAndDestLength;


	// ---- section 3: destination file type selection -------------------------

	d.line2 = l.add('panel', undefined, undefined, borderProperty);


	// -- header ------

	sg = l.add('group');
	sg.orientation = 'row';		// horizontal layout
	sg.alignChildren = 'center';

	t = sg.add('image', undefined, 'Step3Icon');
	t.helpTip = s.FileType;

	t = sg.add('statictext', undefined, s.FileType);
	t.helpTip = s.FileType;


	// -- controls ------

	sg = l.add('group');
	sg.orientation = 'row';		// horizontal layout
	sg.alignChildren = 'fill';
	sg.margins = [this.marginLeft, 0, 0, 0];


	g1 = sg.add('group');

	// unused invisible placeholder to get consistent layout
	t = g1.add('image', undefined, 'DestinationFolderIcon');
	t.helpTip = s.LabelDestination;
	t.visible = showHidden;


	var ts = d.grpFileType = sg.add('group');	// four file type blocks: JPEG, PNG, PDS, TIFF

	ts.orientation = 'column';		// vertical layout
	ts.alignChildren = 'fill';
	ts.spacing = rowSpacing;


	// -- JPEG section ------

	var jp = ts.grpJPEG = ts.add('group');		// we have two JPEG settings columns

	jp.orientation = 'row';	// horizontal layout
	jp.alignChildren = 'fill';


	// -- left --

	g1 = jp.add('group');
	g1.orientation = 'column';	// vertical layout
	g1.alignChildren = 'fill';

	t = d.cbJPEG = g1.add('checkbox', undefined, s.SaveAsJPEG);
	t.helpTip = s.SaveAsJPEGHelp;


	g2 = g1.add('group');
	g2.orientation = 'column';	// vertical layout
	g2.alignChildren = 'left';
	g2.margins = [this.marginLeft, 0, 0, 0];


	g3 = g2.add('group');
	g3.orientation = 'row';		// horizontal layout
	g3.alignChildren = 'center';

	d.stJPEGQuality = g3.add('statictext', undefined, s.Quality);

	t = d.enJPEGQuality = g3.add('editnumber', undefined, undefined, 1, 12);
	t.helpTip = s.JPEGQuality;
	t.justify = "right";
	t.characters = 3;


	g3 = g2.add('group');

	t = d.cbJPEGConvertICC = g3.add('checkbox', undefined, s.ConvertICC);
	t.helpTip = s.ConvertICCHelp;


	// -- middle (spacing) --

	// unused invisible placeholder to get consistent layout
	t = jp.add('edittext');
	t.preferredSize.width = 1;
	t.visible = showHidden;


	// -- right --

	g1 = jp.grpRight = jp.add('group');
	g1.orientation = 'column';	// vertical layout
	g1.alignChildren = 'left';

	t = d.cbResizeJPEG = g1.add('checkbox', undefined, s.ResizeToFit1);
	t.helpTip = s.ResizeToFitHelp;


	g2 = g1.add('group');
	g2.orientation = 'row';		// horizontal layout
	g2.alignChildren = 'center';
	g2.spacing = 1;
	g2.margins = [this.marginLeft, 0, 0, 0];

	t = d.stJPEGFactor = g2.add('statictext', undefined, s.Factor);
	t.helpTip = s.FactorHelp;
	t.justify = 'right';

	t = d.slJPEGFactor = g2.add('slider', undefined, g.MinResize, g.MinResize, g.MaxResize);

	t = d.enJPEGFactor = g2.add('editnumber', undefined, undefined, g.MinResize, g.MaxResize);
	t.helpTip = s.FactorHelp;
	t.justify = "right";
	t.characters = 4;

	d.stJPEGPercent = g2.add('statictext', undefined, s.FactorPercent);


	// -- PNG section ------

	ts.line2 = ts.add('panel', undefined, undefined, borderProperty);
	ts.line2.alignment = 'fill';

	var pn = ts.grpPNG = ts.add('group');		// we have two PNG settings columns

	pn.orientation = 'row';	// horizontal layout
	pn.alignChildren = 'fill';


	// -- left --

	g1 = pn.add('group');
	g1.orientation = 'column';	// vertical layout
	g1.alignChildren = 'fill';

	t = d.cbPNG = g1.add('checkbox', undefined, s.SaveAsPNG);
	t.helpTip = s.SaveAsPNGHelp;


	g2 = g1.add('group');
	g2.orientation = 'column';	// vertical layout
	g2.alignChildren = 'left';
	g2.margins = [this.marginLeft, 0, 0, 0];


	g3 = g2.add('group');
	g3.orientation = 'row';		// horizontal layout
	g3.alignChildren = 'center';

	d.stPNGCompression = g3.add('statictext', undefined, s.Compression);

	t = d.enPNGCompression = g3.add('editnumber', undefined, undefined, 0, 9);
	t.helpTip = s.PNGCompression;
	t.justify = "right";
	t.characters = 3;


	g3 = g2.add('group');

	t = d.cbPNGInterlaced = g3.add('checkbox', undefined, s.Interlaced);
	t.helpTip = s.InterlacedHelp;


	// -- middle (spacing) --

	// unused invisible placeholder to get consistent layout
	t = pn.add('edittext');
	t.preferredSize.width = 1;
	t.visible = showHidden;


	// -- right --

	g1 = pn.grpRight = pn.add('group');
	g1.orientation = 'column';	// vertical layout
	g1.alignChildren = 'left';

	t = d.cbResizePNG = g1.add('checkbox', undefined, s.ResizeToFit2);
	t.helpTip = s.ResizeToFitHelp;


	g2 = g1.add('group');
	g2.orientation = 'row';		// horizontal layout
	g2.alignChildren = 'center';
	g2.spacing = 1;
	g2.margins = [this.marginLeft, 0, 0, 0];

	t = d.stPNGFactor = g2.add('statictext', undefined, s.Factor);
	t.helpTip = s.FactorHelp;
	t.justify = 'right';

	t = d.slPNGFactor = g2.add('slider', undefined, g.MinResize, g.MinResize, g.MaxResize);

	t = d.enPNGFactor = g2.add('editnumber', undefined, undefined, g.MinResize, g.MaxResize);
	t.helpTip = s.FactorHelp;
	t.justify = "right";
	t.characters = 4;

	d.stPNGPercent = g2.add('statictext', undefined, s.FactorPercent);


	// -- PSD section ------

	t = ts.add('panel', undefined, undefined, borderProperty);
	t.alignment = 'fill';

	var ps = ts.grpPSD = ts.add('group');		// we have two PDS settings columns

	ps.orientation = 'row';	// horizontal layout
	ps.alignChildren = 'fill';


	// -- left --

	g1 = ps.add('group');
	g1.orientation = 'column';	// vertical layout
	g1.alignChildren = 'fill';

	t = d.cbPSD = g1.add('checkbox', undefined, s.SaveAsPSD);
	t.helpTip = s.SaveAsPSDHelp;


	g2 = g1.add('group');
	g2.orientation = 'column';	// vertical layout
	g2.alignChildren = 'left';
	g2.margins = [this.marginLeft, 0, 0, 0];


	g3 = g2.add('group');
	g3.orientation = 'row';		// horizontal layout
	g3.alignChildren = 'center';

	d.cbPSDMaxCompat = g3.add('checkbox', undefined, s.MaxCompat);
	d.cbPSDMaxCompat.helpTip = s.MaxCompatHelp;


	// -- middle (spacing) --

	// unused invisible placeholder to get consistent layout
	t = ps.add('edittext');
	t.preferredSize.width = 1;
	t.visible = showHidden;


	// -- right --

	g1 = ps.grpRight = ps.add('group');
	g1.orientation = 'column';	// vertical layout
	g1.alignChildren = 'left';

	t = d.cbResizePSD = g1.add('checkbox', undefined, s.ResizeToFit3);
	t.helpTip = s.ResizeToFitHelp;


	g2 = g1.add('group');
	g2.orientation = 'row';		// horizontal layout
	g2.alignChildren = 'center';
	g2.spacing = 1;
	g2.margins = [this.marginLeft, 0, 0, 0];

	t = d.stPSDFactor = g2.add('statictext', undefined, s.Factor);
	t.helpTip = s.FactorHelp;
	t.justify = 'right';

	t = d.slPSDFactor = g2.add('slider', undefined, g.MinResize, g.MinResize, g.MaxResize);

	t = d.enPSDFactor = g2.add('editnumber', undefined, undefined, g.MinResize, g.MaxResize);
	t.helpTip = s.FactorHelp;
	t.justify = "right";
	t.characters = 4;

	d.stPSDPercent = g2.add('statictext', undefined, s.FactorPercent);


	// -- TIFF section ------

	ts.line2 = ts.add('panel', undefined, undefined, borderProperty);
	ts.line2.alignment = 'fill';

	var ti = ts.grpTIFF = ts.add('group');	// we have two TIFF settings columns

	ti.orientation = 'row';
	ti.alignChildren = 'fill';


	// -- left --

	g1 = ti.add('group');
	g1.orientation = 'column';	// vertical layout
	g1.alignChildren = 'fill';

	t = d.cbTIFF = g1.add('checkbox', undefined, s.SaveAsTIFF);
	t.helpTip = s.SaveAsTIFFHelp;


	g2 = g1.add('group');
	g2.orientation = 'column';	// vertical layout
	g2.alignChildren = 'left';
	g2.margins = [this.marginLeft, 0, 0, 0];


	g3 = g2.add('group');
	g3.orientation = 'row';	// horizontal layout
	g3.alignChildren = 'center';

	t = d.cbTIFFLZW = g3.add('checkbox', undefined, s.LZW);
	t.helpTip = s.LZWHelp;


	// -- middle (spacing) --

	// unused invisible placeholder to get consistent layout
	t = ti.add('edittext');
	t.preferredSize.width = 1;
	t.visible = showHidden;


	// -- right --

	g1 = ti.grpRight = ti.add('group');
	g1.orientation = 'column';	// vertical layout
	g1.alignChildren = 'left';

	t = d.cbResizeTIFF = g1.add('checkbox', undefined, s.ResizeToFit3);
	t.helpTip = s.ResizeToFitHelp;


	g2 = g1.add('group');
	g2.orientation = 'row';		// horizontal layout
	g2.alignChildren = 'center';
	g2.spacing = 1;
	g2.margins = [this.marginLeft, 0, 0, 0];

	t = d.stTIFFFactor = g2.add('statictext', undefined, s.Factor);
	t.helpTip = s.FactorHelp;
	t.justify = 'right';

	t = d.slTIFFFactor = g2.add('slider', undefined, g.MinResize, g.MinResize, g.MaxResize);

	t = d.enTIFFFactor = g2.add('editnumber', undefined, undefined, g.MinResize, g.MaxResize);
	t.helpTip = s.FactorHelp;
	t.justify = "right";
	t.characters = 4;

	d.stTIFFPercent = g2.add('statictext', undefined, s.FactorPercent);


	// ---- section 4: run preset actions and copyright -------------------------

	d.line3 = l.add('panel', undefined, undefined, borderProperty);


	// -- header ------

	sg = l.add('group');
	sg.orientation = 'row';		// horizontal layout
	sg.alignChildren = 'top';

	t = sg.add('image', undefined, 'Step4Icon');
	t.helpTip = s.Preferences;


	// -- controls ------

	g1 = sg.add('group');
	g1.orientation = 'column';	// vertical layout
	g1.alignChildren = 'left';

	t = g1.add('statictext', undefined, s.Preferences);
	t.helpTip = s.Preferences;


	g2 = g1.add('group');
	g2.orientation = 'row';		// horizontal layout
	g2.alignChildren = 'top';


	g3 = g2.add('group');
	g3.orientation = 'column';	// vertical layout
	g3.alignChildren = 'left';
	g3.spacing = 5;


	g4 = l.grpAction = g3.add('group');
	g4.orientation = 'row';	// horizontal layout
	g4.alignChildren = 'center';

	t = d.cbAction = g4.add('checkbox');
	t.text = s.RunAction;
	t.helpTip = s.ActionHelp;

	// unused invisible placeholder to get consistent layout
	t = g4.add('dropdownlist');
	t.preferredSize.width = 1;
	t.visible = showHidden;


	g4 = g3.add('group');
	g4.orientation = 'row';	// horizontal layout
	g4.alignChildren = 'center';

	t = g4.add('statictext', undefined, s.Author);
	t.helpTip = s.AuthorHelp;

	// unused invisible placeholder to get consistent layout
	t = g4.add('edittext');
	t.preferredSize.width = 1;
	t.visible = showHidden;


	g4 = g3.add('group');
	g4.orientation = 'row';	// horizontal layout
	g4.alignChildren = 'center';

	t = g4.add('statictext', undefined, s.Copyright);
	t.helpTip = s.CopyrightHelp;

	// unused invisible placeholder to get consistent layout
	t = g4.add('edittext');
	t.preferredSize.width = 1;
	t.visible = showHidden;


	g3 = g2.add('group');
	g3.orientation = 'column';		// vertical layout
	g3.alignChildren = 'left';
	g3.spacing = 5;


	g4 = g3.add('group');
	g4.orientation = 'row';		// horizontal layout
	g4.alignChildren = 'center';

	t = d.ddSet = g4.add('dropdownlist');
	t.helpTip = s.ActionHelp;
	t.preferredSize.width = actionDropDownLength - 25;

	t = d.ddAction = g4.add('dropdownlist');
	t.helpTip = s.ActionHelp;
	t.preferredSize.width = actionDropDownLength + 25;


	t = d.etAuthor = g3.add('edittext');
	t.helpTip = s.CopyrightHelp;
	t.alignment = 'fill';
	t.preferredSize.width = actionDropDownLength * 2;

	t = d.etCopyrightInfo = g3.add('edittext');
	t.helpTip = s.CopyrightHelp;
	t.alignment = 'fill';
	t.preferredSize.width = actionDropDownLength * 2;


	t = d.cbIncludeICC = g1.add('checkbox', undefined, s.ICC);
	t.helpTip = s.ICCHelp;


	// ---- buttons column on the right -------------------------

	var r = d.add('group');

	r.orientation = 'column';
	r.alignChildren = 'fill';
	r.alignment = 'fill';

	d.defaultElement = d.btnRun = r.add('button', undefined, s.ButtonRun);
	d.cancelElement = d.btnCancel = r.add('button', undefined, s.ButtonCancel);

	r.add('statictext', undefined, '');		// separator

	t = d.btnLoad = r.add('button', undefined, s.ButtonLoad);
	t.helpTip = s.ButtonLoadHelp;

	t = d.btnSave = r.add('button', undefined, s.ButtonSave);
	t.helpTip = s.ButtonSaveHelp;


	// ---- attach event handlers -------------------------

	this.SetEventHandlers();


	// ---- fill Actions drop-downs -------------------------

	this.SetActionList();


	// ---- Pre-fill controls -------------------------

	this.SetControlsFromParams();
}



/**
 * Sets control event handlers.
 */
ParametersDialog.prototype.SetEventHandlers = function ()
{
	var me = this;
	var dlg = this.dlgMain;


	// Only containers may have margins or spacing.
	// So any additional layout not involving adding
	// additional groups solely for the purpose of
	// adding layout must be done here.
	dlg.onShow = function ()
	{
		// indent "open first image" checkbox (and make sure container still fits)
		dlg.cbOpenFirst.location.x += me.marginLeft;
		dlg.cbOpenFirst.parent.layout.layout();


		// align the resize factor groups
		var ts = dlg.grpFileType;
		var farRight = ts.grpJPEG.grpRight.location.x;

		if (ts.grpPNG.grpRight.location.x > farRight) farRight = ts.grpPNG.grpRight.location.x;
		if (ts.grpPSD.grpRight.location.x > farRight) farRight = ts.grpPSD.grpRight.location.x;
		if (ts.grpTIFF.grpRight.location.x > farRight) farRight = ts.grpTIFF.grpRight.location.x;

		ts.grpJPEG.grpRight.location.x = farRight;
		ts.grpPNG.grpRight.location.x = farRight;
		ts.grpPSD.grpRight.location.x = farRight;
		ts.grpTIFF.grpRight.location.x = farRight;

		ts.layout();	// make sure container still fits
	};


	if (!me.runningFromBridge)
	{
		dlg.rbUseOpen.onClick = function ()
		{
			var toggle = !this.value;

			dlg.rbUseFolder.value = toggle;
			dlg.cbOpenFirst.enabled = toggle;
			dlg.btnSource.enabled = toggle;
			dlg.stSource.enabled = toggle;
			dlg.cbIncludeSubFolders.enabled = toggle;
		};


		dlg.rbUseFolder.onClick = function ()
		{
			var value = this.value;

			dlg.rbUseOpen.value = !value;
			dlg.cbOpenFirst.enabled = value;
			dlg.btnSource.enabled = value;
			dlg.stSource.enabled = value;
			dlg.cbIncludeSubFolders.enabled = value;
		};


		dlg.btnSource.onClick = function ()
		{
			var selFolder = Folder.selectDialog(s.PickSource, me.sourceLongText);

			if (selFolder) dlg.stSource.text = me.sourceLongText = selFolder.fsName;

			dlg.defaultElement.active = true;
		};
	}


	dlg.rbSaveInSame.onClick = function ()
	{
		var toggle = !this.value;

		dlg.rbSaveInNew.value = toggle;
		dlg.btnDest.enabled = toggle;
		dlg.stDest.enabled = toggle;
		if (!me.runningFromBridge) dlg.cbKeepStructure.enabled = toggle;
	};


	dlg.rbSaveInNew.onClick = function ()
	{
		var value = this.value;

		dlg.rbSaveInSame.value = !value;
		dlg.btnDest.enabled = value;
		dlg.stDest.enabled = value;
		if (!me.runningFromBridge) dlg.cbKeepStructure.enabled = value;
	};


	dlg.btnLoad.onClick = function ()
	{
		var loadFile = null;

		Folder.current = Folder("~/");

		loadFile = File.fs === "Windows" ? File.openDialog(s.PickXML, s.PickXMLWin) : File.openDialog(s.PickXML, me.MacXMLFilter);

		if (loadFile)
		{
			me.params.LoadFromXml(loadFile);
			me.SetControlsFromParams();
		}

		dlg.defaultElement.active = true;
	};


	dlg.btnSave.onClick = function ()
	{
		var saveFile = null;

		Folder.current = Folder("~/");

		saveFile = File.fs === "Windows" ? File.saveDialog(s.PickXMLSave, s.PickXMLWin) : File.saveDialog(s.PickXMLSave, me.MacXMLFilter);

		if (saveFile)
		{
			if (saveFile.exists && confirm(s.FileAlreadyExists) === false) return;

			me.GetParamsFromDialog();
			me.params.SaveToXml(saveFile);
		}

		dlg.defaultElement.active = true;
	};


	dlg.btnDest.onClick = function ()
	{
		var selFolder = Folder.selectDialog(s.PickDest, me.destLongText);

		if (selFolder) dlg.stDest.text = me.destLongText = selFolder.fsName;

		dlg.defaultElement.active = true;
	};


	dlg.cbJPEG.onClick = function ()
	{
		var value = this.value;

		dlg.stJPEGQuality.enabled = value;
		dlg.enJPEGQuality.enabled = value;
		dlg.cbJPEGConvertICC.enabled = value;
		dlg.cbResizeJPEG.enabled = value;

		dlg.cbResizeJPEG.onClick();

		me.EnableDisableOkButton();
	};


	dlg.cbPNG.onClick = function ()
	{
		var value = this.value;

		dlg.stPNGCompression.enabled = value;
		dlg.enPNGCompression.enabled = value;
		dlg.cbPNGInterlaced.enabled = value;
		dlg.cbResizePNG.enabled = value;

		dlg.cbResizePNG.onClick();

		me.EnableDisableOkButton();
	};


	dlg.cbPSD.onClick = function ()
	{
		var value = this.value;

		dlg.cbPSDMaxCompat.enabled = value;
		dlg.cbResizePSD.enabled = value;

		dlg.cbResizePSD.onClick();

		me.EnableDisableOkButton();
	};


	dlg.cbTIFF.onClick = function ()
	{
		var value = this.value;

		dlg.cbTIFFLZW.enabled = value;
		dlg.cbResizeTIFF.enabled = value;

		dlg.cbResizeTIFF.onClick();

		me.EnableDisableOkButton();
	};


	dlg.cbResizeJPEG.onClick = function ()
	{
		var value = this.value && dlg.cbJPEG.value;

		dlg.stJPEGFactor.enabled = value;
		dlg.enJPEGFactor.enabled = value;
		dlg.stJPEGPercent.enabled = value;
	};


	dlg.cbResizePNG.onClick = function ()
	{
		var value = this.value && dlg.cbPNG.value;

		dlg.stPNGFactor.enabled = value;
		dlg.enPNGFactor.enabled = value;
		dlg.stPNGPercent.enabled = value;
	};


	dlg.cbResizePSD.onClick = function ()
	{
		var value = this.value && dlg.cbPSD.value;

		dlg.stPSDFactor.enabled = value;
		dlg.enPSDFactor.enabled = value;
		dlg.stPSDPercent.enabled = value;
	};


	dlg.cbResizeTIFF.onClick = function ()
	{
		var value = this.value && dlg.cbTIFF.value;

		dlg.stTIFFFactor.enabled = value;
		dlg.enTIFFFactor.enabled = value;
		dlg.stTIFFPercent.enabled = value;
	};


	dlg.slJPEGFactor.onChanging = function ()
	{
		dlg.slJPEGFactor.helpTip = dlg.enJPEGFactor.value = this.value;
	};


	dlg.slPNGFactor.onChanging = function ()
	{
		dlg.slPNGFactor.helpTip = dlg.enPNGFactor.value = this.value;
	};


	dlg.slPSDFactor.onChanging = function ()
	{
		dlg.slPSDFactor.helpTip = dlg.enPSDFactor.value = this.value;
	};


	dlg.slTIFFFactor.onChanging = function ()
	{
		dlg.slTIFFFactor.helpTip = dlg.enTIFFFactor.value = this.value;
	};


	dlg.enJPEGFactor.onChange = function ()
	{
		dlg.slJPEGFactor.value = dlg.slJPEGFactor.helpTip = this.value;
	};


	dlg.enPNGFactor.onChange = function ()
	{
		dlg.slPNGFactor.value = dlg.slPNGFactor.helpTip = this.value;
	};


	dlg.enPSDFactor.onChange = function ()
	{
		dlg.slPSDFactor.value = dlg.slPSDFactor.helpTip = this.value;
	};


	dlg.enTIFFFactor.onChange = function ()
	{
		dlg.slTIFFFactor.value = dlg.slTIFFFactor.helpTip = this.value;
	};


	dlg.cbAction.onClick = function ()
	{
		var value = this.value;

		dlg.ddSet.enabled = value;
		dlg.ddAction.enabled = value;
	};


	dlg.ddAction.onChange = function ()
	{
		this.helpTip = this.selection.text;
	};


	dlg.btnRun.onClick = function ()
	{
		var testFolder = null;


		// ---- validate dialog parameters -------------------------

		if (!me.runningFromBridge)
		{
			if (dlg.rbUseFolder.value)
			{
				if (me.sourceLongText.length > 0 && me.sourceLongText[0] != '.')
				{
					testFolder = new Folder(me.sourceLongText);

					if (!testFolder.exists)
					{
						alert(s.SpecifySource);
						return;
					}
				}
				else
				{
					alert(s.SpecifySource);
					return;
				}
			}
		}

		if (dlg.rbSaveInNew.value)
		{
			if (me.destLongText.length > 0 && me.destLongText[0] != '.')
			{
				testFolder = new Folder(me.destLongText);

				if (!testFolder.exists)
				{
					alert(s.SpecifyDest);
					return;
				}
			}
			else
			{
				alert(s.SpecifyDest);
				return;
			}
		}

		if (dlg.cbJPEG.value)
		{
			var compr = dlg.enJPEGQuality.value;

			if (compr < 0 || compr > 12 || isNaN(compr) || dlg.enJPEGQuality.text.length === 0)
			{
				alert(s.JPEGQuality);
				return;
			}

			if (dlg.cbResizeJPEG.value)
			{
				var s = dlg.enJPEGFactor.value;

				if (isNaN(s) || s < g.MinResize || s > g.MaxResize)
				{
					alert(s.JPEGScaling);
					return;
				}
			}
		}

		if (dlg.cbPNG.value)
		{
			var compr = dlg.enPNGCompression.value;

			if (compr < 0 || compr > 9 || isNaN(compr) || dlg.enPNGCompression.text.length === 0)
			{
				alert(s.PNGCompression);
				return;
			}

			if (dlg.cbResizePNG.value)
			{
				var s = dlg.enPNGFactor.value;

				if (isNaN(s) || s < g.MinResize || s > g.MaxResize)
				{
					alert(s.PNGScaling);
					return;
				}
			}
		}

		if (dlg.cbPSD.value && dlg.cbResizePSD.value)
		{
			var s = dlg.enPSDFactor.value;

			if (isNaN(s) || s < g.MinResize || s > g.MaxResize)
			{
				alert(s.PSDScaling);
				return;
			}
		}

		if (dlg.cbTIFF.value && dlg.cbResizeTIFF.value)
		{
			var s = dlg.enTIFFFactor.value;

			if (isNaN(s) || s < g.MinResize || s > g.MaxResize)
			{
				alert(s.TIFFScaling);
				return;
			}
		}

		// make sure they have at least one file format specified for output
		if (!(dlg.cbJPEG.value || dlg.cbPNG.value || dlg.cbPSD.value || dlg.cbTIFF.value))
		{
			alert(s.OneType);
			return;
		}


		// ---- copy dialog values to processing parameters and return success -------------------------

		me.GetParamsFromDialog();

		dlg.close(g.RunButtonID);
	};


	dlg.btnCancel.onClick = function ()
	{
		dlg.close(g.CancelButtonID);
	};
};



/**
 * Fills action list drop downs.
 */
ParametersDialog.prototype.SetActionList = function ()
{
	var me = this;
	var dlg = this.dlgMain;
	var actions = this.actionInfo.actionSets;

	if (actions.length > 0)
	{
		for (var i = 0;i < actions.length;i++) dlg.ddSet.add("item", actions[i].name);

		dlg.ddSet.items[0].selected = true;

		dlg.ddSet.onChange = function (forcedSelectionIndex)
		{
			var index = 0;

			dlg.ddAction.removeAll();

			if (isNaN(forcedSelectionIndex))
			{
				forcedSelectionIndex = this.selection.index;

				if (typeof me.actionIndex !== "undefined")
				{
					index = me.actionIndex;
					delete me.actionIndex;
				}
			}

			var children = actions[forcedSelectionIndex].children;

			for (var i = 0;i < children.length;i++) dlg.ddAction.add("item", children[i].name);

			if (dlg.ddAction.items.length > 0) dlg.ddAction.items[index].selected = true;
			if (this.selection) this.helpTip = this.selection.text;
		};
	}
	else dlg.grpLeft.grpAction.enabled = false;
};



/**
 * Sets dialog control values from processing parameters.
 */
ParametersDialog.prototype.SetControlsFromParams = function ()
{
	var dlg = this.dlgMain;
	var prm = this.params;

	this.sourceLongText = prm.source;
	this.destLongText = prm.dest;

	if (this.sourceLongText) this.sourceLongText = new File(this.sourceLongText).fsName;
	if (this.destLongText) this.destLongText = new File(this.destLongText).fsName;

	if (!this.runningFromBridge)
	{
		if (app.documents.length > 0) dlg.rbUseOpen.value = prm.useopen;
		else
		{
			dlg.rbUseOpen.enabled = false;
			dlg.rbUseOpen.value = false;
		}

		dlg.cbIncludeSubFolders.value = prm.includesub;
		dlg.cbKeepStructure.value = prm.keepstructure;
		dlg.rbUseFolder.value = !dlg.rbUseOpen.value;
		dlg.stSource.text = this.sourceLongText || s.NoImagesSelected;
	}

	dlg.rbSaveInSame.value = prm.saveinsame;
	dlg.rbSaveInNew.value = !dlg.rbSaveInSame.value;
	dlg.cbOpenFirst.value = prm.open;
	dlg.stDest.text = prm.dest || s.NoFolderSelected;
	dlg.cbJPEG.value = prm.jpeg;
	dlg.cbPNG.value = prm.png;
	dlg.cbPSD.value = prm.psd;
	dlg.cbTIFF.value = prm.tiff;
	dlg.enJPEGQuality.value = prm.jpegq;
	dlg.cbJPEGConvertICC.value = prm.jpegconverticc;
	dlg.enPNGCompression.value = prm.pngcomp;
	dlg.cbPNGInterlaced.value = prm.pngi;
	dlg.cbPSDMaxCompat.value = prm.psdmaxcompat;
	dlg.cbTIFFLZW.value = prm.tifflzw;
	dlg.cbResizeJPEG.value = prm.jpegresize;
	dlg.slJPEGFactor.value = dlg.enJPEGFactor.value = prm.jpegfactor;
	dlg.cbResizePNG.value = prm.pngresize;
	dlg.slPNGFactor.value = dlg.enPNGFactor.value = prm.pngfactor;
	dlg.cbResizePSD.value = prm.psdresize;
	dlg.slPSDFactor.value = dlg.enPSDFactor.value = prm.psdfactor;
	dlg.cbResizeTIFF.value = prm.tiffresize;
	dlg.slTIFFFactor.value = dlg.enTIFFFactor.value = prm.tifffactor;
	dlg.cbAction.value = prm.runaction;
	dlg.etAuthor.text = prm.author;
	dlg.etCopyrightInfo.text = prm.info;
	dlg.cbIncludeICC.value = prm.icc;

	this.EnableDisableControls();
};



/**
 * Touches every input control event handler.
 * This will cause all input controls to be either
 * enabled or disabled according to their values.
 */
ParametersDialog.prototype.EnableDisableControls = function ()
{
	var dlg = this.dlgMain;

	if (!this.runningFromBridge) dlg.rbUseOpen.onClick();

	dlg.rbSaveInSame.onClick();
	dlg.cbJPEG.onClick();
	dlg.cbPNG.onClick();
	dlg.cbPSD.onClick();
	dlg.cbTIFF.onClick();

	// initialize slider help tips
	dlg.enJPEGFactor.onChange();
	dlg.enPNGFactor.onChange();
	dlg.enPSDFactor.onChange();
	dlg.enTIFFFactor.onChange();

	var index = this.SelectDropDownItem(dlg.ddSet, this.params.actionset);

	if (this.actionInfo.actionSets.length > 0)
	{
		dlg.ddSet.onChange(index);
		this.actionIndex = this.SelectDropDownItem(dlg.ddAction, this.params.action);
	}

	dlg.cbAction.onClick();
};



/**
 * Enables or disable the OK button according to form validation.
 */
ParametersDialog.prototype.EnableDisableOkButton = function ()
{
	var dlg = this.dlgMain;

	dlg.defaultElement.enabled = dlg.cbJPEG.value || dlg.cbPNG.value || dlg.cbPSD.value || dlg.cbTIFF.value;
};



/**
 * Gets all input control values from dialog window
 * and stores them into processing parameters object.
 */
ParametersDialog.prototype.GetParamsFromDialog = function ()
{
	var p = this.params;
	var d = this.dlgMain;

	if (!this.runningFromBridge)
	{
		p.useopen = d.rbUseOpen.value;
		p.source = this.sourceLongText;
		p.includesub = d.cbIncludeSubFolders.value;
		p.keepstructure = d.cbKeepStructure.value;
	}

	p.saveinsame = d.rbSaveInSame.value;
	p.dest = this.destLongText;
	p.open = d.cbOpenFirst.value;
	p.jpeg = d.cbJPEG.value;
	p.png = d.cbPNG.value;
	p.psd = d.cbPSD.value;
	p.tiff = d.cbTIFF.value;
	p.jpegresize = d.cbResizeJPEG.value;
	p.jpegfactor = d.enJPEGFactor.value;
	p.pngresize = d.cbResizePNG.value;
	p.pngfactor = d.enPNGFactor.value;
	p.psdresize = d.cbResizePSD.value;
	p.psdfactor = d.enPSDFactor.value;
	p.tiffresize = d.cbResizeTIFF.value;
	p.tifffactor = d.enTIFFFactor.value;
	p.jpegq = d.enJPEGQuality.value;
	p.jpegconverticc = d.cbJPEGConvertICC.value;
	p.pngcomp = d.enPNGCompression.value;
	p.pngi = d.cbPNGInterlaced.value;
	p.psdmaxcompat = d.cbPSDMaxCompat.value;
	p.tifflzw = d.cbTIFFLZW.value;
	p.runaction = d.cbAction.value;
	p.actionset = d.ddSet.selection.text;
	p.action = d.ddAction.selection.text;
	p.author = d.etAuthor.text;
	p.info = d.etCopyrightInfo.text;
	p.icc = d.cbIncludeICC.value;
};



/**
 * Runs the dialog and returns the result.
 */
ParametersDialog.prototype.RunDialog = function ()
{
	var dlg = this.dlgMain;

	app.bringToFront();		// in case we double clicked the file

	dlg.center();

	return dlg.show();
};



/**
 * Searches and selects an item in the provided
 * drop-down box matching the provided text.
 * @param {any} dDown - Dropdown control.
 * @param {any} setName - List item text to search for.
 */
ParametersDialog.prototype.SelectDropDownItem = function (dDown, setName)
{
	var index = 0;

	for (var i = 0;i < dDown.items.length;i++)
	{
		if (dDown.items[i].text === setName)
		{
			index = i;
			break;
		}
	}

	if (dDown.items.length > index) dDown.items[index].selected = true;

	return index;
};



/**
 * Callback function for determining if a file or folder is to
 * be displayed in the Apple OS file browser dialog.
 * @param {any} file or folder
 * @returns true, if file or folder is to be displayed; false otherwise.
 */
ParametersDialog.prototype.MacXMLFilter = function (f)
{
	var xmlExtension = ".xml";

	return f.name.toLowerCase().indexOf(xmlExtension) == f.name.length - xmlExtension.length || f.type == 'TEXT' || f instanceof Folder;
};
