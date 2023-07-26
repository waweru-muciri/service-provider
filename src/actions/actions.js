import * as actionTypes from "../reducers/actionTypes";

export function editAppointment(appointment) {
    return {
        type: actionTypes.EDIT_APPOINTMENT,
        appointment,
    };
}

export function addAppointment(appointment) {
    return {
        type: actionTypes.ADD_APPOINTMENT,
        appointment,
    };
}

export function deleteAppointment(appointmentId) {
    return {
        type: actionTypes.DELETE_APPOINTMENT,
        appointmentId,
    };
}

export function appointmentsFetchDataSuccess(appointments) {
    return {
        type: actionTypes.APPOINTMENTS_FETCH_DATA_SUCCESS,
        appointments,
    };
}

export function editServiceProvider(serviceProvider) {
    return {
        type: actionTypes.EDIT_SERVICE,
        serviceProvider,
    };
}

export function addServiceProvider(serviceProvider) {
    return {
        type: actionTypes.ADD_SERVICE,
        serviceProvider,
    };
}

export function deleteServiceProvider(serviceProviderId) {
    return {
        type: actionTypes.DELETE_SERVICE,
        serviceProviderId,
    };
}

export function serviceProvidersFetchDataSuccess(serviceProviders) {
    return {
        type: actionTypes.SERVICES_FETCH_DATA_SUCCESS,
        serviceProviders,
    };
}

