import React from "react"
import styled from "styled-components"
import TransitionLink from "./TransitionLink"

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
`

const NavLink = styled(TransitionLink)`
  color: #2d3748;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem;
  position: relative;
  
  &:hover {
    color: #663399;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 50%;
    background-color: #663399;
    transition: all 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
    left: 0;
  }
  
  &.active {
    color: #663399;
    
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