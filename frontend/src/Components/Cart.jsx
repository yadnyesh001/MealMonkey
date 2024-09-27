import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Navigate, useNavigate } from 'react-router-dom';
const CheckoutCart = () => {
    const navigate=useNavigate()
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axiosInstance.get('/customer/cart'); // API to fetch cart
                setCart(response.data);
                calculateTotalPrice(response.data);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, []);

    const calculateTotalPrice = (cartItems) => {
        const total = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
        setTotalPrice(total);
    };

    const handleQuantityChange = async (itemId, newQuantity) => {
        if (newQuantity < 1) return; // Prevent quantity from going below 1
        try {
            const response = await axiosInstance.put(`/customer/cart/${itemId}`, { quantity: newQuantity });
            setCart(response.data);
            calculateTotalPrice(response.data);
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const handleCheckout = async () => {
        try {
            await axiosInstance.post('/customer/checkout', { cart }); // Checkout API
            setCart([]); // Clear cart state
            setTotalPrice(0); // Reset total price
            alert('Checkout successful!');
            navigate('/customer/')
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-semibold mb-6 text-center">Checkout</h1>
            {cart.length > 0 ? (
                <div>
                    {cart.map(item => (
                        <div key={item._id} className="border-b py-4 mb-4">
                            <h2 className="text-xl font-bold">{item.product.name}</h2>
                            <p className="text-gray-700">Price: <span className="font-semibold">${item.product.price.toFixed(2)}</span></p>
                            <div className="flex items-center mt-2">
                                <p className="mr-2">Quantity:</p>
                                <button 
                                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                    className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400">
                                    -
                                </button>
                                <span className="mx-2">{item.quantity}</span>
                                <button 
                                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                    className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400">
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                    <h2 className="text-2xl font-bold mt-4">Total Price: <span className="text-green-500">${totalPrice.toFixed(2)}</span></h2>
                    <button 
                        onClick={handleCheckout}
                        className="mt-6 w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200">
                        Checkout
                    </button>
                </div>
            ) : (
                <p className="text-lg text-gray-600 text-center">Your cart is empty.</p>
            )}
        </div>
    );
};

export default CheckoutCart;
