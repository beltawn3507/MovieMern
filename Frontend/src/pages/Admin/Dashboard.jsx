import React from "react";
import { Link } from "react-router-dom";
import { MdDelete, MdCategory, MdAddBox, MdMovie } from "react-icons/md";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md transition-colors duration-300">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Admin Dashboard
        </h1>

        <div className="space-y-4">
          <Link to="/admin/delete-comment">
            <button className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
              <MdDelete size={20} />
              Delete Comments
            </button>
          </Link>

          <Link to="/admin/movies/genre">
            <button className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
              <MdCategory size={20} />
              Manage Genre
            </button>
          </Link>

          <Link to="/admin/movies/create">
            <button className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
              <MdAddBox size={20} />
              Add Movies
            </button>
          </Link>

          <Link to="/admin/movies-list">
            <button className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
              <MdMovie size={20} />
              Manage Movies
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
