import * as React from "react"
import Svg, { Path } from "react-native-svg"
const LightBulbIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={36}
        height={36}
        fill="none"
        {...props}
    >
        <Path
            fill="#000"
            d="M13.5 31.5c0 .825.675 1.5 1.5 1.5h6c.825 0 1.5-.675 1.5-1.5V30h-9v1.5ZM18 3C12.21 3 7.5 7.71 7.5 13.5c0 3.57 1.785 6.705 4.5 8.61v3.39c0 .825.675 1.5 1.5 1.5h9c.825 0 1.5-.675 1.5-1.5v-3.39c2.715-1.905 4.5-5.04 4.5-8.61C28.5 7.71 23.79 3 18 3Zm4.275 16.65-1.275.9V24h-6v-3.45l-1.275-.9A7.495 7.495 0 0 1 10.5 13.5C10.5 9.36 13.86 6 18 6c4.14 0 7.5 3.36 7.5 7.5 0 2.445-1.2 4.74-3.225 6.15Z"
        />
    </Svg>
)
export default LightBulbIcon
