// var _ = require("lodash");
import _ from "lodash";
import colors from "colors/safe";

/*
* REF: https://en.wikipedia.org/wiki/Syslog
*/

class logger {
  constructor ({
    prefix = null,
    sufix = null,
    logger:_logger = console.log,
    priority = process.env.DEBUG,
    defaultLevelLog = process.env.LOGGER_DEFAULT_LEVEL || -1,
    colorful = true,
    colors: set_colors = {},
    printLevel = true,
  } = {}) {
    this.defaultLevelLog = defaultLevelLog;
    this.prefix = prefix;
    this.sufix = sufix;
    this.colorful = colorful;
    this.printLevel = printLevel;
    this._logger = _logger;
    // this.logger = logger;

    colors.setTheme({
      "custom-2": _.get(set_colors, "hidden", "reset"),
      "custom-1": _.get(set_colors, "none", "reset"),
      "custom0": _.get(set_colors, "emergency", "yellow"),
      "custom1": _.get(set_colors, "alert", "yellow"),
      "custom2": _.get(set_colors, "critical", "red"),
      "custom3": _.get(set_colors, "error", "red"),
      "custom4": _.get(set_colors, "warning", "yellow"),
      "custom5": _.get(set_colors, "notice", "cyan"),
      "custom6": _.get(set_colors, "informational", "green"),
      "custom7": _.get(set_colors, "debug", "reset"),
    });

    this.priority = logger.getLevelNumber(priority);

  }

  getPrefix() {
    if (this.prefix == null) {
      let date = new Date();
      return `[${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;
    } else {
      if (_.isFunction(this.prefix)) {
        return this.prefix();
      } else {
        return this.prefix;
      }
    }
  }

  getSufix() {
    if (this.sufix == null) {
      return '';
    } else {
      if (_.isFunction(this.sufix)) {
        return this.sufix();
      } else {
        return this.sufix;
      }
    }
  }

  /*
  * Return Number Asociate to Level
  */
  static getLevelNumber (_priority) {
    switch ((typeof(_priority) == "string") ? _priority.toLowerCase(): _priority) {
      case -2:
      case "-2":
      case "hidden":
        return -2; break;
      case -1:
      case "-1":
      case "none":
        return -1; break;
      case 0:
      case "0":
      case "emer":
      case "emergency":
        return 0; break;
      case "1":
      case 1:
      case "alert":
        return 1; break;
      case 2:
      case "2":
      case "crit":
      case "critical":
        return 2; break;
      case 3:
      case "3":
      case "err":
      case "error":
        return 3; break;
      case 4:
      case "4":
      case "warn":
      case "warning":
        return 4; break;
      case 5:
      case "5":
      case "notice":
        return 5; break;
      case 6:
      case "6":
      case "info":
      case "informational":
        return 6; break;
      // debug:
      default:
        return 7; break;
    }
  }

  static getLevelName (level) {
    let ret = "";
    switch (logger.getLevelNumber(level)) {
      case 0:  ret = "emergency"; break;
      case 1:  ret = "alert"; break;
      case 2:  ret = "critical"; break;
      case 3:  ret = "error"; break;
      case 4:  ret = "warning"; break;
      case 5:  ret = "notice"; break;
      case 6:  ret = "informational"; break;
      default: ret = "debug"; break;
    }
    return ret.toUpperCase();
  }

  colorLevel (levelNumber) {

  }

  logger (level, ...args) {
    if (!_.isNumber(level)) throw new Error("Logger is not defined level logger.logger(level, ...args);");
    if (this.priority < level) return false;

    let prefix = this.getPrefix();
    let sufix = this.getSufix();


    if (this.printLevel) {
      args = [_.get(colors, `custom${level}`, (...a) => a)(`${logger.getLevelName(level)}:`), ...args];
    }

    if (prefix) {
      args = [prefix, ...args];
    }

    if (sufix) {
      args = [...args, sufix];
    }


    return this._logger(...args);
  }

  // this.defaultLevelLog Default -1.
  log (...args) {
    return this.logger(this.defaultLevelLog, ...args);
  }
  // 0
  emergency (...args) {
    return this.logger(0, ...args);
  }
  emerg (...args) {
    return this.emergency(...args);
  }
  // 1
  alert (...args) {
    return this.logger(1, ...args);
  }
  // 2
  critical (...args) {
    return this.logger(2, ...args);
  }
  crit (...args) {
    return this.critical(...args);
  }
  // 3
  error (...args) {
    return this.logger(3, ...args);
  }
  err (...args) {
    return this.error(...args);
  }
  // 4
  warning (...args) {
    return this.logger(4, ...args);
  }
  warn (...args) {
    return this.warning(...args);
  }
  // 5
  notice (...args) {
    return this.logger(5, ...args);
  }
  // 6
  informational (...args) {
    return this.logger(6, ...args);
  }
  info (...args) {
    return this.informational(...args);
  }
  // 7
  debug (...args) {
    return this.logger(7, ...args);
  }
  deb (...args) {
    return this.debug(...args);
  }

}


// Global Logger
let globalLogger = new logger();

function logGlobalLogger (...args) {
  if (this instanceof logGlobalLogger) {
    return new logger(...args);
  }
  return globalLogger.log(...args);
};

module.exports = logGlobalLogger;

module.exports.log = function (...args) {return globalLogger.log(...args);};
module.exports.emergency = function (...args) {return globalLogger.emergency(...args);};
module.exports.emerg = function (...args) {return globalLogger.emerg(...args);};
module.exports.alert = function (...args) {return globalLogger.alert(...args);};
module.exports.critical = function (...args) {return globalLogger.critical(...args);};
module.exports.crit = function (...args) {return globalLogger.crit(...args);};
module.exports.error = function (...args) {return globalLogger.error(...args);};
module.exports.err = function (...args) {return globalLogger.err(...args);};
module.exports.warning = function (...args) {return globalLogger.warning(...args);};
module.exports.warn = function (...args) {return globalLogger.warn(...args);};
module.exports.notice = function (...args) {return globalLogger.notice(...args);};
module.exports.informational = function (...args) {return globalLogger.informational(...args);};
module.exports.info = function (...args) {return globalLogger.info(...args);};
module.exports.debug = function (...args) {return globalLogger.debug(...args);};
module.exports.deb = function (...args) {return globalLogger.deb(...args);};

module.exports.logger = logger;

