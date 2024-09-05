"use client";
import i18n from "@/config/i18next";
import { RootState } from "@/lib/store";
import axios from "axios";
import { Card } from "flowbite-react";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
interface DashboardData {
  no_of_users: number;
  no_of_license: number;
  active_license: number;
  inactive_license: number;
}

const Home = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const userDetails = async () => {
      try {
        const store = JSON.parse(localStorage.getItem("userData") || "{}");

        const apiToken = store?.user?.apiToken;

        if (!apiToken) {
          throw new Error("Missing authorization token"); // Throw error if no token
        }

        const response = await axios.post("/api/dashboard", null, {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        });
        setLoading(false);
        setData(response?.data?.data);
      } catch (error: any) {
        console.error(error.message || "Error fetching user details"); // Handle errors
        throw error; // Rethrow the error to be caught in checkAuth
      }
    };

    const checkAuth = async () => {
      try {
        await userDetails();
      } catch (error: any) {
        console.error(error?.message || "Error in authentication check"); // Log error for debugging
        //   localStorage.removeItem("userData"); // Remove user data from localStorage
        //   window.location.href = "/login"; // Redirect to login page
      }
    };

    checkAuth();
  }, []);

  return (
    <>
      <div className="h-screen">
        <div className="p-4">
          <div className="flex justify-center m-20 text-2xl font-extrabold">
            Hello, Welcome to the home page.
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
