// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  if (obj === null) {
    return 'null';
  }
  if (typeof(obj) === 'string') {
    return '"' + obj + '"';
  } else if (typeof(obj) === 'boolean' || typeof(obj) === 'number') {
    return '' + obj;
  } else if (Array.isArray(obj)) {
    var elements = '';
    if (obj.length === 0 || obj.length === 1) {
      if (obj.length === 0) {
        elements += '[]';
      } else {
        elements += '[' + stringifyJSON(obj[0]) + ']';
      }
    } else {
      for (let i = 0; i < obj.length; i++) {
        if (i === 0) {
          elements += '[' + stringifyJSON(obj[i]) + ',';
        } else if (i === obj.length - 1) {
          elements += stringifyJSON(obj[i]) + ']';
        } else {
          elements += stringifyJSON(obj[i]) + ',';
        }
      }
    }
    return elements;
  } else if (typeof(obj) === 'object') {
    var keyValues = '';
    let keys = Object.keys(obj);
    if (keys.length === 0 || keys.length === 1) {
      if (keys.length === 0) {
        keyValues += '{}';
      } else {
        if (typeof(obj[keys[0]]) === 'function' || obj[keys[0]] === undefined) {
          return '{}';
        }
        keyValues += '{"' + keys[0] + '":' + stringifyJSON(obj[keys[0]]) + '}';
      }
    } else {
      for (let i = 0; i < keys.length; i++) {
        if (typeof(obj[keys[i]]) === 'function' || obj[keys[i]] === undefined) {
          return '{}';
        }
        if (i === 0) {
          keyValues += '{"' + keys[i] + '":' + stringifyJSON(obj[keys[i]]) + ',';
        } else if (i === keys.length - 1) {
          keyValues += '"' + keys[i] + '":' + stringifyJSON(obj[keys[i]]) + '}';
        } else {
          keyValues += '"' + keys[i] + '":' + stringifyJSON(obj[keys[i]]) + ',';
        }
      }
    }
    return keyValues;
  }
};
