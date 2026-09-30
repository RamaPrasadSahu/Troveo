import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Button from './Button';

const ErrorMessage = ({
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-rose-50 border border-rose-200 rounded-2xl text-center my-6">
      <AlertCircle className="w-10 h-10 text-rose-500 mb-3" />
      <h3 className="text-base font-semibold text-rose-900 mb-1">Error Loading Data</h3>
      <p className="text-sm text-rose-700 max-w-md mb-4">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="border-rose-300 text-rose-800 hover:bg-rose-100">
          <RefreshCw className="w-4 h-4 mr-2" /> Retry
        </Button>
      )}
    </div>
  );
};

export default ErrorMessage;
