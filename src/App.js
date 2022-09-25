import React, { Suspense } from "react";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RoutesFile from "./utils/routs";

const Header = React.lazy(() => import("./components/Header/Header"));
// const Content = React.lazy(() => import("./components/Content/Content"));
// const Cart = React.lazy(() => import("./components/Cart/Cart"));
// const Detail = React.lazy(() => import("./components/Detail/Detail"));
// const Home = React.lazy(() => import("./components/Home/Home"));
// const Checkout = React.lazy(() => import("./components/Checkout/Checkout"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            {RoutesFile.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}
            {/*<Route exact path="/" component={Home} />*/}
            {/*<Route exact path="/Products" component={Content} />*/}
            {/*<Route exact path="/Cart" component={Cart} />*/}
            {/*<Route exact path="/Detail" component={Detail} />*/}
            {/*<Route exact path="/Checkout" component={Checkout} />*/}
          </Switch>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
