import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"

const Article = styled.article`
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;
  display: flex;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 1.5rem;
  }
`

const CoverWrapper = styled.div`
  flex: 0 0 120px;
  height: 120px;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    box-shadow: inset 0 0 0 0 rgba(255,255,255,0.2);
    transition: all 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

    &::after {
      box-shadow: inset 0 0 0 60px rgba(255,255,255,0.2);
    }

    .gatsby-image-wrapper {
      transform: scale(1.1);
    }
  }

  .gatsby-image-wrapper {
    transition: transform 0.3s ease;
  }

  @media (max-width: 768px) {
    flex: 0 0 100px;
    height: 100px;
  }
`

const ContentWrapper = styled.div`
  flex: 1;
  min-width: 0;
`

const Title = styled.h2`
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const StyledLink = styled(Link)`
  color: #333;
  text-decoration: none;
  &:hover {
    color: #666;
  }
`

const Meta = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
`

const Description = styled.p`
  color: #444;
  line-height: 1.6;
  margin: 0.5rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`

const Tags = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`

const Tag = styled(Link)`
  background: #f0f0f0;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  font-size: 0.8rem;
  color: #666;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e0e0e0;
    transform: translateY(-1px);
  }
`

const BlogList = ({ posts }) => {
  return (
    <div>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        const coverImage = node.frontmatter.cover?.childImageSharp?.gatsbyImageData
          ? getImage(node.frontmatter.cover)
          : null

        return (
          <Article key={node.fields.slug}>
            {coverImage && (
              <CoverWrapper>
                <Link to={node.fields.slug}>
                  <GatsbyImage
                    image={coverImage}
                    alt={title}
                    style={{ height: "100%" }}
                    imgStyle={{ borderRadius: "50%" }}
                  />
                </Link>
              </CoverWrapper>
            )}
            <ContentWrapper>
              <Title>
                <StyledLink to={node.fields.slug}>{title}</StyledLink>
              </Title>
              <Meta>
                <time>{node.frontmatter.date}</time>
              </Meta>
              <Description>
                {node.frontmatter.description || node.excerpt}
              </Description>
              {node.frontmatter.tags && (
                <Tags>
                  {node.frontmatter.tags.map(tag => (
                    <Tag key={tag} to={`/tags/${tag}`}>
                      {tag}
                    </Tag>
                  ))}
                </Tags>
              )}
            </ContentWrapper>
          </Article>
        )
      })}
    </div>
  )
}

export default BlogList 