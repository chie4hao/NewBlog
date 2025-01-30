import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1rem;
`

const Header = styled.header`
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
`

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
`

const StyledLink = styled(Link)`
  color: #333;
  text-decoration: none;
  &:hover {
    color: #666;
  }
`

const Footer = styled.footer`
  margin-top: 2rem;
  padding: 1rem 0;
  border-top: 1px solid #eee;
  text-align: center;
  color: #666;
`

const Layout = ({ children }) => {
  return (
    <Container>
      <Header>
        <h1>
          <StyledLink to="/">我的博客</StyledLink>
        </h1>
        <Nav>
          <StyledLink to="/">首页</StyledLink>
          <StyledLink to="/tags">标签</StyledLink>
          <StyledLink to="/about">关于</StyledLink>
        </Nav>
      </Header>
      <main>{children}</main>
      <Footer>
        © {new Date().getFullYear()}, 使用
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a> 构建
      </Footer>
    </Container>
  )
}

export default Layout 