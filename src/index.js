// Import vue component
import gifSearch from "./GifSearch.vue";

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component("gifSearch", gifSearch);
}

const plugin = {
  install,
};

let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

gifSearch.install = install;

export default gifSearch;
