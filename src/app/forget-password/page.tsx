"use client";

import React from "react";
import { TextInput, Label, Button } from "flowbite-react";
import { HiMail } from "react-icons/hi";

const LoginComponent = () => {
  return (
    <div className="mt-44 flex justify-center">
      <div className="flex bg-slate-300 rounded-lg shadow-lg overflow-hidden max-w-sm lg:max-w-4xl w-full">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1095.jpg')",
          }}
        />
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Forget Password?
          </h2>
          <p className="text-md text-gray-600 text-center mt-4">
            Enter your email and we&apos;ll send you instructions to reset your
            password
          </p>

          <div className="mt-4">
            <Label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email Address
            </Label>
            {/* <TextInput
              id="email"
              type="email"
              className= "text-gray-700 focus:outline-none focus:shadow-outline border rounded py-2 px-4 block w-full appearance-none"
            /> */}
            <TextInput
              id="email4"
              type="email"
              rightIcon={HiMail}
              placeholder="name@flowbite.com"
              required
            />
          </div>

          <div className="mt-8">
            <Button className="w-full" color="dark">
              Send Reset Link
            </Button>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <a href="#" className="text-xs text-gray-500 uppercase">
              Back to login
            </a>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
