import React from "react"
import styled from "styled-components"
import Navigation from "./Navigation"
import TransitionLink from "./TransitionLink"
import ThemeSwitcher from "./ThemeSwitcher"
import SeoHead from "./SeoHead"
import GlobalStyle from "../styles/GlobalStyle"

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.colors.surface};
  box-shadow: ${props => props.theme.shadows.large};
  border-radius: 12px;
  margin: 2rem auto;
`

const Header = styled.header`
  margin-bottom: 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: 1rem 0;
`

const SiteTitle = styled(TransitionLink)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  display: inline-block;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`

const Main = styled.main`
  flex: 1;
`

const Footer = styled.footer`
  margin-top: 2rem;
  padding: 1rem 0;
  border-top: 1px solid ${props => props.theme.colors.border};
  text-align: center;
  color: ${props => props.theme.colors.secondary};
  
  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const Layout = ({ children, title, description }) => {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  // 在服务器端渲染和客户端首次渲染时返回基础布局
  if (!isMounted) {
    return (
      <>
        <GlobalStyle />
        <Container>
          <SeoHead title={title || "我的博客"} description={description} />
          <Header>
            <HeaderContent>
              <SiteTitle to="/">我的博客</SiteTitle>
            </HeaderContent>
          </Header>
          <Main>{children}</Main>
          <Footer>
            © {new Date().getFullYear()}, 使用
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a> 构建
          </Footer>
        </Container>
      </>
    )
  }

  // 客户端渲染完成后返回完整布局
  return (
    <>
      <GlobalStyle />
      <Container>
        <SeoHead title={title || "我的博客"} description={description} />
        <Header>
          <HeaderContent>
            <SiteTitle to="/">我的博客</SiteTitle>
            <Navigation />
          </HeaderContent>
        </Header>
        <Main>{children}</Main>
        <Footer>
          © {new Date().getFullYear()}, 使用
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a> 构建
        </Footer>
        <ThemeSwitcher />
      </Container>
    </>
  )
}

export default Layout 