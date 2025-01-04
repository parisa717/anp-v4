import defaultConfig from '@nexus-ui/tailwind'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [defaultConfig],
  content: [
    './index.html',
    '../../node_modules/primereact/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
}
