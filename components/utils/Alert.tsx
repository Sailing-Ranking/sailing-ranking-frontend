import React, { HTMLAttributes, FunctionComponent } from "react";

interface IAlertProps extends HTMLAttributes<HTMLDivElement> {}

type AlertProps = {} & IAlertProps

const Alert: FunctionComponent<AlertProps> & 
    { Success: FunctionComponent<AlertProps> } & 
    { Danger: FunctionComponent<AlertProps> } & 
    { Warning: FunctionComponent<AlertProps> } &
    { Info: FunctionComponent<AlertProps> } = ({children}): JSX.Element => <>{children}</>

const Success: FunctionComponent<AlertProps> = (props) => {
    const { children, className, ...rest } = props;
    return (
        <div {...rest} className={`${className} bg-green-100 rounded-lg py-5 px-6 text-base text-green-700 mb-3`} role="alert">{children}</div>
    )
}

const Danger: FunctionComponent<AlertProps> = (props) => {
    const { children, className, ...rest } = props;
    return (
        <div {...rest} className={`${className} bg-red-100 rounded-lg py-5 px-6 text-base text-red-700 mb-3`} role="alert">{children}</div>
    )
}

const Warning: FunctionComponent<AlertProps> = (props) => {
    const { children, className, ...rest } = props;
    return (
        <div {...rest} className={`${className} bg-yellow-100 rounded-lg py-5 px-6 text-base text-yellow-700 mb-3`} role="alert">{children}</div>
    )
}

const Info: FunctionComponent<AlertProps> = (props) => {
    const { children, className, ...rest } = props;
    return (
        <div {...rest} className={`${className} bg-indigo-100 rounded-lg py-5 px-6 text-base text-indigo-700 mb-3`} role="alert">{children}</div>
    )
}

Alert.Success = Success
Alert.Danger = Danger
Alert.Warning = Warning
Alert.Info = Info

export default Alert