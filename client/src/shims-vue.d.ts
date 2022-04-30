/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
//solves Could not find a declaration file for module ts
declare module "@/*.js";
declare module "src/store/*.js";
