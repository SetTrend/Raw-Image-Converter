/**
 * Get all currently opened Photoshop documents.
 * @description A warning message is shown to the
 *							user if unsaved changes in documents exist.
 * @returns	{Document[]} Array referencing all open Photoshop.Document objects.
 */
function GetOpenPSApplicationDocs()
{
	var docs = [];
	var nonSavedDocs = [];

	for (var i = 0;i < app.documents.length;i++)
	{
		try
		{
			if (app.documents[i].path) docs.push(app.documents[i]);
		}
		catch (e)
		{
			// this document has not been saved yet and, thus, has no path
			if (e.number && e.number === 8103) nonSavedDocs.push(app.documents[i].name);
			else throw e;
		}
	}

	if (nonSavedDocs.length > 0) alert(s.MustSaveOpen + "\r" + s.Following + "\r( " + nonSavedDocs + " )");

	return docs;
}
