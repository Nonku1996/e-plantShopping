import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart [cite: 278, 433]
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const numericCost = parseFloat(item.cost.replace('$', ''));
      return total + (item.quantity * numericCost);
    }, 0);
  };

  // Return to the product listing page [cite: 284, 440]
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // Trigger a "Coming Soon" alert for the checkout button [cite: 287, 290, 438]
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // Increase item quantity by 1 [cite: 294, 295]
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrease item quantity or remove if it reaches zero 
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remove the item completely from the cart [cite: 300, 437]
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate subtotal for a specific item (quantity * unit price) [cite: 302, 303, 434]
  const calculateTotalCost = (item) => {
    const numericCost = parseFloat(item.cost.replace('$', ''));
    return item.quantity * numericCost;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;