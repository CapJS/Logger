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

