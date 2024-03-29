module.exports = {
  theme: {
    extend: {
      colors: {
        blue: {
          "100": "#eef5fc",
          "200": "#c0dcf2",
          "300": "#91c2e3",
          "400": "#69acd3",
          "500": "#4095bf",
          "600": "#2f78a2",
          "700": "#225e86",
          "800": "#164265",
          "900": "#0c2841",
        },
      },
      inset: {
        "18": "4.5rem",
      },
      width: {
        "3-10": "30%",
        "47": "47.5%",
        "3-4": "75%",
        "85-100": "85%",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      // made the pixel count here outrageous, because I don't want to trigger the xl and 2xl styles - it messes things up, though it does create a few problems as
      xl: "1280px",
      "2xl": "1367px",
    },
  },
  variants: {},
  plugins: [],
};
