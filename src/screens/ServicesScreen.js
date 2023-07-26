import React, { useEffect, useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getServices } from '../reducers';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import PageTitle from '../components/PageTitle';
import PageHeader from '../components/PageHeader';

function ServicesScreen({ navigation, fetchData, serviceProviders }) {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Services',
        });
    }, []);

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <PageHeader>
                    <PageTitle>Available Services</PageTitle>
                </PageHeader>
                <View style={{ width: "90%", marginLeft: "auto", marginRight: "auto", paddingTop: 20, paddingBottom: 20, }}>
                    <View style={{ flex: 1 }}>
                        <List.Section>
                            {
                                [...serviceProviders].map(({ id, first_name, last_name, service }) => (
                                    <List.Item
                                        key={id}
                                        title={`Provider: ${first_name} ${last_name}`}
                                        description={`Name: ${service?.description} \n Description: ${service?.description}`}
                                        left={(props) => <List.Icon {...props} icon="calendar-today" />}
                                        onPress={() => {
                                            navigation.navigate("AppointmentInputScreen", {
                                                serviceProviderId: id
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
            dispatch(getServices())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicesScreen);
