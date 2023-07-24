import * as actionTypes from "./actionTypes";

export function serviceProviders(state = [], action) {
    switch (action.type) {
        case actionTypes.SERVICES_FETCH_DATA_SUCCESS:
            return action.serviceProviders;

        case actionTypes.EDIT_SERVICE:
            return state.map((serviceProvider) =>
                serviceProvider.id === action.serviceProvider.id
                    ? Object.assign({}, serviceProvider, action.serviceProvider)
                    : serviceProvider
            );

        case actionTypes.ADD_SERVICE:
            return [...state, action.serviceProvider];

        case actionTypes.DELETE_SERVICE:
            return state.filter((serviceProvider) => serviceProvider.id !== action.serviceId);
        default:
            return state;
    }
}

export function appointments(state = [], action) {
    switch (action.type) {
        case actionTypes.APPOINTMENTS_FETCH_DATA_SUCCESS:
            return action.appointments;

        case actionTypes.EDIT_APPOINTMENT:
            return state.map((appointment) =>
                appointment.id === action.appointment.id
                    ? Object.assign({}, appointment, action.appointment)
                    : appointment
            );

        case actionTypes.ADD_APPOINTMENT:
            return [...state, action.appointment];

        case actionTypes.DELETE_APPOINTMENT:
            return state.filter((appointment) => appointment.id !== action.appointmentId);

        default:
            return state;
    }
}

