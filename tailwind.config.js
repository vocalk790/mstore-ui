/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",                  // ✅ public/index.html
    "./src/**/*.{js,jsx,ts,tsx}"     // ✅ src 내부 모든 React 파일
  ],
  darkMode: 'class',                 // ✅ 다크모드 class 기준 적용
  theme: {
    extend: {
      colors: {
        primary: "#1C64F2",          // Figma Primary Blue
        accent: "#60A5FA",           // Figma Accent Light Blue
        dark: "#1F2937",             // Gray-900
        grayText: "#6B7280"          // Gray-500
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"]
      },
      borderRadius: {
        xl2: "1.25rem"               // Extra rounded
      }
    }
  },
  plugins: []
}
