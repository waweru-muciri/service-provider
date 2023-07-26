import React, { useEffect, useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchDataFromUrl, handleDelete } from '../reducers';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity, View } from 'react-native';
import PageTitle from '../components/PageTitle';
import PageHeader from '../components/PageHeader';

function AppointmentsScreen({ navigation, fetchData, deleteItem, appointments }) {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Appointments',
        });
    }, []);

    useEffect(() => {
        fetchData("appointments")
        fetchData("service-providers")
    }, [])


    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <PageHeader>
                    <PageTitle>Your appointments</PageTitle>
                </PageHeader>
                <View style={{ width: "90%", marginLeft: "auto", marginRight: "auto", paddingTop: 20, paddingBottom: 20, }}>
                    <View style={{ flex: 1 }}>
                        <List.Section>
                            {
                                [...appointments].map((appointment) => (
                                    <List.Item
                                        key={appointment?.id}
                                        title={appointment?.title}
                                        description={appointment?.description}
                                        left={(props) => <List.Icon {...props} icon="calendar-today" />}
                                        right={(props) => <TouchableOpacity onPress={async () => {
                                            await deleteItem(appointment.id, "appointments")
                                        }}>
                                            <List.Icon {...props} icon="delete" />
                                        </TouchableOpacity>}
                                        onPress={() => {
                                            navigation.navigate("AppointmentDetailsScreen", {
                                                appointmentId: appointment.id
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
        appointments: state.appointments,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => {
            dispatch(fetchDataFromUrl(url))
        },
        deleteItem: (itemId, url) => {
            dispatch(handleDelete(itemId, url))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentsScreen);
