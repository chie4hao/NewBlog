/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `chie4的博客`,
    author: {
      name: `chie4`,
      summary: `分享技术与生活`,
    },
    description: `使用 Gatsby 构建的个人博客`,
    siteUrl: `https://www.chie4.com`,
    social: {
      twitter: `@chie4hao`,
    },
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/images/icon.png"
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              quality: 80,
              linkImagesToOriginal: false,
              withWebp: true,
              showCaptions: true,
              wrapperStyle: `
                margin: 2rem 0;
                text-align: center;
              `,
              backgroundColor: 'transparent',
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `100`,
              icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
              className: `header-link`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "blog",
        "path": "./content/blog"
      },
      __key: "blog"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/pages/"
      },
      __key: "pages"
    },
    "gatsby-plugin-transition-link",
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
          {
            allMdx {
              nodes {
                fields {
                  slug
                }
                frontmatter {
                  updateDate
                  date
                }
              }
            }
          }
        `,
        resolveSiteUrl: () => 'https://chie4.com',
        resolvePages: ({
          allMdx: { nodes: allMdx },
        }) => {
          return allMdx.map(post => {
            return {
              path: post.fields.slug,
              lastmod: post.frontmatter.updateDate || post.frontmatter.date,
              changefreq: 'daily',
              priority: 0.7,
            }
          })
        },
        serialize: ({ path, lastmod, changefreq, priority }) => {
          return {
            url: path,
            lastmod,
            changefreq,
            priority,
          }
        },
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://chie4.com',
        sitemap: 'https://chie4.com/sitemap-index.xml',
        policy: [
          {
            userAgent: '*',
            allow: '/',
            disallow: [
              '/admin',
              '/admin/*',  // 禁止所有管理后台页面
              '/private',
              '/draft',
              '/preview',
              '*/admin',   // 禁止任何包含 admin 的路径
              '*/private',
              '*/draft',
              '*/preview',
              '*.json',    // 禁止访问 JSON 文件
              '*.yml',     // 禁止访问 YML 配置文件
            ],
          },
          {
            userAgent: 'Baiduspider',
            allow: '/',
            crawlDelay: 1,
          },
          {
            userAgent: 'Googlebot',
            allow: '/',
          },
        ],
      }
    },
  ]
};