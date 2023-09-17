import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../../supabase";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        // Redirect or perform other actions after successful signup.
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  // ml-[1170px]
  return (
    <div className="absolute popup z-50">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-800 font-semibold"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-800 font-semibold"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
