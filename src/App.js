import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const Header = React.lazy(() => import("./Components/Header/Header"));
const Content = React.lazy(() => import("./Components/Content/Content"));
const Cart = React.lazy(() => import("./Components/Cart/Cart"));
const Detail = React.lazy(() => import("./Components/Detail/Detail"));
const Home = React.lazy(() => import("./Components/Home/Home"));
const Checkout = React.lazy(() => import("./Components/Checkout/Checkout"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Products" component={Content} />
            <Route exact path="/Cart" component={Cart} />
            <Route exact path="/Detail" component={Detail} />
            <Route exact path="/Checkout" component={Checkout} />
          </Switch>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
