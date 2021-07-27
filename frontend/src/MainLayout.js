import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderDetailsScreen from "./screens/OrderDetailsScreen";
import AdminUserListScreen from "./screens/AdminUserListScreen";
import AdminUserEditScreen from "./screens/AdminUserEditScreen";
import AdminProductListScreen from "./screens/AdminProductListScreen";
import AdminOrderListScreen from "./screens/AdminOrderListScreen";

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
            <Route exact path="/register" component={RegisterScreen} />
            <Route
              exact
              path="/admin/userlist"
              component={AdminUserListScreen}
            />
            <Route
              exact
              path="/admin/productlist"
              component={AdminProductListScreen}
            />
            <Route
              exact
              path="/admin/orderlist"
              component={AdminOrderListScreen}
            />

            <Route
              exact
              path="/admin/user/:id/edit"
              component={AdminUserEditScreen}
            />
            <Route exact path="/profile" component={UserProfileScreen} />
            <Route exact path="/shipping" component={ShippingScreen} />
            <Route exact path="/payment" component={PaymentScreen} />
            <Route exact path="/placeorder" component={PlaceOrderScreen} />
            <Route exact path="/order/:id" component={OrderDetailsScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
