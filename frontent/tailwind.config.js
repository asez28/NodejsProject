/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    colors: {
      'cahol': '#083344',
      'shahor': '#52525b',
      'shahor2': '#27272a',
      "cahol1": "#38bdf8",
      "lavan": "#cbd5e1"
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

