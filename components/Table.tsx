import React, { FunctionComponent, HTMLAttributes } from "react"

interface ITableProps extends HTMLAttributes<HTMLTableElement> {}
type TableProps = {} & ITableProps

interface ITableSectionProps extends HTMLAttributes<HTMLTableSectionElement> {}
type TableSectionProps = {} & ITableSectionProps

interface ITableCellProps extends HTMLAttributes<HTMLTableCellElement> {}
type TableCellProps = {} & ITableCellProps

interface ITRProps extends HTMLAttributes<HTMLTableRowElement> {}
type TRProps = {} & ITRProps


const Table: FunctionComponent<TableProps> &
    { THead: FunctionComponent<TableSectionProps> } &
    { TBody: FunctionComponent<TableSectionProps> } &
    { TH: FunctionComponent<TableCellProps> } &
    { TR: FunctionComponent<TRProps> } &
    { TD: FunctionComponent<TableCellProps> } = (props) => {
        const { children, className, ...rest } = props;
        return (
            <table { ...rest } className={`min-w-full ${className}`}>
                {children}
            </table>
        )
}

const THead: FunctionComponent<TableSectionProps> = (props) => {
    const { children, className, ...rest } = props;
    return (
        <thead { ...rest } className={`bg-white border-b ${className}`}>
            {children}
        </thead>
    )
}

const TBody: FunctionComponent<TableSectionProps> = (props) => {
    const { children, className, ...rest } = props;
    return (
        <tbody { ...rest } className={className}>
            {children}
        </tbody>
    )
}

const TH: FunctionComponent<TableCellProps> = (props) => {
    const { children, className, ...rest } = props;
    return (
        <th { ...rest } scope="col" className={`text-sm font-medium text-gray-900 px-6 py-4 text-left ${className}`}>
            {children}
        </th>
    )
}

const TR: FunctionComponent<TRProps> = (props) => {
    const { children, className, ...rest } = props;
    return (
        <tr { ...rest } className={`bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ${className}`}>
            {children}
        </tr>
    )
}

const TD: FunctionComponent<TableCellProps> = (props) => {
    const { children, className, ...rest } = props;
    return (
        <td { ...rest } className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ${className}`}>
            {children}
        </td>
    )
}


Table.THead = THead
Table.TBody = TBody
Table.TH = TH
Table.TR = TR
Table.TD = TD

export default Table