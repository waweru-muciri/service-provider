import React, { useState } from "react";
import { Button } from "react-native-paper";


export default function PrimaryButton({ children, icon, onPress, disabled, style }) {
    return (
        <Button disabled={disabled}
            icon={icon}
            labelStyle={{
                color: "#ffffff",
                fontSize: 18,
                fontFamily: "Lato-Regular"
            }}
            style={[{
                backgroundColor: '#36B64B',
                borderColor: "white",
                borderRadius: 10,
                alignSelf: "center"
            }, style]} onPress={onPress}>
            {children}
        </Button>
    )
}