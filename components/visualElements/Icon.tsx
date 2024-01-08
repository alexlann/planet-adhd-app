import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { IconType } from "../../types";
import { COLORS, SIZES } from "../../constants";

const Icon = ({ icon, color=COLORS.lightBlack, size=SIZES.medium, style }: { icon: IconType; color?: string, size?: number, style?: any }) => {
    const props = {
        size: size,
        style: [{ marginBottom: -3 }, style],
        name: icon.name as React.ComponentProps<typeof FontAwesome5>['name'],
        color: color
    }
    
    return icon.source === "FontAwesome5"
        ? <FontAwesome5 {...props} />
        : icon.source === "FontAwesome"
        ? <FontAwesome {...props} />
        : <FontAwesome5 {...props} />
}


export default Icon;