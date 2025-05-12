import React, { createContext, useState, useEffect ,useContext} from "react";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext(); // Ensure it has a default value

 const ThemeProvider = ({ children }) => {
  const deviceTheme = useColorScheme(); // Get system theme
  const [theme, setTheme] = useState(deviceTheme || "light");

  useEffect(() => {
    setTheme(deviceTheme); // Sync with system changes
  }, [deviceTheme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
   
  );
};

//The custom hook
export const useTheme = () => {
    return useContext(ThemeContext);
  
};



  export default ThemeProvider;
