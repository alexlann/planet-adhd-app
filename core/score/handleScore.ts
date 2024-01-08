import { AuthContextType, FormMethods, UserLevelType } from "../../types";
import { postUserLevel } from "../hooks/completeAssignment";
import { API_URL } from "@env"

const handleScore = async ( addedPoints: number, onSuccess: () => void, userLevel: UserLevelType, mutation: any, authContext: AuthContextType, setUserLevelHasUpdated: (value: boolean) => void, setUserLevel: (value: UserLevelType)=>void ) => {
    if (userLevel) {
        const path = `user-levels/${userLevel.id}`;
        const newScore = userLevel.score + addedPoints
        const data = {
            score: newScore
        }

        // update new score
        mutation.mutate(`${API_URL}/${path}`, {
                method: FormMethods.patch,
                data,
                onSuccess,
                jsonOnSuccess: (userLevelJson: UserLevelType) => {
                    postUserLevel(userLevelJson, authContext);
                    // if new score surpasses max score current level
                    // then search new level id and add new level to data
                    const userLevelHasUpdated = userLevel.level.maxTotalScore < newScore;
                    setUserLevelHasUpdated(userLevelHasUpdated);
                    setUserLevel(userLevelJson)
                }
            });

        if (mutation.error) {
            throw new Error("Something went wrong with posting new score");
        }
    } else {
        throw new Error("User not logged in");
    }
};

export default handleScore