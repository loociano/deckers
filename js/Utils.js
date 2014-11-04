/** Returns the CSS transform matrix given an HTML Element */ 
function matrix3dToArray(str){
	str = str.substr("matrix3d".length);
    return str.match(/(-?[0-9\.]+)/g);
}

/** Returns the CSS transform matrix given an array of 16 elements */ 
function arrayToMatrix3d(array) {
	var result = "matrix3d("
	for (var i = 0; i < array.length; i++){
		result += array[i];
		if (i < array.length-1)
			result += ",";
		else
			result += ")";
	}
	return result;
}

/** Returns the CSS transform horizontal position given an HTML Element */
function get3dPositionX(elt) {
	return parseFloat(matrixToArray(elt.style.transform)[12]);
}

function get3dPositionY(elt){
	return parseFloat(matrixToArray(elt.style.transform)[13]);
}

/** Returns the CSS transform vertical position given an HTML Element */
function get3dPositionZ(elt){
	return parseFloat(matrixToArray(elt.style.transform)[14]);
}

/** Sets the CSS transform 3d position for an HTML Element */
function set3dPosition(elt, x, y, z) {
	var array = get3dPosition(elt);
	array[12] = x;
	array[13] = y;
	array[14] = z;
	elt.style.transform = arrayToMatrix3d(array);
}

function set3dPositionArray(elt, array){
	elt.style.transform = arrayToMatrix3d(array);
}

/** Returns the 3d position */
function get3dPosition(elt){
	var array = matrix3dToArray(elt.style.transform);
	if (array == null) 
		array = ["1", "0", "0", "0", "0", "1", "0", "0", "0", "0", "1", "0", "0", "0", "0", "1"];
	return array;
}

/** Sets an element to the top and positions it */
function setTop(elt, x, y, z){
	rotateTop(elt);
	set3dPosition(elt, x, y, z);
}

/** Rotates an element 90deg to the top */
function rotateTop(elt){
	var array = get3dPosition(elt);
	array[0] = "0";
	array[1] = "-1";
	array[4] = "1";
	array[5] = "0";
	set3dPositionArray(elt, array);
}

/** Sets an element to the top and positions it */
function setBottom(elt, x, y, z){
	set3dPosition(elt, -x, -y, -z);
}