import React, { FormHTMLAttributes, FunctionComponent, HTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react"

interface IFormProps extends FormHTMLAttributes<HTMLFormElement> {}
type FormProps = {} & IFormProps

interface IGroupProps extends HTMLAttributes<HTMLDivElement> {}
type GroupProps = {} & IGroupProps

interface ILabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}
type LabelProps = {} & ILabelProps

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}
type InputProps = {} & IInputProps

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}
type SelectProps = {} & ISelectProps

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}
type TextAreaProps = {} & ITextAreaProps

type DatePickerProps = {
    label: string
} & IInputProps


const Form: FunctionComponent<FormProps> & 
    { Group: FunctionComponent<GroupProps> } & 
    { Label: FunctionComponent<LabelProps> } & 
    { Input: FunctionComponent<InputProps> } & 
    { CheckBox: FunctionComponent<InputProps> } & 
    { Select: FunctionComponent<SelectProps> } &
    { TextArea: FunctionComponent<TextAreaProps> } & 
    { DatePicker: FunctionComponent<DatePickerProps> } = (props): JSX.Element => {
    const { children, ...rest } = props;
    return (
        <form { ...rest }>
            {children}
        </form>
    )
}

const Group: FunctionComponent<GroupProps> = (props): JSX.Element => {
    const { children, className, ...rest } = props;
    return (
        <div { ...rest } className={`form-group mb-6 ${className}`}>
            {children}
        </div>
    )
}

const Label: FunctionComponent<LabelProps> = (props) => {
    const { children, className, ...rest } = props;
    return (
        <label { ...rest } className={`form-label inline-block mb-2 text-gray-700 ${className}`}>
            {children}
        </label>
    )
}

const Input: FunctionComponent<InputProps> = (props): JSX.Element => {
    const { children, className, disabled, ...rest } = props;
    return (
        <input { ...rest } disabled={disabled} className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 ${!disabled ? "bg-white" : "bg-gray-200"} bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${className}`}/>
    )
}

const CheckBox: FunctionComponent<InputProps> = (props): JSX.Element => {
    const { children, className, ...rest } = props;
    return (
        <input { ...rest } type="checkbox" className={`form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer ${className}`}/>
    )
}

const Select: FunctionComponent<SelectProps> = (props): JSX.Element => {
    const { children, className, ...rest } = props;
    return (
        <select { ...rest } className={`form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example ${className}`}>
            {children}
        </select>
    )
}

const TextArea: FunctionComponent<TextAreaProps> = (props): JSX.Element => {
    const { children, className, ...rest } = props;
    return (
        <textarea { ...rest } rows={10} className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${className}`}></textarea>
    )
}

const DatePicker: FunctionComponent<DatePickerProps> = (props): JSX.Element => {
    const { children, className, label, ...rest } = props;
    return (
        <div className="datepicker relative form-floating mb-3 xl:w-96" data-mdb-toggle-button="false">
            <input type="text" {...rest} className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${className}`}
            placeholder="Select a date" data-mdb-toggle="datepicker" />
            <label htmlFor="floatingInput" className="text-gray-700">Select a date</label>
        </div>
    )
}

Form.Group = Group
Form.Label = Label
Form.Input = Input
Form.CheckBox = CheckBox
Form.Select = Select
Form.TextArea = TextArea
Form.DatePicker = DatePicker

export default Form