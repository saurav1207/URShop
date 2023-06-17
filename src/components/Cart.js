import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cartproducts, setCartproducts] = useState([]);

  useEffect(() => {
    const storedCartproducts = JSON.parse(localStorage.getItem('cartproducts')) || [];
    setCartproducts(storedCartproducts);
  }, []);

  const incrementQuantity = (productId) => {
    const updatedCartproducts = cartproducts.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }
      return product;
    });
    setCartproducts(updatedCartproducts);
    localStorage.setItem('cartproducts', JSON.stringify(updatedCartproducts));
  };

  const decrementQuantity = (productId) => {
    const updatedCartproducts = cartproducts.map((product) => {
      if (product.id === productId && product.quantity > 1) {
        return {
          ...product,
          quantity: product.quantity - 1,
        };
      }
      return product;
    });
    setCartproducts(updatedCartproducts);
    localStorage.setItem('cartproducts', JSON.stringify(updatedCartproducts));
  };

  const removeProduct = (productId) => {
    const updatedCartproducts = cartproducts.filter((product) => product.id !== productId);
    setCartproducts(updatedCartproducts);
    localStorage.setItem('cartproducts', JSON.stringify(updatedCartproducts));
  };

  const calculateProductPrice = (product) => {
    return product.price * product.quantity;
  };

  return (
    <div className="container">
      <h2 className="text-center">Cart Page</h2>
      {cartproducts.length > 0 ? (
        <div>
          {cartproducts.map((product) => (
            <div key={product.id} className="cart-product">
              <img src={product.thumbnail} alt="" className="cart-product-image" />
              <div className="cart-product-details">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">Price: ${calculateProductPrice(product)}</p>
                <p className="product-quantity">Quantity: {product.quantity}</p>

                <div className="action-buttons">
                  <button className="inc-btn" onClick={() => decrementQuantity(product.id)}>
                    -
                  </button>
                  <button className="dec-btn" onClick={() => incrementQuantity(product.id)}>
                    +
                  </button>
                  <button className="remove-btn" onClick={() => removeProduct(product.id)}>
                    Remove
                  </button>
                  <Link to={`/confirm-order/${product.id}`} className="buy-btn">
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-cart-message">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
