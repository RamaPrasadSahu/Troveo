import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ fullScreen = false, text = 'Loading...' }) => {
  if (fullScreen) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-3" />
        <p className="text-sm font-medium text-slate-500">{text}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8">
      <Loader2 className="w-6 h-6 text-indigo-600 animate-spin mr-2" />
      <span className="text-sm text-slate-600">{text}</span>
    </div>
  );
};

export default Loader;
