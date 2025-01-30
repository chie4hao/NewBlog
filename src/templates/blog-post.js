import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import Layout from "../components/Layout"
import styled from "styled-components"
import MDXComponents from "../components/mdx"
import TransitionLink from "../components/TransitionLink"

const Article = styled.article`
  max-width: 700px;
  margin: 0 auto;
`

const Header = styled.header`
  margin-bottom: 1.5rem;
`

const Title = styled.h1`
  margin-bottom: 0.5rem;
`

const Meta = styled.div`
  color: ${props => props.theme.colors.secondary};
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
`

const Content = styled.div`
  line-height: 1.8;
  color: ${props => props.theme.colors.text};
  
  pre {
    background: ${props => props.theme.colors.surface};
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    margin: 1.5rem 0;
    box-shadow: ${props => props.theme.shadows.small};
  }
  
  code {
    background: ${props => props.theme.colors.surface};
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-size: 0.9em;
  }
  
  blockquote {
    border-left: 4px solid ${props => props.theme.colors.border};
    padding-left: 1rem;
    margin-left: 0;
    color: ${props => props.theme.colors.secondary};
  }
  
  p > code, li > code, a > code {
    padding: 0.2rem 0.4rem;
    display: inline;
  }
  
  pre code {
    padding: 0.2rem 0.4rem;
    display: block;
  }

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const Tags = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 2rem 0;
`

const Tag = styled(TransitionLink)`
  background: ${props => props.theme.colors.surface};
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.secondary};
  text-decoration: none;
  box-shadow: ${props => props.theme.shadows.small};
  
  &:hover {
    background: ${props => props.theme.colors.hover};
  }
`

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${props => props.theme.colors.border};
  gap: 2rem;
`

const NavItem = styled.div`
  flex: 1;
  min-width: 0;
  
  &:last-child {
    text-align: right;
  }
`

const NavLabel = styled.span`
  display: block;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 0.5rem;
`

const NavLink = styled(TransitionLink)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-size: 1.0rem;
  position: relative;
  display: inline-block;
  max-width: 100%;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
  
  // 文字溢出时显示省略号
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  // 添加箭头
  &[rel="prev"]::before {
    content: "←";
    margin-right: 0.5rem;
    display: inline-block;
    transition: transform 0.2s ease;
  }
  
  &[rel="next"]::after {
    content: "→";
    margin-left: 0.5rem;
    display: inline-block;
    transition: transform 0.2s ease;
  }
  
  &:hover {
    &[rel="prev"]::before {
      transform: translateX(-4px);
    }
    
    &[rel="next"]::after {
      transform: translateX(4px);
    }
  }
`

const BackToHome = styled(TransitionLink)`
  display: inline-block;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.secondary};
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
  
  &::before {
    content: "←";
    margin-right: 0.5rem;
  }
`

const BlogPostTemplate = ({ data, children, pageContext }) => {
  const post = data.mdx
  const { previous, next } = data

  return (
    <Layout>
      <Article>
        <BackToHome to="/">返回首页</BackToHome>
        <Header>
          <Title>{post.frontmatter.title}</Title>
          <Meta>
            <time>{post.frontmatter.date}</time>
            {post.frontmatter.updateDate && (
              <span>更新于 {post.frontmatter.updateDate}</span>
            )}
          </Meta>
          {post.frontmatter.description && (
            <p
              style={{
                color: '#666',
                fontSize: '0.9rem',
                fontStyle: 'italic',
                marginTop: '1rem',
                marginBottom: '1rem',
              }}
            >
              {post.frontmatter.description}
            </p>
          )}
        </Header>
        <Content>
          <MDXProvider components={MDXComponents}>
            {children}
          </MDXProvider>
        </Content>
        {post.frontmatter.tags && (
          <Tags>
            {post.frontmatter.tags.map(tag => (
              <Tag key={tag} to={`/tags/${tag}`}>
                {tag}
              </Tag>
            ))}
          </Tags>
        )}
        <Navigation>
          <NavItem>
            {previous && (
              <>
                <NavLabel>上一篇</NavLabel>
                <NavLink to={previous.fields.slug} rel="prev">
                  {previous.frontmatter.title}
                </NavLink>
              </>
            )}
          </NavItem>
          <NavItem>
            {next && (
              <>
                <NavLabel>下一篇</NavLabel>
                <NavLink to={next.fields.slug} rel="next">
                  {next.frontmatter.title}
                </NavLink>
              </>
            )}
          </NavItem>
        </Navigation>
      </Article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    mdx(id: { eq: $id }) {
      id
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY年MM月DD日")
        updateDate(formatString: "YYYY年MM月DD日")
        description
        tags
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`

export default BlogPostTemplate

export const Head = ({ data }) => (
  <title>{data.mdx.frontmatter.title}</title>
) 