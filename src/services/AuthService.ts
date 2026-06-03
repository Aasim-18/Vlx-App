import ApiClient from "./ApiService";


interface User {
    mobile: string
    name: string
    batch: string
}

const Update = async (UserProfile: User, token?: string | null) => {

    try{
        const headers = token ? { Authorization: `Bearer ${token}` } : undefined
        const response = await ApiClient.patch(
            "/api/v1/users/complete",
            {
                name: UserProfile.name,
                batch: UserProfile.batch,
                mobile: UserProfile.mobile
            },
            headers ? { headers } : undefined
        )

        // debug
    console.log(response)

        return response.data
    } catch (error) {
        console.error("Error updating user profile:", error)
        throw new Error("Failed to update user profile")
    }
}

export { Update };
