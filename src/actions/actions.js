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

export function editService(service) {
    return {
        type: actionTypes.EDIT_SERVICE,
        service,
    };
}

export function addService(service) {
    return {
        type: actionTypes.ADD_SERVICE,
        service,
    };
}

export function deleteService(serviceId) {
    return {
        type: actionTypes.DELETE_SERVICE,
        serviceId,
    };
}

export function servicesFetchDataSuccess(services) {
    return {
        type: actionTypes.SERVICES_FETCH_DATA_SUCCESS,
        services,
    };
}

