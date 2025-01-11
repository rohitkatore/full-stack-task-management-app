import React, { useContext, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import { use } from 'react';

function Navbar() {
    const navigate = useNavigate() ;
    const {storedToken,setStoreToken} = useContext(StoreContext);

    const logout = () => {
        setStoreToken(null);
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <div className="col-md-3 mb-2 mb-md-0">
                    <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                        <svg className="bi" width="40" height="32" role="img" aria-label="Bootstrap"><use xlinkHref="#bootstrap"></use></svg>
                    </a>
                </div>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><a href="/" className="nav-link px-2 link-secondary">Home</a></li>
                    <li><a href="/add-menu" className="nav-link px-2">Add Menu</a></li>
                    <li><a href="/orders" className="nav-link px-2">Orders</a></li>
                    <li><a href="/cart" className="nav-link px-2">Cart</a></li>
                    <li><a href="#" className="nav-link px-2">About</a></li>
                </ul>

                <div className="col-md-3 text-end">
                    {!storedToken ? 
                        <div>
                            <button onClick={()=>navigate("/login")} type="button" className="btn btn-outline-primary me-2">Login</button>
                            <button onClick={()=>navigate("/register")} type="button" className="btn btn-primary">Register</button>
                        </div>
                     : (
                        <button onClick={()=>{logout(); navigate("/login"); }} type="button" className="btn btn-outline-primary me-2" >Logout</button>
                    )}

                </div>
            </header>
        </div>
    )
}

export default Navbar
