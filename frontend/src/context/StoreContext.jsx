import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [food_list, setFoodList] = useState([]);
    const [cart=[], setCart] = useState([]);
    const [storedToken , setStoreToken] = useState(null);
    const url = "https://full-stack-task-management-app-0t3v.onrender.com";
    const [initialFoodData, setInitialFoodData] = useState({
        name: '',
        category: 'Main Course',
        price: '',
        availability: true
    });

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url+"/menu");
            setFoodList(response.data.menues);
        } catch (error) {
            console.error(error);
        }
    }

    const deleteFoodItem = async (id) => {
      try {
        const response = await axios.delete(`${url}/menu/${id}`, {
          headers: { token: storedToken }
        });
        console.log(response);
        setFoodList(food_list.filter((food) => food._id !== id));
      } catch (error) {
        console.error(error);
      }
    }

    const addFoodItem = async (foodData) => {
      try {
        const response = await axios.post(`${url}/menu`, foodData, {
          headers: { token: storedToken }
        });
        console.log(response);
        setFoodList([...food_list, response.data.menu]);
        if(response.data.success){
          return true ;
        } else {
          return false ;
        }
      } catch (error) {
        console.error(error);
      }
    }

    const editFoodItem = async (id, foodData) => {
      try {
        const response = await axios.put(`${url}/menu/${id}`, foodData, {
          headers: { token: storedToken }
        });
        console.log(response);
        setFoodList(food_list.map((food) => (food._id === id ? response.data.menu : food)));
      } catch (error) {
        console.error(error);
      }
    }

    useEffect(()=>{
        async function fetchData() {
            await fetchFoodList();
            const token = localStorage.getItem("token");
            if(token){
                setStoreToken(token);
                console.log("User is logged in");
            } else {
                console.log("User is not logged in");
            }
        }
        fetchData();
    }, []);

    const ContextValue = {
        // Add your state and functions here
        food_list,
        cart,
        storedToken,
        url,
        initialFoodData,
        addFoodItem,
        editFoodItem,
        deleteFoodItem,
        setInitialFoodData,
        setFoodList,
        setCart,  
        setStoreToken,
    };
  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;