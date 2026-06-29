import {
  createContext,
  useEffect,
  useState,
} from "react";

export const ThemeContext =
  createContext();

const ThemeProvider = ({
  children,
}) => {
  const [theme, setTheme] =
    useState(
      localStorage.getItem(
        "theme"
      ) || "light"
    );

  useEffect(() => {
    const html =
      document.documentElement;

    if (theme === "dark") {
      html.classList.add(
        "dark"
      );
    } else {
      html.classList.remove(
        "dark"
      );
    }

    localStorage.setItem(
      "theme",
      theme
    );
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "light"
        ? "dark"
        : "light"
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;