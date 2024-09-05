"use client";

import React from "react";
import { TextInput, Label, Button, Popover } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { MdLockPerson } from "react-icons/md";

const ResetComponent = () => {
  return (
    <div className="mt-44 flex justify-center">
      <div className="flex bg-slate-300 rounded-lg shadow-lg overflow-hidden max-w-sm lg:max-w-4xl w-full">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://static.vecteezy.com/system/resources/thumbnails/005/893/747/small_2x/change-password-icon-password-reset-icon-circular-arrow-lock-reload-concept-update-password-pictogram-illustration-vector.jpg')",
          }}
        />
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Reset Password
          </h2>
          <p className="text-md text-gray-600 text-center mt-4">
            Your new password must be different from previously used passwords
          </p>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Password" />
            </div>
            {/* <Popover
              trigger="hover"
              content={
                <div className="space-y-2 p-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Must have at least 8 characters
                  </h3>

                  <p>It’s better to have:</p>
                  <ul>
                    <li className="mb-1 flex items-center">
                      Upper & lower case letters
                    </li>
                    <li className="mb-1 flex items-center">A symbol (#$&)</li>
                    <li className="flex items-center">
                      A longer password (min. 8 chars.)
                    </li>
                  </ul>
                </div>
              }
            > */}
            <TextInput id="password1" type="password" required />
            {/* </Popover> */}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Confirm Password" />
            </div>
            {/* <Popover
              trigger="hover"
              content={
                <div className="space-y-2 p-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Must have at least 8 characters
                  </h3>

                  <p>It’s better to have:</p>
                  <ul>
                    <li className="mb-1 flex items-center">
                      Upper & lower case letters
                    </li>
                    <li className="mb-1 flex items-center">A symbol (#$&)</li>
                    <li className="flex items-center">
                      A longer password (min. 8 chars.)
                    </li>
                  </ul>
                </div>
              }
            > */}
            <TextInput id="password1" type="password" required />
            {/* </Popover> */}
          </div>

          <div className="mt-8">
            <Button className="w-full" color="dark">
              Set New Password
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

export default ResetComponent;
