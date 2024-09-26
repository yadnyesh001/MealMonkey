import React from 'react';

const RestaurantCard = ({ restaurant }) => {
    console.log(restaurant);
    if (!restaurant) {
        return null; // Avoid rendering the card if restaurant data is undefined.
    }

    const { hotelName, rating, photos, address, knownFor } = restaurant;

    return (
        <div className="border p-4 rounded-lg shadow-lg">
            {/* Safely check if photos exist before accessing the first image */}
            <img 
                src={photos && photos[0] ? photos[0] : 'default-image-url.jpg'} 
                alt={hotelName} 
                className="w-full h-48 object-cover rounded-md"
            />
            <div className="mt-2">
                <h2 className="text-lg font-bold">{hotelName || 'Unknown Restaurant'}</h2>
                <p>Rating: {rating || 'N/A'}</p>
                <p>Known For: {knownFor || 'N/A'}</p>
                <p>{address || 'Address not available'}</p>
            </div>
        </div>
    );
};

export default RestaurantCard;
