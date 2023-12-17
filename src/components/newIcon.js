import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width={48}
    height={48}
    fill={"#FFE5B4"}
    {...props}
  >
    <G data-name="Layer 2">
      <Path d="M16 29a13 13 0 1 1 13-13 13 13 0 0 1-13 13Zm0-24a11 11 0 1 0 11 11A11 11 0 0 0 16 5Z" />
      <Path d="M16 23a1 1 0 0 1-1-1V10a1 1 0 0 1 2 0v12a1 1 0 0 1-1 1Z" />
      <Path d="M22 17H10a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2Z" />
    </G>
    <Path
      d="M0 0h32v32H0z"
      style={{
        fill: "none",
      }}
    />
  </Svg>
)
export default SvgComponent
