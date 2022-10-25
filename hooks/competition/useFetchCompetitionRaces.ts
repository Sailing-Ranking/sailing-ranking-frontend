export const useFetchCompetitionRaces = async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_SERVICE_URL}/competitions/${id}/races`)

    if (!response.ok) throw new Error(response.statusText)

    return await response.json()
}
