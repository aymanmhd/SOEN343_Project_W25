import { useState } from "react";

const usePasswordToggle = () => {
  const [showPassword, setShowPassword] = useState(false);
  return {
    showPassword,
    togglePassword: () => setShowPassword(!showPassword),
  };
};

export default usePasswordToggle;
