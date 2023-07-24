import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { db } from '../firebaseConfig';
import { doc, getDocs, deleteDoc, collection, updateDoc, addDoc } from "firebase/firestore";
import { addAppointment, appointmentsFetchDataSuccess, deleteAppointment, editAppointment } from '../actions/actions';
import { serviceProviders, appointments } from "./reducers"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const USER_PROFILE = 'USER_PROFILE';

const initialAuthState = { isLoggedIn: false };


export const login = (user) => ({
  type: LOGIN,
  user,
});

export const logout = (user) => ({
  type: LOGIN,
});

export const setUserProfile = (userProfile) => ({
  type: USER_PROFILE,
  userProfile,
});

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true, user: action.user };
    case USER_PROFILE:
      return { ...state, userProfile: action.userProfile };
    case LOGOUT:
      return async () => {
        await AsyncStorage.removeItem('@loggedInUserID:_id');
        await AsyncStorage.removeItem('@loggedInUserID:key');
        await AsyncStorage.removeItem('@loggedInUserID:password');
        return { ...state, isLoggedIn: false, user: {}, userProfile: {} };
      }
    default:
      return state;
  }
}

export function updateUserProfile(userId, userData) {
  return async (dispatch) => {
    //send post request to edit the item
    updateDoc(doc(db, "users", userId), userData)
      .then((docRef) => {
        let modifiedObject = Object.assign(
          {},
          data,
        );
        dispatch(setUserProfile(modifiedObject));
      })
  }
}


export async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileRef = ref(getStorage(), "product_images");
  const result = await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  return await getDownloadURL(fileRef);
}


export function handleItemFormSubmit(data, url) {
  if (typeof data._id === "undefined") {
    delete data._id;
  }
  return async (dispatch) => {
    const user_id = await AsyncStorage.getItem("@loggedInUserID:_id")
    typeof data._id !== "undefined"
      ? //send post request to edit the item
      updateDoc(doc(db, "users", user_id, url, data._id), data)
        .then((docRef) => {
          let modifiedObject = Object.assign(
            {},
            data,
          );
          switch (url) {
            case "appointments":
              dispatch(editAppointment(modifiedObject));
              break;
            case "service-providers":
              dispatch(editServiceProvider(modifiedObject));
              break;
          }
        })
        .catch((error) => {
          console.log("Error updating document => ", error.response);
        }).finally(() => {
        })
      : //send post to create item
      addDoc(url == "service-providers" ? collection(db, "service-providers") : collection(db, "users", user_id, url), data)
        .then((docRef) => {
          let addedItem = Object.assign({}, data, {
            _id: docRef._id,
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
      const user_id = await AsyncStorage.getItem("@loggedInUserID:_id")
      let urlToFetchFrom;
      if (url == "service-providers") {
        urlToFetchFrom = "service-providers"
      }
      else if (url == "users") {
        urlToFetchFrom = "users"
      }
      else {
        urlToFetchFrom = `users/${user_id}/${url}`
      }
      const snapshot = await getDocs(collection(db, urlToFetchFrom))
      const fetchedItems = snapshot.docs.map((doc) => {
        const fetchedObject = Object.assign({}, doc.data(),
          {
            _id: doc._id,
          }
        );
        return fetchedObject;
      });
      switch (url) {
        case "appointments":
          dispatch(appointmentsFetchDataSuccess(fetchedItems));
          break;
        case "service-providers":
          dispatch(serviceProvidersFetchDataSuccess(fetchedItems));
          break;
      }
    } catch (error) {
    }
  }
}

export function handleDelete(itemId, url) {
  //send request to server to delete selected item
  return async (dispatch) => {
    try {
      const user_id = await AsyncStorage.getItem("@loggedInUserID:_id")
      await deleteDoc(doc(db, "users", user_id, url, itemId))
      switch (url) {
        case "appointments":
          dispatch(deleteAppointment(itemId));
          break;
        case "service-providers":
          dispatch(deleteWithdrawal(itemId));
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
  serviceProviders
});

export default AppReducer;
