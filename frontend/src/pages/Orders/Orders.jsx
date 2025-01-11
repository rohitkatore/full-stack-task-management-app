import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

function Orders() {
    const [data, setData] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('_id');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const { url, storedToken } = useContext(StoreContext);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(url + "/orders", {
                headers: { token: storedToken }
            });
            console.log(response.data.orders);
            setData(response.data.orders);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (storedToken) {
            fetchOrders();
        }
    }, [storedToken]);

    const handleSortChange = (e) => {
        setSortCriteria(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const filterAndSortOrders = (orders) => {
        let filteredOrders = orders;

        if (searchQuery) {
            filteredOrders = filteredOrders.filter(order =>
                order.items.some(item => item.itemId && item.itemId.name.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        if (filterStatus) {
            filteredOrders = filteredOrders.filter(order => order.status === filterStatus);
        }

        return filteredOrders.sort((a, b) => {
            if (sortCriteria === 'title') {
                return a.title.localeCompare(b.title);
            } else if (sortCriteria === 'createdAt') {
                return new Date(a.createdAt) - new Date(b.createdAt);
            } else if (sortCriteria === 'status') {
                return a.status.localeCompare(b.status);
            } else if (sortCriteria === 'priceAsc') {
                return a.totalAmount - b.totalAmount;
            } else if (sortCriteria === 'priceDesc') {
                return b.totalAmount - a.totalAmount;
            }
            return 0;
        });
    };

    return (
        <div className='my-orders container mt-5'>
            <h2 className='text-center mb-4'>My Orders</h2>
            <div className="mb-3">
                <label htmlFor="sortCriteria" className="form-label">Sort By:</label>
                <select id="sortCriteria" className="form-select" value={sortCriteria} onChange={handleSortChange}>
                    <option value="_id">Order ID</option>
                    <option value="createdAt">Creation Date</option>
                    <option value="status">Status</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="searchQuery" className="form-label">Search:</label>
                <input
                    type="text"
                    id="searchQuery"
                    className="form-control"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search by item name"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="filterStatus" className="form-label">Filter By Status:</label>
                <select id="filterStatus" className="form-select" value={filterStatus} onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>
            <div className="row g-3">
                {filterAndSortOrders(data).map((order) => (
                    <div key={order._id} className='col-12'>
                        <div className='card p-3 shadow-sm'>
                            <div className='row align-items-center'>
                                <div className='col-md-8'>
                                    <h5 className='card-title'>Order ID: {order._id}</h5>
                                    <p className='card-text'>
                                        {order.items.map((item, idx) => {
                                            const itemName = item.itemId ? (item.itemId.name ? item.itemId.name : 'Unknown Item') : 'Unknown Item';
                                            const itemQuantity = item.quantity;
                                            return `${itemName} x${itemQuantity}${idx === order.items.length - 1 ? '' : ', '}`;
                                        })}
                                    </p>
                                    <p className='card-text'><strong>Total:</strong> &#8377;{order.totalAmount.toFixed(2)}</p>
                                    <p className='card-text'><strong>Items:</strong> {order.items.length}</p>
                                    <p className='card-text'><strong>Status:</strong> <span className={`badge ${order.status === 'Pending' ? 'bg-warning' : order.status === 'Completed' ? 'bg-success' : 'bg-danger'}`}>{order.status}</span></p>
                                    <p className='card-text'><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                                </div>
                                <div className='col-md-3 text-end'>
                                    <button className='btn btn-primary w-50' onClick={fetchOrders}>Track Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Orders;
