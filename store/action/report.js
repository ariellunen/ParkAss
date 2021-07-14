export const ADD_IMAGE = 'ADD_IMAGE';
export const ADD_LOCATION = 'ADD_LOCATION';
export const ADD_DESCRIPTION = 'ADD_DESCRIPTION';
export const ADD_REPORT = 'ADD_REPORT';
export const CREATE_REPORT = 'CREATE_REPORT';
export const SET_REPORTS = 'SET_REPORTS';
import Report from '../../models/report';
import ENV from '../../constants/env';
import firebase from 'firebase/app';

export const addImage = (imageUrl) => ({ type: ADD_IMAGE, image: imageUrl });
export const fetchReports = () => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  const resData = firebase.database().ref('reports/' + userId);
  resData.on('value', (report) => {
    const data = report.val();
    console.log('fetch reports', data);
    const loadedReports = [];
    for (const key in data) {
      loadedReports.push(
        new Report(
          key,
          userId,
          data[key].date,
          data[key].image,
          data[key].lat,
          data[key].lng,
          data[key].address,
          data[key].text,
        ),
      );
    }
    dispatch({
      type: SET_REPORTS,
      loadedReports,
      userReports: loadedReports.filter((report) => report.userId === userId),
    });
  });
};

export const createReport = (text, image, address, lat, lng) => async (dispatch, getState) => {
  const token = getState().auth.token;
  const userId = getState().auth.userId;
  const date = new Date().toLocaleDateString();
  console.log(token, userId);
  firebase
    .database()
    .ref('reports/' + userId)
    .push({
      text,
      image,
      address,
      lat,
      lng,
      date,
    });
  dispatch({
    type: CREATE_REPORT,
    reportData: {
      image,
      address,
      lat,
      lng,
      text,
      date,
      userId,
    },
  });
};

export const addLocation = (location) => async (dispatch) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&language=en&key=${ENV.googleApiKey}`,
  );
  if (!response.ok) {
    throw new Error('Something went wrong!');
  }
  const resData = await response.json();
  if (!resData.results) {
    throw new Error('Something went wrong!');
  }
  const results = resData.results[0]?.address_components;
  let city = '';
  for (let i = 0; i < results.length; i++) {
    if (results[i].types[0] === 'locality') {
      city = results[i].long_name;
      break;
    }
  }
  // const address = resData.results[0].formatted_address;
  const responseAd = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`,
  );
  if (!responseAd.ok) {
    throw new Error('Something went wrong!');
  }
  const resDataAd = await responseAd.json();
  if (!resDataAd.results) {
    throw new Error('Something went wrong!');
  }
  console.log(resDataAd.results[0].formatted_address);
  const address = resDataAd.results[0].formatted_address;

  dispatch({
    type: ADD_LOCATION,
    locationData: { location, address, city },
  });
};
