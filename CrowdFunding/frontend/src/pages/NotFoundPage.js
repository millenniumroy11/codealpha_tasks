import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container py-5 text-center">
      <div className="mx-auto" style={{ maxWidth: '500px' }}>
        <h1 className="display-1 text-primary mb-4">404</h1>
        <h2 className="h3 font-weight-semibold mb-4">Page Not Found</h2>
        <p className="text-muted mb-4">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="btn btn-primary btn-lg"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
