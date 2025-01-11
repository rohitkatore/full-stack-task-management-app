import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

function Login() {
    const { url, setStoreToken } = useContext(StoreContext);
    const [userData, setUserData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        
        try{
            const response = await axios.post(`${url}/login`, userData);
            console.log(response.data);
            if(response.data.success){
                setStoreToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                alert('User logged in successfully');
            } else {
                alert('Failed to login');
            }
        }catch(error){
            console.error(error);
            alert('Failed to login');
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4 shadow-sm">
                        <h2 className="text-center mb-4">Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputUsername1" className="form-label">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputUsername1"
                                    aria-describedby="usernameHelp" onChange={handleChange} value={userData.username} name="username" 
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    onChange={handleChange} value={userData.password} name="password"
                                    required
                                />
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="rememberMe"
                                />
                                <label className="form-check-label" htmlFor="rememberMe">
                                    Remember Me
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                Submit
                            </button>
                            <div className="text-center mt-3">
                            Don't have an account?  
                                <a href="/register" className="text-decoration-none">
                                     Register
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
