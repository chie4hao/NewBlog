import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import CustomTable from './Table'

// 自定义段落
const Paragraph = styled.p`
  margin-bottom: 1.0rem;
  line-height: 1.8;
  color: #000000;
  font-family: -apple-system, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
  text-align: justify;
`

// 自定义标题
const Heading = styled.h2`
  margin: 1.0rem 0 1.0rem;
  color: #000000;
  font-family: -apple-system, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
  font-weight: 600;
  &:first-child {
    margin-top: 0;
  }
`

// 自定义链接
const StyledLink = styled(Link)`
  color: #0066cc;
  text-decoration: none;
  font-family: -apple-system, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
  &:hover {
    text-decoration: underline;
  }
`

// 引用块
const Blockquote = styled.blockquote`
  margin: 1.0rem 0;
  padding: 0.5rem 1rem;
  border-left: 4px solid #0066cc;
  background: #f6f8fa;
  font-family: -apple-system, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
  
  p {
    margin: 0;
    color: #000000;
  }
`

// 列表
const List = styled.ul`
  margin: 1.0rem 0;
  padding-left: 1.5rem;
  font-family: -apple-system, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
  color: #000000;
  
  li {
    margin-bottom: 0.5rem;
  }
`

// 有序列表
const OrderedList = styled.ol`
  margin: 1.0rem 0;
  padding-left: 1.5rem;
  font-family: -apple-system, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
  color: #000000;
  
  li {
    margin-bottom: 0.5rem;
  }
`

// 图片样式
const ImageStyles = styled.div`
  /* 本地图片和外部图片的容器样式 */
  .gatsby-resp-image-wrapper,
  .gatsby-image-wrapper,
  img {
    border-radius: 8px !important;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
    transition: transform 0.2s ease-in-out !important;
    margin: 0 auto;
    
    &:hover {
      transform: scale(1.01);
    }
  }
  
  /* 本地图片特有的样式 */
  .gatsby-resp-image-figure {
    margin: 2rem auto;
    text-align: center;
  }
  
  .gatsby-resp-image-image {
    border-radius: 8px !important;
  }

  /* 统一的说明文字样式 */
  figcaption,
  .gatsby-resp-image-figcaption {
    margin: 0.75rem auto 0;
    color: #666;
    font-size: 0.9em;
    font-style: italic;
    line-height: 1.6;
    background: #f9fafb;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    display: inline-block;
    font-family: -apple-system, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
  }
`

// 包装器组件
const Wrapper = ({ children }) => (
  <ImageStyles>{children}</ImageStyles>
)

// 自定义图片组件（用于外部图片）
const Image = props => {
  const image = getImage(props)
  
  return (
    <ImageStyles>
      {image ? (
        <GatsbyImage image={image} alt={props.alt} />
      ) : (
        <img src={props.src} alt={props.alt} />
      )}
      {props.alt && <figcaption>{props.alt}</figcaption>}
    </ImageStyles>
  )
}

// MDX 组件映射
const components = {
  wrapper: Wrapper,
  p: Paragraph,
  h2: props => <Heading as="h2" {...props} />,
  h3: props => <Heading as="h3" {...props} />,
  h4: props => <Heading as="h4" {...props} />,
  a: ({ href, children, ...props }) => {
    const isInternal = href && href.startsWith('/')
    return isInternal ? (
      <StyledLink to={href} {...props}>{children}</StyledLink>
    ) : (
      <StyledLink as="a" href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </StyledLink>
    )
  },
  blockquote: Blockquote,
  ul: List,
  ol: OrderedList,
  CustomTable: CustomTable,
  img: Image,
  GatsbyImage: props => <GatsbyImage {...props} style={{ margin: '2rem 0' }} />,
}

export default components 