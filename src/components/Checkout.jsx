import { useContext } from "react";
import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../assets/utils/formatting.js";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import useHttp from "../hooks/useHttp.js";

export default function Checkout(){
  const cartCtx = useContext(CartContext)
  const userProgresCtx = useContext(UserProgressContext)

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity, 
    0
  );

  function handleClose(){
    userProgresCtx.hideCheckout();
  }

  async function handleSubmit(event){
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries())

    await fetch('http://localhost:3000/orders', {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order: {
            items: cartCtx.items,
            customer: customerData
          }
        })
      }
    );
  }

  return (
    <Modal open={userProgresCtx.progress === "checkout"} onclose={handleClose}>
      <form onSubmit={handleSubmit}>
          <h2>Checkout</h2>
          <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
          <Input label="First Name" id="name" type="text"/>
          <Input label="Email Address" id="email" type="email"/>
          <Input label="Street" id="street" type="text"/>
          <div className="control-row">
            <Input label="Postal Code" id="postal-code" type="text"/>
            <Input label="City" id="city" type="text"/>
          </div>
          <p className="modal-actions">
            <Button textOnly type="button" onClick={handleClose}>Close</Button>
            <Button>Proceed</Button>
          </p>
      </form>
    </Modal>
  )
}
