"use client";

import axios from "axios";
import {
  Avatar,
  Dropdown,
  Navbar
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { t, i18n } = useTranslation();
  const [storeValue, setStoreValue] = useState<any>(null);
  const onLogout = async () => {
    const store = JSON.parse(localStorage.getItem("userData") || "{}");

    try {
      const apiToken = store?.user?.apiToken;

      if (!apiToken) {
        throw new Error("Missing authorization token"); // Throw error if no token
      }

      const response = await axios.post("/api/users/signout", null, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      });
      // on sucessful logout, remove the user data from local storage
      localStorage.removeItem("userData");
      window.location.href = "/login";
    } catch (error: any) {
      error?.response?.data;
      console.error(error.message || "Error fetching user details"); // Handle errors
    }
  };

  
  useEffect(() => {
    const storeValue = JSON.parse(localStorage.getItem("userData") || "{}");
    setStoreValue(storeValue);
  }, []);

  return (
    <Navbar theme={SideBarTheme} fluid rounded>
      <Navbar.Brand>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white flex flex-wrap gap-2">
          Smart Farm{" "}
          <span> {/* <FaCheck className="text-green-500 mt-1" /> */}</span>
        </span>
      </Navbar.Brand>
      <Navbar.Collapse>
       
      </Navbar.Collapse>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{storeValue?.user?.name}</span>
            <span className="block truncate text-sm font-medium">
              {storeValue?.user?.email}
            </span>
          </Dropdown.Header>
          {/* <Dropdown.Item>
            <DarkThemeToggle />
            <span
              className="ml-2"
              onClick={() =>
                i18n.changeLanguage(i18n.language === "en" ? "ar" : "en")
              }
            >
              {t("en")}
            </span>
          </Dropdown.Item> */}
         
          <Dropdown.Item onClick={onLogout}> {t("sign-out")} </Dropdown.Item>
        </Dropdown>
        {/* <Navbar.Toggle /> */}
      </div>
    </Navbar>
  );
};

const SideBarTheme = {
  root: {
    base: "bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4 shadow-md",
    rounded: {
      on: "rounded-none",
      off: "",
    },
    bordered: {
      on: "border",
      off: "",
    },
    inner: {
      base: "mx-auto flex flex-wrap items-center justify-between",
      fluid: {
        on: "",
        off: "container",
      },
    },
  },
  brand: {
    base: "flex items-center",
  },
  collapse: {
    base: "w-full md:block md:w-auto",
    list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
    hidden: {
      on: "hidden",
      off: "",
    },
  },
  link: {
    base: "block py-2 pl-3 pr-4 md:p-0",
    active: {
      on: "bg-cyan-700 text-white dark:text-white md:bg-transparent md:text-cyan-700",
      off: "border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white",
    },
    disabled: {
      on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
      off: "",
    },
  },
  toggle: {
    base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden",
    icon: "h-6 w-6 shrink-0",
  },
};

export default Sidebar;
