import React, { useContext } from 'react'; 
import { StoreContext } from '../../context/StoreContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Cart() {
    const { cart = [], setCart, url, storedToken } = useContext(StoreContext);

    const calculateTotal = () => {
        return cart.reduce((total, cartItem) => {
            return total + cartItem.price * cartItem.quantity;
        }, 0);
    };

    const removeItem = (cartIndex) => {
        const newCart = cart.filter((_, i) => i !== cartIndex);
        setCart(newCart);
    };

    const increaseQuantity = (cartIndex) => {
        const newCart = cart.map((cartItem, i) => {
            if (i === cartIndex) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
            }
            return cartItem;
        });
        setCart(newCart);
    };

    const decreaseQuantity = (cartIndex) => {
        const newCart = cart.map((cartItem, i) => {
            if (i === cartIndex && cartItem.quantity > 1) {
                return { ...cartItem, quantity: cartItem.quantity - 1 };
            }
            return cartItem;
        });
        setCart(newCart);
    };

    const placeOrder = async () => {
        console.log(cart);
        try {
            const response = await axios.post(`${url}/order`, { items: cart }, {
                headers: { token: storedToken }
            });
            console.log('Order placed:', response.data);
            setCart([]);
        } catch (error) {
            console.error('Failed to place order:', error);
        }
    };

    return (
        <div className="container mt-5">
            {cart.map((cartItem, cartIndex) => (
                <div key={cartIndex} className="card mb-3 shadow-sm">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-md-3">
                                <h4 className="card-title text-primary">{cartItem.name}</h4>
                                <p className="card-text text-muted"><strong>Category:</strong> {cartItem.category}</p>
                                <p className="card-text text-success">Price: &#8377;{cartItem.price}</p>
                            </div>
                            <div className="col-md-3">
                                <p className="card-text"><strong>Quantity:</strong> {cartItem.quantity}</p>
                                <div className="btn-group">
                                    <button className="btn btn-secondary btn-sm" onClick={() => decreaseQuantity(cartIndex)}>-</button>
                                    <button className="btn btn-secondary btn-sm" onClick={() => increaseQuantity(cartIndex)}>+</button>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <button className="btn btn-danger btn-sm" onClick={() => removeItem(cartIndex)}>Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div className="mt-4 p-3 bg-light border rounded">
                <h3>Total Amount: <span className="text-primary">&#8377;{calculateTotal().toFixed(2)}</span></h3>
                <button className="btn btn-primary btn-lg mt-3" onClick={() => placeOrder()}>Place Order</button>
            </div>
        </div>
    );
}

export default Cart;