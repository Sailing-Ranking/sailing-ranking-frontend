import React, { FunctionComponent, HTMLAttributes } from "react"

interface IHeadingProps extends HTMLAttributes<HTMLDivElement> {}
type HeadingProps = {} & IHeadingProps

const Heading: FunctionComponent<HeadingProps> = (props) => {
    const { children, className, ...rest } = props;
    return (
        <div { ...rest } className={`text-center py-20 px-6 ${className}`}>
            {children}
        </div>
    )
}


export default Heading
