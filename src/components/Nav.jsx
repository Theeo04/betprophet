import React, { useEffect, useRef, useState } from "react";
import { PiUserCircle } from "react-icons/pi";
import { AiOutlineDownCircle, AiOutlineLogin } from "react-icons/ai";
import { supabase } from "../../supabase";
import { useRouter } from "next/router";

function NavWithLogIn() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const router = useRouter();

  const toggleSignInModal = () => {
    setIsSignInModalOpen(!isSignInModalOpen);
  };

  const modalRef = useRef();

  // Handle clicks outside the modal
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsSignInModalOpen(false);
      }
    }

    if (isSignInModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSignInModalOpen]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Error signing in:", error.message);
      } else if (data) {
        console.log("User has logged in:", data);
        setUser(data);
        // Close the modal after successful sign-in
        setIsSignInModalOpen(false);
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  return (
    <div>
      <div>
        <div className="flex space-x-[120px] md:space-x-[240px] lg:space-x-[400px] xl:space-x-[820px] border-b border-gray-800">
          <img
            src="logo.png"
            className="w-[180px] h-auto ml-11 mt-1 lg:w-[250px]"
          />
          <div className="flex space-x-5 mt-2 lg:space-x-6 lg:pr-5">
            <div className="flex">
              <button className="text-white text-[17px] font-[500] lg:text-[23px]">
                Deposit
              </button>
              <AiOutlineDownCircle className="text-white mt-[20px] ml-[5px] text-[19px] lg:text-[23px] lg:mt-[30px] lg:ml-2" />
            </div>

            <div className="flex">
              <button
                className="text-white text-[17px] font-[500] lg:text-[23px]"
                onClick={() => {
                  toggleSignInModal(); // Always toggle the modal
                  if (user) {
                    router.push("/userProfile"); // If the user is authenticated, navigate to "/nume pagina"
                  }
                }}
              >
                {user ? user.user.email : "User"}
              </button>
              <PiUserCircle className="text-white mt-[19px] ml-[5px] text-[22px] lg:text-[27px] lg:mt-[28px] lg:ml-2" />
            </div>

            <div className="flex">
              <button className="text-white text-[17px] font-[500] lg:text-[23px] ">
                Register
              </button>
              <AiOutlineLogin className="text-white mt-[20px] ml-[5px] text-[19px] lg:text-[23px] lg:mt-[30px] lg:ml-2" />
            </div>
          </div>
        </div>
      </div>
      {isSignInModalOpen && (
        <div className={`absolute ml-[1100px] ${user ? "hidden" : ""}`}>
          <div ref={modalRef} className="popup-content">
            <button className="close-modal" onClick={toggleSignInModal}>
              Close
            </button>
            <h2 className="text-2xl font-bold mb-4">Log In</h2>
            <form onSubmit={handleSignIn}>
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
                Sign In
              </button>
            </form>
          </div>
          {isSignInModalOpen}
        </div>
      )}
    </div>
  );
}

export default NavWithLogIn;
