module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: {
        DEFAULT: "#6D01FF",
        dark: "#6001E1",
      },
      white: "#FFFFFF",
      gray: {
        DEFAULT: "#F1F4FA",
        dark: "#D9D9E9",
      },
      yellow: "#FFB300",
      red: "#F25554",
    },
    extend: {
      borderRadius: {
        "4xl": "50px",
      },
      outline: {
        primary: "2px solid #6D01FF",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
