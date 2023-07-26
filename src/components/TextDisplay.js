import React from "react";
import { Text, useTheme } from "react-native-paper";

export default function TextDisplay({ children, style }) {
    const { colors } = useTheme();
    return (
        <Text variant="bodyMedium"
            style={[{
                textAlign: "left", color: colors.text,
                paddingTop: 20, paddingBottom: 10, flexWrap: "wrap"
            }, style]}
        >
            {children}
        </Text>
    )
}