v1.0.0 First Version
====================

 - [v1.0.0:README.md](https://github.com/CapJS/Logger/blob/v1.0.0/README.md)


v1.0.1 (Obsolete)
=================

 - [v1.0.1:README.md](https://github.com/CapJS/Logger/blob/v1.0.1/README.md)
 - Default Log Level: Associate by default a level to `logger.log(...args)` with argument `defaultLevelLog`.
 - **`logger.getLevelNumber(level)`**: Retorna el numero asociado al `Level` indicado.
 - **`logger.logger()`**: Require a number for `level` parameter.


v1.2.0
======

 - Option `printLevel` **Boolean** (Default: `true`): Show or hide level at print.
 - Option `colorful` **Boolean** (Default: `true`): Print or not the message colorful.
 - Option `colors` **Object** (Default: {}): Set colors.
     - hidden: reset.
     - none: reset.
     - emergency: yellow.
     - alert: yellow.
     - critical: red.
     - error: red.
     - warning: yellow.
     - notice: cyan.
     - informational: green.
     - debug: reset.

