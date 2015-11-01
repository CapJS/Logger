// var _ = require("lodash");
"use strict";

var _bind = Function.prototype.bind;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _colorsSafe = require("colors/safe");

var _colorsSafe2 = _interopRequireDefault(_colorsSafe);

/*
* REF: https://en.wikipedia.org/wiki/Syslog
*/

var _logger2 = (function () {
  function _logger2() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ref$prefix = _ref.prefix;
    var prefix = _ref$prefix === undefined ? null : _ref$prefix;
    var _ref$sufix = _ref.sufix;
    var sufix = _ref$sufix === undefined ? null : _ref$sufix;
    var _ref$logger = _ref.logger;

    var _logger = _ref$logger === undefined ? console.log : _ref$logger;

    var _ref$priority = _ref.priority;
    var priority = _ref$priority === undefined ? process.env.DEBUG : _ref$priority;
    var _ref$defaultLevelLog = _ref.defaultLevelLog;
    var defaultLevelLog = _ref$defaultLevelLog === undefined ? process.env.LOGGER_DEFAULT_LEVEL || -1 : _ref$defaultLevelLog;
    var _ref$colorful = _ref.colorful;
    var colorful = _ref$colorful === undefined ? true : _ref$colorful;
    var _ref$colors = _ref.colors;
    var set_colors = _ref$colors === undefined ? {} : _ref$colors;
    var _ref$printLevel = _ref.printLevel;
    var printLevel = _ref$printLevel === undefined ? true : _ref$printLevel;

    _classCallCheck(this, _logger2);

    this.defaultLevelLog = defaultLevelLog;
    this.prefix = prefix;
    this.sufix = sufix;
    this.colorful = colorful;
    this.printLevel = printLevel;
    this._logger = _logger;
    // this.logger = logger;

    _colorsSafe2["default"].setTheme({
      "custom-2": _lodash2["default"].get(set_colors, "hidden", "reset"),
      "custom-1": _lodash2["default"].get(set_colors, "none", "reset"),
      "custom0": _lodash2["default"].get(set_colors, "emergency", "yellow"),
      "custom1": _lodash2["default"].get(set_colors, "alert", "yellow"),
      "custom2": _lodash2["default"].get(set_colors, "critical", "red"),
      "custom3": _lodash2["default"].get(set_colors, "error", "red"),
      "custom4": _lodash2["default"].get(set_colors, "warning", "yellow"),
      "custom5": _lodash2["default"].get(set_colors, "notice", "cyan"),
      "custom6": _lodash2["default"].get(set_colors, "informational", "green"),
      "custom7": _lodash2["default"].get(set_colors, "debug", "reset")
    });

    this.priority = _logger2.getLevelNumber(priority);
  }

  // Global Logger

  _createClass(_logger2, [{
    key: "getPrefix",
    value: function getPrefix() {
      if (this.prefix == null) {
        var date = new Date();
        return "[" + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "]";
      } else {
        if (_lodash2["default"].isFunction(this.prefix)) {
          return this.prefix();
        } else {
          return this.prefix;
        }
      }
    }
  }, {
    key: "getSufix",
    value: function getSufix() {
      if (this.sufix == null) {
        return '';
      } else {
        if (_lodash2["default"].isFunction(this.sufix)) {
          return this.sufix();
        } else {
          return this.sufix;
        }
      }
    }

    /*
    * Return Number Asociate to Level
    */
  }, {
    key: "colorLevel",
    value: function colorLevel(levelNumber) {}
  }, {
    key: "logger",
    value: function logger(level) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (!_lodash2["default"].isNumber(level)) throw new Error("Logger is not defined level logger.logger(level, ...args);");
      if (this.priority < level) return false;

      var prefix = this.getPrefix();
      var sufix = this.getSufix();

      if (this.printLevel) {
        args = [_lodash2["default"].get(_colorsSafe2["default"], "custom" + level, function () {
          for (var _len2 = arguments.length, a = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            a[_key2] = arguments[_key2];
          }

          return a;
        })(_logger2.getLevelName(level) + ":")].concat(_toConsumableArray(args));
      }

      if (prefix) {
        args = [prefix].concat(_toConsumableArray(args));
      }

      if (sufix) {
        args = [].concat(_toConsumableArray(args), [sufix]);
      }

      return this._logger.apply(this, _toConsumableArray(args));
    }

    // this.defaultLevelLog Default -1.
  }, {
    key: "log",
    value: function log() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return this.logger.apply(this, [this.defaultLevelLog].concat(args));
    }

    // 0
  }, {
    key: "emergency",
    value: function emergency() {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return this.logger.apply(this, [0].concat(args));
    }
  }, {
    key: "emerg",
    value: function emerg() {
      return this.emergency.apply(this, arguments);
    }

    // 1
  }, {
    key: "alert",
    value: function alert() {
      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return this.logger.apply(this, [1].concat(args));
    }

    // 2
  }, {
    key: "critical",
    value: function critical() {
      for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return this.logger.apply(this, [2].concat(args));
    }
  }, {
    key: "crit",
    value: function crit() {
      return this.critical.apply(this, arguments);
    }

    // 3
  }, {
    key: "error",
    value: function error() {
      for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      return this.logger.apply(this, [3].concat(args));
    }
  }, {
    key: "err",
    value: function err() {
      return this.error.apply(this, arguments);
    }

    // 4
  }, {
    key: "warning",
    value: function warning() {
      for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      return this.logger.apply(this, [4].concat(args));
    }
  }, {
    key: "warn",
    value: function warn() {
      return this.warning.apply(this, arguments);
    }

    // 5
  }, {
    key: "notice",
    value: function notice() {
      for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      return this.logger.apply(this, [5].concat(args));
    }

    // 6
  }, {
    key: "informational",
    value: function informational() {
      for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }

      return this.logger.apply(this, [6].concat(args));
    }
  }, {
    key: "info",
    value: function info() {
      return this.informational.apply(this, arguments);
    }

    // 7
  }, {
    key: "debug",
    value: function debug() {
      for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        args[_key11] = arguments[_key11];
      }

      return this.logger.apply(this, [7].concat(args));
    }
  }, {
    key: "deb",
    value: function deb() {
      return this.debug.apply(this, arguments);
    }
  }], [{
    key: "getLevelNumber",
    value: function getLevelNumber(_priority) {
      switch (typeof _priority == "string" ? _priority.toLowerCase() : _priority) {
        case -2:
        case "-2":
        case "hidden":
          return -2;break;
        case -1:
        case "-1":
        case "none":
          return -1;break;
        case 0:
        case "0":
        case "emer":
        case "emergency":
          return 0;break;
        case "1":
        case 1:
        case "alert":
          return 1;break;
        case 2:
        case "2":
        case "crit":
        case "critical":
          return 2;break;
        case 3:
        case "3":
        case "err":
        case "error":
          return 3;break;
        case 4:
        case "4":
        case "warn":
        case "warning":
          return 4;break;
        case 5:
        case "5":
        case "notice":
          return 5;break;
        case 6:
        case "6":
        case "info":
        case "informational":
          return 6;break;
        // debug:
        default:
          return 7;break;
      }
    }
  }, {
    key: "getLevelName",
    value: function getLevelName(level) {
      var ret = "";
      switch (_logger2.getLevelNumber(level)) {
        case 0:
          ret = "emergency";break;
        case 1:
          ret = "alert";break;
        case 2:
          ret = "critical";break;
        case 3:
          ret = "error";break;
        case 4:
          ret = "warning";break;
        case 5:
          ret = "notice";break;
        case 6:
          ret = "informational";break;
        default:
          ret = "debug";break;
      }
      return ret.toUpperCase();
    }
  }]);

  return _logger2;
})();

var globalLogger = new _logger2();

function logGlobalLogger() {
  for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
    args[_key12] = arguments[_key12];
  }

  if (this instanceof logGlobalLogger) {
    return new (_bind.apply(_logger2, [null].concat(args)))();
  }
  return globalLogger.log.apply(globalLogger, args);
};

module.exports = logGlobalLogger;

module.exports.log = function () {
  return globalLogger.log.apply(globalLogger, arguments);
};
module.exports.emergency = function () {
  return globalLogger.emergency.apply(globalLogger, arguments);
};
module.exports.emerg = function () {
  return globalLogger.emerg.apply(globalLogger, arguments);
};
module.exports.alert = function () {
  return globalLogger.alert.apply(globalLogger, arguments);
};
module.exports.critical = function () {
  return globalLogger.critical.apply(globalLogger, arguments);
};
module.exports.crit = function () {
  return globalLogger.crit.apply(globalLogger, arguments);
};
module.exports.error = function () {
  return globalLogger.error.apply(globalLogger, arguments);
};
module.exports.err = function () {
  return globalLogger.err.apply(globalLogger, arguments);
};
module.exports.warning = function () {
  return globalLogger.warning.apply(globalLogger, arguments);
};
module.exports.warn = function () {
  return globalLogger.warn.apply(globalLogger, arguments);
};
module.exports.notice = function () {
  return globalLogger.notice.apply(globalLogger, arguments);
};
module.exports.informational = function () {
  return globalLogger.informational.apply(globalLogger, arguments);
};
module.exports.info = function () {
  return globalLogger.info.apply(globalLogger, arguments);
};
module.exports.debug = function () {
  return globalLogger.debug.apply(globalLogger, arguments);
};
module.exports.deb = function () {
  return globalLogger.deb.apply(globalLogger, arguments);
};

module.exports.logger = _logger2;

//# sourceMappingURL=logger.js.map