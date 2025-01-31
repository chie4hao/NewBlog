import React from 'react'
import styled from 'styled-components'
import TransitionLink from './TransitionLink'
import ThemeSwitcher from './ThemeSwitcher'

const SidebarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 200px;
  background: transparent;
  border-right: 1px solid ${props => props.theme.colors.border};
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(12px);
  transform: translateX(${props => (props.$isOpen ? '0' : '-100%')});
  transition: all 0.3s ease-in-out;
  z-index: 1000;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.colors.background};
    opacity: 0.85;
    z-index: -1;
  }

  @media (max-width: 768px) {
    box-shadow: ${props => props.$isOpen ? '2px 0 15px rgba(0, 0, 0, 0.2)' : 'none'};
  }
`

const SidebarContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  flex: 1;
`

const NavLink = styled(TransitionLink)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.6rem 0.8rem;
  position: relative;
  transition: all 0.3s ease;
  border-radius: 8px;
  background: ${props => props.theme.colors.background}00;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    background: ${props => `${props.theme.colors.background}22`};
    transform: translateX(5px);
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 3px;
    height: 0;
    bottom: 50%;
    left: -1rem;
    background-color: ${props => props.theme.colors.primary};
    transition: all 0.3s ease;
    border-radius: 3px;
  }
  
  &:hover::after {
    height: 70%;
    bottom: 15%;
  }
  
  &.active {
    color: ${props => props.theme.colors.primary};
    background: ${props => `${props.theme.colors.background}33`};
    
    &::after {
      height: 70%;
      bottom: 15%;
    }
  }
`

const ThemeSwitcherWrapper = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.border}44;
`

const MenuButton = styled.button`
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
  background: ${props => props.theme.colors.background}dd;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  cursor: pointer;
  padding: 0.7rem;
  color: ${props => props.theme.colors.text};
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    display: block;
  }

  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: scale(1.05);
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
  }
`

const Overlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => `${props.theme.colors.background}88`};
  backdrop-filter: blur(3px);
  z-index: 999;
  opacity: 0;
  transition: opacity 0.3s ease;

  @media (max-width: 768px) {
    display: ${props => (props.$isOpen ? 'block' : 'none')};
    opacity: ${props => (props.$isOpen ? '1' : '0')};
  }
`

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
)

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <MenuButton onClick={() => onClose(!isOpen)}>
        <MenuIcon />
      </MenuButton>
      <SidebarContainer $isOpen={isOpen}>
        <SidebarContent>
          <NavLink to="/">首页</NavLink>
          <NavLink to="/tags">标签</NavLink>
          <NavLink to="/about">关于</NavLink>
          <ThemeSwitcherWrapper>
            <ThemeSwitcher />
          </ThemeSwitcherWrapper>
        </SidebarContent>
      </SidebarContainer>
      <Overlay $isOpen={isOpen} onClick={() => onClose(false)} />
    </>
  )
}

export default Sidebar