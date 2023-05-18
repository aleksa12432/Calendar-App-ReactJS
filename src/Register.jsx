import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="grid grid-cols-1  h-screen w-full">
      <div className=" flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-300 p-8 px-8">
          <h2 className="text-4xl text-black-400 font-bold text-center ">
            SIGN UP
          </h2>
          <div className="flex flex-col text-black-400 py-2">
            <label>Name</label>
            <input
              className="rounded-lg  mt-2 p-2 focus:border-blue-500  focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex flex-col text-black-400 py-2">
            <label>E-mail</label>
            <input
              className="rounded-lg  mt-2 p-2 focus:border-blue-500  focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex flex-col text-black-400 py-2">
            <label>Password</label>
            <input
              className="p-2 rounded-lg mt-2 focus:border-blue-500  focus:outline-none"
              type="password"
            />
          </div>
          <div className="flex flex-col text-black-400 py-2">
            <label>Confirm password</label>
            <input
              className="rounded-lg  mt-2 p-2 focus:border-blue-500  focus:outline-none"
              type="text"
            />
          </div>
          <Link to="/calendar">
            <button className="w-full my-5 py-2 bg-purple-500 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/40 text-white font-semibold rounded-lg">
              SIGN UP
            </button>
          </Link>
          <div className="flex justify-center">
            <a href="/login" className="text-center underline">
              Already have an account? Log in!
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
