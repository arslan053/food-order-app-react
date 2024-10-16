import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import Button from "./UI/Button";
import { currencyFormatter } from "../assets/utils/formatting";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart(){
  const cartCtx = useContext(CartContext)
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0)

  function handleCloseCart(){
    userProgressCtx.hideCart();
  }

  function handeGoToCheckout(){
    userProgressCtx.showCheckout();
  }

  return <Modal className="cart" open={userProgressCtx.progress === 'cart'} onClose={cartCtx.progress === "cart" ? handleCloseCart : null}>
    <ul>
      {cartCtx.items.map((item) => (
        <CartItem 
        id={item.id}
        item={item}
        onIncrese={() => cartCtx.addItem(item)}
        onDecrease={() => cartCtx.removeItem(item.id)}
        />
      ))}
    </ul>
    <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
    <p className="modal-actions">
      <Button onClick={handleCloseCart} textOnly>Close</Button>
      <Button onClick={handeGoToCheckout} >Go to checkout</Button>
    </p>
  </Modal>
}
