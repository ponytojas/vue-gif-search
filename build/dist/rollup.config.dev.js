"use strict";

var _interopRequireDefault = require("/home/ponytojas/Documents/gif/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pluginCommonjs = _interopRequireDefault(require("@rollup/plugin-commonjs"));

var _rollupPluginVue = _interopRequireDefault(require("rollup-plugin-vue"));

var _pluginBuble = _interopRequireDefault(require("@rollup/plugin-buble"));

// Convert CommonJS modules to ES6
// Handle .vue SFC files
// Transpile/polyfill with reasonable browser support
var _default = {
  input: "src/index.js",
  // Path relative to package.json
  external: ["axios"],
  output: {
    name: "VueGifSearch",
    exports: "named",
    globals: {
      axios: "axios"
    }
  },
  plugins: [(0, _pluginCommonjs["default"])(), (0, _rollupPluginVue["default"])({
    css: true,
    // Dynamically inject css as a <style> tag
    compileTemplate: true // Explicitly convert template to render function

  }), (0, _pluginBuble["default"])({
    transforms: {
      asyncAwait: false,
      forOf: false
    }
  }) // Transpile to ES5
  ]
};
exports["default"] = _default;