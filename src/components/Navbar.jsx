import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-900 text-white shadow-lg fixed top-0 left-0 z-50">
      <div className="flex justify-end items-center px-6 py-4 ">
        {/* Right side: Only Title */}
        <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
          RBF Admin Dashboard
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
