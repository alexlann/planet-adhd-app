import { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { SizeOptions } from "../../types";
import { COLORS, SIZES } from "../../constants";
import { DIMENSIONS } from "../../constants/styles";

const LoadingIndicator = ({ timeout=1000, size=SizeOptions.small } : { timeout?: number, size?: SizeOptions }) => {
    const [isVisible, setIsVisible] = useState(false);

    // loader timeout
    useEffect(() => {
        const id = setTimeout(() => setIsVisible(true), timeout);
        return () => clearTimeout(id);
    }, [timeout]);

    return (
        <View style={size === SizeOptions.large ? styles.largeWrapper : SizeOptions.medium ? styles.mediumWrapper : {}}>
            {isVisible && (
                // LOADER
                <ActivityIndicator style={size === SizeOptions.large && styles.largeLoader} size={SizeOptions.large} color={COLORS.primary} />
            )}
        </View>
    )
    
};

export default LoadingIndicator;

const styles = StyleSheet.create({
    largeWrapper: {
        backgroundColor: COLORS.primaryLight,
        width: DIMENSIONS.width,
        height: DIMENSIONS.height,
    },
    mediumWrapper: {
        width: DIMENSIONS.width * 0.9,
    },
    largeLoader: {
        marginTop: SIZES.extraLarge,
    },
});

