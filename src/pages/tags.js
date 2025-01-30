import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import styled from "styled-components"

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem 0;
`

const Tag = styled(Link)`
  background: #f0f0f0;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  text-decoration: none;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #e0e0e0;
  }
`

const Count = styled.span`
  background: #fff;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  font-size: 0.8rem;
`

const TagsPage = ({ data }) => {
  const tags = data.allMdx.group

  return (
    <Layout>
      <h1>所有标签</h1>
      <TagsContainer>
        {tags.map(tag => (
          <Tag key={tag.fieldValue} to={`/tags/${tag.fieldValue}`}>
            {tag.fieldValue}
            <Count>{tag.totalCount}</Count>
          </Tag>
        ))}
      </TagsContainer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMdx {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`

export default TagsPage

export const Head = () => <title>标签</title> 