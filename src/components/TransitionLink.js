import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import styled, { useTheme } from "styled-components"

const StyledAniLink = styled(AniLink)`
  text-decoration: none;
  color: inherit;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`

const TransitionLink = ({ to, children, rel, ...props }) => {
  const theme = useTheme()
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
      bg={theme.colors.primary}
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