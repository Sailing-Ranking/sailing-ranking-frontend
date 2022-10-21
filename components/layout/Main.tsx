import React, { FunctionComponent, HTMLAttributes } from "react"

interface IMainProps extends HTMLAttributes<HTMLElement> {}
type MainProps = {} & IMainProps

const Main: FunctionComponent<MainProps> = (props) => {
    const { children, className, ...rest } = props;
    return (
        <main { ...rest } className={`p-6 w-full h-full ${className}`}>
            {children}
        </main>
    )
}

export default Main
