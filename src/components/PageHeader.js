import React from "react";
import { View } from "react-native";


export default function PageHeader({ children, style }) {
    return (
        <View
            style={[{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: 20,
                paddingTop: 10, paddingBottom: 10,
                backgroundColor: "#FFFFFF"
            }, style]}
        >
            {children}
        </View>
    )
}