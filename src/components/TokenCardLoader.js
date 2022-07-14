import React from "react"
import ContentLoader, { Rect } from "react-content-loader/native"

const TokenCardLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={100}
    height={125}
    viewBox="0 0 100 125"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <Rect x="0" y="0" rx="16" ry="16" width="100" height="125" />
  </ContentLoader>
)

export { TokenCardLoader }