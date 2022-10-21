import React, { FunctionComponent } from "react"

// @ts-ignore
const Heading: FunctionComponent = ({children}) => {
    return (
        <div className="text-center py-20 px-6">
            {children}
        </div>
    )
}


export default Heading
