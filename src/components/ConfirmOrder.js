import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ConfirmOrder.css';

const ConfirmOrder = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();

        console.log('API Response:', data); // Log the API response for debugging

        const selectedProduct = data.products.find((product) => product.id === parseInt(productId));

        if (selectedProduct) {
          setProduct(selectedProduct);
          setLoading(false);
        } else {
          console.log(`Product with ID ${productId} not found.`);
          setLoading(false);
        }
      } catch (error) {
        console.log('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  const closeModal = () => {
    setShowImageModal(false);
  };

  const handleOrderConfirmation = () => {
    console.log('Order confirmed for product:', product);
    alert('Thank you for purchasing! Your item will be delivered shortly.');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const { thumbnail, title, description, price, discountPercentage, rating, stock, brand, images } = product;

  return (
    <div className="confirm-order-container">
      <div className="left-section">
        <img
          className="main-image"
          src={thumbnail}
          alt={title}
          onClick={() => handleImageClick(thumbnail)}
        />

        <div className="image-gallery">
          {images.map((image, index) => (
            <img
              key={index}
              className="thumbnail-image"
              src={image}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
      </div>
      <div className="right-section">
        <h2 className="title">{title}</h2>
        <p className="description">{description}</p>
        <p className="price"><span className="text-bold">Price:</span> ${price}</p>
        <p className="discount"><span className="text-bold">Discount:</span> {discountPercentage}%</p>
        <p className="rating"><span className="text-bold">Rating:</span> {rating}</p>
        <p className="stock"><span className="text-bold">Stock:</span> {stock}</p>
        <p className="brand"><span className="text-bold">Brand:</span> {brand}</p>

        <button className="confirm-order-button" onClick={handleOrderConfirmation}>
          Confirm Order
        </button>
      </div>
      {showImageModal && (
        <div className="image-modal">
          <div className="image-modal-content">
            <span className="close-modal" onClick={closeModal}>
              &times;
            </span>
            <img className="modal-image" src={selectedImage} alt="Modal" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmOrder;
