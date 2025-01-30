import React from "react"
import styled from "styled-components"
import Navigation from "./Navigation"
import TransitionLink from "./TransitionLink"

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1rem;
`

const Header = styled.header`
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
`

const SiteTitle = styled(TransitionLink)`
  color: #2d3748;
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  display: inline-block;
  
  &:hover {
    color: #663399;
  }
`

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`

const Footer = styled.footer`
  margin-top: 2rem;
  padding: 1rem 0;
  border-top: 1px solid #eee;
  text-align: center;
  color: #718096;
  
  a {
    color: #663399;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const Layout = ({ children }) => {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  // 在服务器端渲染和客户端首次渲染时返回基础布局
  if (!isMounted) {
    return (
      <Container>
        <Header>
          <HeaderContent>
            <SiteTitle to="/">我的博客</SiteTitle>
          </HeaderContent>
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

  // 客户端渲染完成后返回完整布局
  return (
    <Container>
      <Header>
        <HeaderContent>
          <SiteTitle to="/">我的博客</SiteTitle>
          <Navigation />
        </HeaderContent>
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