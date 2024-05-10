/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  // Other Tailwind CSS configurations...
  content: ["./src/**/*.{html,js, tsx}"],
  plugins: [
    // Other plugins if any...
  ],
  theme: {
    extend: {
      fontWeight: {
        'light': 300,
        'normal': 400,
        'semibold': 600,
        'bold': 700,
        'extrabold': 800,
      }
    }
  }
}
