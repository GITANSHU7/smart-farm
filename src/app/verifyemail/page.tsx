"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./VerifyEmailCss.css";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen py-2">
    //   <h1 className="text-4xl">Verify Email</h1>
    //   <h2 className="p-2 bg-orange-500 text-black">
    //     {token ? `${token}` : "no token"}
    //   </h2>

    //   {verified && (
    //     <div>
    //       <h2 className="text-2xl">Email Verified</h2>
    //       <Link href="/login">Login</Link>
    //     </div>
    //   )}
    //   {error && (
    //     <div>
    //       <h2 className="text-2xl bg-red-500 text-black">Error</h2>
    //     </div>
    //   )}
    // </div>
    <div className="bg-black min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <h1 className="mt-16 text-center text-gray-400 text-3xl font-light tracking-widest relative top-24">
        Your Email Verified Successfully
      </h1>
      <Link href="/login">
        <h6 className="mt-8 text-center text-gray-400 text-3xl font-light tracking-widest relative top-24">
        Click Login to continue!!!
        </h6>
      </Link>
      <div className="fireworks flex items-center justify-center h-screen w-screen">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            className={`firework ${i % 2 === 0 ? "" : "mt-[-70px]"}`}
            key={i}
          >
            {Array.from({ length: 8 }).map((_, j) => (
              <div className="explosion" key={j}>
                <div
                  className={`spark ${i % 2 === 0 ? "gold" : "silver"}`}
                ></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
