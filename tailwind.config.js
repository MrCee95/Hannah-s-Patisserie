import type { Config } from "tailwindcss";

const config: Config = {
  // 1. Tell Tailwind where to look for your class names
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  theme: {
    extend: {
      // 2. The "Artisanal" Color Palette
      colors: {
        // Flour & Stone (Backgrounds and text)
        stone: {
          50: '#fafaf9',  // Primary Page Background
          100: '#f5f5f4', // Card backgrounds / Hover states
          200: '#e7e5e4', // Borders
          400: '#a8a29e', // Muted secondary text
          500: '#78716c', // Body text
          900: '#1c1917', // Headers and Navigation
        },
        // Golden Crust (Primary Brand Accents)
        amber: {
          50: '#fffbeb',  // Light highlight
          600: '#d97706', // Links
          700: '#b45309', // Main Buttons
          800: '#92400e', // Premium / Darker Buttons
          900: '#78350f', // Deepest Brand Brown
        },
        // The "Butter/Cream" Accent
        cream: '#fdfcf0', 
      },

      // 3. Custom Typography Mapping
      fontFamily: {
        // Maps to the Google Fonts we set up in layout.tsx
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },

      // 4. Artisanal UI Shapes
      borderRadius: {
        'bakery': '2rem',    // Soft, organic corners for pastry cards
        'button': '1.5rem',  // Rounded-pill style for actions
      },

      // 5. Subtle Bakery Shadows
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(28, 25, 23, 0.05)',
        'elevated': '0 20px 40px -10px rgba(146, 64, 14, 0.15)',
      },
    },
  },

  // 6. Standard Plugins (Leave empty for now)
  plugins: [],
};

export default config;