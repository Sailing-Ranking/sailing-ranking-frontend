import React, { FunctionComponent, ButtonHTMLAttributes } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

type ButtonProps = {
    outlined?: boolean,
    size?: "sm" | "md" | "lg",
} & IButtonProps

const Button: FunctionComponent<ButtonProps> & 
    { Primary: FunctionComponent<ButtonProps> } & 
    { Success: FunctionComponent<ButtonProps> } & 
    { Danger: FunctionComponent<ButtonProps> } & 
    { Link: FunctionComponent<ButtonProps> } = ({children}): JSX.Element => <>{children}</>

const Primary: FunctionComponent<ButtonProps> = (props): JSX.Element => {
    const { children, className, size, outlined, ...rest } = props;

    let btnOutline: string;
    let btnSize: string;

    if (outlined) {
        switch (size) {
            case "sm":
                btnSize = "px-4 py-1 text-xs"
                break;
            case "lg":
                btnSize = "px-7 py-2.5 text-sm"
                break;
            default:
                btnSize = "px-6 py-2 text-xs"
                break;
        }
        btnOutline = "border-2 border-blue-600 text-blue-600 hover:bg-black hover:bg-opacity-5 focus:outline-none"
    }
    else {
        switch (size) {
            case "sm":
                btnSize = "px-4 py-1.5 text-xs"
                break;
            case "lg":
                btnSize = "px-7 py-3 text-sm"
                break;
            default:
                btnSize = "px-6 py-2.5 text-xs"
                break;
        }
        btnOutline = "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none active:bg-blue-800 active:shadow-lg"
    }
    
    return (
        <button { ...rest } className={`inline-block font-medium leading-tight uppercase rounded ${btnSize} ${btnOutline} focus:ring-0 transition duration-150 ease-in-out ${className}`}>
            {children}
        </button>
    )
}

const Success: FunctionComponent<ButtonProps> = (props): JSX.Element => {
    const { children, className, size, outlined, ...rest } = props;
    
    let btnOutline: string;
    let btnSize: string;

    if (outlined) {
        switch (size) {
            case "sm":
                btnSize = "px-4 py-1 text-xs"
                break;
            case "lg":
                btnSize = "px-7 py-2.5 text-sm"
                break;
            default:
                btnSize = "px-6 py-2 text-xs"
                break;
        }
        btnOutline = "border-2 border-green-500 text-green-500 hover:bg-black hover:bg-opacity-5"
    }
    else {
        switch (size) {
            case "sm":
                btnSize = "px-4 py-1.5 text-xs"
                break;
            case "lg":
                btnSize = "px-7 py-3 text-sm"
                break;
            default:
                btnSize = "px-6 py-2.5 text-xs"
                break;
        }
        btnOutline = "bg-green-500 text-white shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none active:bg-green-700 active:shadow-lg"
    }

    return (
        <button { ...rest } className={`inline-block font-medium leading-tight uppercase rounded ${btnSize} ${btnOutline} focus:outline-none focus:ring-0 transition duration-150 ease-in-out ${className}`}>
            {children}
        </button>
    )
}

const Danger: FunctionComponent<ButtonProps> = (props): JSX.Element => {
    const { children, className, size, outlined, ...rest } = props;
    
    let btnOutline: string;
    let btnSize: string;

    if (outlined) {
        switch (size) {
            case "sm":
                btnSize = "px-4 py-1 text-xs"
                break;
            case "lg":
                btnSize = "px-7 py-2.5 text-sm"
                break;
            default:
                btnSize = "px-6 py-2 text-xs"
                break;
        }
        btnOutline = "border-2 border-red-600 text-red-600 hover:bg-black hover:bg-opacity-5 focus:outline-none"
    }
    else {
        switch (size) {
            case "sm":
                btnSize = "px-4 py-1.5 text-xs"
                break;
            case "lg":
                btnSize = "px-7 py-3 text-sm"
                break;
            default:
                btnSize = "px-6 py-2.5 text-xs"
                break;
        }
        btnOutline = "bg-red-600 text-white shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none active:bg-red-800 active:shadow-lg"
    }

    return (
        <button { ...rest } className={`inline-block font-medium leading-tight uppercase rounded ${btnSize} ${btnOutline} focus:ring-0 transition duration-150 ease-in-out ${className}`}>
            {children}
        </button>
    )
}

const Link: FunctionComponent<ButtonProps> = (props): JSX.Element => {
    const { children, className, ...rest } = props;
    return (
        <button { ...rest } className={`inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out ${className}`}>
            {children}
        </button>
    )
}

Button.Primary = Primary
Button.Success = Success
Button.Danger = Danger
Button.Link = Link

export default Button