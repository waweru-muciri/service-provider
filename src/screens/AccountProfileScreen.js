import React, { useEffect, useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchDataFromUrl } from '../reducers';
import PageTitle from '../components/PageTitle';
import PageHeader from '../components/PageHeader';
import { updateUserProfile } from "../reducers";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Text, TextInput, useTheme } from "react-native-paper";
import { ScrollView, View, Alert } from "react-native";
import PrimaryButton from '../components/PrimaryButton';


const schema = yup.object().shape({
    first_name: yup.string().required("First Name is required"),
    phone_number: yup.string().required("Phone Number is required"),
    last_name: yup.string().required("Last Name is required"),
  });

function AccountProfileScreen({ navigation, fetchData, userProfile }) {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'User Profile',
        });
    }, []);

    // useEffect(() => {
    //     fetchData("appointments")
    // }, [])

    const defaultValues = {
        ...userProfile,
        amount_in_account: `${userProfile.amount_in_account}`,
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
                                    marginBottom: 10,
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
                                    marginBottom: 10,
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
                                    marginBottom: 10,
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
                    <View>
                        <PrimaryButton onPress={handleSubmit(async (data) => {
                            await updateUserInfo(userProfile.id, data);
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
        fetchData: (url) => {
            dispatch(fetchDataFromUrl(url))
        },
        updateUserInfo: (userId, userData) => {
            dispatch(updateUserProfile(userId, userData));
          },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountProfileScreen);
