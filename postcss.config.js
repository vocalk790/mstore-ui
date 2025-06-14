// ✅ 정식 작동하는 CommonJS 방식
module.exports = {
  plugins: {
    tailwindcss: require('tailwindcss'),
    autoprefixer: require('autoprefixer'),
  },
};
