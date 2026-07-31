import React from 'react';

const Loader = ({ fullScreen = true, message = "Loading..." }) => {
  return (
    <div className={"flex flex-col justify-center items-center $"}>
      <div className="relative w-16 h-16 flex justify-center items-center">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-[#ff4d2d] border-t-transparent animate-spin"></div>
        
        {/* Inner pulsing dot */}
        <div className="w-4 h-4 bg-[#ff4d2d] rounded-full animate-pulse"></div>
      </div>
      
      {message && (
        <p className="mt-4 text-gray-600 font-medium tracking-wide animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export default Loader;
