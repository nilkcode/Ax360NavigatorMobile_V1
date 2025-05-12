/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.{js,jsx,ts,tsx}","./src/**/*.{js,jsx,ts,tsx}" ],
  presets: [require("nativewind/preset")],
  // darkMode: "class", // Enables dark mode

  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Background color
        foreground: "var(--foreground)", // Text color
        primary: "var(--color-primary)", // Primary brand color
        secondary: "var(--color-secondary)", // Secondary brand color
      },
    },
  },
  plugins: [],
}

