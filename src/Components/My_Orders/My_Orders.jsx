import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Root/AuthProvider';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiFilter, FiCalendar } from 'react-icons/fi';
import { TbTruckDelivery } from 'react-icons/tb';
import { MdPendingActions } from 'react-icons/md';
import { BiPackage } from 'react-icons/bi';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { format } from 'date-fns';

const My_Orders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');
    const [expandedOrder, setExpandedOrder] = useState(null);

    // Fetch orders on component mount
    useEffect(() => {
        const fetchOrders = async () => {
            if (!user || !user.email) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/orders/${user.email}`);
                
                // Sort orders by date (newest first)
                const sortedOrders = response.data.sort((a, b) => 
                    new Date(b.orderDate) - new Date(a.orderDate)
                );
                
                setOrders(sortedOrders);
                setError(null);
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError('Failed to load your orders. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    // Filter orders based on status
    const filteredOrders = filter === 'all' 
        ? orders 
        : orders.filter(order => order.status === filter);

    // Get status badge color
    const getStatusBadge = (status) => {
        switch(status) {
            case 'pending':
                return <span className="badge badge-warning gap-1 py-3"><MdPendingActions /> Pending</span>;
            case 'processing':
                return <span className="badge badge-info gap-1 py-3"><BiPackage /> Processing</span>;
            case 'shipped':
                return <span className="badge badge-primary gap-1 py-3"><TbTruckDelivery /> Shipped</span>;
            case 'delivered':
                return <span className="badge badge-success gap-1 py-3"><AiOutlineCheckCircle /> Delivered</span>;
            case 'cancelled':
                return <span className="badge badge-error gap-1 py-3">Cancelled</span>;
            default:
                return <span className="badge badge-ghost gap-1 py-3">{status}</span>;
        }
    };

    // Toggle order details expansion
    const toggleOrderDetails = (orderId) => {
        if (expandedOrder === orderId) {
            setExpandedOrder(null);
        } else {
            setExpandedOrder(orderId);
        }
    };

    // Format date
    const formatDate = (dateString) => {
        try {
            return format(new Date(dateString), 'MMM dd, yyyy');
        } catch (error) {
            return dateString;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-16">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-color6 flex items-center gap-2">
                            <FiShoppingBag className="text-color5" /> My Orders
                        </h1>
                        <p className="text-gray-600 mt-2">
                            View and track all your LoopMi purchases
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <FiFilter className="text-color5" />
                        <select 
                            className="select select-bordered select-sm focus:border-color5" 
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">All Orders</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-60">
                        <span className="loading loading-spinner loading-lg text-color5"></span>
                    </div>
                ) : error ? (
                    <div className="alert alert-error">{error}</div>
                ) : filteredOrders.length === 0 ? (
                    <div className="bg-base-100 rounded-lg shadow-md p-8 text-center">
                        <div className="text-5xl text-gray-300 flex justify-center mb-4">
                            <FiShoppingBag />
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">No orders found</h2>
                        <p className="text-gray-600 mb-6">
                            {filter === 'all' 
                                ? "You haven't placed any orders yet."
                                : `You don't have any ${filter} orders.`}
                        </p>
                        <Link to="/shop" className="btn btn-primary bg-color5 border-color5 hover:bg-color4">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredOrders.map((order) => (
                            <div key={order._id} className="bg-base-100 rounded-lg shadow-md overflow-hidden">
                                <div className="p-4 border-b cursor-pointer hover:bg-gray-50" onClick={() => toggleOrderDetails(order._id)}>
                                    <div className="flex flex-col md:flex-row justify-between">
                                        <div>
                                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                                <FiCalendar /> Order Date: {formatDate(order.orderDate)}
                                            </p>
                                            <p className="font-medium mt-1">Order #{order._id.slice(-8)}</p>
                                        </div>
                                        <div className="flex items-center justify-between md:justify-end gap-4 mt-3 md:mt-0">
                                            <div>{getStatusBadge(order.status)}</div>
                                            <p className="font-semibold text-color6">
                                                ${order.totalAmount?.toFixed(2) || 0}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                {expandedOrder === order._id && (
                                    <div className="p-4 bg-gray-50">
                                        <div className="mb-4">
                                            <h3 className="font-semibold text-color5 mb-2">Order Items</h3>
                                            <div className="divide-y">
                                                {order.items.map((item) => (
                                                    <div key={item._id} className="py-3 flex items-center gap-4">
                                                        <div className="w-16 h-16 rounded-md overflow-hidden">
                                                            <img 
                                                                src={item.image || 'https://via.placeholder.com/100'} 
                                                                alt={item.name} 
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="font-medium">{item.name}</p>
                                                            <p className="text-sm text-gray-500">
                                                                Quantity: {item.quantity} × ${item.price?.toFixed(2) || 0}
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-medium">
                                                                ${(item.price * item.quantity).toFixed(2) || 0}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h3 className="font-semibold text-color5 mb-2">Shipping Address</h3>
                                                <div className="bg-white p-3 rounded-md border">
                                                    <p className="font-medium">{order.shippingAddress?.name}</p>
                                                    <p>{order.shippingAddress?.street}</p>
                                                    <p>
                                                        {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zip}
                                                    </p>
                                                    <p>{order.shippingAddress?.country}</p>
                                                    <p className="mt-1">{order.shippingAddress?.phone}</p>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <h3 className="font-semibold text-color5 mb-2">Order Summary</h3>
                                                <div className="bg-white p-3 rounded-md border">
                                                    <div className="flex justify-between py-1">
                                                        <span>Subtotal:</span>
                                                        <span>${order.subtotal?.toFixed(2) || 0}</span>
                                                    </div>
                                                    <div className="flex justify-between py-1">
                                                        <span>Shipping:</span>
                                                        <span>${order.shippingCost?.toFixed(2) || 0}</span>
                                                    </div>
                                                    {order.discount > 0 && (
                                                        <div className="flex justify-between py-1">
                                                            <span>Discount:</span>
                                                            <span className="text-green-600">-${order.discount?.toFixed(2) || 0}</span>
                                                        </div>
                                                    )}
                                                    <div className="flex justify-between py-1 font-semibold border-t mt-1 pt-2">
                                                        <span>Total:</span>
                                                        <span>${order.totalAmount?.toFixed(2) || 0}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {order.status === 'delivered' && !order.hasReviewed && (
                                            <div className="mt-4 text-center">
                                                <Link 
                                                    to={`/review/${order._id}`} 
                                                    className="btn btn-outline btn-sm border-color5 text-color5 hover:bg-color5 hover:text-white"
                                                >
                                                    Write a Review
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default My_Orders;