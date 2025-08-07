import React from "react";

function LoadingSpinner({ size = "lg", className = "", message }) {
  return (
    <div className={`flex flex-col justify-center items-center my-6 ${className}`}>
      <span className={`loading loading-spinner loading-${size}`}></span>
      {/*custom message for trending, search, genre, etc*/}
      {message && <p className="mt-2 text-sm text-gray-500">{message}</p>}
    </div>
  );
}

export default LoadingSpinner;
