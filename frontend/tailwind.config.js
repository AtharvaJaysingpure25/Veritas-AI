export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        bgPrimary: "#050816",
        sidebar: "#0B1020",
        card: "#131A2F",
        accent: "#6D5DFB",
        accent2: "#7C70FF",
        muted: "#A6B0CF",
      },
      boxShadow: {
        glow: "0 0 20px rgba(109,93,251,0.35)",
      },
    },
  },
  plugins: [],
};