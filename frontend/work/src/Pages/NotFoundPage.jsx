import React from 'react';
import { Link } from 'react-router-dom';

// this will visible on broswer because it is page
const NotFoundPage = () => {
  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="mt-4">The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="text-blue-500 mt-2 inline-block">
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
