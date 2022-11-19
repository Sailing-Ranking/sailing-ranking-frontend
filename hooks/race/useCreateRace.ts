export const useCreateRace = async (competition_id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_SERVICE_URL}/races`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            race_nr: 0,
            competition_id: competition_id
        }),
    })

    if (!response.ok) throw new Error(response.statusText)

    return await response.json()
}
