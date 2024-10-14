import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";

function App() {
  return (
    <>
    <CartContextProvider>
      <Header></Header>
      <Meals/>
     </CartContextProvider>
    </>
  );
}

export default App;
