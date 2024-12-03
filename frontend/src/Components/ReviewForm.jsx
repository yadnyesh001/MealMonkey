import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewForm = ({ reviews = [] }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submittedReviews, setSubmittedReviews] = useState(reviews);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment || !rating) {
      alert("Please provide a rating and a comment!");
      return;
    }

    const newReview = {
      reviewType: "General", // Placeholder; you can categorize reviews later
      rating,
      comment,
      createdAt: new Date().toISOString(),
      source: {
        customer: {
          name: "Anonymous User", // Replace with user info if logged in
        },
      },
    };

    setSubmittedReviews([newReview, ...submittedReviews]);
    setRating(0);
    setComment("");
  };

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-2xl"> {/* Shadow applied to the main container */}
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Review our Restaurant</h2>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Rate the Restaurant</h3>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="focus:outline-none"
              >
                <FaStar
                  size={30}
                  color={star <= (hover || rating) ? "#FFD700" : "#E4E5E9"}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="comment" className="block text-lg font-medium text-gray-700">
            Your Review
          </label>
          <textarea
            id="comment"
            className="w-full mt-2 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none" // Shadow added here
            rows="4"
            placeholder="Share your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-200" // Shadow added here
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
