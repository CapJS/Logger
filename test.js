var logger = require("./lib/logger.js");

var log = new logger({
	prefix: "say hello!!",
});


logger.deb("hi");
logger.warn("hi");
logger.info("hi");

log.deb("gi");
log.warn("gi");
log.info("gi");


// Test All functions

logger.log("test function `log`.");
logger.emergency("test function `emergency`.");
logger.emerg("test function `emerg`.");
logger.alert("test function `alert`.");
logger.critical("test function `critical`.");
logger.crit("test function `crit`.");
logger.error("test function `error`.");
logger.err("test function `err`.");
logger.warning("test function `warning`.");
logger.warn("test function `warn`.");
logger.notice("test function `notice`.");
logger.informational("test function `informational`.");
logger.info("test function `info`.");
logger.debug("test function `debug`.");
logger.deb("test function `deb`.");
