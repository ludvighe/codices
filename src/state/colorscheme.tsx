import { createSignal } from "solid-js";

export const [colorscheme, setColorscheme] = createSignal({
  "--clr-bg-dark": "#17191e",
  "--clr-bg-light": "#1a1c23",
  "--clr-bg-highlight": "#242731",
  "--clr-primary": "#6e142c",
  "--clr-success": "#00650e",
});
