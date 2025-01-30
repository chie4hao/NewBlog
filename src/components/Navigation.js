import React from "react"
import styled from "styled-components"
import TransitionLink from "./TransitionLink"

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
`

const NavLink = styled(TransitionLink)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem;
  position: relative;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 50%;
    background-color: ${props => props.theme.colors.primary};
    transition: all 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
    left: 0;
  }
  
  &.active {
    color: ${props => props.theme.colors.primary};
    
    &::after {
      width: 100%;
      left: 0;
    }
  }
`

const Navigation = () => {
  return (
    <Nav>
      <NavLink to="/">首页</NavLink>
      <NavLink to="/tags">标签</NavLink>
      <NavLink to="/about">关于</NavLink>
    </Nav>
  )
}

export default Navigation 