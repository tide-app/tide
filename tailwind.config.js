module.exports = {
  future: {
    purgeLayersByDefault: true,
  },
  purge: ["./public/**/*.html", "./src/**/*.js"],
  theme: {
    colors: {
      white: "white",
      primary: "var(--primary-color)",
      "primary-static": "var(--primary-static-color)",
      secondary: "var(--secondary-color)",
      "secondary-static": "var(--secondary-static-color)",
    },
  },
  variants: {
    textColor: ["responsive", "hover", "focus", "group-hover"],
    opacity: ["responsive", "hover", "focus", "group-hover"],
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
