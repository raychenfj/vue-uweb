/*!
 * vue-uweb v0.2.1
 * (c) 2019 raychenfj
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.VueUweb = global.VueUweb || {})));
}(this, (function (exports) { 'use strict';

var toStr = Object.prototype.toString;

var isArguments = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

var keysShim$1;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr$1 = Object.prototype.toString;
	var isArgs = isArguments; // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim$1 = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr$1.call(object) === '[object Function]';
		var isArguments$$1 = isArgs(object);
		var isString = isObject && toStr$1.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments$$1) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments$$1 && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
var implementation = keysShim$1;

var slice = Array.prototype.slice;


var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : implementation;

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArguments(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

var objectKeys = keysShim;

var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
var toStr$2 = Object.prototype.toString;

var isStandardArguments = function isArguments(value) {
	if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
		return false;
	}
	return toStr$2.call(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		toStr$2.call(value) !== '[object Array]' &&
		toStr$2.call(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

var isArguments$2 = supportsStandardArguments ? isStandardArguments : isLegacyArguments;

/* https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.is */

var NumberIsNaN = function (value) {
	return value !== value;
};

var objectIs = function is(a, b) {
	if (a === 0 && b === 0) {
		return 1 / a === 1 / b;
	} else if (a === b) {
		return true;
	} else if (NumberIsNaN(a) && NumberIsNaN(b)) {
		return true;
	}
	return false;
};

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice$1 = Array.prototype.slice;
var toStr$4 = Object.prototype.toString;
var funcType = '[object Function]';

var implementation$2 = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr$4.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice$1.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice$1.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice$1.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

var functionBind = Function.prototype.bind || implementation$2;

var src = functionBind.call(Function.call, Object.prototype.hasOwnProperty);

var regexExec = RegExp.prototype.exec;
var gOPD = Object.getOwnPropertyDescriptor;

var tryRegexExecCall = function tryRegexExec(value) {
	try {
		var lastIndex = value.lastIndex;
		value.lastIndex = 0;

		regexExec.call(value);
		return true;
	} catch (e) {
		return false;
	} finally {
		value.lastIndex = lastIndex;
	}
};
var toStr$3 = Object.prototype.toString;
var regexClass = '[object RegExp]';
var hasToStringTag$1 = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

var isRegex = function isRegex(value) {
	if (!value || typeof value !== 'object') {
		return false;
	}
	if (!hasToStringTag$1) {
		return toStr$3.call(value) === regexClass;
	}

	var descriptor = gOPD(value, 'lastIndex');
	var hasLastIndexDataProperty = descriptor && src(descriptor, 'value');
	if (!hasLastIndexDataProperty) {
		return false;
	}

	return tryRegexExecCall(value);
};

var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr$5 = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr$5.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
		for (var _ in obj) { // jscs:ignore disallowUnusedVariables
			return false;
		}
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = objectKeys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

var defineProperties_1 = defineProperties;

var toObject = Object;
var TypeErr = TypeError;

var implementation$5 = function flags() {
	if (this != null && this !== toObject(this)) {
		throw new TypeErr('RegExp.prototype.flags getter called on non-object');
	}
	var result = '';
	if (this.global) {
		result += 'g';
	}
	if (this.ignoreCase) {
		result += 'i';
	}
	if (this.multiline) {
		result += 'm';
	}
	if (this.dotAll) {
		result += 's';
	}
	if (this.unicode) {
		result += 'u';
	}
	if (this.sticky) {
		result += 'y';
	}
	return result;
};

var supportsDescriptors$1 = defineProperties_1.supportsDescriptors;
var gOPD$1 = Object.getOwnPropertyDescriptor;
var TypeErr$1 = TypeError;

var polyfill = function getPolyfill() {
	if (!supportsDescriptors$1) {
		throw new TypeErr$1('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');
	}
	if (/a/mig.flags === 'gim') {
		var descriptor = gOPD$1(RegExp.prototype, 'flags');
		if (descriptor && typeof descriptor.get === 'function' && typeof (/a/).dotAll === 'boolean') {
			return descriptor.get;
		}
	}
	return implementation$5;
};

var supportsDescriptors$2 = defineProperties_1.supportsDescriptors;

var gOPD$2 = Object.getOwnPropertyDescriptor;
var defineProperty$1 = Object.defineProperty;
var TypeErr$2 = TypeError;
var getProto = Object.getPrototypeOf;
var regex = /a/;

var shim = function shimFlags() {
	if (!supportsDescriptors$2 || !getProto) {
		throw new TypeErr$2('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');
	}
	var polyfill$$1 = polyfill();
	var proto = getProto(regex);
	var descriptor = gOPD$2(proto, 'flags');
	if (!descriptor || descriptor.get !== polyfill$$1) {
		defineProperty$1(proto, 'flags', {
			configurable: true,
			enumerable: false,
			get: polyfill$$1
		});
	}
	return polyfill$$1;
};

var flagsBound = Function.call.bind(implementation$5);

defineProperties_1(flagsBound, {
	getPolyfill: polyfill,
	implementation: implementation$5,
	shim: shim
});

var regexp_prototype_flags = flagsBound;

var getDay = Date.prototype.getDay;
var tryDateObject = function tryDateObject(value) {
	try {
		getDay.call(value);
		return true;
	} catch (e) {
		return false;
	}
};

var toStr$6 = Object.prototype.toString;
var dateClass = '[object Date]';
var hasToStringTag$2 = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

var isDateObject = function isDateObject(value) {
	if (typeof value !== 'object' || value === null) { return false; }
	return hasToStringTag$2 ? tryDateObject(value) : toStr$6.call(value) === dateClass;
};

var getTime = Date.prototype.getTime;

function deepEqual(actual, expected, options) {
  var opts = options || {};

  // 7.1. All identical values are equivalent, as determined by ===.
  if (opts.strict ? objectIs(actual, expected) : actual === expected) {
    return true;
  }

  // 7.3. Other pairs that do not both pass typeof value == 'object', equivalence is determined by ==.
  if (!actual || !expected || (typeof actual !== 'object' && typeof expected !== 'object')) {
    return opts.strict ? objectIs(actual, expected) : actual == expected;
  }

  /*
   * 7.4. For all other Object pairs, including Array objects, equivalence is
   * determined by having the same number of owned properties (as verified
   * with Object.prototype.hasOwnProperty.call), the same set of keys
   * (although not necessarily the same order), equivalent values for every
   * corresponding key, and an identical 'prototype' property. Note: this
   * accounts for both named and indexed properties on Arrays.
   */
  // eslint-disable-next-line no-use-before-define
  return objEquiv(actual, expected, opts);
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer(x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') {
    return false;
  }
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') {
    return false;
  }
  return true;
}

function objEquiv(a, b, opts) {
  /* eslint max-statements: [2, 50] */
  var i, key;
  if (typeof a !== typeof b) { return false; }
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) { return false; }

  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) { return false; }

  if (isArguments$2(a) !== isArguments$2(b)) { return false; }

  var aIsRegex = isRegex(a);
  var bIsRegex = isRegex(b);
  if (aIsRegex !== bIsRegex) { return false; }
  if (aIsRegex || bIsRegex) {
    return a.source === b.source && regexp_prototype_flags(a) === regexp_prototype_flags(b);
  }

  if (isDateObject(a) && isDateObject(b)) {
    return getTime.call(a) === getTime.call(b);
  }

  var aIsBuffer = isBuffer(a);
  var bIsBuffer = isBuffer(b);
  if (aIsBuffer !== bIsBuffer) { return false; }
  if (aIsBuffer || bIsBuffer) { // && would work too, because both are true or both false here
    if (a.length !== b.length) { return false; }
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) { return false; }
    }
    return true;
  }

  if (typeof a !== typeof b) { return false; }

  try {
    var ka = objectKeys(a);
    var kb = objectKeys(b);
  } catch (e) { // happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates hasOwnProperty)
  if (ka.length !== kb.length) { return false; }

  // the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  // ~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i]) { return false; }
  }
  // equivalent values for every corresponding key, and ~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) { return false; }
  }

  return true;
}

var deepEqual_1 = deepEqual;

/**
 * if the binding value is equal to oldeValue
 */
function notChanged (binding) {
  if (binding.oldValue !== undefined) {
    if (typeof binding.value === 'object') {
      return deepEqual_1(binding.value, binding.oldValue)
    } else {
      return binding.value === binding.oldValue
    }
  } else {
    return false
  }
}

/**
 * if the binding value is empty
 */
function isEmpty (binding) {
  return binding.value === '' || binding.value === undefined || binding.value === null
}

var autoPageview = function (el, binding) {
  if (notChanged(binding)) { return }

  var args = [];
  if (binding.value === false || binding.value === 'false') { args.push(false); }
  else { args.push(true); }
  uweb.setAutoPageview.apply(uweb, args);
};

var trackEvent = function (el, binding) {
  if (notChanged(binding) || isEmpty(binding)) { return }

  if (el.removeEventListeners && typeof el.removeEventListeners === 'function') {
    el.removeEventListeners();
  }

  var args = [];
  // use modifier as events
  var events = Object.keys(binding.modifiers).map(function (modifier) {
    if (binding.modifiers[modifier]) {
      return modifier
    }
  });

  // passing parameters as object
  if (typeof binding.value === 'object') {
    var value = binding.value;
    if (value.category) { args.push(value.category); }
    if (value.action) { args.push(value.action); }
    if (value.label) { args.push(value.label); }
    if (value.value) { args.push(value.value); }
    if (value.nodeid) { args.push(value.nodeid); }

    // passing parameters as string separate by comma
  } else if (typeof binding.value === 'string') {
    args = binding.value.split(',');
    args.forEach(function (arg, i) { return (args[i] = arg.trim()); });
  }

  if (!events.length) { events.push('click'); } // listen click event by default

  // addEventListener for each event, call trackEvent api
  var listeners = [];
  events.forEach(function (event, index) {
    listeners[index] = function () { return uweb.trackEvent.apply(uweb, args); };
    el.addEventListener(event, listeners[index], false);
  });

  // a function to remove all previous event listeners in update cycle to prevent duplication
  el.removeEventListeners = function () {
    events.forEach(function (event, index) {
      el.removeEventListener(event, listeners[index]);
    });
  };
};

var watch = [];

var trackPageview = {
  bind: function bind (el, binding) {
    var index = watch.findIndex(function (element) { return element === el; });
    var isWatched = index !== -1;
    // watch for a v-show binded element, push it to watch queue when v-show is false
    if (el.style.display === 'none') {
      if (!isWatched) { watch.push(el); }
      return
    } else {
      // remove from watch queue when v-show is true
      if (isWatched) { watch.splice(index, 1); }
    }
    if (!isWatched && (notChanged(binding) || isEmpty(binding))) { return }

    var args = [];

    // passing parameters as object
    if (typeof binding.value === 'object') {
      var value = binding.value;
      if (value.content_url) { args.push(value.content_url); }
      if (value.referer_url) { args.push(value.referer_url); }

      // passing parameters as string separate by comma
    } else if (typeof binding.value === 'string' && binding.value) {
      args = binding.value.split(',');
      args.forEach(function (arg, i) { return (args[i] = arg.trim()); });
    }

    uweb.trackPageview.apply(uweb, args);
  },
  unbind: function unbind (el, binding) {
    var index = watch.findIndex(function (element) { return element === el; });
    if (index !== -1) { watch.splice(index, 1); }
  }
};
trackPageview.update = trackPageview.bind;

/**
   * install
   *
   * @param {Vue} Vue
   * @param {Object} options
   * @returns
   */
function install (Vue, options) {
  var this$1 = this;

  if (this.install.installed) { return }

  if (options.debug) {
    this.debug = console.debug;
  } else {
    this.debug = function () {};
  }

  var siteId = null;
  // passsing siteId through object or string
  if (typeof options === 'object') {
    siteId = options.siteId;
    if (options.autoPageview !== false) {
      options.autoPageview = true;
    }
  } else {
    siteId = options;
  }
  if (!siteId) {
    return console.error('siteId is missing')
  }
  this.install.installed = true;

  // insert u-web statistics script
  var script = document.createElement('script');
  var src = "https://s95.cnzz.com/z_stat.php?id=" + siteId + "&web_id=" + siteId;
  script.src = options.src || src;

  // callback when the script is loaded
  script.onload = function () {
    // if the global object is exist, resolve the promise, otherwise reject it
    if (window._czc) {
      this$1._resolve();
    } else {
      console.error('loading uweb statistics script failed, please check src and siteId');
      return this$1._reject()
    }
    // load from cache
    this$1._cache.forEach(function (cache) {
      window._czc.push(cache);
    });
    this$1._cache = [];
  };

  this.setAccount(options.siteId);
  this.setAutoPageview(options.autoPageview);

  document.body.appendChild(script);

  // store into cache when the script is not fully loaded
  // add $czc to Vue prototype
  Object.defineProperty(Vue.prototype, '$uweb', {
    get: function () { return this$1; }
  });

  Vue.directive('auto-pageview', autoPageview);
  Vue.directive('track-event', trackEvent);
  Vue.directive('track-pageview', trackPageview);
}

// deferred promise
var deferred = {};
deferred.promise = new Promise(function (resolve, reject) {
  deferred.resolve = resolve;
  deferred.reject = reject;
});

// uweb apis
var methods = [
  'trackPageview',      // http://open.cnzz.com/a/api/trackpageview/
  'trackEvent',         // http://open.cnzz.com/a/api/trackevent/
  'setCustomVar',       // http://open.cnzz.com/a/api/setcustomvar/
  'setAccount',         // http://open.cnzz.com/a/api/setaccount/
  'setAutoPageview',    // http://open.cnzz.com/a/api/setautopageview/
  'deleteCustomVar'     // http://open.cnzz.com/a/api/deletecustomvar/
];

var uweb = {
  /**
   * internal user only
   */
  _cache: [],

  /**
   * internal user only, resolve the promise
   */
  _resolve: function _resolve () {
    deferred.resolve();
  },

  /**
   * internal user only, reject the promise
   */
  _reject: function _reject () {
    deferred.reject();
  },

  /**
   * push the args into _czc, or _cache if the script is not loaded yet
   */
  _push: function _push () {
    this.debug(arguments);
    if (window._czc) {
      window._czc.push.apply(window._czc, arguments);
    } else {
      this._cache.push.apply(this._cache, arguments);
    }
  },

  /**
   * general method to create uweb apis
   */
  _createMethod: function _createMethod (method) {
    return function () {
      var args = Array.prototype.slice.apply(arguments);
      this._push([("_" + method) ].concat( args));
    }
  },

  /**
   * debug
   */
  debug: function debug () {},

  /**
   * the plugins is ready when the script is loaded
   */
  ready: function ready () {
    return deferred.promise
  },

  /**
   * install function
   */

  install: install,

  /**
   * patch up to create new api
   */
  patch: function patch (method) {
    this[method] = this._createMethod(method);
  }
};

// uweb apis
methods.forEach(function (method) { return (uweb[method] = uweb._createMethod(method)); });

if (window.Vue) {
  window.uweb = uweb;
}

exports['default'] = uweb;

Object.defineProperty(exports, '__esModule', { value: true });

})));
