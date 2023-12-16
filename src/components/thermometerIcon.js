import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"
const ThermometerIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width={48}
    height={48}
    {...props}
  >
    <Path fill="none" d="M0 0h256v256H0z" />
    <Path
      fill="none"
      stroke="#FFE5B4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
      d="M96 147V48a32 32 0 0 1 64 0v99h0a52 52 0 1 1-64 0Z"
    />
    <Circle
      cx={128}
      cy={188}
      r={20}
      fill="none"
      stroke="#FFE5B4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
    />
    <Path
      fill="none"
      stroke="#FFE5B4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
      d="M128 168V88"
    />
  </Svg>
)
export default ThermometerIcon
