import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import styled from "styled-components"

const StyledAniLink = styled(AniLink)`
  text-decoration: none;
  color: inherit;
  
  &:hover {
    color: #663399;
  }
`

const TransitionLink = ({ to, children, rel, ...props }) => {
  const isBack = to === "/" // 返回首页
  const isPrev = rel === "prev" // 上一篇文章
  
  // 根据不同的导航类型决定动画方向
  const getDirection = () => {
    if (isBack) return "right"
    if (isPrev) return "right"
    return "left"
  }

  return (
    <StyledAniLink
      cover
      direction={getDirection()}
      duration={0.8}
      bg="#663399"
      to={to}
      entry={{
        delay: 0.2,
        length: 1
      }}
      exit={{
        length: 0.6
      }}
      {...props}
    >
      {children}
    </StyledAniLink>
  )
}

export default TransitionLink 