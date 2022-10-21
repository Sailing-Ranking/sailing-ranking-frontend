import React, { FunctionComponent, HTMLAttributes,  } from "react";

interface IHeaderProps extends HTMLAttributes<HTMLHeadElement> {}

type HeaderProps = {} & IHeaderProps

export const H1: FunctionComponent<HeaderProps> = (props) => {
    const { children, className, ...rest } = props;
    return (
        <h1 { ...rest } className={`${className} font-medium leading-tight text-5xl mt-0 mb-2 text-black-700`}>{children}</h1>
    )
}

export const H2: FunctionComponent<HeaderProps> = (props) => {
    const { children, className, ...rest } = props;
    return (
        <h2 { ...rest } className={`${className} font-medium leading-tight text-4xl mt-0 mb-2 text-black-700`}>{children}</h2>
    )
}

export const H3: FunctionComponent<HeaderProps> = (props) => {
    const { children, className, ...rest } = props;
    return (
        <h3 { ...rest } className={`${className} font-medium leading-tight text-3xl mt-0 mb-2 text-black-700`}>{children}</h3>
    )
}

export const H4: FunctionComponent<HeaderProps> = (props) => {
    const { children, className, ...rest } = props;
    return (
        <h4 { ...rest } className={`${className} font-medium leading-tight text-2xl mt-0 mb-2 text-black-700`}>{children}</h4>
    )
}

export const H5: FunctionComponent<HeaderProps> = (props) => {
    const { children, className, ...rest } = props;
    return (
        <h5 { ...rest } className={`${className} font-medium leading-tight text-xl mt-0 mb-2 text-black-700`}>{children}</h5>
    )
}

export const H6: FunctionComponent<HeaderProps> = (props) => {
    const { children, className, ...rest } = props;
    return (
        <h6 { ...rest } className={`${className} font-medium leading-tight text-base mt-0 mb-2 text-black-700`}>{children}</h6>
    )
}