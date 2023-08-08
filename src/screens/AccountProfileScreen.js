import React, { useEffect, useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import PageTitle from '../components/PageTitle';
import PageHeader from '../components/PageHeader';
import { logout, updateUserProfile } from "../reducers";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { ScrollView, View, Alert } from "react-native";
import PrimaryButton from '../components/PrimaryButton';
import { getAuth, signOut } from 'firebase/auth';


const schema = yup.object().shape({
    first_name: yup.string().required("First Name is required"),
    phone_number: yup.string().required("Phone Number is required"),
    last_name: yup.string().required("Last Name is required"),
    address: yup.string().required("Address is required"),
});

function AccountProfileScreen({ navigation, updateProfile, userProfile, logUserOut }) {
    const auth = getAuth()
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'User Profile',
        });
    }, []);

    const defaultValues = {
        ...userProfile,
    };

    const { colors } = useTheme();
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });

    return (
        <ScrollView>
            <View style={{ flex: 1 }}>

                <PageHeader>
                    <PageTitle>Account Profile</PageTitle>
                    <Button onPress={async () => {
                        await signOut(auth)
                            .then(async () => {
                                await logUserOut();
                                navigation.navigate('LoginStack');
                            }); //logout on redux
                    }}>Log Out</Button>
                </PageHeader>
                <View style={{ width: "90%", marginLeft: "auto", marginRight: "auto", paddingTop: 20, paddingBottom: 20, }}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                label="First Name"
                                mode="outlined"
                                onBlur={onBlur}
                                onChangeText={(value) => onChange(value)}
                                value={value}
                                style={{
                                    marginBottom: 20,
                                }}
                                keyboardType="default"
                                error={errors.first_name ? true : false}
                            />
                        )}
                        name="first_name"
                        rules={{ required: true }}
                    />
                    {errors.first_name && (
                        <Text
                            variant="labelLarge"
                            style={{
                                color: colors.error,
                            }}
                        >
                            {errors.first_name.message}
                        </Text>
                    )}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                label="Last Name"
                                mode="outlined"
                                onBlur={onBlur}
                                onChangeText={(value) => onChange(value)}
                                value={value}
                                style={{
                                    marginBottom: 20,
                                }}
                                error={errors.last_name ? true : false}
                            />
                        )}
                        name="last_name"
                        rules={{ required: true }}
                    />
                    {errors.last_name && (
                        <Text
                            variant="labelLarge"
                            style={{
                                color: colors.error,
                            }}
                        >
                            {errors.last_name.message}
                        </Text>
                    )}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                label="Phone Number"
                                mode="outlined"
                                onBlur={onBlur}
                                onChangeText={(value) => onChange(value)}
                                value={value}
                                style={{
                                    marginBottom: 20,
                                }}
                                error={errors.phone_number ? true : false}
                            />
                        )}
                        name="phone_number"
                        rules={{ required: true }}
                    />
                    {errors.phone_number && (
                        <Text
                            variant="labelLarge"
                            style={{
                                color: colors.error,
                            }}
                        >
                            {errors.phone_number.message}
                        </Text>
                    )}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                label="Address"
                                mode="outlined"
                                onBlur={onBlur}
                                onChangeText={(value) => onChange(value)}
                                value={value}
                                style={{
                                    marginBottom: 20,
                                }}
                                error={errors.address ? true : false}
                            />
                        )}
                        name="address"
                        rules={{ required: true }}
                    />
                    {errors.address && (
                        <Text
                            variant="labelLarge"
                            style={{
                                color: colors.error,
                            }}
                        >
                            {errors.address.message}
                        </Text>
                    )}
                    <View>
                        <PrimaryButton onPress={handleSubmit(async (data) => {
                            await updateProfile(userProfile.id, data);
                            Alert.alert("Success!", "Profile saved successfully");
                        })}>
                            Save Profile
                        </PrimaryButton>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const mapStateToProps = (state) => {
    return {
        userProfile: state.auth.userProfile,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: (userId, userData) => {
            dispatch(updateUserProfile(userId, userData));
        },
        logUserOut: () => {
            dispatch(logout());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountProfileScreen);
