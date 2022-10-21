import { FunctionComponent, HTMLAttributes } from "react"

interface IListProps extends HTMLAttributes<HTMLUListElement> {}
type ListProps = {} & IListProps

interface IItemProps extends HTMLAttributes<HTMLLIElement> {}
type ItemProps = {} & IItemProps

const List: FunctionComponent<ListProps> & 
    { Item: FunctionComponent<ItemProps> } = (props) => {
    const {children, className, ...rest} = props;
    return (
        <ul { ...rest } className={`bg-white rounded-lg w-96 text-gray-900 ${className}`}>
            {children}
        </ul>
    )
}

const Item: FunctionComponent<ItemProps> = (props) => {
    const {children, className, ...rest} = props;
    return <li { ...rest } className={`px-6 py-2 border-b border-gray-200 w-full rounded-t-lg ${className}`}>{children}</li>
}

List.Item = Item

export default List