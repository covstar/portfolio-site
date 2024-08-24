/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			boxShadow: {
				custom: "4px 0px 4px 0px rgba(108, 119, 110, 0.40)",
			},
			// font family
			fontFamily: {
				Montserrat: ["Roboto"],
				Antonio: ["Antonio"],
			},

			// media quries
			screens: {
				mobile: { max: "640px" },
				// => @media (max-width: 640px) { ... }
				tablet: { min: "641px", max: "1023px" },
				// => @media (min-width: 641px and max-width: 1023px)
				laptop: { min: "1024px" },
				Xlaptop: { min: "1440px" },
				// => @media (min-width: 768px) { ... }
			},
			backgroundImage: {
				// 'img': "url('../images/bg-pattern.svg')",
			},
		},
	},
	plugins: [],
};
