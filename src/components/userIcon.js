import * as React from "react"
import Svg, { Path } from "react-native-svg"
const UserIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M18 9c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3Zm0 15c4.05 0 8.7 1.935 9 3H9c.345-1.08 4.965-3 9-3Zm0-18c-3.315 0-6 2.685-6 6s2.685 6 6 6 6-2.685 6-6-2.685-6-6-6Zm0 15c-4.005 0-12 2.01-12 6v3h24v-3c0-3.99-7.995-6-12-6Z"
    />
  </Svg>
)
export default UserIcon
