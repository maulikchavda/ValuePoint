import { lazy } from "react";

const HomePage = lazy(() => import("../pages/homepage"));

const routes = [
  {
    path: "/",
    exact: true,
    name: "Home",
    component: HomePage,
  },
];

export default routes;
