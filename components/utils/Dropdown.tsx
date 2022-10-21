import React, { AnchorHTMLAttributes, forwardRef, FunctionComponent, HTMLAttributes } from "react";

interface IDropdownProps extends HTMLAttributes<HTMLDivElement> {}
type DropdownProps = {} & IDropdownProps

interface IMenuProps extends HTMLAttributes<HTMLUListElement> {}
type MenuProps = {} & IMenuProps

interface IItemProps extends HTMLAttributes<HTMLLIElement> {}
type ItemProps = {} & IItemProps

interface ILinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}
type LinkProps = {} & ILinkProps


const Dropdown: FunctionComponent<DropdownProps> & 
    { Menu: FunctionComponent<MenuProps> } & 
    { Item: FunctionComponent<ItemProps> } & 
    { Link: FunctionComponent<LinkProps> } & 
    { Toggle: FunctionComponent<LinkProps> } = (props) => {
        const { children, className, ...rest } = props;
        return (
            <div { ...rest } className={`${className} dropdown relative`}>
                {children}
            </div>
        )
}

const Menu: FunctionComponent<MenuProps> = (props) => {
    const { children, className, ...rest } = props;
    return (
        <ul { ...rest } className={`${className} dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none left-auto right-0`} aria-labelledby="dropdownMenuButton">
            {children}
        </ul>
    )
}

const Item: FunctionComponent<ItemProps> = (props) => {
    const { children, className, ...rest } = props;
    return (
        <li { ...rest } className={`${className} hover:cursor-pointer`}>
            {children}
        </li>
    )
}

const Link: FunctionComponent<LinkProps> = forwardRef((props, ref) => {
    const { children, className, ...rest } = props;
    return (
        <a href="#" { ...rest } className={`${className} dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100`}>
            {children}
        </a>
    )
})

const Toggle: FunctionComponent<LinkProps> = (props) => {
    const { children, className, ...rest } = props;
    return (
        <a { ...rest } className={`${className} dropdown-toggle flex items-center hidden-arrow`} href="#" id="dropdownMenuButton" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {children}
        </a>
    )
}

Dropdown.Menu = Menu
Dropdown.Item = Item
Dropdown.Link = Link
Dropdown.Toggle = Toggle

export default Dropdown