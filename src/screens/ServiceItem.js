import React, { useState } from "react";
import {
    View,
    Image, TouchableWithoutFeedback
} from "react-native";
import {
    Text,
    Surface,
} from "react-native-paper";
import TextDisplay from "../components/TextDisplay";

export default function ServiceItem({ navigation, serviceProvider }) {
    const { id, first_name, last_name, service } = serviceProvider
    return (
        <TouchableWithoutFeedback onPress={() => {
            navigation.navigate("ServiceDetailsScreen", { serviceProviderId: id })
        }}>
            <Surface
                style={{
                    padding: 8,
                    flexBasis: "100%",
                    borderRadius: 10,
                    flexDirection: "column",
                    alignItems: "stretch"
                }}
            >
                <View>
                    <Image
                        source={{ uri: service?.image_url }}
                        style={{ width: "100%", height: 150, borderRadius: 5 }}
                    />
                </View>
                <View
                    style={{
                        padding: 10,
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <Text variant="titleMedium"
                                style={{ fontFamily: "Lato-Bold" }}
                            >{service.name}</Text>
                        </View>
                        <TextDisplay>{`Provider: ${first_name} ${last_name}`}</TextDisplay>
                        <Text>{service.description}</Text>
                        <Text>{`Cost: ${service.price}`}</Text>
                    </View>
                </View>
            </Surface>
        </TouchableWithoutFeedback>
    );
};

