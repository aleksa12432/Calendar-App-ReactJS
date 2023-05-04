import React from "react";

export default function Login() {
  return (
    <div className="grid grid-cols-1  h-screen w-full">
      <div className=" flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-300 p-8 px-8">
          <h2 className="text-4xl text-black-400 font-bold text-center ">
            LOGIN
          </h2>
          <div className="flex flex-col text-black-400 py-2">
            <label>Name</label>
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
          <div className="flex justify-between text-black-400 py-2">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" /> Remember Me
            </p>
            <a href="/">Forgot Password</a>
          </div>
          <button className="w-full my-5 py-2 bg-purple-500 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/40 text-white font-semibold rounded-lg">
            SIGN IN
          </button>
          <p className="text-center">Don't have an account yet? Sign Up!</p>
        </form>
      </div>
    </div>
  );
}
