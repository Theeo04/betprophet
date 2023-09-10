import React from "react";
import { PiUserCircle } from "react-icons/pi";
import { AiOutlineDownCircle, AiOutlineLogin } from "react-icons/ai";

function Nav() {
  return (
    <div className="flex space-x-[120px] md:space-x-[240px] lg:space-x-[400px] xl:space-x-[820px] border-b border-gray-800">
      <img
        src="logo.png"
        className="w-[180px] h-auto ml-11 mt-1 lg:w-[250px]"
      />
      <div className="flex space-x-5 mt-2 lg:space-x-6 lg:pr-5">
        <div className="flex ">
          <button className="text-white text-[17px] font-[500] lg:text-[23px]">
            Deposit
          </button>
          <AiOutlineDownCircle className="text-white mt-[20px] ml-[5px] text-[19px] lg:text-[23px] lg:mt-[30px] lg:ml-2" />
        </div>

        <div className="flex">
          <button className="text-white text-[17px] font-[500] lg:text-[23px]">
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
      {/* <div className="w-full h-[5px] bg-white"></div> */}
    </div>
  );
}

export default Nav;
