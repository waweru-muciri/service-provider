import React, { useState } from 'react';
import { Alert, StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { AppStyles } from '../AppStyles';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from 'react-redux';
import { login, setUserProfile } from '../reducers';
import { db } from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Text } from 'react-native-paper';

function SignupScreen({ navigation }) {
  const auth = getAuth();

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const onRegister = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    createUserWithEmailAndPassword(auth, trimmedEmail, trimmedPassword)
      .then((userCredential) => {
        const data = {
          email: trimmedEmail,
          first_name: first_name,
          last_name: last_name,
          phone_number: phone_number,
        };
        // Signed in 
        const user_uid = userCredential.user?.uid;
        //persist user data to async storage
        AsyncStorage.setItem('@loggedInUserID:id', user_uid);
        AsyncStorage.setItem('@loggedInUserID:key', trimmedEmail);
        AsyncStorage.setItem('@loggedInUserID:password', trimmedPassword);
        //persist user details into firestore
        const userDetailsToSave = { ...data, id: user_uid }
        setDoc(doc(db, "users", user_uid), userDetailsToSave)
          .then(() => {
            dispatch(login(userDetailsToSave));
            dispatch(setUserProfile(userDetailsToSave));
            navigation.navigate('Home');
          })
          .catch(({ code, message }) => console.error(message))

      })
      .catch((error) => {
        const { code, message } = error;
        console.error(message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Create new account</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="First Name"
          onChangeText={setFirstName}
          value={first_name}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Last Name"
          onChangeText={setLastName}
          value={last_name}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Phone Number"
          onChangeText={setPhoneNumber}
          value={phone_number}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="E-mail Address"
          onChangeText={setEmail}
          value={email}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <Button
        mode='contained'
        style={[styles.facebookContainer, { marginTop: 50 }]}
        onPress={() => onRegister()}>
        Sign Up
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20,
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20,
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text,
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  loginText: {
    color: AppStyles.color.white,
  },
  placeholder: {
    color: 'red',
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text,
  },
  facebookContainer: {
    alignItems: 'center',
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  facebookText: {
    color: AppStyles.color.white,
  },
});

export default SignupScreen;
