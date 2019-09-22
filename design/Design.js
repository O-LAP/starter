

//-----------------------------------------------------------------------------


/**
 * Object to contain information and code for the design.
 */
var Design = {};

/**
 * Meta information about the design
 */
Design.info = {
	"name": "Boxy",
	"designer": "Roxy",
	"version": "1.0.0",
	"license": "MIT",
	"short_desc": "Template design file demoing project setup.",
	"long_desc": "",
	"url": null,
	"message": "Control the parameters of the cube using these controls.",
	"tags": [ "", "" ]
}


//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------


var COL_RED = "Red";
var COL_GREEN = "Green";
var COL_BLUE = "Blue";
var FIN_MATT = "Matte";
var FIN_GLOSS = "Glossy";


/**
 * Specify configuration about the customisble parameters for the design.
 * A UI element is generated for the param and its values are updated by
 *  the framework and made accessible in the code.
 * Different param types and thier configuration definitions are
 * 	-"slider"	Input values to be contained in a range. Presented as a slider
 				from min to max.
 *	-"bool"		Input for yes/no values. Presented as a checkbox.
 * 	-"select"	Input for selecting values from a list. Presented as a
 				drop-down list.
 *	-"text"		Input for text values. Presented as a text input field.
 *
 * IMPORTANT
 * Register the param with its code-label in the 'params' array.
 * Specify its configuration as an object with the same code-label as key and
 * configuration object as value.
 */
Design.inputs = {

	"params": ["width", "height", "doubleWidth", "colour", "finish"],

	"width": { 
		"type": "slider",
		"label": "Width",
		"tip": "Control the width",
		"default": 150,
		"min": 100,
		"max": 200
	},
	"height": { 
		"type": "slider",
		"label": "Height",
		"default": 150,
		"min": 100,
		"max": 200
	},
	"doubleWidth": {
		"type": "bool",
		"tip": "Doubles the width",
		"label": "Double Width",
		"default": false
	},
	"colour": {
		"type": "select",
		"label": "Colour",
		"default": COL_RED,
		"choices": [COL_RED, COL_GREEN, COL_BLUE]
	},
	"finish": {
		"type": "select",
		"label": "Finish",
		"tip": "Control the finish of the material",
		"default": FIN_MATT,
		"choices": [FIN_MATT, FIN_GLOSS]
	}
}


//-----------------------------------------------------------------------------


/**
 * Object to contain the parameter values.
 * Values are updated in this object as changes are made in the UI.
 * Use this to read the current values for the specified parameters
 * and update your design.
 * Values are represented as key-value pairs with code-label as
 * specified in "Design.inputs" as key and their updated values as values.
 */
Design.inputState = {}

/**
 * Called on design initialization; called before UI is updated to show params.
 * Use for initializing values.
 */
Design.init = async function() {
}

/**
 * Called to request updates to the design.
 * @param {THREE.Object3D} group 	Object passed for adding elements.
 * 									This object is removed from the scene before
 *									this function is called and added again
 *									at the end. Called after parameters are 
 *									updated
 * @sliceManager {SliceManager}		Object to convey slicing information.
 * 									Use 'sliceManager.addSliceSet(sliceParams)' to pass slice information where
 * 									sliceParams is an object with following properties.
 *									{ uDir: true, start: -40, end: 40, cuts: 4 }
 * 									- uDir = direction of slice 'true' is along X-axis, 'false' along Y-axis
 * 									- start = start position
 * 									- end = end position
 * 									- cuts = number of cuts
 * 									Slices are parallel to the axes in their respective directions.
 */
Design.updateGeom = async function(group, sliceManager) {
	var geometry = new THREE.BoxGeometry( 200, Design.inputState.height, Design.inputState.width * ((Design.inputState.doubleWidth) ? 2 : 1) );
	var material = getMaterial(Design.inputState.colour, Design.inputState.finish);
	var cube = new THREE.Mesh( geometry, material );

	sliceManager.addSliceSet({uDir: true, start: -80, end: 80, cuts: 3});
	sliceManager.addSliceSet({uDir: false, start: -90, end: 90, cuts: 4});

	group.add( cube );
}


//-----------------------------------------------------------------------------


function getMaterial(color, finish) {
	var col; 
	switch(color) {
		case COL_RED: {
			col = 0xf44336;
			break;
		}
		case COL_GREEN: {
			col = 0x8bc34a;
			break;
		}
		case COL_BLUE: {
			col = 0x039be5;
			break;
		}
	}
	var metalness;
	var roughness;
	switch(finish) {
		case FIN_MATT: {
			metalness = 0.1;
			roughness = 0.8;
			break;
		}
		case FIN_GLOSS: {
			metalness = 0.6;
			roughness = 0;
			break;
		}
	}
	return new THREE.MeshStandardMaterial({metalness: metalness, color: col});
}