export const useFetchCompetitionCompetitors = async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_SERVICE_URL}/competitions/${id}/competitors`)

    if (!response.ok) throw new Error(response.statusText)

    return await response.json()
}
