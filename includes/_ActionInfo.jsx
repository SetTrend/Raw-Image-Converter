/**
 * Enumeration of all Photoshop action sets available
 * to the current application.
 * @constructor
*/
function ActionInfo()
{
	this.actionSets = this.GetActionSets();
}




/**
 * Initializes a new ActionData object.
 * @constructor
 */
ActionInfo.ActionData = function ()
{
	this.name = "";
	this.children = [];
};



/**
 * Outputs the ActionData object in a user-friendly format.
 */
ActionInfo.ActionData.prototype.toString = function ()
{
	var retVal = this.name;

	for (var i = 0;i < this.children.length;i++) retVal += " " + this.children[i];

	return retVal;
};



/**
 * Used when walking through all the actions in the action set.
 * @param {number} setIndex - action set index
 * @param {number} numChildren - number of actions in this action set
 * @returns {ActionData[]} Array of ActionData
 */
ActionInfo.prototype.GetAction = function (setIndex, numChildren)
{
	var actions = [];

	for (var i = 1;i <= numChildren;i++)
	{
		var ref = new ActionReference();
		var actionData = new ActionInfo.ActionData();
		var desc;

		ref.putIndex(g.ClassAction, i);
		ref.putIndex(g.ClassActionSet, setIndex);
		desc = executeActionGet(ref);

		if (desc.hasKey(g.KeyName)) actionData.name = desc.getString(g.KeyName);

		actions.push(actionData);
	}

	return actions;
};



/**
 * Walks all the items in the action palette and records the action set names
 * and all the action children.
 * @description Note: This will throw an error during a normal execution.
 * There is a bug in Photoshop that makes it impossible to get an acurate
 * count of the number of action sets.
 * @returns {ActionData[]} array of all the ActionData
 */
ActionInfo.prototype.GetActionSets = function ()
{
	var actionSets = [];
	var setCounter = 1;
	var goOn = true;

	while (goOn)
	{
		var ref = new ActionReference();
		var actionData = new ActionInfo.ActionData();
		var numberChildren = 0;
		var desc = null;

		ref.putIndex(g.ClassActionSet, setCounter);

		try
		{
			desc = executeActionGet(ref);

			if (desc.hasKey(g.KeyName)) actionData.name = desc.getString(g.KeyName);

			if (desc.hasKey(g.KeyNumberOfChildren)) numberChildren = desc.getInteger(g.KeyNumberOfChildren);

			if (numberChildren)
			{
				actionData.children = this.GetAction(setCounter, numberChildren);
				actionSets.push(actionData);
			}

			setCounter++;
		}
		catch (e)
		{
			goOn = false;
		}
	}

	return actionSets;
};
