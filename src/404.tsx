import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <>
            {/* @ts-ignore */}
            <h1>{error.status}</h1>
            {/* @ts-ignore */}
            <p>{error.statusText || error.message}</p>
        </>
    );
}