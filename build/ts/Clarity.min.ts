import Vue from "vue/dist/vue.js";
import "./Browser/BrowserUtils.ts";
import "./Extensions/HTMLElement.ts";
import "./Extensions/NodeList.ts";
import "./Extensions/Object.ts";
import "./Extensions/String.ts";
import Clarity from "./Framework/Clarity.ts";
import ClarityFormValidator from "./Component/FormValidation/ClarityFormValidator.vue";
import FormGenerator from "./Component/FormGenerator/ClarityFormGenerator.vue";
import ClarityGrid from "./Component/Grid/ClarityGrid.vue";
import ClarityModal from "./Component/Modal/ClarityModal.vue";
import ClarityTabs from "./Component/Tabs/ClarityTabs.vue";

Vue.component("clarity-form-validator", ClarityFormValidator);
Vue.component("clarity-form-generator", FormGenerator);
Vue.component("clarity-grid", ClarityGrid);
Vue.component("clarity-modal", ClarityModal);
Vue.component("clarity-tabs", ClarityTabs);

window.clarity = window.clarity || new Clarity();
window.clarity.validation.initialize();
