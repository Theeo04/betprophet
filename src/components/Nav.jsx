import React, { useEffect, useRef, useState } from "react";
import { PiUserCircle } from "react-icons/pi";
import { AiOutlineDownCircle, AiOutlineLogin } from "react-icons/ai";
import GrayBck from "./GrayBck";

function NavWithSignUp() {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleSignUpModal = () => {
    setIsSignUpModalOpen(!isSignUpModalOpen);
  };

  const modalRef = useRef();

  // Handle clicks outside the modal
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsSignUpModalOpen(false);
      }
    }

    if (isSignUpModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSignUpModalOpen]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // Add your sign-up logic here using email and password state values
      console.log("Signing up with email:", email);
      console.log("Signing up with password:", password);

      // Close the modal after successful sign-up
      setIsSignUpModalOpen(false);
    } catch (error) {
      console.error("Error signing up:", error.message);
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
                onClick={toggleSignUpModal}
              >
                User
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
      {isSignUpModalOpen && (
        <div className="absolute popup">
          <div ref={modalRef} className="popup-content">
            <button className="close-modal" onClick={toggleSignUpModal}>
              Close
            </button>
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <form onSubmit={handleSignUp}>
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
          {isSignUpModalOpen}
        </div>
      )}
    </div>
  );
}

export default NavWithSignUp;
