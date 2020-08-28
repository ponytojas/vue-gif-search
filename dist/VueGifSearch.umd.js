(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('axios')) :
  typeof define === 'function' && define.amd ? define(['exports', 'axios'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VueGifSearch = {}, global.axios));
}(this, (function (exports, axios) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

  //

  var script = {
    props: {
      apiKey: {
        type: String,
      },
      height: {
        type: Number,
        default: 256,
      },
      width: {
        type: Number,
        default: 256,
      },
      searchBar: {
        type: Boolean,
        default: true,
      },
      imgStyle: {
        type: String,
        default: "padding-top: 10px;margin: 0 10px; cursor: pointer",
      },
      row: {
        type: Boolean,
        default: true,
      },
      placeholder: {
        type: String,
        default: "Gif search...",
      },
      searchButtonText: {
        type: String,
        default: "Go!",
      },
      resultNumbers: {
        type: Number,
        default: 15,
      },
      clearSearchBar: {
        type: Boolean,
        default: true,
      },
      clearResultOnClick: {
        type: Boolean,
        default: true,
      },
    },
    data: function data() {
      return {
        searchText: "",
        result: [],
        direction: "",
      };
    },
    mounted: function() {
      this.direction = "flex-direction:  " + (this.row ? "row" : "column") + ";";
    },
    methods: {
      searchGifs: async function searchGifs() {
        var this$1 = this;

        this.result = [];
        await axios__default['default']
          .get(
            "https://api.giphy.com/v1/gifs/search?api_key=" +
              this.apiKey +
              "&q=" +
              this.searchText
          )
          .then(function (response) {
            this$1.searchText = "";
            var count = 0;
            for (var el of response.data.data) {
              this$1.result.push(el.images.original.url);
              if ((count += 1) >= this$1.resultNumbers) { break; }
            }
          });
        if (this.clearSearchBar) { this.searchText = ""; }
      },
      onClickImage: function onClickImage(image) {
        this.$emit("clicked", image.srcElement.currentSrc);
        if (this.clearResultOnClick) { this.result = []; }
      },
    },
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      var options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      var hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              var originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              var existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  var isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return function (id, style) { return addStyle(id, style); };
  }
  var HEAD;
  var styles = {};
  function addStyle(id, css) {
      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          var code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  { style.element.setAttribute('media', css.media); }
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              var index = style.ids.size - 1;
              var textNode = document.createTextNode(code);
              var nodes = style.element.childNodes;
              if (nodes[index])
                  { style.element.removeChild(nodes[index]); }
              if (nodes.length)
                  { style.element.insertBefore(textNode, nodes[index]); }
              else
                  { style.element.appendChild(textNode); }
          }
      }
  }

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", [
      _vm.searchBar
        ? _c(
            "div",
            {
              staticStyle: {
                display: "flex",
                "justify-content": "center",
                "align-items": "center"
              },
              on: {
                keyup: function($event) {
                  if (
                    !$event.type.indexOf("key") &&
                    _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                  ) {
                    return null
                  }
                  return _vm.searchGifs()
                }
              }
            },
            [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.searchText,
                    expression: "searchText"
                  }
                ],
                staticClass: "searchGifInput",
                attrs: { placeholder: _vm.placeholder },
                domProps: { value: _vm.searchText },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.searchText = $event.target.value;
                  }
                }
              }),
              _vm._v(" "),
              _c(
                "button",
                { staticClass: "buttonSearchGif", on: { click: _vm.searchGifs } },
                [_vm._v("\n      " + _vm._s(_vm.searchButtonText) + "\n    ")]
              )
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      this.result
        ? _c(
            "div",
            { staticStyle: { display: "flex", "justify-content": "center" } },
            [
              _c(
                "div",
                { staticClass: "container", style: _vm.direction },
                _vm._l(this.result, function(image) {
                  return _c("img", {
                    key: image.index,
                    style: _vm.imgStyle,
                    attrs: { height: _vm.height, width: _vm.width, src: image },
                    on: { click: _vm.onClickImage }
                  })
                }),
                0
              )
            ]
          )
        : _vm._e()
    ])
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-af682f22_0", { source: "\n.container[data-v-af682f22] {\n  margin-top: 15px;\n  display: flex;\n  overflow-x: scroll;\n  overflow-y: hidden;\n  white-space: nowrap;\n  width: 50%;\n}\n.searchGifInput[data-v-af682f22] {\n  width: 25rem;\n  height: 3.5vh;\n  padding-left: 1%;\n  margin-right: 10px;\n  border-radius: 0.25rem;\n  font-size: 1.25rem;\n  border-width: 0;\n  background-color: #f0f0f0;\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n}\n.buttonSearchGif[data-v-af682f22] {\n  --bg-opacity: 1;\n  background-color: #48bb78;\n  background-color: rgba(72, 187, 120, var(--bg-opacity));\n  border-radius: 0.375rem;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);\n  --text-opacity: 1;\n  color: #fff;\n  color: rgba(255, 255, 255, var(--text-opacity));\n  font-size: 1.25rem;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n  cursor: pointer;\n  box-sizing: border-box;\n  border-width: 0;\n  border-style: solid;\n  border-color: #e2e8f0;\n}\n.buttonSearchGif[data-v-af682f22]:hover {\n  background-color: #68d391;\n}\n\n/* Hide scrollbar for Chrome, Safari and Opera */\ndiv[data-v-af682f22]::-webkit-scrollbar {\n  display: none;\n}\n\n/* Hide scrollbar for IE, Edge and Firefox */\ndiv[data-v-af682f22] {\n  -ms-overflow-style: none; /* IE and Edge */\n  scrollbar-width: none; /* Firefox */\n}\n", map: {"version":3,"sources":["/home/ponytojas/Documents/gif/src/GifSearch.vue"],"names":[],"mappings":";AAwHA;EACA,gBAAA;EACA,aAAA;EACA,kBAAA;EACA,kBAAA;EACA,mBAAA;EACA,UAAA;AACA;AAEA;EACA,YAAA;EACA,aAAA;EACA,gBAAA;EACA,kBAAA;EACA,sBAAA;EACA,kBAAA;EACA,eAAA;EACA,yBAAA;EACA,wEAAA;AACA;AAEA;EACA,eAAA;EACA,yBAAA;EACA,uDAAA;EACA,uBAAA;EACA,2EAAA;EACA,iBAAA;EACA,WAAA;EACA,+CAAA;EACA,kBAAA;EACA,kBAAA;EACA,mBAAA;EACA,oBAAA;EACA,uBAAA;EACA,eAAA;EACA,sBAAA;EACA,eAAA;EACA,mBAAA;EACA,qBAAA;AACA;AAEA;EACA,yBAAA;AACA;;AAEA,gDAAA;AACA;EACA,aAAA;AACA;;AAEA,4CAAA;AACA;EACA,wBAAA,EAAA,gBAAA;EACA,qBAAA,EAAA,YAAA;AACA","file":"GifSearch.vue","sourcesContent":["<template>\n  <div>\n    <div\n      @keyup.enter=\"searchGifs()\"\n      v-if=\"searchBar\"\n      style=\"display: flex; justify-content: center; align-items: center\"\n    >\n      <input\n        v-model=\"searchText\"\n        :placeholder=\"placeholder\"\n        class=\"searchGifInput\"\n      />\n      <button @click=\"searchGifs\" class=\"buttonSearchGif\">\n        {{ searchButtonText }}\n      </button>\n    </div>\n    <div v-if=\"this.result\" style=\"display: flex; justify-content:center\">\n      <div class=\"container\" :style=\"direction\">\n        <img\n          :key=\"image.index\"\n          v-for=\"image in this.result\"\n          :height=\"height\"\n          :width=\"width\"\n          :src=\"image\"\n          :style=\"imgStyle\"\n          @click=\"onClickImage\"\n        />\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\nimport axios from \"axios\";\n\nexport default {\n  props: {\n    apiKey: {\n      type: String,\n    },\n    height: {\n      type: Number,\n      default: 256,\n    },\n    width: {\n      type: Number,\n      default: 256,\n    },\n    searchBar: {\n      type: Boolean,\n      default: true,\n    },\n    imgStyle: {\n      type: String,\n      default: \"padding-top: 10px;margin: 0 10px; cursor: pointer\",\n    },\n    row: {\n      type: Boolean,\n      default: true,\n    },\n    placeholder: {\n      type: String,\n      default: \"Gif search...\",\n    },\n    searchButtonText: {\n      type: String,\n      default: \"Go!\",\n    },\n    resultNumbers: {\n      type: Number,\n      default: 15,\n    },\n    clearSearchBar: {\n      type: Boolean,\n      default: true,\n    },\n    clearResultOnClick: {\n      type: Boolean,\n      default: true,\n    },\n  },\n  data() {\n    return {\n      searchText: \"\",\n      result: [],\n      direction: \"\",\n    };\n  },\n  mounted: function() {\n    this.direction = \"flex-direction:  \" + (this.row ? \"row\" : \"column\") + \";\";\n  },\n  methods: {\n    async searchGifs() {\n      this.result = [];\n      await axios\n        .get(\n          \"https://api.giphy.com/v1/gifs/search?api_key=\" +\n            this.apiKey +\n            \"&q=\" +\n            this.searchText\n        )\n        .then((response) => {\n          this.searchText = \"\";\n          let count = 0;\n          for (let el of response.data.data) {\n            this.result.push(el.images.original.url);\n            if ((count += 1) >= this.resultNumbers) break;\n          }\n        });\n      if (this.clearSearchBar) this.searchText = \"\";\n    },\n    onClickImage(image) {\n      this.$emit(\"clicked\", image.srcElement.currentSrc);\n      if (this.clearResultOnClick) this.result = [];\n    },\n  },\n};\n</script>\n\n<style scoped>\n.container {\n  margin-top: 15px;\n  display: flex;\n  overflow-x: scroll;\n  overflow-y: hidden;\n  white-space: nowrap;\n  width: 50%;\n}\n\n.searchGifInput {\n  width: 25rem;\n  height: 3.5vh;\n  padding-left: 1%;\n  margin-right: 10px;\n  border-radius: 0.25rem;\n  font-size: 1.25rem;\n  border-width: 0;\n  background-color: #f0f0f0;\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n}\n\n.buttonSearchGif {\n  --bg-opacity: 1;\n  background-color: #48bb78;\n  background-color: rgba(72, 187, 120, var(--bg-opacity));\n  border-radius: 0.375rem;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);\n  --text-opacity: 1;\n  color: #fff;\n  color: rgba(255, 255, 255, var(--text-opacity));\n  font-size: 1.25rem;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n  cursor: pointer;\n  box-sizing: border-box;\n  border-width: 0;\n  border-style: solid;\n  border-color: #e2e8f0;\n}\n\n.buttonSearchGif:hover {\n  background-color: #68d391;\n}\n\n/* Hide scrollbar for Chrome, Safari and Opera */\ndiv::-webkit-scrollbar {\n  display: none;\n}\n\n/* Hide scrollbar for IE, Edge and Firefox */\ndiv {\n  -ms-overflow-style: none; /* IE and Edge */\n  scrollbar-width: none; /* Firefox */\n}\n</style>\n"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = "data-v-af682f22";
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  // Import vue component

  function install(Vue) {
    if (install.installed) { return; }
    install.installed = true;
    Vue.component("gifSearch", __vue_component__);
  }

  var plugin = {
    install: install,
  };

  var GlobalVue = null;
  if (typeof window !== "undefined") {
    GlobalVue = window.Vue;
  } else if (typeof global !== "undefined") {
    GlobalVue = global.Vue;
  }
  if (GlobalVue) {
    GlobalVue.use(plugin);
  }

  __vue_component__.install = install;

  exports.default = __vue_component__;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
