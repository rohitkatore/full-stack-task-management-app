import React, { useContext } from 'react';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../context/StoreContext';

function FoodDisplay() {
    const { food_list } = useContext(StoreContext);
    return (
        <div className="container mt-5">
            <div className="row">
                {food_list.map((food, index) => (
                    <FoodItem key={index} food={food} />
                ))}
            </div>
        </div>
    );
}

export default FoodDisplay;
