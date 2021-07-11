export const ADD_IMAGE = 'ADD_IMAGE';
export const ADD_LOCATION = 'ADD_LOCATION';
export const ADD_DESCRIPTION = 'ADD_DESCRIPTION';
export const ADD_REPORT = 'ADD_REPORT';
export const CREATE_REPORT = 'CREATE_REPORT';
export const SET_REPORTS = 'SET_REPORTS';
import Report from '../../models/report';
import ENV from '../../constants/env';

export const addImage = (imageUrl) => ({ type: ADD_IMAGE, image: imageUrl });
export const fetchReports = () => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  const response = await fetch(
    `https://parkass-default-rtdb.firebaseio.com/reports/${userId}.json`,
  );
  if (!response.ok) {
    throw new Error('Somthing went wrong');
  }
  const resData = await response.json();
  const loadedReports = [];
  for (const key in resData) {
    loadedReports.push(
      new Report(
        key,
        userId,
        resData[key].date,
        resData[key].image,
        resData[key].lat,
        resData[key].lng,
        resData[key].address,
        resData[key].text,
      ),
    );
  }
  dispatch({
    type: SET_REPORTS,
    loadedReports,
    userReports: loadedReports.filter((report) => report.userId === userId),
  });
};

export const createReport = (text, image, address, lat, lng) => {
  const date = new Date();
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://parkass-default-rtdb.firebaseio.com/reports/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          image,
          address,
          lat,
          lng,
          text,
          date,
        }),
      },
    );
    const resData = await response.json();
    dispatch({
      type: CREATE_REPORT,
      reportData: {
        id: resData.name,
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
  const address = resData.results[0].formatted_address;
  dispatch({
    type: ADD_LOCATION,
    locationData: { location, address, city },
  });
};
