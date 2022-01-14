<div id="top"></div>

<p align="center">
  <a href="https://github.com/codemantion/logger/actions">
    <img alt="Tests Passing" src="https://github.com/codemantion/logger/workflows/Tests/badge.svg" />
  </a>
  <a href="https://github.com/codemantion/logger/actions">
    <img alt="Build Passing" src="https://github.com/codemantion/logger/workflows/Build/badge.svg" />
  </a>
  <a href="https://github.com/codemantion/logger/issues">
    <img alt="Issues" src="https://img.shields.io/github/issues/codemantion/logger?color=0088ff" />
  </a>
  <a href="https://github.com/codemantion/logger/pulls">
    <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/codemantion/logger?color=0088ff" />
  </a>
</p>



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/codemantion/logger">
    <img src="https://raw.githubusercontent.com/codemantion/common-assets/master/logos/png/logger.png" alt="Logo" width="220" height="220">
  </a>

<h3 align="center">[JS] Logger ( Simple & minimal )</h3>

  <p align="center">
    An simple logger for browser console
    <br />
    <a href="#installation">Install</a>
    ·
    <a href="https://github.com/codemantion/logger/issues">Report Bug</a>
    ·
    <a href="https://github.com/codemantion/logger/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#config-options">Config Options</a></li>
<!--     <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#logging">logging...</a></li>
        <li><a href="#configurations">Configurations</a></li>
        <li><a href="#configurations">Styles</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributors">Contributors</a></li> -->
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

A simple and lightweight logger for the browsers

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Installation
* npm
  ```sh
  npm install @codemantion/logger
  ```
* yarn
  ```sh
  yarn add @codemantion/logger
  ```
  
## Usage
### import
```js
import logger from "@codemantion/logger";
```

### using log (`.log`)
```js
logger.log("Your message");
logger.log("message1", "message2", "message3"); // multiple message
logger.log("info", "Your info message"); // with type
```
log types: log, info, warn, error
##### log output
<p>
  <span style="background: #222; color: #bada55">[log]:info</span> 2022-01-14T15:34:44.979Z: Your message
</p>


### using info (`.info`)
```js
logger.info("Your info message");
logger.info("message1", "message2", "message3"); // multiple message
logger.log("info", "Your info message"); // with type
```
##### info output
<p>
  <span style="background: #222; color: #bada55">[log]:info</span> 2022-01-14T15:34:44.979Z: Your info message
</p>


### using warning (`.worn`)
```js
logger.warn("Your warning message");
logger.warn("message1", "message2", "message3"); // multiple message
logger.log("warn", "Your warning message"); // with type
```
##### warning output
<p>
  <span style="background: #ffdd76; color: #222">[log]:warn</span> 2022-01-14T15:34:44.979Z: Your warning message
</p>


### using warning (`.error`)
```js
logger.error("Your error message");
logger.error("message1", "message2", "message3"); // multiple message
logger.log("error", "Your error message"); // with type
```
##### error output
<p>
  <span style="background: #ffc0c0; color: #ff0000">[log]:error</span> 2022-01-14T15:34:44.979Z: Your error message
</p>

## Config Options
#### Override options
```js
logger.setConfig({
  // remove label
  isShowLabel: false,
  
  // remove timestamp
  isShowTimestamp: false
});

```
#### Disable logging
```js
logger.setConfig({
  isEnable: process.env.NODE_ENV === "development"
});
```

#### List of all options
| key                | Type          | Default Value | Description                     |
| ------------------ | ------------- | ------------- | ------------------------------- |
| `isEnable`         | `boolean`     | `true`        | Enable or disable logging       |
| `name`             | `string`      |  log          | Name of the output log          |
| `styles`           | <code>{ <br> &emsp;label: {<br> &emsp;&emsp; log: string; <br> &emsp;&emsp; info: string; <br> &emsp;&emsp; warn: string; <br> &emsp;&emsp; error: string; <br> &emsp;}; <br>}</code> | <code> { <br> &emsp; label: {<br> &emsp;&emsp; log: 'background: #222; color: #bada55',<br> &emsp;&emsp; info: 'background: #222; color: #bada55',<br> &emsp;&emsp; warn: 'background: #ffdd76; color: #222',<br> &emsp;&emsp; error: 'background: #ffc0c0; color: #ff0000',<br> &emsp;},<br>}</code> | Override the css of label |
| `templates`        | <code>{ <br> &emsp;log: string; <br> &emsp;timestamp: string;<br>};</code> | <code>{ <br> &emsp;log: '\[%name%]:%type%', <br> &emsp;timestamp: '%timestamp%:',<br>};</code> | Template for printing label and timestamp |
| `isShowLabel`      | `boolean`     | `true`       | Print log without label          |
| `isShowTimestamp`  | `boolean`     | `true`       | Print log without timestamp      |
| `isUseNative`      | `boolean`     | `false`      | Use native console on print logs |
| `isPrintOnConsole` | `boolean`     | `true`       | Print logs on console or not     |