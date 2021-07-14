import Report from '../../models/report';
import { ADD_IMAGE, ADD_LOCATION, SET_REPORTS, CREATE_REPORT } from '../action/report';
const initialState = {
  reportsArr: null,
  imageUrl: null,
  address: null,
  city: null,
  lat: null,
  lng: null,
  description: null,
  date: null,
  userReports: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_REPORTS:
      return {
        reportsArr: action.loadedReports,
        userReports: action.userReports,
      };
    case ADD_IMAGE:
      return {
        imageUrl: action.image,
        reportsArr: [],
      };
    case ADD_LOCATION:
      return {
        lat: action.locationData.location.lat,
        lng: action.locationData.location.lng,
        address: action.locationData.address,
        city: action.locationData.city,
        ...state,
      };
    case CREATE_REPORT: {
      const newReport = new Report(
        action.reportData.id,
        action.reportData.userId,
        new Date().toLocaleDateString(),
        action.reportData.image,
        action.reportData.lat,
        action.reportData.lng,
        action.reportData.address,
        action.reportData.text,
      );
      return {
        reportsArr: state.reportsArr.concat(newReport),
      };
    }
    default:
      return state;
  }
};
