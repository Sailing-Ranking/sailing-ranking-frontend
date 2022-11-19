export const useFetchCountries = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_SERVICE_URL}/countries`)

    if (!response.ok) throw new Error(response.statusText)

    return await response.json()
}