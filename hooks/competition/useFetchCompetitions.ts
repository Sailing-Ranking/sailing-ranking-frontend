export const useFetchCompetitions = async (id?: string) => {
    if (!id) id = ""

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_SERVICE_URL}/competitions/${id}`)

    if (!response.ok) throw new Error(response.statusText)

    return await response.json()
}
