import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

function FoodItem({ food }) {
    const { setInitialFoodData, deleteFoodItem, cart, setCart } = useContext(StoreContext);
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    const addToCart = (food) => {
    if (food.availability) {
        setCart((prevCart) => {
            const updatedCart = [...prevCart, { ...food, quantity }];
            return updatedCart;
        });
        alert('Item added to cart');
    } else {
        alert('This item is not available');
    }
    };

    const handleDelete = async () => {
        try {
            await deleteFoodItem(food._id);
            // Optionally, you can add code here to update the UI after deletion
        } catch (error) {
            console.error('Failed to delete food item:', error);
        }
    };

    return (
        <div className="card m-3" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">
                    {food.name}
                    <span className="badge bg-danger ms-2" onClick={handleDelete} style={{ cursor: 'pointer' }}>Delete</span>
                </h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{food.category}</h6>
                <p className="card-text">
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
                <h6 className="card-subtitle mb-2 text-body-secondary">Price:{food.price}</h6>
                <h6 className="card-subtitle mb-2 text-body-secondary">Availability: {food.availability ? 'Available' : 'Not Available'}</h6>

                <div className="input-group mb-3">
                    <span className="input-group-text">Quantity</span>
                    <input 
                        type="number" 
                        className="form-control" 
                        value={quantity} 
                        onChange={(e) => setQuantity(Number(e.target.value))} 
                        min="1"
                    />
                </div>

                <button className="btn btn-primary me-2" onClick={() => { addToCart(food); navigate('/cart'); }}>Add To Cart</button>
                <button className="btn btn-secondary" onClick={() => { setInitialFoodData(food); navigate(`/edit-menu/${food._id}`); }}>Edit</button>
            </div>
        </div>
    );
}

export default FoodItem;
