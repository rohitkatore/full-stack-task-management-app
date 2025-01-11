import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

function AddMenu() {
    const foodCategories = ['Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Salads', 'Soups'];
    const {url,addFoodItem} = useContext(StoreContext);

    const [foodData, setFoodData] = React.useState({
        name: '',
        category: 'Main Course',
        price: '',
        availability: true
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFoodData({
            ...foodData,
            [name]: name === 'availability' ? value === 'true' : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const response =  await addFoodItem(foodData);
              if(response){
                alert('Food item added successfully');
              } else {
                alert('Failed to add food item');
                }
        } catch (error) {
            console.error(error);
            alert('Failed to add food item');
        }
    };

    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h3 className="card-title text-center mb-4">Add Food Item</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="foodName" className="form-label">Food Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="foodName" 
                                            name='name' 
                                            value={foodData.name} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="foodCategory" className="form-label">Food Category</label>
                                        <select 
                                            className="form-control" 
                                            id="foodCategory" 
                                            name='category' 
                                            value={foodData.category} 
                                            onChange={handleChange} 
                                            required
                                        >
                                            {foodCategories.map(category => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="foodPrice" className="form-label">Price</label>
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            id="foodPrice" 
                                            name='price' 
                                            value={foodData.price} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="foodAvailability" className="form-label">Availability</label>
                                        <select 
                                            className="form-control" 
                                            id="foodAvailability" 
                                            name='availability' 
                                            value={foodData.availability.toString()} 
                                            onChange={handleChange} 
                                            required
                                        >
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    </div>
                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddMenu;
