
import { LuckDraw } from "./luck-draw/luck-draw.vue";
LuckDraw.install = (app) => {
  app.component("luck-draw", LuckDraw);
  return app;
};
export default LuckDraw;
