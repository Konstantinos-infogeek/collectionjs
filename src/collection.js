/**
 * Created by Konstantinos Tsatsarounos<konstantinos.tsatsarounos@gmail.com>
 * Project Name:
 * Filename: collection.js
 * Date: 11/1/2017
 * Time: 8:56 μμ
 */

var Collection;
(function (Module) {
	/**
	 *
	 * @param object
	 * @param type
	 * @returns {Array}
	 * @constructor
	 */
	function Extract (object, type) {
		var output = [];
		for (var index in object) {
			if (type == 'keys') { output.push (index); }
			else if (type == 'values') {
				output.push (object[ index ]);
			}
		}
		return output;
	}

	/**
	 *
	 * @param value
	 * @param testValue
	 * @returns {{}}
	 */
	function check (value, testValue) {
		var output = {};
		if (value == testValue) {
			output.name = index;
			output.value = object[ index ];
		}
		return output;
	}

	/**
	 *
	 * @param object
	 * @param type
	 * @param value
	 * @returns {{name, value}}
	 * @constructor
	 */
	function Find (object, type, value) {
		var output = {};
		for (var index in object) {
			if (type == 'keys') {
				output = check (index, value);
				break;
			} else if (type == 'values') {
				output = check (object[ index ], value);
				break;
			}
		}
		return output;
	}

	/**
	 *
	 * @returns {{__proto__: Array, get: get, add: add, remove: remove, has: has, toArray: toArray, parse: parse, toJSON: toJSON}}
	 * @constructor
	 */
	function List () {
		var data = {}, counter = 0;

		return {
			__proto__: Array,
			get: function (item) {
				return data[ item ];
			},
			add: function (value) {
				data[ ++counter ] = value;
			},
			remove: function (value) {
				var _counter = 0
				for (var index in data) {
					if (data[ index ] == value) {
						delete data[ index ];
						_counter++;
					}
				}
				return _counter;
			},
			has: function (value) {
				var _values = Extract (data, 'values');
				return _values.indexOf (value) > -1;
			},
			toArray: function () {
				return Extract (data, 'values');
			},
			parse: function (input) {
				if (Array.isArray (input)) {
					data = {};
					counter = 0;
					for (var index in input) {
						data[ ++counter ] = input[ index ];
					}
				}
			},
			toJSON: function () {
				return JSON.stringify (data);
			}
		}
	}

	/**
	 *
	 * @returns {{__proto__: Array, get: get, find: find, add: add, remove: remove, has: has, parse: parse, toArray: toArray, toJSON: toJSON}}
	 * @constructor
	 */
	function Dictionary () {
		var data = {};
		return {
			__proto__: Array,
			get: function (key) {
				if(data.hasOwnProperty(key)){
					return data[key];
				}
				return null;
			},
			find: function (value) {
				return Find(data, 'values', value);
			},
			add: function (key, value) {
				return data[key] = value;
			},
			remove: function () {

			},
			has: function (value) {
				var _values = Extract (data, 'values');
				return _values.indexOf (value) > -1;
			},
			hasKey: function (value) {
				var _values = Extract (data, 'keys');
				return _values.indexOf (value) > -1;
			},
			keys: function () {
				return Extract(data, 'keys');
			},
			parse: function (input, keys) {
				if ( Array.isArray (input) && Array.isArray(keys) ) {
					if( keys.length == input.length ){
						data = {};
						for (var index in input) {
							data[ keys[index] ] = input[ index ];
						}
					}
				}
			},
			toArray: function () {
				return Extract(data, 'values');
			},
			toJSON: function () {
				return JSON.stringify( data );
			}
		};
	}

	//Assign Modules
	Module.List = List;
	Module.Dictionary = Dictionary;

} (Collection || (Collection = {})));