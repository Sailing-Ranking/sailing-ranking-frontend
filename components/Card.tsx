import React, { FunctionComponent, HTMLAttributes, ImgHTMLAttributes } from "react";

interface ICardProps extends HTMLAttributes<HTMLDivElement> {}
type CardProps = {} & ICardProps

interface IImgProps extends ImgHTMLAttributes<HTMLElement> {}
type ImgProps = {} & IImgProps


const Card: FunctionComponent<CardProps> & 
    { Body: FunctionComponent<CardProps> } &
    { Img: FunctionComponent<ImgProps> } = (props) => {
        const { children, className, ...rest } = props;
        return (
            <div { ...rest } className={`${className} rounded-lg shadow-lg bg-white  border-2 max-w-sm`}>
                {children}
            </div>
        )
}

const Body: FunctionComponent<CardProps> = (props) => {
    const { children, className, ...rest } = props;
    return (
        <div { ...rest } className={`${className} p-6`}>
            {children}
        </div>
    )
}

const Img: FunctionComponent<ImgProps> = (props) => {
    const { children, className, src, alt, ...rest } = props;
    return (
        // @ts-ignore
        <img { ...rest } src={src} alt={alt} className={`rounded-t-lg ${className}`}/>
    )
}

Card.Body = Body
Card.Img = Img

export default Card