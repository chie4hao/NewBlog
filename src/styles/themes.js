export const themes = {
  light: {
    name: '浅色',
    colors: {
      background: 'linear-gradient(120deg, rgba(253, 251, 251, 0.45), rgba(235, 237, 238, 0.45))',
      text: '#2d3748',
      primary: '#663399',
      secondary: '#718096',
      accent: '#805ad5',
      border: '#edf2f7',
      surface: '#ffffff',
      hover: '#f7fafc'
    },
    shadows: {
      small: '0 1px 3px rgba(0,0,0,0.12)',
      medium: '0 4px 6px rgba(0,0,0,0.1)',
      large: '0 10px 20px rgba(0,0,0,0.08)'
    }
  },
  dark: {
    name: '深色',
    colors: {
      background: 'linear-gradient(120deg, rgba(45, 55, 72, 0.45), rgba(26, 32, 44, 0.45))',
      text: '#f7fafc',
      primary: '#9f7aea',
      secondary: '#a0aec0',
      accent: '#b794f4',
      border: '#4a5568',
      surface: '#2d3748',
      hover: '#4a5568'
    },
    shadows: {
      small: '0 1px 3px rgba(0,0,0,0.3)',
      medium: '0 4px 6px rgba(0,0,0,0.2)',
      large: '0 10px 20px rgba(0,0,0,0.15)'
    }
  },
  spring: {
    name: '春季',
    colors: {
      background: 'linear-gradient(120deg, rgba(230, 255, 250, 0.45), rgba(240, 255, 244, 0.45))',
      text: '#2d3748',
      primary: '#38b2ac',
      secondary: '#718096',
      accent: '#4fd1c5',
      border: '#e6fffa',
      surface: '#ffffff',
      hover: '#f0fff4'
    },
    shadows: {
      small: '0 1px 3px rgba(56,178,172,0.12)',
      medium: '0 4px 6px rgba(56,178,172,0.1)',
      large: '0 10px 20px rgba(56,178,172,0.08)'
    }
  },
  summer: {
    name: '夏季',
    colors: {
      background: 'linear-gradient(120deg, rgba(255, 245, 245, 0.45), rgba(255, 250, 240, 0.45))',
      text: '#2d3748',
      primary: '#ed8936',
      secondary: '#718096',
      accent: '#f6ad55',
      border: '#fff5f5',
      surface: '#ffffff',
      hover: '#fffaf0'
    },
    shadows: {
      small: '0 1px 3px rgba(237,137,54,0.12)',
      medium: '0 4px 6px rgba(237,137,54,0.1)',
      large: '0 10px 20px rgba(237,137,54,0.08)'
    }
  },
  autumn: {
    name: '秋季',
    colors: {
      background: 'linear-gradient(120deg, rgba(255, 250, 240, 0.45), rgba(255, 245, 245, 0.45))',
      text: '#2d3748',
      primary: '#dd6b20',
      secondary: '#718096',
      accent: '#ed8936',
      border: '#fffaf0',
      surface: '#ffffff',
      hover: '#fff5f5'
    },
    shadows: {
      small: '0 1px 3px rgba(221,107,32,0.12)',
      medium: '0 4px 6px rgba(221,107,32,0.1)',
      large: '0 10px 20px rgba(221,107,32,0.08)'
    }
  },
  winter: {
    name: '冬季',
    colors: {
      background: 'linear-gradient(120deg, rgba(247, 250, 252, 0.45), rgba(235, 248, 255, 0.45))',
      text: '#2d3748',
      primary: '#3182ce',
      secondary: '#718096',
      accent: '#4299e1',
      border: '#f7fafc',
      surface: '#ffffff',
      hover: '#ebf8ff'
    },
    shadows: {
      small: '0 1px 3px rgba(49,130,206,0.12)',
      medium: '0 4px 6px rgba(49,130,206,0.1)',
      large: '0 10px 20px rgba(49,130,206,0.08)'
    }
  }
}

export const fonts = {
  base: `"PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", "WenQuanYi Micro Hei", "Noto Sans SC", sans-serif`,
  heading: `"Microsoft YaHei", "SimSun", "STSong", serif`,
  code: `"JetBrains Mono", "Fira Code", "Source Code Pro", Consolas, monospace`,
}

export const getSeasonTheme = () => {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return 'spring'
  if (month >= 5 && month <= 7) return 'summer'
  if (month >= 8 && month <= 10) return 'autumn'
  return 'winter'
} 