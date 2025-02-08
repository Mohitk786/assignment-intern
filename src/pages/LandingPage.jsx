import React from "react";
import { Link } from "react-router-dom";
import { getToken } from "../utils/getToken";

const LandingPage = () => {
  const token = getToken();
  const isAuthenticated = Boolean(token);
  // const isAuthenticated = true;
  return (
    <div className="flex flex-1 bg-white w-full max-w-[1400px] mx-auto p-6 lg:px-4">
      {/* hero */}
      <section className="flex flex-col items-center justify-center gap-10 text-center">
        <h6 className="text-[0.85rem] lg:text-sm text-gray-400 border border-gray-300 rounded-full px-4 py-2">
          Want to host an unforgettable event?{" "}
          <span className="text-green-600 font-medium cursor-pointer">
            Learn how →
          </span>
        </h6>
        <h1 className="lg:leading-16 text-4xl md:text-5xl lg:text-6xl font-bold">
          Bringing communities <br /> together🍀
        </h1>
        <p className="text-[0.85rem] lg:text-md text-gray-500 md:w-[80%] lg:w-[70%] font-medium">
          Events are more than just gatherings. They are opportunities to learn,
          connect, and grow. Whether you're hosting or attending, we make it
          seamless and engaging. Start planning your next big event today!
        </p>
        <div className="flex gap-5">
          <Link to={`${isAuthenticated ? "/user/dashboard" : "/auth/signup"}`}>
            <button className="text-sm bg-green-500 hover:bg-green-600 transition-all px-6 py-3 rounded-md text-white cursor-pointer">
              {isAuthenticated ? "Explore Events" : "Create Account"}
            </button>
          </Link>
          <Link to={`${isAuthenticated ? "/event/create_event" : "/auth/signin"}`}>
            <button className="text-sm bg-white hover:bg-gray-200 transition-all px-6 py-3 rounded-md cursor-pointer">
              {isAuthenticated ? (
                <>
                  <i className="ri-add-line" /> Create Event
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;