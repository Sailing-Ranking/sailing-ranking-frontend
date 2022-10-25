export const useCreatePosition = async (id: string, formData: FormData) => {
    // ?race_id=${id}
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_SERVICE_URL}/positions?race_id=${id}`, {
        method: "POST",
        body: formData,
    })

    if (!response.ok) throw new Error(response.statusText)

    return response.status
}
