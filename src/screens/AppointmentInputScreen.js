import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { handleItemFormSubmit } from '../reducers';
import { DatePickerInput, TimePickerModal } from "react-native-paper-dates";
import { TextInput, Text, Button, useTheme } from 'react-native-paper';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PageTitle from '../components/PageTitle';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextDisplay from '../components/TextDisplay';
import PrimaryButton from '../components/PrimaryButton';


const appointment_schema = yup.object().shape({
    title: yup.string().required("Name of Appointment is required"),
    description: yup.string(),

});

function ServicesScreen({ navigation, route, submitForm, serviceProviders }) {
    const { colors } = useTheme();
    const { serviceProviderId } = route.params;
    const serviceProvider = serviceProviders.find((service) => service.id == serviceProviderId) || {}

    const defaultValues = {
        appointment_date: new Date(),
        description: "",
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues,
        resolver: yupResolver(appointment_schema),
    });

    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [appointmentStartDate, setAppointmentStartDate] = useState(new Date());
    const [appointmentStartTime, setAppointmentStartTime] = useState(0);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Appointment Details',
        });
    }, []);

    const onDismiss = React.useCallback(() => {
        setShowStartTimePicker(false)
    }, [setShowStartTimePicker])

    const onConfirm = React.useCallback(
        ({ hours, minutes }) => {
            setShowStartTimePicker(false);
            setAppointmentStartTime(`${hours}: ${minutes}`);
        },
        [setShowStartTimePicker]
    );


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
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                        <PageTitle>Appointment Details</PageTitle>
                    </View>
                    <TextDisplay style={styles.inputContainerTitle}>Appointment title</TextDisplay>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={styles.InputContainer}>
                                <TextInput
                                    label="Title"
                                    mode="outlined"
                                    onBlur={onBlur}
                                    onChangeText={(value) => onChange(value)}
                                    value={value}
                                    style={{
                                        marginBottom: 10,
                                    }}
                                    keyboardType="default"
                                    error={errors.name ? true : false}
                                />
                            </View>
                        )}
                        name="title"
                        rules={{ required: true }}
                    />
                    {errors.title && (
                        <Text
                            style={{
                                color: colors.error,
                            }}
                        >
                            {errors.title.message}
                        </Text>
                    )}
                    <TextDisplay style={styles.inputContainerTitle}>Appointment start date and time</TextDisplay>
                    <View style={
                        {
                            flexDirection: 'row',
                            alignItems: "center",
                            textAlign: 'left',
                            margin: 20,
                            justifyContent: "space-evenly",
                        }}>
                        <DatePickerInput
                            locale="en-GB"
                            label="Date"
                            value={appointmentStartDate}
                            minimumDate={new Date()}
                            onChange={(selectedDate) => {
                                setAppointmentStartDate(selectedDate)
                            }} />
                    </View>
                    <Text style={styles.inputContainerTitle}>Please select time</Text>
                    <View style={
                        {
                            flexDirection: 'row',
                            alignItems: "center",
                            textAlign: 'left',
                            justifyContent: "space-evenly",
                            marginLeft: 30,
                            marginTop: 10,
                            marginBottom: 10,
                        }}>
                        <Text style={{ flex: 2 }}>Selected Time: {appointmentStartTime}</Text>
                        <Button icon="calendar-edit" mode="contained" onPress={() => {
                            setShowStartTimePicker(!showStartTimePicker)
                        }}>
                            Edit
                        </Button>
                    </View>
                    {
                        showStartTimePicker &&
                        <TimePickerModal
                            use24HourClock
                            locale="en-GB"
                            visible={showStartTimePicker}
                            onDismiss={onDismiss}
                            onConfirm={onConfirm}
                            hours={12}
                            minutes={14} />
                    }
                    <Text style={styles.inputContainerTitle}>Appointment notes</Text>
                    <View style={styles.InputContainer}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    mode='outlined'
                                    multiline={true}
                                    numberOfLines={2}
                                    placeholder="Appointment notes"
                                    onBlur={onBlur}
                                    onChangeText={(value) => onChange(value)}
                                    value={value}
                                    style={{
                                        marginBottom: 10,
                                    }}
                                    keyboardType="default"
                                    error={errors.name ? true : false}
                                />
                            )}
                            name="description"
                        />
                    </View>
                    <View style={{ margin: 10, padding: 20 }}>
                        <PrimaryButton mode="contained" onPress={handleSubmit(async (data) => {
                            const { service } = serviceProvider
                            const service_provider = serviceProvider.id
                            const appointment_cost = service?.price
                            const appointment_venue = serviceProvider.address
                            const service_name = service?.name
                            const appointment = {
                                ...data, start_date: appointmentStartDate,
                                start_time: appointmentStartTime,
                                service_provider, appointment_cost, appointment_venue, service_name, payed: false, serviceProvider
                            }
                            await submitForm(appointment, "appointments")
                            Alert.alert("Success", "Item saved successfully")
                            navigation.goBack();
                        })}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ServicesScreen);
