export const useFetchCompetitors = async (id?: string) => {
    if (!id) id = ""

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_SERVICE_URL}/competititors/${id}`)

    if (!response.ok) throw new Error(response.statusText)

    return await response.json()
}
