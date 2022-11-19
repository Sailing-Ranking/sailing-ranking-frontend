export const useFetchClubs = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_SERVICE_URL}/clubs`)

    if (!response.ok) throw new Error(response.statusText)

    return await response.json()
}