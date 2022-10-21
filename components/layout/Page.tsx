import React, { FunctionComponent, HTMLAttributes } from "react"

interface IPageProps extends HTMLAttributes<HTMLDivElement> {}
type PageProps = {} & IPageProps

const Page: FunctionComponent<PageProps> = (props) => {
    const { children, className, ...rest } = props;
    return (
        <div { ...rest } className={`flex flex-col self-center w-full lg:w-4/5 xl:w-3/5 h-full ${className}`}>
            {children}
        </div>
    )
}

export default Page
