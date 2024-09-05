"use client";

import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import FarmerImage from "@/assets/images/farmerimage.jpg";

const Page = () => {
    const router = useRouter();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        username: "",

    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const userSignUp = async () => {
    
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log(response);
            if (response.data.success) {
                toast.success("User created successfully");
                router.push("/login");
            }
        
        } catch (error: any) {
            toast.error(error.response.data.error);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        if (user.name.length > 0 && user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

  return (
    <>
      <>
        {/* source:https://codepen.io/owaiswiz/pen/jOPvEPB */}
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
          <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
              <div></div>
              <div className="mt-12 flex flex-col items-center">
                <h1 className="text-2xl xl:text-3xl font-extrabold">
                  {loading ? "Processing" : "Sign Up"}
                </h1>
                <div className="w-full flex-1 mt-4">
                  <div className="my-8 border-b text-center">
                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                      sign up with e-mail
                    </div>
                  </div>
                  <div className="mx-auto max-w-xs">
                    <input
                      className="w-full px-8 py-4 m-1 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                      name="name"
                      placeholder="Enter your name"
                    />
                    <input
                      className="w-full px-8 py-4 m-1 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      value={user.username}
                      onChange={(e) =>
                        setUser({ ...user, username: e.target.value })
                      }
                      name="username"
                      placeholder="Enter Your Username"
                    />
                    <input
                      className="w-full px-8 py-4 m-1 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      name="email"
                      placeholder="Enter Your Email"
                    />
                    <input
                      className="w-full px-8 py-4 m-1 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="password"
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                      name="password"
                      placeholder="Enter Your Password"
                    />
                    {/* <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      name="email"
                      placeholder="Email"
                    />

                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      name="password"
                      placeholder="Password"
                    /> */}
                    {/* <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      name="password"
                      placeholder="Password"
                    /> */}
                    <button
                      onClick={userSignUp}
                      disabled={buttonDisabled}
                      className={`mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${
                        buttonDisabled ? "cursor-not-allowed opacity-50" : ""
                      }`}
                    >
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy={7} r={4} />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-3">
                        {buttonDisabled ? "Fill All Details" : "Signup"}
                      </span>
                    </button>

                    <div className="my-8 border-b text-center">
                      <div
                        className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2 hover:text-blue-600 cursor-pointer"
                        onClick={() => {
                          // naviagte("/sign-up");
                          // router.push("/sign-up");
                        }}
                      >
                        <Link href="/login">Already have account? Click here to login</Link>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
              <div
                className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${FarmerImage.src})`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Page;
