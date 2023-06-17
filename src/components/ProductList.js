import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('https://dummyjson.com/products')
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addToCart = (productId) => {
    const product = products.find((p) => p.id === productId);

    const cartItem = {
      id: product.id,
      thumbnail: product.thumbnail,
      price: product.price,
      quantity: 1,
    };

    const existingCartItems = JSON.parse(localStorage.getItem('cartproducts')) || [];
    const updatedCartItems = [...existingCartItems, cartItem];

    console.log(`Product with ID ${productId} added to cart`);
    window.alert('Item added to cart!');

    localStorage.setItem('cartproducts', JSON.stringify(updatedCartItems));
  };

  const handleBuyNow = (productId) => {
    const selectedProduct = products.find((p) => p.id === productId);
    localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
    navigate(`/confirm-order/${productId}`);
  };

  const truncateDescription = (description, wordCount) => {
    const words = description.split(' ');
    if (words.length > wordCount) {
      const truncated = words.slice(0, wordCount).join(' ');
      return truncated + '...';
    }
    return description;
  };

  return (
    <div className="container">
      <div className="product-row">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="col-md-3">
              <div className="card">
                <img src={product.thumbnail} className="product-img" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="product-description">{truncateDescription(product.description, 10)}</p>
                  <p className="product-price">Price : ${product.price}</p>
                  <button className="btn btn-primary" onClick={() => handleBuyNow(product.id)}>
                    Buy Now
                  </button>
                  <button className="btn btn-success" onClick={() => addToCart(product.id)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
