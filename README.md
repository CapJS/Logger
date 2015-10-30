# Logger

A [Syslog](https://en.wikipedia.org/wiki/Syslog) based on the standard [RFC 5424](https://tools.ietf.org/html/rfc5424).


## Installation

**With [npm](https://www.npmjs.com/) install:**

```bash
npm install --save cap-logger
```


## Yout first Log

```javascript
let log = require("cap-logger");

log("Debug Consol.");
log.warn("The Consol has log.");
```

```bash
[2015/5/20 12:00:10] DEBUG: Debug Consol.
[2015/5/20 12:00:10] WARNING: The Consol has log.
```


## Yout first Logger

```javascript
let logger = require("cap-logger");

var log = new logger({
	prefix: function () {
		return ">>> " + (new Date()).toISOString() + " ::";
	},
});

log.log("Debug Consol.");
log.warn("The Consol has log.");
```

```bash
>>> 2015-5-20T13:00:11.093Z :: DEBUG: Debug Consol.
>>> 2015-5-20T13:00:11.099Z :: WARNING: The Consol has log.
```


## Logs level

The Logs Level are a indicator to show depending the level defined en los loggers.

- `logger.log()`
- `logger.emergency()` abbr `logger.emerg()`
- `logger.alert()`
- `logger.critical()` abbr `logger.crit()`
- `logger.error()` abbr `logger.err()`
- `logger.warning()` abbr `logger.warn()`
- `logger.notice()`
- `logger.informational()` abbr `logger.info()`
- `logger.debug()` abbr `logger.deb()`


Example:

```javascript
// app.js
let logger = require("cap-logger");

var log = new logger({
	prefix: function () {
		return ">>> " + (new Date()).toISOString() + " ::";
	},
});

log.log("Debug Consol.");
log.warn("The Consol has log.");
```

```bash
$ DEBUG=alert npm start

>>> 2015-5-20T13:00:11.093Z :: DEBUG: Debug Consol.
```

```bash
$ DEBUG=warning npm start

>>> 2015-5-20T13:00:11.093Z :: DEBUG: Debug Consol.
>>> 2015-5-20T13:00:11.099Z :: WARNING: The Consol has log.
```


