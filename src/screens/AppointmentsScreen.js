import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { AppStyles } from '../AppStyles';
import { Configuration } from '../Configuration';
import { fetchDataFromUrl } from '../reducers';

function ServicesScreen({ navigation, fetchData, appointments }) {


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Appointments',
        });
    }, []);

    useEffect(() => {
        fetchData("appointments")
    }, [])

    return (
        <FlatList
            ListHeaderComponent={
                <>
                    <Text style={styles.title}>Your appointments</Text>
                </>}

            data={appointments}
            renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
            ListFooterComponent={
                <Text />
            }
        />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: Configuration.home.listing_item.offset,
    },
    title: {
        fontWeight: 'bold',
        color: AppStyles.color.title,
        fontSize: 25,
    },
    userPhoto: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 5,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    }
});

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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicesScreen);
