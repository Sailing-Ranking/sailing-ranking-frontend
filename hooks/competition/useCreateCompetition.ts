import { FromInputs } from "../../pages/competitions"

export const useCreateCompetition = async (data: FromInputs) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_SERVICE_URL}/competitions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) throw new Error(response.statusText)

    return response.status
}