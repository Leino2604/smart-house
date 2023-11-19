import * as React from "react"
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg"
const FanIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={36}
        height={36}
        fill="none"
        {...props}
    >
        <G fill="#000" clipPath="url(#a)">
            <Path d="M29.759 19.753c-.35-.845-1.435-1.336-3.747-1.695-1.673-.26-3.172-.867-4.377-1.351l-.009-.004a3.741 3.741 0 0 0-.609-3.177c.47-.798 1.348-2.685 1.138-5.339-.381-4.777-2.616-5.36-3.558-5.389-.62-.03-1.08.163-1.391.547-.553.68-.53 1.805.083 4.3.36 1.474.423 2.977.47 4.184l.008.179a3.753 3.753 0 0 0-3.04 1.916c-1.11.003-3.066.248-5.087 1.648-1.935 1.338-2.954 2.55-3.115 3.706a2.044 2.044 0 0 0 .448 1.62c.13.161.53.65 1.234.715.053.005.107.007.161.007.816 0 1.819-.56 3.389-1.881.998-.84 2.114-1.475 3.07-1.993a3.75 3.75 0 0 0 4.281 1.587c.965 1.378 2.451 2.549 4.06 3.179 1.191.468 2.21.704 3.089.704 1.31 0 2.306-.525 3.085-1.59.189-.258.762-1.04.417-1.873ZM18.34 4.312c.002 0 .054-.027.207-.016 1.124.035 1.913 1.532 2.11 4.008.138 1.726-.279 3.22-.787 4.198a3.712 3.712 0 0 0-.593-.278l-.02-.456c-.052-1.275-.116-2.861-.513-4.481-.593-2.413-.435-2.907-.404-2.975Zm-7.55 14.278c-1.696 1.427-2.284 1.54-2.445 1.53-.025-.001-.078-.007-.214-.173a.565.565 0 0 1-.122-.461c.046-.32.377-1.224 2.484-2.68 1.291-.894 2.664-1.283 3.77-1.368a3.767 3.767 0 0 0 .031.892c-1.055.568-2.328 1.272-3.503 2.26Zm4.959-2.84c0-1.24 1.01-2.25 2.25-2.25s2.25 1.01 2.25 2.25S19.24 18 18 18s-2.25-1.01-2.25-2.25Zm12.383 4.988c-.45.612-1.206 1.637-4.417.378a7.585 7.585 0 0 1-3.284-2.515c.194-.165.37-.35.527-.551l.118.047c1.207.489 2.862 1.155 4.706 1.442 2.284.356 2.569.747 2.585.762 0 .005-.004.124-.235.437Z" />
            <Path d="M33.75 15.752C33.75 7.066 26.684 0 18 0 9.316 0 2.25 7.066 2.25 15.752c0 6.365 3.796 11.86 9.242 14.341-.01 1.674-.827 4.407-1.695 4.407a.749.749 0 1 0 0 1.5H26.92a.75.75 0 1 0 0-1.5c-1.002 0-2.054-3.079-2.054-4.439a.762.762 0 0 0-.012-.13c5.26-2.554 8.896-7.95 8.896-14.18ZM24.703 34.5H11.902c.658-1.163.97-2.75 1.061-3.824 1.582.536 3.276.826 5.037.826 1.895 0 3.712-.336 5.396-.952.11 1.032.528 2.724 1.307 3.95ZM18 30.002c-7.858 0-14.25-6.392-14.25-14.25C3.75 7.893 10.142 1.5 18 1.5s14.25 6.392 14.25 14.252c0 7.859-6.392 14.25-14.25 14.25Z" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Rect width={36} height={36} fill="#fff" rx={10} />
            </ClipPath>
        </Defs>
    </Svg>
)
export default FanIcon