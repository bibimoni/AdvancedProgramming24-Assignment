/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", 
      "./public/index.html",
    ],
    theme: {
      extend: {
        fontFamily: {
            'sans': ['ui-sans-serif', 'system-ui'],
            'serif': ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
            'heading': ['Poppins', 'sans-serif'],
            'body': ['Inter', 'sans-serif'],
            'display': ['Oswald']
        }
      },
    },
    plugins: [],
  };
  