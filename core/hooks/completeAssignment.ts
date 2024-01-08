import { saveAuthToStorage } from "../../authentication/AuthProvider";
import { AuthContextType, FormMethods, Status, UserLevelType, UserType } from "../../types";
import { API_URL } from "@env"

export const postUserLevel = (newUserLevel: UserLevelType, authContext: AuthContextType) => {
    // create new authObject
    const newUser = authContext?.auth?.user as UserType;
    newUser.userLevel = newUserLevel;

    const newAuth = {
        token: authContext?.auth?.token as string,
        user: newUser,
    }

    // update user object
    saveAuthToStorage(newAuth);
}

export const updateStatus = ({path, status, mutate, id} : {path: string, status: Status, mutate: (args0: string, args1: any)=>void, id: number}) => {
    const data = {
        "status": status,
        "completed": true,
    };

    mutate(`${API_URL}/${path}/${id}`, {
        method: FormMethods.patch,
        data,
    });
};