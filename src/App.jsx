import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import Cart from "./components/Cart.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";

function App() {
  return (
    <>
    <CartContextProvider>
      <UserProgressContextProvider>
        <Header></Header>
        <Meals/>
        <Cart/>
      </UserProgressContextProvider>
     </CartContextProvider>
    </>
  );
}

export default App;
