// ProductGrid.js

import React, { useContext, useEffect, useState } from 'react';
import SearchBar from '../Search/SearchBar';
import { addToCart, removeFromCart } from '../../context/cart/cartUtils';
import cartContext from '../../context/cart/cartContext';

const ProductGrid = () => {

  const { cartProducts, setCartProducts } = useContext(cartContext);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [loading, setLoading] = useState(true);


  const handleAddToCart = (productId) => {
    const selectedProduct = products.find((product) => product.id === productId);
    addToCart(cartProducts, setCartProducts, selectedProduct);
    console.log(cartProducts)
  };

  const handleRemoveFromCart = (itemIdToRemove) => {
    removeFromCart(cartProducts, setCartProducts, itemIdToRemove);
  };

  useEffect(() => {
    // Fetch products 
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {setProducts(data.products); setLoading(false)})
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  useEffect(()=>{
    // console.log(productName)
    // console.log(selectedPrices);
    const namedProducts = products.filter((product)=> product.title.toLowerCase().includes(productName.toLowerCase()));
    if(selectedPrices.length>0){
      const filteredProducts = namedProducts.filter((product) => {
        // console.log(selectedPrices.some((selectedPrice) => product.price >= selectedPrice.value.start && product.price <= selectedPrice.value.stop))
        return selectedPrices.some((selectedPrice) => 
        {
          const productDiscountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
          if(selectedPrice.value.start)
          {
            if(selectedPrice.value.stop){
             return productDiscountedPrice >= selectedPrice.value.start && productDiscountedPrice <= selectedPrice.value.stop
            }else{
              return productDiscountedPrice >= selectedPrice.value.start
            }
          }else{
            if(selectedPrice.value.stop){
              return productDiscountedPrice <= selectedPrice.value.stop
            }
          }
        });
      });
      setFilteredProducts(filteredProducts);
    }else{
      setFilteredProducts(namedProducts);
    }
  },[productName, products, selectedPrices])

  return (
    <>
    <SearchBar setProductName={setProductName} setSelectedPrices={setSelectedPrices}/>
    {!loading ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 m-4 sm:m-10">
      {filteredProducts && filteredProducts.map((product) => (
        <div key={product.id} className="flex flex-col h-full bg-white p-8 rounded" style={{boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
          <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-cover mb-4" />
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="text-gray-600">{product.description}</p>
          <del className="mt-2 text-red-500">${(product.price).toFixed(2)}</del>
          <p className="mt-1 text-blue-500">${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}</p>
          <p className="mt-2 text-sm text-gray-500">Rating: {product.rating}</p>
          {!cartProducts.some((cartProduct)=> product.id===cartProduct.id) ?
            <div className="mt-auto">
                <button onClick={() => handleAddToCart(product.id)} className='mt-1'>Add to cart</button>
            </div> 
            :
            <div className="mt-auto">
              <button onClick={() => handleRemoveFromCart(product.id)} className='mt-1' style={{backgroundColor:'rgba(214, 19, 19, 0.89)'}}>Remove From cart</button>
            </div>
          }
        </div>
      ))}
    </div>
    :<div>
      <p className='p-20 text-lg text-base'>Loading...</p>
    </div>}
    </>
  );
};

export default ProductGrid;
