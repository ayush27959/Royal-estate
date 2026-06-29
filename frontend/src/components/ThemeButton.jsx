import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeButton = () => {
  const {
    theme,
    toggleTheme,
  } = useContext(
    ThemeContext
  );

  return (
    <button
      onClick={toggleTheme}
      className="rounded-xl border border-yellow-500/30 bg-zinc-900 px-4 py-2 text-sm font-semibold text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
    >
      {theme === "light"
        ? "🌙"
        : "☀️"}
    </button>
  );
};

export default ThemeButton;