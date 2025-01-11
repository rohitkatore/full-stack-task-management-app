import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

function Register() {
    const {url , setStoreToken} = useContext(StoreContext);
    const [userData, setUserData] = React.useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        console.log(userData);
       try {
            const response = await axios.post(`${url}/register`, userData);
            console.log(response.data);
            if(response.data.success){
                setStoreToken(response.data.token);
                console.log(response.data.token);
                localStorage.setItem('token', response.data.token);
                alert('User registered successfully');
            } else {
                alert('Failed to register user');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to register user');
        }
    };


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Register</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputUsername1" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="exampleInputUsername1" aria-describedby="usernameHelp" value={userData.username} onChange={handleChange} name='username' required  />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} value={userData.email} name='email' required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" value={userData.password} onChange={handleChange} name='password' required />
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
    );
}

export default Register;
