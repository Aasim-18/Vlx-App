import ApiClient from "./ApiService";


interface User {

    mobile: string,
    name: string,
    batch: string

}

const Update = async (UserProfile: User) => {

    try{
        const response = await ApiClient.patch("/api/v1/users/complete", {
            name: UserProfile.name,
            batch: UserProfile.batch,
            mobile: UserProfile.mobile
        })

        // debug
        console.log(response);

        return response.data
    }catch(error){
        console.error("Error updating user profile:", error);
        throw new Error("Failed to update user profile");
    }

}

export { Update };