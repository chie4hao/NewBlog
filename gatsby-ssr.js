import React from 'react'

export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: "zh-CN" })
}

export const wrapRootElement = ({ element }) => {
  return (
    <React.StrictMode>
      {element}
    </React.StrictMode>
  )
} 