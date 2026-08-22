/**
 * PLACEHOLDER TOKENS — approximated from screenshots.
 * Replace every value in `theme.extend` below once you've measured the
 * real ones from devtools (see reference-page-anatomy.md / animation-interaction-checklist.md).
 * Search this file for "APPROX" to find everything that needs a real measurement.
 */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#FF385C",       // APPROX — Airbnb-style coral/pink, verify exact hex
        brandDark: "#E31C5F",   // APPROX — hover/darker state
        ink: "#222222",         // APPROX — primary text
        muted: "#717171",       // APPROX — secondary/grey text
        divider: "#DDDDDD"      // APPROX — border/divider grey
      },
      borderRadius: {
        card: "12px"            // APPROX — image/card corner radius
      },
      transitionTimingFunction: {
        approx: "cubic-bezier(0.2, 0, 0, 1)" // APPROX generic ease-out, replace per-interaction
      }
    }
  },
  plugins: []
};
