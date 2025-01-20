import { Cart } from "@/services/cart/cartServices";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const cartCtrl = new Cart()

export function CartProvider(props) {

    
    const { children } = props;
    const [cart, setCart] = useState(null);
    const [total, setTotal] = useState(0)


    useEffect(() => {
      const fetchBooksData = async ()=>{
        const response = await cartCtrl.getAll()
        setCart(response)
      }
      fetchBooksData()
    }, [])
    

    const addCart = (idBook)=>{
        cartCtrl.add(idBook);
        refreshCart()
    }
    const refreshCart = () =>{
        setCart(cartCtrl.getAll())
        setTotal(()=>0)
    }
    const deleteItem = (idItem)=>{
        cartCtrl.deleteItem(idItem);
        refreshCart();
    }
    const changeQuantityItems = (idItem, newQuantity)=>{
        cartCtrl.changeQuantityItems(idItem, newQuantity)
        refreshCart();
    }

    const data = {
        cart,
        total,
        setTotal,
        addCart,
        deleteItem,
        deleteAllItems: "",
        changeQuantityItems,
    };
    return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
}
