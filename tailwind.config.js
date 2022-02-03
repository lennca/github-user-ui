module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'black': '#000000',
        blue: {
          light: '#58A6FF',
          medium: '#1f6feb',
          dark: '#0C2D6B',
        },
        green: {
          light: '#2EA043',
          medium: '#238636',
          outline: '#00800040'
        },
        grey: {
          1: '#C9D1D9',
          2: '#8B949E',
          5: '#373B42',
          6: '#30363D',
          7: '#21262D',
          8: '#0D1117',
          9: '#010409'
        }
      },
      flex: {
        '20': '1 1 20%'
      },
      boxShadow: {
        'green': '0 0 0 3px #00800040',
        'blue': '0 0 0 3px #0c2d6b'
      }
    },
  },
  plugins: [],
}
