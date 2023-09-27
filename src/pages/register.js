import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../../supabase";
import { useRouter } from "next/router";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Error signing up:", error.message);
      } else {
        console.log("Sign up successful:", user);
        router.push("/");
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  // ml-[1170px]
  return (
    <div className="flex justify-center">
      <div className="flex flex-col ">
        <h2 className="text-white text-[50px] mt-5 mb-6">
          Create Your Account Now!
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 mt-3">
            <label
              htmlFor="email"
              className=" text-white font-semibold text-[20px] "
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded "
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 flex flex-col  font-semibold text-[20px] mt-3">
            <label htmlFor="password" className="text-white">
              Password:
            </label>
            <input
              className="w-full p-2 border rounded "
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 mt-4 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
