import React, { useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { Text, Button, TextInput, useTheme } from "react-native-paper";
import { ScrollView, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUserProfile } from "../reducers";

const schema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  phone_number: yup.string().required("Phone Number is required"),
  last_name: yup.string().required("Last Name is required"),
});

function ProfileScreen({ navigation, userProfile, updateUserInfo }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "User Profile",
    });
  }, []);
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            padding: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "space-evenly",
              flexDirection: "row",
            }}
          >
            <Text
              variant="titleLarge"
              style={{ fontWeight: "bold", textAlign: "center", margin: 10 }}
            >
              My Profile
            </Text>
          </View>
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
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Account Number"
                mode="outlined"
                editable={false}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={{
                  marginBottom: 10,
                }}
                error={errors.account_number ? true : false}
              />
            )}
            name="account_number"
            rules={{ required: true }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Current Balance"
                mode="outlined"
                editable={false}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={{
                  marginBottom: 10,
                }}
                error={errors.amount_in_account ? true : false}
              />
            )}
            name="amount_in_account"
            rules={{ required: true }}
          />
          <Button
            mode="contained"
            style={{
              alignSelf: "center",
              marginTop: 30,
            }}
            onPress={handleSubmit(async (data) => {
              await updateUserInfo(userProfile.id, data);
              Alert.alert("Success!", "Profile saved successfully");
            })}
          >
            Save Profile
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.auth.userProfile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (userId, userData) => {
      dispatch(updateUserProfile(userId, userData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
