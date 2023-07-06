import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { db } from '../firebaseConfig';
import { doc, getDocs, deleteDoc, collection, updateDoc, addDoc } from "firebase/firestore";
import { addAppointment, appointmentsFetchDataSuccess, deleteAppointment, editAppointment } from '../actions/actions';
import { services, appointments } from "./reducers"

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const initialAuthState = { isLoggedIn: false };


export const login = (user) => ({
  type: LOGIN,
  user,
});

export const logout = (user) => ({
  type: LOGIN,
});

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true, user: action.user };
    case LOGOUT:
      AsyncStorage.removeItem('@loggedInUserID:id');
      AsyncStorage.removeItem('@loggedInUserID:key');
      AsyncStorage.removeItem('@loggedInUserID:password');
      return { ...state, isLoggedIn: false, user: {} };
    default:
      return state;
  }
}

export function handleItemFormSubmit(data, url) {
  if (typeof data.id === "undefined") {
    delete data.id;
  }
  return (dispatch) => {
    typeof data.id !== "undefined"
      ? //send post request to edit the item
      updateDoc(doc(db, url, data.id), data)
        .then((docRef) => {
          let modifiedObject = Object.assign(
            {},
            data,
          );
          switch (url) {
            case "appointments":
              dispatch(editAppointment(modifiedObject));
              break;
          }
        })
        .catch((error) => {
          console.log("Error updating document => ", error.response);
        }).finally(() => {
        })
      : //send post to create item
      addDoc(collection(db, url), data)
        .then((docRef) => {
          let addedItem = Object.assign({}, data, {
            id: docRef.id,
          });
          switch (url) {
            case "appointments":
              dispatch(addAppointment(addedItem));
              break;
          }

        })
        .catch((error) => {
          console.log("Error adding document => ", error.response);
        }).finally(() => {
        });
  }
}


export function fetchDataFromUrl(url) {
  return async (dispatch) => {
    try {
      const snapshot = await getDocs(collection(db, url))
      const fetchedItems = []
      snapshot.forEach((doc) => {
        const fetchedObject = Object.assign(
          {},
          doc.data(),
          {
            id: doc.id,
          }
        );
        fetchedItems.push(fetchedObject)
        switch (url) {
          case "appointments":
            dispatch(appointmentsFetchDataSuccess(fetchedItems));
            break;
        }
      });
    } catch (error) {
    }
  }
}

export function handleDelete(itemId, url) {
  //send request to server to delete selected item
  return async (dispatch) => {
    try {
      await deleteDoc(doc(db, url, itemId))
      switch (url) {
        case "appointments":
          dispatch(deleteAppointment(itemId));
          break;
      }
    }
    catch (error) {
      console.log("Failed to Delete Document!", error);
    }
  }
}

const AppReducer = combineReducers({
  auth,
  appointments, 
  services
});

export default AppReducer;
