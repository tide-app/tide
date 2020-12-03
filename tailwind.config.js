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
    container: {
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1024px",
        xl: "1280px",
      },
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
