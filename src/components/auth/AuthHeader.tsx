
import React from "react";

export default function AuthHeader() {
  return (
    <div className="text-center mb-8">
      <div className="bg-dukkan-purple mx-auto rounded-full h-12 w-12 flex items-center justify-center mb-4">
        <div className="text-white font-bold text-xl">D</div>
      </div>
      <h2 className="text-2xl font-bold">Welcome to Dukkan</h2>
      <p className="text-gray-500 mt-1">The gamified shopping experience</p>
    </div>
  );
}
