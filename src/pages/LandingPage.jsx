import React from "react";
import { Link } from "react-router-dom";
import { getToken } from "../utils/getToken";

const LandingPage = () => {
  const token = getToken();
  const isAuthenticated = Boolean(token);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500 text-white px-6">
      <header className="w-full max-w-6xl flex justify-between items-center py-6">
        <h1 className="text-3xl font-bold">Evently</h1>
        <nav>
          <Link to={isAuthenticated ? "/user/dashboard" : "/auth/signup"} className="mr-4 text-lg hover:underline">
            {isAuthenticated ? "Dashboard" : "Sign Up"}
          </Link>
          <Link to={isAuthenticated ? "/event/create-event" : "/auth/signin"} className="text-lg hover:underline">
            {isAuthenticated ? "Create Event" : "Sign In"}
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center flex flex-col items-center gap-8 mt-12 max-w-3xl">
        <h2 className="text-5xl font-bold leading-tight">
          Uniting Communities, One Event at a Time 🎉
        </h2>
        <p className="text-lg text-gray-100">
          Discover, create, and manage events effortlessly. Whether you're hosting or attending,
          we bring people together for unforgettable experiences.
        </p>
        <div className="flex gap-4">
          <Link to={isAuthenticated ? "/user/dashboard" : "/auth/signup"}>
            <button className="bg-white text-green-500 hover:bg-gray-100 transition-all px-6 py-3 rounded-lg text-lg font-medium shadow-lg">
              {isAuthenticated ? "Explore Events" : "Get Started"}
            </button>
          </Link>
          <Link to={isAuthenticated ? "/event/create-event" : "/auth/signin"}>
            <button className="bg-transparent border border-white hover:bg-white hover:text-green-500 transition-all px-6 py-3 rounded-lg text-lg font-medium shadow-lg">
              {isAuthenticated ? "Create Event" : "Sign In"}
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="absolute bottom-6 text-sm text-gray-200">
        &copy; {new Date().getFullYear()} Evently. All Rights Reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
