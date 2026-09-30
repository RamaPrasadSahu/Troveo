import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Home } from 'lucide-react';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6">
        <HelpCircle className="w-10 h-10" />
      </div>
      <h1 className="text-6xl font-extrabold text-slate-900 tracking-tight mb-2">404</h1>
      <h2 className="text-xl font-bold text-slate-700 mb-3">Page Not Found</h2>
      <p className="text-sm text-slate-500 max-w-md mb-8">
        Sorry, the page you are looking for doesn&apos;t exist or has been moved to a new web address.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">
          <Home className="w-4 h-4 mr-2" /> Back to Home Page
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
