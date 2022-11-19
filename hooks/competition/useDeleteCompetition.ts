export const useDeleteCompetition = async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_SERVICE_URL}/competitions/${id}`, {
        method: "DELETE"
    })

    if (!response.ok) throw new Error(response.statusText)

    return response.status
}