import { UserLevelType } from "../../types";

const levelPercentage = (userLevel: UserLevelType) => {
    // get level score instead of totalscore
    if(userLevel) {
        const levelScore = userLevel.score - userLevel.level.requiredTotalScore;

        // calculate percentage of userlevelscore to max levelscore
        const percentage: number = parseInt(((levelScore / userLevel.level.maxScore)*100).toFixed());

        // if percentage shows 100 and limit of 99 is set, change to 99
        const limtedPercentage = percentage === 100
        ? 99
        : percentage;

        return limtedPercentage;
    }
    return 0;
}

export default levelPercentage