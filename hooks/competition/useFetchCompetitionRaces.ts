export const useFetchCompetitionRaces = async (id: string) => {
    const response = await fetch(`${process.env.BASE_SERVICE_URL}/competitions/${id}/races`)

    if (!response.ok) throw new Error(response.statusText)

    return await response.json()
}
