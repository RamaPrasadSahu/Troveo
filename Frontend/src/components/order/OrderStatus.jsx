import React from 'react';
import { CheckCircle2, Clock, Truck, PackageCheck, Home } from 'lucide-react';
import { ORDER_STATUSES } from '../../utils/constants';

const OrderStatus = ({ status = 'Ordered' }) => {
  const steps = [
    { label: ORDER_STATUSES.ORDERED, icon: Clock },
    { label: ORDER_STATUSES.CONFIRMED, icon: CheckCircle2 },
    { label: ORDER_STATUSES.SHIPPED, icon: Truck },
    { label: ORDER_STATUSES.OUT_FOR_DELIVERY, icon: PackageCheck },
    { label: ORDER_STATUSES.DELIVERED, icon: Home },
  ];

  const getStepIndex = (currentStatus) => {
    switch (currentStatus) {
      case ORDER_STATUSES.ORDERED: return 0;
      case ORDER_STATUSES.CONFIRMED: return 1;
      case ORDER_STATUSES.SHIPPED: return 2;
      case ORDER_STATUSES.OUT_FOR_DELIVERY: return 3;
      case ORDER_STATUSES.DELIVERED: return 4;
      default: return 0;
    }
  };

  const currentIndex = getStepIndex(status);

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        {/* Connecting Progress Bar Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0" />
        <div
          className="absolute top-1/2 left-0 h-1 bg-indigo-600 -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        />

        {/* Timeline Steps */}
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isCompleted = idx <= currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={step.label} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 ring-4 ring-white'
                    : 'bg-white text-slate-400 border-2 border-slate-200'
                } ${isCurrent ? 'scale-110 ring-4 ring-indigo-100' : ''}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`mt-2 text-xs font-semibold text-center max-w-[70px] ${
                  isCompleted ? 'text-indigo-600 font-bold' : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatus;
