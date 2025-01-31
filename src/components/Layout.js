import React from "react"
import styled from "styled-components"
import TransitionLink from "./TransitionLink"
import GlobalStyle from "../styles/GlobalStyle"
import Sidebar from "./Sidebar"
import { Helmet } from "react-helmet"

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  padding: 2rem;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const Container = styled.div`
  flex: 1;
  margin-left: ${props => props.$sidebarOpen ? '200px' : '0'};
  max-width: ${props => props.$sidebarOpen ? 'calc(100% - 260px)' : '960px'};
  padding: 1.5rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${props => `${props.theme.colors.surface}88`};
  backdrop-filter: blur(8px);
  box-shadow: ${props => props.theme.shadows.large};
  border-radius: 12px;
  transition: all 0.3s ease-in-out;

  @media (max-width: 768px) {
    margin-left: 0;
    max-width: 100%;
    padding: 1rem;
  }
`

const Header = styled.header`
  margin-bottom: 2rem;
  border-bottom: 1px solid ${props => `${props.theme.colors.border}44`};
  padding: 1rem 0;
  background: ${props => `${props.theme.colors.surface}22`};
  backdrop-filter: blur(4px);
  border-radius: 8px;
  padding: 1rem;
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
  padding: 1rem;
  border-top: 1px solid ${props => `${props.theme.colors.border}44`};
  text-align: center;
  color: ${props => props.theme.colors.secondary};
  background: ${props => `${props.theme.colors.surface}22`};
  backdrop-filter: blur(4px);
  border-radius: 8px;
  
  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const Layout = ({ children }) => {
  const [isMounted, setIsMounted] = React.useState(false)
  const [sidebarOpen, setSidebarOpen] = React.useState(true)

  React.useEffect(() => {
    setIsMounted(true)
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 在服务器端渲染和客户端首次渲染时返回基础布局
  if (!isMounted) {
    return (
      <>
        <Helmet>
          <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        </Helmet>
        <GlobalStyle />
        <PageWrapper>
          <Container>
            <Header>
              <HeaderContent>
                <SiteTitle to="/">chie4的博客</SiteTitle>
              </HeaderContent>
            </Header>
            <Main>{children}</Main>
            <Footer>
              © {new Date().getFullYear()}, 使用
              {` `}
              <a href="https://www.gatsbyjs.com">Gatsby</a> 构建
            </Footer>
          </Container>
        </PageWrapper>
      </>
    )
  }

  // 客户端渲染完成后返回完整布局
  return (
    <>
      <Helmet>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Helmet>
      <GlobalStyle />
      <PageWrapper>
        <Sidebar isOpen={sidebarOpen} onClose={setSidebarOpen} />
        <Container $sidebarOpen={sidebarOpen}>
          <Header>
            <HeaderContent>
              <SiteTitle to="/">chie4的博客</SiteTitle>
            </HeaderContent>
          </Header>
          <Main>{children}</Main>
          <Footer>
            © {new Date().getFullYear()}, 使用
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a> 构建
          </Footer>
        </Container>
      </PageWrapper>
    </>
  )
}

export default Layout