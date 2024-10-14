import { Children, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, className='' }){
  const dialog = useRef();

  useEffect( () => {
    const modal = dialog.current;
    if(open){
      modal.showModal();
    } 

    return () => modal.close(); // kept in modal if value oof dialog change ssomeime it shoud work techinically not required but recommended pattren.
  },[open])

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById('modal')
  )
}
