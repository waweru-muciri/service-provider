import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { handleItemFormSubmit } from '../reducers';
import { Switch, Text, useTheme } from 'react-native-paper';
import PageTitle from '../components/PageTitle';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextDisplay from '../components/TextDisplay';
import PrimaryButton from '../components/PrimaryButton';
import { AirbnbRating } from 'react-native-ratings';

function AppointmentDetails({ navigation, route, submitForm, serviceProviders, appointments }) {
    const { appointmentId } = route.params;
    const appointment = appointments.find((service) => service.id == appointmentId) || {}
    const { start_date, start_time } = appointment

    const serviceProvider = serviceProviders.find(item => item.id === appointment.service_provider)

    const [isAppointmentCompleted, setIsAppointmentCompleted] = useState(Boolean(appointment.is_completed));
    const [serviceRating, setServiceRating] = useState(parseInt(appointment.rating) || 1);


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Appointment Details',
        });
    }, []);



    return (
        <SafeAreaView>
            <ScrollView>
                <View
                    style={{
                        flex: 1,
                        padding: 20,
                        justifyContent: "center",
                    }}
                >
                    <PageTitle>Appointment Details</PageTitle>
                    <TextDisplay>Name of Provider: {serviceProvider.first_name} {serviceProvider.first_name}</TextDisplay>
                    <TextDisplay>Service offered: {serviceProvider.service?.name}</TextDisplay>
                    <TextDisplay>Appointment name: {appointment?.title}</TextDisplay>
                    <TextDisplay>Appointment description: {appointment?.description}</TextDisplay>
                    <TextDisplay>Appointment start date: {new Date(start_date?.toDate()).toDateString()}</TextDisplay>
                    <TextDisplay>Appointment start time: {start_time}</TextDisplay>
                    <TextDisplay>Appointment cost: {appointment?.appointment_cost}</TextDisplay>
                    <Text style={{ paddingTop: 10, paddingBottom: 10 }}>Please select completion status</Text>
                    <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", padding: 10 }}>
                        <Text>Appointment Completion status</Text>
                        <Text>
                            <Switch value={isAppointmentCompleted} onValueChange={(value) => setIsAppointmentCompleted(!isAppointmentCompleted)} />;
                        </Text>
                    </View>
                    <View>
                        {
                            isAppointmentCompleted && <AirbnbRating defaultRating={serviceRating} onFinishRating={(rating) => setServiceRating(rating)} />
                        }
                    </View>
                    <View style={{ margin: 10, padding: 20 }}>
                        <PrimaryButton mode="contained" onPress={async () => {
                            const appointmentObjectToSave = {
                                ...appointment, is_completed: isAppointmentCompleted, rating: serviceRating
                            }
                            await submitForm(appointmentObjectToSave, "appointments")
                            Alert.alert("Success", "Item saved successfully")
                            navigation.goBack();
                        }}>
                            Save Appointment
                        </PrimaryButton>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
    },
    leftTitle: {
        alignSelf: 'stretch',
        textAlign: 'left',
        marginLeft: 20,
    },
    inputContainerTitle: {
        fontWeight: 'bold',
        alignSelf: 'stretch',
        textAlign: 'left',
        marginLeft: 20,
    },

    InputContainer: {
        margin: 15,
    },

});

const mapStateToProps = (state) => {
    return {
        appointments: state.appointments,
        serviceProviders: state.serviceProviders,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        submitForm: (url, data) => {
            dispatch(handleItemFormSubmit(url, data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentDetails);
