# Logger

A [Syslog](https://en.wikipedia.org/wiki/Syslog) based on the standard [RFC 5424](https://tools.ietf.org/html/rfc5424#page-11).



### Syslog Message Severities

| Numerical Code | Severity |
| -------------- | --- |
| 0 | **Emergency**: system is unusable |
| 1 | **Alert**: action must be taken immediately |
| 2 | **Critical**: critical conditions |
| 3 | **Error**: error conditions |
| 4 | **Warning**: warning conditions |
| 5 | **Notice**: normal but significant condition |
| 6 | **Informational**: informational messages |
| 7 | **Debug**: debug-level messages |



### Additional Codes

| Numerical Code | Severity |
| -------------- | --- |
| -2 | **Hidden**: hidden all messages that using this logger. |
| -1 | **None**: is undefined |



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
- `logger.emergency()` abbreviated `logger.emerg()`
- `logger.alert()`
- `logger.critical()` abbreviated `logger.crit()`
- `logger.error()` abbreviated `logger.err()`
- `logger.warning()` abbreviated `logger.warn()`
- `logger.notice()`
- `logger.informational()` abbreviated `logger.info()`
- `logger.debug()` abbreviated `logger.deb()`


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


