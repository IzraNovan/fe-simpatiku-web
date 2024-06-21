/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./app/**/*.{js,jsx}",
		"./components/**/*.{js,jsx}",
		"./layouts/**/*.{js,jsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily: {
				montserrat: ["Montserrat", "sans-serif"],
				poppins: ["Poppins", "sans-serif"],
			},
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				"fade-black": "#212529",
				"primary-blue": "#5682FC",
				"secondary-blue": "#4d74d6",
				"dark-blue": "#1F2F59",
				"primary/10": "#9AB4FD",
				"primary/30": "#789BFD",
				"primary/50": "#5682FC",
				"primary/70": "#4568CA",
				"primary/90": "#344E97",
				"secondary/10": "#98DDF7",
				"secondary/30": "#76D2F4",
				"secondary/50": "#54C7F1",
				"secondary/70": "#439FC1",
				"secondary/90": "#327791",
				"neutral/10": "#F9FBFD",
				"neutral/30": "#F7FAFD",
				"neutral/50": "#F5F9FC",
				"neutral/70": "#C4C7CA",
				"neutral/90": "#939597",
				"success/10": "#66E0B8",
				"success/30": "#33D6A0",
				"success/50": "#00CC88",
				"success/70": "#00A36D",
				"success/90": "#007A52",
				"warning/10": "#FFBA66",
				"warning/30": "#FFA333",
				"warning/50": "#FF8C00",
				"warning/70": "#CC7000",
				"warning/90": "#995400",
				"error/10": "#FF85A3",
				"error/30": "#FF5C85",
				"error/50": "#FF3366",
				"error/70": "#CC2952",
				"error/90": "#991F3D",
				"disable/50": "#E9ECEF",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				zoom: {
					"0%": {
						transform: "scale(0)",
						opacity: "0",
					},
					"100%": {
						transform: "scale(1)",
						opacity: "1",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"zoom-out": "zoom 0.2s ease-out",
			},
		},
		listStyleType: {
			none: "none",
			disc: "disc",
			decimal: "decimal",
			alpha: "lower-alpha",
		},
	},
	plugins: [require("tailwindcss-animate")],
};
