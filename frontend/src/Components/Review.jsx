// ReviewCard.js
import React from 'react';

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4 border border-gray-200">
      <div className="flex items-center mb-4">
        <span className="font-semibold text-lg text-gray-800">
          {review.source.customer.name}
        </span>
        <span className="ml-2 text-sm text-gray-500">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="flex items-center mb-4">
        <span className="font-semibold text-gray-700">{review.reviewType}</span>
        <div className="flex ml-2">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-4 h-4 ${
                index < review.rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.287 3.985a1 1 0 00.95.69h4.184c.969 0 1.372 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.985c.3.921-.755 1.688-1.54 1.118L10 13.477l-3.39 2.46c-.785.57-1.84-.197-1.54-1.118l1.287-3.985a1 1 0 00-.364-1.118L2.603 8.412c-.785-.57-.381-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.287-3.985z" />
            </svg>
          ))}
        </div>
      </div>
      <p className="text-gray-700">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
