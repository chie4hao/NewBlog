import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { useLocation } from '@reach/router'

const SeoHead = ({ 
  title, 
  description, 
  image, 
  article,
  tags,
  date,
  updateDate,
  pathname,
  noindex = false
}) => {
  const { pathname: locationPathname } = useLocation()
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  const {
    title: defaultTitle,
    description: defaultDescription,
    siteUrl,
    author,
    social
  } = site.siteMetadata

  const seo = {
    title: title ? `${title} | ${defaultTitle}` : defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || locationPathname}`,
    image: image?.startsWith('http') 
      ? image 
      : image 
        ? `${siteUrl}${image}` 
        : `${siteUrl}/default-og-image.png`,
  }

  // 增强的 Schema.org JSON-LD
  const schemaOrgJSONLD = {
    '@context': 'http://schema.org',
    '@type': article ? 'BlogPosting' : 'WebSite',
    url: seo.url,
    name: seo.title,
    headline: seo.title,
    description: seo.description,
    inLanguage: 'zh-CN',
    author: {
      '@type': 'Person',
      name: author.name,
      description: author.summary,
      url: siteUrl
    },
    publisher: {
      '@type': 'Organization',
      name: defaultTitle,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
        width: 112,
        height: 112
      }
    },
    image: {
      '@type': 'ImageObject',
      url: seo.image,
      width: 1200,
      height: 630
    },
    ...(article && {
      datePublished: date,
      dateModified: updateDate || date,
      keywords: tags?.join(', '),
      articleSection: tags?.[0],
      wordCount: description?.length || 0,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': seo.url
      }
    })
  }

  return (
    <Helmet>
      {/* 基本 Meta 标签 */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="author" content={author.name} />
      <link rel="canonical" href={seo.url} />
      
      {/* 搜索引擎控制 */}
      <meta 
        name="robots" 
        content={noindex ? "noindex,nofollow" : "index,follow"} 
      />
      <meta 
        name="googlebot" 
        content={noindex ? "noindex,nofollow" : "index,follow"} 
      />
      <meta 
        name="baiduspider" 
        content={noindex ? "noindex,nofollow" : "index,follow"} 
      />
      
      {/* 移动端优化 */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="format-detection" content="telephone=no,email=no,address=no" />
      
      {/* OpenGraph 标签 */}
      <meta property="og:site_name" content={defaultTitle} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:locale" content="zh_CN" />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={seo.title} />
      {article && date && <meta property="article:published_time" content={date} />}
      {article && updateDate && <meta property="article:modified_time" content={updateDate} />}
      {article && tags && tags.map(tag => (
        <meta property="article:tag" content={tag} key={tag} />
      ))}
      <meta property="article:author" content={author.name} />

      {/* Twitter 卡片 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={social.twitter} />
      <meta name="twitter:creator" content={social.twitter} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:image:alt" content={seo.title} />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </Helmet>
  )
}

export default SeoHead 