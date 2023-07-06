import * as actionTypes from "./actionTypes";

export function services(state = [], action) {
    switch (action.type) {
        case actionTypes.SERVICES_FETCH_DATA_SUCCESS:
            return action.services;

        case actionTypes.EDIT_SERVICE:
            return state.map((service) =>
                service.id === action.service.id
                    ? Object.assign({}, service, action.service)
                    : service
            );

        case actionTypes.ADD_SERVICE:
            return [...state, action.service];

        case actionTypes.DELETE_SERVICE:
            return state.filter((service) => service.id !== action.serviceId);
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

