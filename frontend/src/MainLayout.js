import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";

function MainLayout() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/product/:id" component={ProductScreen} />
            <Route exact path={["/cart", "/cart/:id"]} component={CartScreen} />
            <Route exact path="/login" component={LoginScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
