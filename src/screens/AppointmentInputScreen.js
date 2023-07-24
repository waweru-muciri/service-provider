import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { handleItemFormSubmit } from '../reducers';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput, Text, Button, useTheme } from 'react-native-paper';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PaperSelect } from "react-native-paper-select";


const appointment_schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Type is required"),
    service_booked: yup.object().required("Service is required"),
});

function ServicesScreen({ navigation, route, submitForm, appointments, services }) {
    const { colors } = useTheme();
    const { appointmentId } = route.params;
    const appointmentToDisplay = appointments.find((appointment) => appointment.id == appointmentId) || {}

    const defaultValues = {
        title: appointmentToDisplay.title,
        description: appointmentToDisplay.description,
        service_booked: appointmentToDisplay.service_booked,
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues,
        resolver: yupResolver(appointment_schema),
    });


    const [appointmentStartDate, setAppointmentStartDate] = useState(new Date());
    const [appointmentEndDate, setAppointmentEndDate] = useState(new Date());
    const [showStartDateAndTimePicker, setShowStartDateAndTimePicker] = useState(false);
    const [showEndDateAndTimePicker, setShowEndDateAndTimePicker] = useState(false);

    //date picker configuration
    const [mode, setMode] = useState('date');

    const showMode = (currentMode) => {
        setMode(currentMode);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Appointment Details',
        });
    }, []);



    return (
        <ScrollView>
            <View
                style={{
                    flex: 1,
                    padding: 20,
                    justifyContent: "center",
                }}
            >
                <Text default style={[styles.title, styles.leftTitle]}>Edit Appointment Details</Text>
                <Text style={styles.inputContainerTitle}>Appointment title</Text>
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
                <Text style={styles.inputContainerTitle}>Service to book</Text>
                <Controller
                    control={control}
                    render={({ field: { value } }) => (
                        <PaperSelect
                            label="Select Service To Book"
                            value={value?.name}
                            onSelection={(selectedValue) => {
                                setValue("service_booked", selectedValue.selectedList?.[0]);
                            }}
                            arrayList={[...services]}
                            selectedArrayList={[value]}
                            errorText={errors.service_booked?.message}
                            multiEnable={false}
                        />
                    )}
                    name="service_booked"
                    rules={{ required: true }}
                />
                <Text style={styles.inputContainerTitle}>Please start date and time</Text>
                <View style={
                    {
                        flexDirection: 'row',
                        alignItems: "center",
                        textAlign: 'left',
                        marginLeft: 30,
                        marginTop: 10,
                        marginBottom: 10,
                        justifyContent: "space-evenly",
                    }}>
                    <Text style={{ flex: 2 }}>Selected Date: {appointmentStartDate.toLocaleDateString()}</Text>
                    <Text style={{ flex: 2 }}>Selected Date: {appointmentStartDate.toLocaleTimeString()}</Text>
                    <Button icon="calendar-edit" mode="contained" onPress={() => {
                        showMode('date');
                        setShowStartDateAndTimePicker(true)
                    }}>
                        Edit
                    </Button>
                </View>
                {showStartDateAndTimePicker && (
                    <DateTimePicker
                        mode={mode}
                        is24Hour={true}
                        value={appointmentStartDate}
                        minimumDate={new Date()}
                        onChange={(event, selectedDate) => {
                            setAppointmentStartDate(selectedDate)
                            if (mode === "date") {
                                setMode("time")
                                setShowStartDateAndTimePicker(true)
                            } else {
                                setShowStartDateAndTimePicker(false)
                            }
                        }} />
                )}
                <Text style={styles.inputContainerTitle}>Please end date and time</Text>
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
                    <Text style={{ flex: 2 }}>Selected Date: {appointmentEndDate.toLocaleDateString()}</Text>
                    <Text style={{ flex: 2 }}>Selected Date: {appointmentEndDate.toLocaleTimeString()}</Text>
                    <Button icon="calendar-edit" mode="contained" onPress={() => {
                        showMode('date');
                        setShowEndDateAndTimePicker(true)
                    }}>
                        Edit
                    </Button>
                </View>
                
                {showEndDateAndTimePicker && (
                    <DateTimePicker
                        mode={mode}
                        is24Hour={true}
                        value={appointmentEndDate}
                        minimumDate={new Date()}
                        onChange={(event, selectedDate) => {
                            setAppointmentEndDate(selectedDate)
                            if (mode === "date") {
                                setMode("time")
                                setShowEndDateAndTimePicker(true)
                            } else {
                                setShowEndDateAndTimePicker(false)
                            }
                        }} />
                )}
                <Text style={styles.inputContainerTitle}>Appointment details</Text>
                <View style={styles.InputContainer}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                mode='outlined'
                                multiline={true}
                                numberOfLines={2}
                                placeholder="Appointment Details"
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
                    <Button mode="contained" onPress={handleSubmit((data) => {
                        // submitForm(data, url)
                    })}>
                        Save Appointment
                    </Button>
                </View>
            </View>
        </ScrollView>
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
        services: state.services,
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
