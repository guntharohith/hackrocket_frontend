import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import ScrollToTop from './components/ScrollToTop'
import Orders from "./pages/Orders";
import { UserRoute } from './utils/helper'

function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToTop>
        <Switch>
          <Route exact path='/'><Home /></Route>
          <Route exact path='/login'><Login /></Route>
          <Route exact path='/signup'><Signup /></Route>
          <Route exact path='/products'><Products /></Route>
          <Route exact path='/products/:id'><ProductDetail /></Route>
          <UserRoute exact path='/cart' component={Cart}/>
          <UserRoute exact path='/orders' component={Orders}/>
        </Switch>
      </ScrollToTop>
      <Footer />
    </Router>
  );
}

export default App;
