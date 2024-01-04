import React, { useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import cartContext from '../../context/cart/cartContext';
import { useLocation } from 'react-router-dom';

const CartIconWithCounter = () => {
  const { cartProducts } = useContext(cartContext);
  const location = useLocation();

  const isCartRoute = location.pathname === '/cart';
  // console.log(cartProducts.length)

  return (
    <div className={`relative ${isCartRoute ? 'text-blue-800' : 'hover:text-blue-700'}`} style={{ marginRight:'30px', cursor:'pointer', "&:hover":{text: "blue"}}}>
      <FontAwesomeIcon icon={faShoppingCart} size="lg" style={{marginTop:'22px'}}/>
      <span className="absolute top-0 text-white rounded-full" style={{width:'16px', height:'16px', lineHeight:'0.5rem', marginTop:'15px', fontSize:'0.76rem', padding:'0.27rem', backgroundColor:'red'}}>
        {cartProducts.length ? cartProducts.length : 0}
      </span>
    </div>
  );
};

export default CartIconWithCounter;
