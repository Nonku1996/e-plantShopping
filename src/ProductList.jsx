import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const dispatch = useDispatch();

  // SAFE Redux selector
  const cartItems = useSelector((state) => state.cart?.items || []);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // SAMPLE DATA
  const plantsArray = [
    {
      category: 'Indoor Plants',
      plants: [
        {
          name: 'Snake Plant',
          image:
            'https://images.unsplash.com/photo-1593691509543-c55fb32e5b13',
          description: 'Low maintenance indoor plant',
          cost: '$15',
          quantity: 1,
        },
        {
          name: 'Peace Lily',
          image:
            'https://images.unsplash.com/photo-1463154545680-d59320fd685d',
          description: 'Beautiful flowering plant',
          cost: '$20',
          quantity: 1,
        },
      ],
    },
  ];

  const styleObj = {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '20px',
  };

  const styleObjUl = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '400px',
  };

  const styleA = {
    color: 'white',
    fontSize: '24px',
    textDecoration: 'none',
  };

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));

    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  const handleHome = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowPlants(true);
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  return (
    <div>
      {/* NAVBAR */}
      <div className="navbar" style={styleObj}>
        <div className="tag">
          <div className="luxury">
            <img
              src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
              alt="logo"
              width="60"
            />

            <a href="/" onClick={handleHome}>
              <div>
                <h3 style={{ color: 'white' }}>
                  Paradise Nursery
                </h3>

                <i style={{ color: 'white' }}>
                  Where Green Meets Serenity
                </i>
              </div>
            </a>
          </div>
        </div>

        <div style={styleObjUl}>
          <div>
            <a
              href="#"
              onClick={handlePlantsClick}
              style={styleA}
            >
              Plants
            </a>
          </div>

          <div>
            <a
              href="#"
              onClick={handleCartClick}
              style={styleA}
            >
              <div style={{ position: 'relative' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  height="50"
                  width="50"
                >
                  <rect
                    width="156"
                    height="156"
                    fill="none"
                  ></rect>

                  <circle
                    cx="80"
                    cy="216"
                    r="12"
                  ></circle>

                  <circle
                    cx="184"
                    cy="216"
                    r="12"
                  ></circle>

                  <path
                    d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                    fill="none"
                    stroke="#faf9f9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>

                <span className="cart-quantity-count">
                  {totalQuantity}
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h2 className="category-title">
                {category.category}
              </h2>

              <div className="product-list">
                {category.plants.map((plant, plantIndex) => (
                  <div
                    className="product-card"
                    key={plantIndex}
                  >
                    <img
                      className="product-image"
                      src={plant.image}
                      alt={plant.name}
                    />

                    <div className="product-name">
                      {plant.name}
                    </div>

                    <div className="product-description">
                      {plant.description}
                    </div>

                    <div className="product-cost">
                      {plant.cost}
                    </div>

                    <button
                      className={`product-button ${
                        addedToCart[plant.name]
                          ? 'added'
                          : ''
                      }`}
                      disabled={addedToCart[plant.name]}
                      onClick={() =>
                        handleAddToCart(plant)
                      }
                    >
                      {addedToCart[plant.name]
                        ? 'Added to Cart'
                        : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem
          onContinueShopping={handleContinueShopping}
        />
      )}
    </div>
  );
}

export default ProductList;