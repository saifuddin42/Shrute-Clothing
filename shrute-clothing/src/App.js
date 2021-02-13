import React from "react";
import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import { Switch, Route, Link } from "react-router-dom";

import ShopPage from "./pages/shop/shop.component.jsx";

// const HatsPage = () => (
//   <div>
//     <h1>Hats Page</h1>
//   </div>
// );

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* <Route path="/shop/hats" component={HatsPage} /> */}
        <Route path="/shop" component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
