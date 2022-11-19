import { FromInputs } from "../../pages/competitions/[id]"

export const useCreateCompetitor = async (data: FromInputs) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_SERVICE_URL}/competitors`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) throw new Error(response.statusText)

    return response.status
}