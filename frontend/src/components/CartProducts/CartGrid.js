import React, { useContext, useEffect, useState } from 'react';
import cartContext from '../../context/cart/cartContext';
import { removeFromCart } from '../../context/cart/cartUtils';


const CartGrid = () => {
  const {cartProducts, setCartProducts} = useContext(cartContext);
  console.log(cartProducts)

  const handleRemoveFromCart = (itemIdToRemove) => {
    removeFromCart(cartProducts, setCartProducts, itemIdToRemove);
  };

  const getDiscountedPrice = (price, discountPercentage) => {
    return parseFloat((price * (1 - discountPercentage / 100)))
  }

  return (
    <>
    <div style={{paddingBottom:'20px'}}>
      <div  className='flex justify-between'>
      <p className='pt-20 pl-10 text-lg text-base'>Total Products: {cartProducts ? cartProducts.length : 0}</p>
      <p className='pt-20 pr-10 text-lg text-base'>Total Amount: ${cartProducts.reduce((prev, current)=> prev+getDiscountedPrice(current.price, current.discountPercentage), 0).toFixed(2)}</p>
      </div>
    {cartProducts.length>0 ?
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 m-4 sm:m-10">
      {cartProducts.map((product) => (
        <div key={product.id} className="flex flex-col h-full bg-white p-8 rounded" style={{boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
          <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-cover mb-4" />
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="text-gray-600">{product.description}</p>
          <del className="mt-2 text-red-500">${(product.price).toFixed(2)}</del>
          <p className="mt-1 text-blue-500">${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}</p>
          <p className="mt-2 text-sm text-gray-500">Rating: {product.rating}</p>
          <div className="mt-auto">
              <button onClick={() => handleRemoveFromCart(product.id)} className='mt-1' style={{backgroundColor:'rgba(214, 19, 19, 0.89)'}} >Remove From Cart</button>
          </div>
        </div>
      ))}
       </div>: 
       <div className='text-lg text-base flex flex-col justify-center items-center h-[70vh]'>
        <img width="200px" height="200px" src="https://cdn3.iconfinder.com/data/icons/shopping-and-ecommerce-29/90/empty_cart-512.png"></img>
        <p className='pl-5'> Cart is empty</p>
        </div>
    }
    </div>
    </>
  );
};

export default CartGrid;
