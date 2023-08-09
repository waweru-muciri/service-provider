import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import PageTitle from '../components/PageTitle';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextDisplay from '../components/TextDisplay';
import PrimaryButton from '../components/PrimaryButton';


function ServicesScreen({ navigation, route, serviceProviders }) {
    const { serviceProviderId } = route.params;
    const serviceProvider = serviceProviders.find((service) => service.id == serviceProviderId) || {}


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Service Details',
        });
    }, []);


    return (
        <SafeAreaView>
            <ScrollView>
                <View
                    style={{
                        flex: 1,
                        padding: 20,
                    }}
                >
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", paddingBottom: 20 }}>
                        <PageTitle>Service Details</PageTitle>
                        <PrimaryButton onPress={() => {
                            navigation.navigate("ChatsScreen", {
                                serviceProviderId: serviceProvider.id
                            })
                        }}>Start Chat</PrimaryButton>
                    </View>
                    <Image
                        source={{ uri: serviceProvider.service?.image_url }}
                        style={{ width: "100%", height: 200, borderRadius: 5 }}
                    />
                    <TextDisplay>Name of Provider: {serviceProvider.first_name} {serviceProvider.first_name}</TextDisplay>
                    <TextDisplay>Service offered: {serviceProvider.service?.name}</TextDisplay>
                    <TextDisplay>Service description: {serviceProvider.service?.description}</TextDisplay>
                    <TextDisplay>Service cost: {serviceProvider.service?.price}</TextDisplay>
                    <View style={{ margin: 10, padding: 20 }}>
                        <PrimaryButton mode="contained" onPress={() => {
                            navigation.navigate("AppointmentInputScreen", { serviceProviderId: serviceProvider.id })
                        }}>
                            Book Appointment
                        </PrimaryButton>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const mapStateToProps = (state) => {
    return {
        serviceProviders: state.serviceProviders,
    }
};


export default connect(mapStateToProps)(ServicesScreen);
