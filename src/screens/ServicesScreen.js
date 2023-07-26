import React, { useEffect, useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchDataFromUrl } from '../reducers';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import PageTitle from '../components/PageTitle';
import PageHeader from '../components/PageHeader';
import PrimaryButton from '../components/PrimaryButton';

function ServicesScreen({ navigation, fetchData, serviceProviders }) {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Services',
        });
    }, []);

    useEffect(() => {
        fetchData("service-providers")
    }, [])


    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <PageHeader>
                    <PageTitle>Available Services</PageTitle>
                </PageHeader>
                <View style={{ width: "90%", marginLeft: "auto", marginRight: "auto", paddingTop: 20, paddingBottom: 20, }}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}>
                        <PrimaryButton icon={"plus"} onPress={() => {
                            navigation.navigate("ServiceInputScreen")
                        }}>Add Service</PrimaryButton>
                    </View>
                    <View style={{ flex: 1 }}>
                        <List.Section>
                            {
                                [...serviceProviders].map((serviceProvider) => (
                                    <List.Item
                                        key={serviceProvider?.id}
                                        title={serviceProvider?.title}
                                        description={serviceProvider?.description}
                                        left={(props) => <List.Icon {...props} icon="calendar-today" />}
                                        onPress={() => {
                                            navigation.navigate("AppointmentInputScreen", {
                                                serviceProviderId: serviceProvider.id
                                            })
                                        }}
                                    />))
                            }
                        </List.Section>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        serviceProviders: state.serviceProviders,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => {
            dispatch(fetchDataFromUrl(url))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicesScreen);
