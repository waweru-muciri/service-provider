import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { handleItemFormSubmit } from '../reducers';
import { IconButton, TextInput, } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextDisplay from '../components/TextDisplay';
import PrimaryButton from '../components/PrimaryButton';
import {
    query,
    collection,
    orderBy,
    onSnapshot,
    limit,
    addDoc,
    serverTimestamp,
    where,
} from "firebase/firestore";
import { db } from '../firebaseConfig';



function ChatsScreen({ navigation, route, userProfile, serviceProviders }) {
    const { serviceProviderId } = route.params;
    const serviceProvider = serviceProviders.find((service) => service.id == serviceProviderId) || {}
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')

    useEffect(() => {
        const q = query(
            collection(db, "messages"),
            where("user_id", "==", userProfile.id),
            orderBy("createdAt", "desc"),
            limit(50)
        );
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            const fetchedMessages = [];
            QuerySnapshot.forEach((doc) => {
                fetchedMessages.push({ ...doc.data(), id: doc.id });
            });
            const sortedMessages = fetchedMessages.sort(
                (a, b) => a.createdAt - b.createdAt
            );
            setMessages(sortedMessages);
        });
        return () => unsubscribe;
    }, []);


    const sendMessage = async () => {
        await addDoc(collection(db, "messages"), {
            text: newMessage,
            name: `${userProfile.first_name} ${userProfile.first_name}`,
            createdAt: serverTimestamp(),
            user_id: userProfile.id,
            service_provider_id: serviceProviderId,
        });
        setNewMessage("")

    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <View
                    style={{
                        flex: 1,
                        padding: 20,
                        justifyContent: "flex-end",
                    }}
                >
                    {
                        messages.map((message, index) => (
                            <TextDisplay style={{ color: message.user_id == userProfile.id ? "green" : "#000000" }} key={index}>{message.text}</TextDisplay>
                        ))
                    }
                    <View>
                        <TextInput
                            placeholder={"Your message"}
                            mode="outlined"
                            theme={{ roundness: 16 }}
                            value={newMessage}
                            onChangeText={(value) => setNewMessage(value)}
                            right={
                                <TextInput.Icon
                                    icon={'send'}
                                    iconColor="#22C55E"
                                    size={20}
                                    onPress={sendMessage}
                                />
                            }
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


const mapStateToProps = (state) => {
    console.info("state=>", state.auth.userProfile.id)
    return {
        userProfile: state.auth.userProfile,
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatsScreen);
