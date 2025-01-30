import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"
import TransitionLink from "./TransitionLink"

const BlogCard = styled.article`
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.medium};
  transition: all 0.3s ease;
  background: ${props => props.theme.colors.surface};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`

const CardContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
`

const StyledLink = styled(TransitionLink)`
  text-decoration: none;
  display: block;
  
  &:hover {
    text-decoration: none;
  }
`

const ImageWrapper = styled.div`
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.shadows.small};
  
  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
  }
`

const TextContent = styled.div`
  flex: 1;
  min-width: 0;
`

const BlogTitle = styled.h2`
  margin: 0 0 0.5rem;
  font-size: 1.4rem;
  color: ${props => props.theme.colors.text};
  line-height: 1.4;
  transition: color 0.3s ease;
  
  ${StyledLink}:hover & {
    color: ${props => props.theme.colors.primary};
  }
`

const BlogMeta = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const BlogExcerpt = styled.p`
  color: ${props => props.theme.colors.secondary};
  line-height: 1.6;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const BlogList = ({ posts }) => {
  return (
    <div>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        const coverImage = node.frontmatter.cover
          ? getImage(node.frontmatter.cover)
          : null

        return (
          <BlogCard key={node.fields.slug}>
            <StyledLink to={node.fields.slug}>
              <CardContent>
                {coverImage && (
                  <ImageWrapper>
                    <GatsbyImage
                      image={coverImage}
                      alt={title}
                      objectFit="cover"
                    />
                  </ImageWrapper>
                )}
                <TextContent>
                  <BlogTitle>{title}</BlogTitle>
                  <BlogMeta>
                    <time>{node.frontmatter.date}</time>
                    {node.frontmatter.tags && (
                      <span>· {node.frontmatter.tags.join(", ")}</span>
                    )}
                  </BlogMeta>
                  <BlogExcerpt>{node.excerpt}</BlogExcerpt>
                </TextContent>
              </CardContent>
            </StyledLink>
          </BlogCard>
        )
      })}
    </div>
  )
}

export default BlogList 