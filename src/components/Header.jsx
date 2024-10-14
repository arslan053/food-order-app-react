import { useContext } from 'react'
import logoImg from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext'
import UserProgressContext from '../store/UserProgressContext';

export default function Header(){
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext)

  function handleOpenCart(){
    userProgressCtx.showCart();
  }
  const totalCartItems = cartCtx.items.reduce((totalNumberofItems, item) => {
    return totalNumberofItems + item.quantity;
  }, 0)
  return(
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Resturant image" />
        <h1>Food App</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleOpenCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  )
}
