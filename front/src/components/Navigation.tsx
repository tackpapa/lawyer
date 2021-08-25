/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";


function Navigation() {
  return (
    <div>
  <nav className="bg-gray-800">
  <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <div className="relative flex items-center justify-between h-16">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

      </div>
      <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-center">
  
        <div className="hidden sm:block sm:ml-6">
          <div className="flex space-x-4">
          
          <Link to="/admin/home"> <h2 className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">배너관리</h2></Link>
          <Link to="/admin/user"> <h2 className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">유저관리</h2></Link>
        
          <Link to="/admin/postpag"> <h2  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">게시글</h2></Link>
        
          <Link to="/admin/jobpag"> <h2  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">구인글</h2></Link>
        
          <Link to="/admin/marketpag"> <h2  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">장터</h2></Link>
          </div>
        </div>
      </div>

    </div>
  </div>
  </nav>
  </div>
  );
          }


export default Navigation;
