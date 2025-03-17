import React from "react";
import useHover from "../hooks/useHover";

const SignInButton = ({ onClick }) => {
  const hover = useHover();
  return (
    <button
      style={{
        width: "300px",
        padding: "12px",
        marginTop: "15px",
        background: "white",
        color: "white",
        border: "none",
        borderRadius: "30px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        transition: "transform 0.3s ease-in-out",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transform: hover.isHovered ? "scale(1.05)" : "scale(1)",
      }}
      {...hover}
      onClick={onClick}
    >
      SIGN IN
    </button>
  );
};

export default SignInButton;
