import React from "react";
import { Title, useTheme } from "react-native-paper";

export default function ({ children, style }) {
    const { colors } = useTheme();
    return (
        <Title
            style={[{ textAlign: "left", color: colors.text, fontFamily: "Lato-Regular", }, style]}
        >
            {children}
        </Title>
    )
}