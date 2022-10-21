import { useQuery } from "react-query"

export const useFetchCompetitions = async (id?: string) => {
    if (!id) id = ""

    const response = await fetch(`${process.env.BASE_SERVICE_URL}/competitions/${id}`)

    if (!response.ok) throw new Error(response.statusText)

    return await response.json()
}
