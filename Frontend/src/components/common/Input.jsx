import React, { forwardRef } from 'react';

const Input = forwardRef(
  (
    {
      label,
      error,
      type = 'text',
      icon: Icon,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative rounded-lg shadow-sm">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <input
            ref={ref}
            type={type}
            id={inputId}
            className={`w-full rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 text-sm transition duration-150 focus:outline-none focus:ring-2 ${
              Icon ? 'pl-10' : 'pl-3.5'
            } pr-3.5 py-2.5 ${
              error
                ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
            } ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-rose-500 font-medium">
            {error.message || error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
