import React, { useEffect, useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getServices } from '../reducers';
import { List, Searchbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import PageTitle from '../components/PageTitle';
import PageHeader from '../components/PageHeader';
import ServiceItem from './ServiceItem';

function ServicesScreen({ navigation, fetchData, serviceProviders }) {

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredServiceProviders, setFilteredServiceProviders] = useState(serviceProviders);

    const onChangeSearch = query => setSearchQuery(query);


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Services',
        });
    }, []);

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (searchQuery.length) {
            const filteredBySearchWord = serviceProviders.filter(serviceProvider => {
                const serviceOfferedByProvider = serviceProvider.service || {}
                const { name, description } = serviceOfferedByProvider
                const joinedNameAndDescription = `${name} ${description}`
                return joinedNameAndDescription.includes(searchQuery)
            })
            setFilteredServiceProviders(filteredBySearchWord)
        }
    }, [searchQuery])

    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <PageHeader>
                    <PageTitle>Top Services</PageTitle>
                </PageHeader>
                <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}>
                    <Searchbar
                        placeholder="Search search by name and description"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />
                </View>
                <View style={{ width: "90%", marginLeft: "auto", marginRight: "auto", paddingTop: 20, paddingBottom: 20, }}>
                    <View style={{ flex: 1, flexDirection: "column", gap: 10, justifyContent: "flex-start" }}>
                        {
                            filteredServiceProviders.map((serviceProvider, index) => (
                                <ServiceItem key={index} navigation={navigation} serviceProvider={serviceProvider} />))
                        }
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        serviceProviders: state.serviceProviders.filter(serviceProvider => serviceProvider.service?.name),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => {
            dispatch(getServices())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicesScreen);
