import React, { FunctionComponent, HTMLAttributes } from "react";


interface IParagraphProps extends HTMLAttributes<HTMLParagraphElement> {}

type ParagraphProps = {} & IParagraphProps

const Paragraph: FunctionComponent<ParagraphProps> & 
    { Lead: FunctionComponent<ParagraphProps> } & 
    { Small: FunctionComponent<ParagraphProps> } = (props): JSX.Element => {
    const { children, className, ...rest } = props
    return (
        <p { ...rest } className={`${className} text-base font-light leading-relaxed mt-0 mb-4 text-gray-800 text-justify`}>{children}</p>
    )
}

const Lead: FunctionComponent<ParagraphProps> = (props) => {
    const { children, className, ...rest } = props
    return (
        <p { ...rest } className={`${className} text-xl font-light leading-relaxed mt-6 mb-4 text-gray-800 text-justify`}>
            {children}
        </p>
    )
}

const Small: FunctionComponent<ParagraphProps> = (props) => {
    const { children, className, ...rest } = props
    return (
        <small { ...rest } className={`${className} font-normal leading-normal mt-0 mb-4 text-gray-800 text-justify`}>
            {children}
        </small>
    )
}

Paragraph.Lead = Lead
Paragraph.Small = Small

export default Paragraph