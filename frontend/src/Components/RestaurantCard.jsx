const RestaurantCard = ({ restaurant }) => {
    return (
        <div className="border rounded-lg p-4 shadow-lg">
            <img src={restaurant.photos[0]} alt={restaurant.hotelName} className="w-full h-32 object-cover rounded-t-lg" />
            <div className="mt-4">
                <h2 className="text-lg font-bold">{restaurant.hotelName}</h2>
                <p className="text-gray-500">Rating: {restaurant.rating}</p>
                <p className="text-sm text-gray-600">{restaurant.knownFor.join(', ')}</p>
                <p className="text-xs text-gray-400">{restaurant.address.fullAddress}</p>
            </div>
        </div>
    );
};

export default RestaurantCard;
