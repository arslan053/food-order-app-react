import { useContext } from "react";
import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../assets/utils/formatting.js";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./UI/Error.jsx";

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}

export default function Checkout(){
  const{data, isLoading, error, sendRequest, clearData } = useHttp('http://localhost:3000/orders',requestConfig )
  const cartCtx = useContext(CartContext)
  const userProgresCtx = useContext(UserProgressContext)

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity, 
    0
  );

  function handleClose(){
    userProgresCtx.hideCheckout();
  }

  function handleFinish(){
    userProgresCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  async function handleSubmit(event){
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries())
    const data = JSON.stringify({
      order: {
        items: cartCtx.items,
        customer: customerData
      }
    })
    sendRequest(data);
  }

  let actions = (
    <>
     <Button textOnly type="button" onClick={handleClose}>Close</Button>
     <Button>Proceed</Button>
    </>
  )

  if(isLoading){
    actions = <span>Sending Order Data... </span>
  }

  if(data && !error){
    return <Modal open={userProgresCtx.progress === "checkout"} onclose={handleClose}>
      <h2>Success!</h2>
      <p>YOur Order submitted successfuly</p>
      <p>We will get back to you with more detail in few minutes</p>
      <p className="modal-actions">
        <Button onClick={handleFinish}>Okay</Button>
      </p>
    </Modal>
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
          {error && <Error title="Failed to submit order" message={error}/>}
          <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  )
}