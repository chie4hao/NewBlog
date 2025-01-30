import React from 'react'
import styled, { css } from 'styled-components'
import { ThemeContext } from '../context/ThemeContext'
import { themes } from '../styles/themes'

const SwitcherContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: ${props => `${props.theme.colors.surface}88`};
  backdrop-filter: blur(8px);
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: ${props => props.theme.shadows.large};
  border: 1px solid ${props => `${props.theme.colors.border}44`};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => `${props.theme.colors.surface}aa`};
  }

  @media (max-width: 768px) {
    bottom: 1rem;
    right: 1rem;
  }
`

const buttonStyles = css`
  background: ${props => props.$isActive ? props.theme.colors.primary : props.theme.colors.surface};
  color: ${props => props.$isActive ? '#fff' : props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: #fff;
  }
`

const ThemeButton = styled.button`
  ${buttonStyles}
`

const AutoButton = styled(ThemeButton)`
  background: ${props => props.$isActive ? props.theme.colors.accent : props.theme.colors.surface};
`

const ThemeSwitcher = () => {
  const { currentTheme, isAutoTheme, setTheme, toggleAutoTheme } = React.useContext(ThemeContext)
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <SwitcherContainer onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      {isOpen && (
        <>
          <AutoButton
            $isActive={isAutoTheme}
            onClick={toggleAutoTheme}
          >
            自动主题
          </AutoButton>
          {Object.keys(themes).map(themeName => (
            <ThemeButton
              key={themeName}
              $isActive={!isAutoTheme && currentTheme === themeName}
              onClick={() => setTheme(themeName)}
            >
              {themes[themeName].name}
            </ThemeButton>
          ))}
        </>
      )}
      {!isOpen && (
        <ThemeButton onClick={() => setIsOpen(true)}>
          主题设置
        </ThemeButton>
      )}
    </SwitcherContainer>
  )
}

export default ThemeSwitcher 