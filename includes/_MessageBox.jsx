/**
 * Creates a simple message box window displaying the
 * provided message.
 * @constructor
 * @param {string} message - Image processing parameters.
 */
function MessageBox(message)
{
	var dlg, g1, g2, b;

	// show success message
	this.dlg = dlg = new Window('dialog', s.Title);

	g1 = dlg.add('group');
	g1.orientation = 'column';		// vertical layout

	g2 = g1.add('group');
	g2.orientation = 'row';		// horizontal layout

	g2.add('image', undefined, 'SourceFolderIcon');
	g2.add('statictext', undefined, message);

	dlg.defaultElement = b = g1.add('button', undefined, s.OK);
	b.preferredSize.width = 100;
}



/**
 * Opens the message box.
 */
MessageBox.prototype.Show = function ()
{
	beep();

	this.dlg.center();
	this.dlg.show();
};