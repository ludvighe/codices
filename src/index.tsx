/* @refresh reload */
import { lazy } from "solid-js";
import { render } from "solid-js/web";

import "./index.scss";
const MainPage = lazy(() => import("./components/layout/"));

render(() => <MainPage />, document.getElementById("root") as HTMLElement);
