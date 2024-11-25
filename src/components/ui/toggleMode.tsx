import { useEffect, useState } from "react";

export default function ToggleMode() {
  const state = localStorage.getItem("darkMode");
  const [darkMode, setDarkMode] = useState<boolean>();
  const [checked, setChecked] = useState<boolean>(darkMode || state === "true" || false);

  // turn the switch to on if system preference is dark
  useEffect(() => {
    if (
      state === "true" || (state !== "false" && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
      setChecked(true);
    } else {
      setDarkMode(false);
      setChecked(false);
    }
  }, [state]);

  const setMode = (mode: boolean) => {
    if (mode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  const handleToggle = () => {
    setChecked((prev) => !prev);
    setMode(!checked);
  };

  return (
    <div className="flex py-3 items-center justify-between">
      <h1 className="text-lg font-bold text-center text-black dark:text-gray-300">
        Dark Mode Toggle
      </h1>
      <div className="flex items-center justify-center">
        <label htmlFor="toggle" className="flex items-center cursor-pointer">
          <div className="relative">
            <button
              className={`relative inline-flex items-center py-1.5 px-2 rounded-full transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus:outline-none ${
                checked
                  ? "bg-slate-700 text-slate-400 focus-visible:ring-slate-500"
                  : "bg-primary text-cyan-200 focus-visible:ring-cyan-600"
              }`}
              role="switch"
              type="button"
              aria-checked={checked}
              onClick={handleToggle}
            >
              <span className="sr-only">
                {checked ? "Enable dark mode" : "Disable dark mode"}
              </span>
              <svg
                className={`transform transition-transform scale-${
                  checked ? "100" : "0"
                } duration-300`}
                width="24"
                height="24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 4v1M18 6l-1 1M20 12h-1M18 18l-1-1M12 19v1M7 17l-1 1M5 12H4M7 7 6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                className={`ml-3.5 transform transition-transform scale-${
                  checked ? "0" : "100"
                } duration-500`}
                width="24"
                height="24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M18 15.63c-.977.52-1.945.481-3.13.481A6.981 6.981 0 0 1 7.89 9.13c0-1.185-.04-2.153.481-3.13C6.166 7.174 5 9.347 5 12.018A6.981 6.981 0 0 0 11.982 19c2.67 0 4.844-1.166 6.018-3.37ZM16 5c0 2.08-.96 4-3 4 2.04 0 3 .92 3 3 0-2.08.96-3 3-3-2.04 0-3-1.92-3-4Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                className={`absolute top-0.5 left-0.5 bg-white w-8 h-8 rounded-full flex items-center justify-center transition duration-500 transform ${
                  checked ? "translate-x-[2.625rem]" : "translate-x-0"
                }`}
              >
                <svg
                  className={`flex-none transition duration-500 transform text-cyan-500 ${
                    checked ? "opacity-0 scale-0" : "opacity-100 scale-100"
                  }`}
                  width="24"
                  height="24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 4v1M18 6l-1 1M20 12h-1M18 18l-1-1M12 19v1M7 17l-1 1M5 12H4M7 7 6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg
                  className={`flex-none -ml-6 transition duration -500 transform text-slate-700 ${
                    checked ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`}
                  width="24"
                  height="24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M18 15.63c-.977.52-1.945.481-3.13.481A6.981 6.981 0 0 1 7.89 9.13c0-1.185-.04-2.153.481-3.13C6.166 7.174 5 9.347 5 12.018A6.981 6.981 0 0 0 11.982 19c2.67 0 4.844-1.166 6.018-3.37ZM16 5c0 2.08-.96 4-3 4 2.04 0 3 .92 3 3 0-2.08.96-3 3-3-2.04 0-3-1.92-3-4Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            {/* <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div> */}
            {/* <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div> */}
          </div>
        </label>
      </div>
    </div>
  );
}
