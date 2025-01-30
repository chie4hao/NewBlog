import React from "react"
import Layout from "../components/Layout"
import styled from "styled-components"

const Content = styled.div`
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.8;
  
  h1 {
    margin-bottom: 2rem;
  }
  
  p {
    margin-bottom: 1.5rem;
  }
`

const AboutPage = () => {
  return (
    <Layout>
      <Content>
        <h1>关于我</h1>
        <p>
          欢迎来到我的博客！这是一个使用 Gatsby 构建的个人博客网站。在这里，我会分享我的技术心得、学习笔记和个人感悟。
        </p>
        <p>
          我热爱编程和技术，同时也喜欢分享知识和经验。通过这个博客，我希望能够记录下自己的成长历程，也希望能够帮助到其他人。
        </p>
        <p>
          如果你有任何问题或建议，欢迎与我交流！
        </p>
      </Content>
    </Layout>
  )
}

export default AboutPage

export const Head = () => <title>关于</title> 