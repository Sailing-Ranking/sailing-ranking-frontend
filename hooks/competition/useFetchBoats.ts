export const useFetchBoats = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_SERVICE_URL}/competitions/boats`)

    if (!response.ok) throw new Error(response.statusText)

    return await response.json()
}