import { useContext } from "react"
import CartContext from "../store/CartContext.jsx"
import { currencyFormatter } from "../assets/utils/formatting.js";

export default function CartItem({ item, onIncrese, onDecrease }){
  const cartContext = useContext(CartContext)
  const id = item.id;
  function handleSubtractItem(){
    cartContext.removeItem(item.id);
  }

  function handleAddItem(){
    cartContext.addItem(item);
  }
  return (
    <li className="cart-item"s>
      <p>{item.name} - {item.quantity} x {currencyFormatter.format(item.price)}</p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{item.quantity}</span>
        <button onClick={onIncrese}>+</button>
      </p>
    </li>
  )
}
