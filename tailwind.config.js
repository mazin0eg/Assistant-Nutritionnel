/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/view/**/*.ejs",
    "./src/view/*.ejs",
    "./src/**/*.js",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#22C55E",
        primaryDark: "#16A34A",
        accent: "#F97316",
        bgLight: "#F9FAFB",
        textMain: "#111827",
        borderLight: "#E5E7EB",
        success: "#16A34A",
        error: "#DC2626",
        warning: "#FACC15",
        info: "#3B82F6",
      },
      fontFamily: { poppins: ["Poppins"] },
    },
  },
  plugins: [],
};