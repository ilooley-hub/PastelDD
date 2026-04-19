import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			base: '#FAFAF7',
  			surface: '#FFFFFF',
  			'surface-2': '#F4F2EC',
  			'pastel-border': '#E8E5DC',
  			'pastel-border-hover': '#D2CEC0',
  			accent: '#7C3AED',
  			'accent-soft': '#C8A2FF',
  			'accent-deep': '#5B21B6',
  			'accent-pink': '#FFB8D9',
  			'accent-peach': '#FFCFA0',
  			'accent-sky': '#8DD0FF',
  			warm: '#E8C4A0',
  			'warm-dark': '#C97B3D',
  			'text-primary': '#14141C',
  			'text-secondary': '#52505E',
  			'text-tertiary': '#9695A8',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: 'hsl(var(--destructive))',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-sans)',
  				'DM Sans',
  				'system-ui',
  				'sans-serif'
  			],
  			heading: [
  				'var(--font-heading)',
  				'Instrument Serif',
  				'Georgia',
  				'serif'
  			]
  		},
  		letterSpacing: {
  			'heading-tight': '-1.5px',
  			'heading': '-0.5px'
  		},
  		keyframes: {
  			'scroll-logos': {
  				'0%': { transform: 'translateX(0)' },
  				'100%': { transform: 'translateX(-50%)' }
  			},
  			'blink-cursor': {
  				'0%, 100%': { opacity: '1' },
  				'50%': { opacity: '0' }
  			},
  			marquee: {
  				from: { transform: 'translateX(0)' },
  				to: { transform: 'translateX(calc(-100% - var(--gap)))' }
  			},
  			'marquee-vertical': {
  				from: { transform: 'translateY(0)' },
  				to: { transform: 'translateY(calc(-100% - var(--gap)))' }
  			},
  			orbit: {
  				'0%': {
  					transform: 'rotate(calc(var(--angle) * 1deg)) translateY(calc(var(--radius) * 1px)) rotate(calc(var(--angle) * -1deg))'
  				},
  				'100%': {
  					transform: 'rotate(calc(var(--angle) * 1deg + 360deg)) translateY(calc(var(--radius) * 1px)) rotate(calc((var(--angle) * -1deg) - 360deg))'
  				}
  			},
  			'shimmer-slide': {
  				to: { transform: 'translate(calc(100cqw - 100%), 0)' }
  			},
  			'spin-around': {
  				'0%': { transform: 'translateZ(0) rotate(0)' },
  				'15%, 35%': { transform: 'translateZ(0) rotate(90deg)' },
  				'65%, 85%': { transform: 'translateZ(0) rotate(270deg)' },
  				'100%': { transform: 'translateZ(0) rotate(360deg)' }
  			},
  			aurora: {
  				'0%, 100%': { backgroundPosition: '0% 50%' },
  				'50%': { backgroundPosition: '100% 50%' }
  			},
  			meteor: {
  				'0%': { transform: 'rotate(var(--angle)) translateX(0)', opacity: '1' },
  				'70%': { opacity: '1' },
  				'100%': { transform: 'rotate(var(--angle)) translateX(-500px)', opacity: '0' }
  			},
  			ripple: {
  				'0%, 100%': { transform: 'translate(-50%, -50%) scale(1)' },
  				'50%': { transform: 'translate(-50%, -50%) scale(0.9)' }
  			},
  			'shiny-text': {
  				'0%, 90%, 100%': { 'background-position': 'calc(-100% - var(--shiny-width)) 0' },
  				'30%, 60%': { 'background-position': 'calc(100% + var(--shiny-width)) 0' }
  			}
  		},
  		animation: {
  			'scroll-logos': 'scroll-logos 30s linear infinite',
  			'blink-cursor': 'blink-cursor 1s ease-in-out infinite',
  			marquee: 'marquee var(--duration, 40s) linear infinite',
  			'marquee-vertical': 'marquee-vertical var(--duration, 40s) linear infinite',
  			orbit: 'orbit calc(var(--duration) * 1s) linear infinite',
  			'shimmer-slide': 'shimmer-slide var(--speed) ease-in-out infinite alternate',
  			'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear',
  			aurora: 'aurora 8s ease-in-out infinite alternate',
  			meteor: 'meteor 5s linear infinite',
  			ripple: 'ripple 3400ms ease infinite',
  			'shiny-text': 'shiny-text 8s infinite'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
