# OpenTelemetry JavaScript/Node Console Tracer

![Build Status](https://github.com/serkan-ozal/otel-js-console-tracer/actions/workflows/build.yml/badge.svg)
![NPM Version](https://badge.fury.io/js/otel-console-tracer.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

NPM package which injects current/active **OpenTelemetry** trace id and span id along with log level into the logs 
printed over `console` logging methods (`trace`, `debug`, `info`, `log`, `warn`, `error`).
- If the there is no active span in the current context, only log level is injected into the logs.
- If the level of the console logging method is equal or bigger than configured level, the log is printed, Otherwise, it is ignored.

You can find the supported log levels and their orders in the following table:
| Log Level Name | Log Level  |
| -------------- | ---------- |
| NONE           |          0 |
| TRACE          |          1 |
| DEBUG          |          2 |
| INFO           |          3 |
| LOG            |          3 |
| WARN           |          4 |
| ERROR          |          5 |

**Note:** The default log level is `NONE` and which means that all the logs are printed by default
if you don't configure any log level threshold.


## Installation

To install the package, you can use NPM (or Yarn):

```bash
npm install --save otel-console-tracer
```

**Note:** Requires `@opentelemetry/api` version `1.0.0`+


## Usage

* Initialize `otel-console-tracer` during bootstrap for Node.js app

  - **During Bootstrap**
    You can trigger initialization automatically by setting `NODE_OPTIONS` environment variable 
    to `otel-console-tracer` bootstrapper (`otel-console-tracer/dist/bootstrap`) to initialize at startup:
    ```bash
      NODE_OPTIONS="--require otel-console-tracer/dist/bootstrap"
      node app.js
    ```  
    **or** by adding the `--require` option into the Node.js command line options :
    ```bash
    node --require otel-console-tracer/dist/bootstrap app.js
    ```

  - **In Code**
    In addition to automated initialization without code change described above, 
    you can also initialize `otel-console-tracer` in your code:
    ```javascript
    const { init } = require('otel-console-tracer');
    // or use the following for ES modules
    // import { init } from 'otel-console-tracer';
    
    init();
    ```

    This kind of initialization might be useful in cases where configuring bootstrap is not possible
    (for ex. if you don't have access to the startup script of the Node.js app, so you cannot configure bootstrap options).


* **Optionally**, you can configure log level threshold (the default log level is `NONE`):

    - **By environment variable:**
      Set `OTEL_CONSOLE_TRACER_LOG_LEVEL` environment variable to any supported log level.
      ```
      OTEL_CONSOLE_TRACER_LOG_LEVEL=INFO
      ```  


## Examples

You can find examples under `examples` directory.
To be able to run the example, you can run the following command:
```bash
npm run example
```


## Roadmap

- Print traced logs in JSON format
- Custom log format


## Issues and Feedback

[![Issues](https://img.shields.io/github/issues/serkan-ozal/otel-js-console-tracer.svg)](https://github.com/serkan-ozal/otel-js-console-tracer/issues?q=is%3Aopen+is%3Aissue)
[![Closed issues](https://img.shields.io/github/issues-closed/serkan-ozal/otel-js-console-tracer.svg)](https://github.com/serkan-ozal/otel-js-console-tracer/issues?q=is%3Aissue+is%3Aclosed)

Please use [GitHub Issues](https://github.com/serkan-ozal/otel-js-console-tracer/issues) for any bug report, feature request and support.


## Contribution

[![Pull requests](https://img.shields.io/github/issues-pr/serkan-ozal/otel-js-console-tracer.svg)](https://github.com/serkan-ozal/otel-js-console-tracer/pulls?q=is%3Aopen+is%3Apr)
[![Closed pull requests](https://img.shields.io/github/issues-pr-closed/serkan-ozal/otel-js-console-tracer.svg)](https://github.com/serkan-ozal/otel-js-console-tracer/pulls?q=is%3Apr+is%3Aclosed)
[![Contributors](https://img.shields.io/github/contributors/serkan-ozal/otel-js-console-tracer.svg)]()

If you would like to contribute, please
- Fork the repository on GitHub and clone your fork.
- Create a branch for your changes and make your changes on it.
- Send a pull request by explaining clearly what is your contribution.

> Tip:
> Please check the existing pull requests for similar contributions and
> consider submit an issue to discuss the proposed feature before writing code.


## License

Licensed under [MIT License](LICENSE).
