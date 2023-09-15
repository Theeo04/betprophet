import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleOpen } from "../redux/actions";

function ToggleButton() {
  const isOpen = useSelector((state) => state.isOpen);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleOpen());
  };

  return (
    <div>
      <button onClick={handleClick}>
        {isOpen ? "Close Component" : "Open Component"}
      </button>
    </div>
  );
}

export default ToggleButton;
