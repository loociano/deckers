/**
 * Constants
 */
var sqrt2 = 1.4142135623;
var isqrt2 = 0.7071067811;

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Returns the CSS transform matrix given an HTML Element */ 
function matrixToArray(str){
    return str.match(/(-?[0-9\.]+)/g);
}

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

/** Returns the CSS transform matrix given an array of 6 elements */ 
function arrayToMatrix(array) {
	return "matrix("+array[0]+","+array[1]+","+array[2]+","+array[3]+","+array[4]+","+array[5]+")";
};

/** Returns the CSS transform horizontal position given an HTML Element */
function get3dPositionX(elt) {
	return parseFloat(matrix3dToArray(elt.style.transform)[12]);
}

function get3dPositionY(elt){
	return parseFloat(matrix3dToArray(elt.style.transform)[13]);
}

/** Returns the CSS transform vertical position given an HTML Element */
function get3dPositionZ(elt){
	return parseFloat(matrix3dToArray(elt.style.transform)[14]);
}

/** Sets the CSS transform horizontal position for an HTML Element */
function set3dPositionX(elt, x) {
	var array = matrix3dToArray(elt.style.transform);
	array[12] = x;
	elt.style.transform = arrayToMatrix3d(array);
}

/** Sets the CSS transform vertical position for an HTML Element */
function set3dPositionY(elt, y) {
	var array = matrix3dToArray(elt.style.transform);
	array[13] = y;
	elt.style.transform = arrayToMatrix3d(array);
}

/** Sets the CSS transform vertical position for an HTML Element */
function addOffsetX(elt, offset) {

	var array = matrix3dToArray(elt.style.transform);
	var x = parseFloat(array[12]);
	x += offset;

	array[12] = x.toString();
	elt.style.transform = arrayToMatrix3d(array);
};

/** Sets the CSS transform vertical position for an HTML Element */
function addOffsetY(elt, offset) {

	var array = matrix3dToArray(elt.style.transform);
	var y = parseFloat(array[13]);
	y += offset;

	array[13] = y.toString();
	elt.style.transform = arrayToMatrix3d(array);
};

/** Sets the CSS transform vertical and horizontal position for an HTML Element */
function addOffsetXY(elt, offsetX, offsetY) {

	var array = matrix3dToArray(elt.style.transform);
	var x = parseFloat(array[12]);
	x += offsetX;
	array[12] = x.toString();

	var y = parseFloat(array[13]);
	y += offsetY;
	array[13] = y.toString();

	elt.style.transform = arrayToMatrix3d(array);
};

/** Sets the CSS transform 3d position for an HTML Element */
function set3dPosition(elt, x, y, z) {
	var array = get3dPosition(elt);
	array[12] = x;
	array[13] = y;
	array[14] = z;
	elt.style.transform = arrayToMatrix3d(array);
}

function setPositionArray(elt, array){
	elt.style.transform = arrayToMatrix(array);
}

function set3dPositionArray(elt, array){
	elt.style.transform = arrayToMatrix3d(array);
}

/** Returns the 3d position */
function get3dPosition(elt){

	if (elt != null){
		var array = matrix3dToArray(elt.style.transform);
		if (array == null) 
			array = ["1", "0", "0", "0", "0", "1", "0", "0", "0", "0", "1", "0", "0", "0", "0", "1"];
		return array;
	}
}

/** Returns the 3d position */
function getPosition(elt){
	if (elt != null){
		var array = matrixToArray(elt.style.transform);
		if (array == null) 
			array = ["1", "0", "0", "1", "0", "0"];
		return array;
	}
}

/** Sets an element to the top and positions it */
function setTop(elt, x, y, z){
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

function getRotation(elt){

	if (elt != null){
		var array = get3dPosition(elt);

		if (array[0] == 1) return 0;
		if (array[1] == -1) return 90;
		if (array[0] == -1) return 180;
		if (array[1] == 1) return 270;

		var array0 = parseFloat(array[0]);
		var array1 = parseFloat(array[1]);

		if (array0 == isqrt2 && array1 == -isqrt2) return 45;
		if (array0 == -isqrt2 && array1 == -isqrt2) return 135;
		if (array0 == -isqrt2 && array1 == isqrt2) return 225;
		if (array0 == isqrt2 && array1 == isqrt2) return 315;
	}
}

function rotate(elt, degX, degY, degZ){
	try {
		elt.style.transform = "rotateX("+ degX + "deg) rotateY("+ degY + "deg) rotateZ(" + degZ + "deg)";
	} catch(e){
		console.error("Elt not found");
	}
}

function rotate135l(elt){
	var array = get3dPosition(elt);
	array[0] = -isqrt2;
	array[1] = -isqrt2;
	array[4] = isqrt2;
	array[5] = -isqrt2;
	set3dPositionArray(elt, array);
}

function rotate45r(elt){
	var array = get3dPosition(elt);
	array[0] = isqrt2;
	array[1] = isqrt2;
	array[4] = -isqrt2;
	array[5] = isqrt2;
	set3dPositionArray(elt, array);
}

function rotate45l(elt){
	var array = get3dPosition(elt);
	array[0] = isqrt2;
	array[1] = -isqrt2;
	array[4] = isqrt2;
	array[5] = isqrt2;
	set3dPositionArray(elt, array);
}

function rotate135r(elt){
	var array = get3dPosition(elt);
	array[0] = -isqrt2;
	array[1] = isqrt2;
	array[4] = -isqrt2;
	array[5] = -isqrt2;
	set3dPositionArray(elt, array);
}	

function rotate90r(elt){
	var array = get3dPosition(elt);
	array[0] = 0;
	array[1] = 1;
	array[4] = -1;
	array[5] = 0;
	set3dPositionArray(elt, array);
}

function rotate90l(elt){
	var array = get3dPosition(elt);
	array[0] = 0;
	array[1] = -1;
	array[4] = 1;
	array[5] = 0;
	set3dPositionArray(elt, array);
}

function rotate180(elt){
	var array = get3dPosition(elt);
	array[0] = -1;
	array[1] = 0;
	array[4] = 0;
	array[5] = -1;
	set3dPositionArray(elt, array);
}

function rotate0(elt){
	var array = get3dPosition(elt);
	array[0] = 1;
	array[1] = 0;
	array[4] = 0;
	array[5] = 1;
	set3dPositionArray(elt, array);
}