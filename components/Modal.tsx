import React, { FunctionComponent, HTMLAttributes } from "react"


interface IModalProps extends HTMLAttributes<HTMLDivElement> {}
type ModalProps = {
    id: string
    size?: "sm" | "md" | "lg" | "xl"
} & IModalProps

interface IBodyProps extends HTMLAttributes<HTMLDivElement> {}
type BodyProps = {} & IBodyProps

interface IHeaderProps extends HTMLAttributes<HTMLElement> {}
type HeaderProps = {} & IHeaderProps

interface IFooterProps extends HTMLAttributes<HTMLElement> {}
type FooterProps = {} & IFooterProps


const Modal: FunctionComponent<ModalProps> & 
    { Body: FunctionComponent<BodyProps> } & 
    { Header: FunctionComponent<HeaderProps> } & 
    { Footer: FunctionComponent<FooterProps> } = (props): JSX.Element => {
        const { children, className, id, size, ...rest } = props;
        
        let modalSize: string;

        switch (size) {
            case "sm":
                modalSize = "modal-sm"
                break;
            case "lg":
                modalSize = "modal-lg"
                break;
            case "xl":
                modalSize = "modal-xl"
                break;
            default:
                modalSize = "sm"
                break;
        }


        return (
            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                id={id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1}
                aria-labelledby="staticBackdropLabel" aria-hidden="true"
            >
                <div className={`modal-dialog modal-dialog-scrollable ${modalSize} relative w-auto pointer-events-none`}>
                    <div { ...rest } className={`modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current ${className}`}>
                        {children}
                    </div>
                </div>
            </div>
        )
}

const Body: FunctionComponent<BodyProps> = (props): JSX.Element => {
    const { children, className, ...rest } = props;
    return (
        <div { ...rest } className="modal-body relative p-4">
        {children}
      </div>
    )
}

const Header: FunctionComponent<HeaderProps> = (props): JSX.Element => {
    const { children, className, ...rest } = props;
    return (
        <header { ...rest } className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            {children}
            <button type="button" 
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal" 
                aria-label="Close"></button>
        </header>
    )
}

const Footer: FunctionComponent<FooterProps> = (props): JSX.Element => {
    const { children, className, ...rest } = props;
    return (
        <footer { ...rest } className={`modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md ${className}`}>
            {children}
        </footer>
    )
}


Modal.Body = Body
Modal.Header = Header
Modal.Footer = Footer

export default Modal