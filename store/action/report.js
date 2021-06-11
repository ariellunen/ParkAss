export const ADD_IMAGE = 'ADD_IMAGE';
export const ADD_LOACATION = 'ADD_LOACATION';
export const ADD_DESCRIPTION = 'ADD_DESCRIPTION';
export const ADD_REPORT = 'ADD_REPORT';
import ENV from '../../env';

export const addImage = (imageUrl) =>{
    return { type: ADD_IMAGE, image:imageUrl };
}

export const yourAction = (text) => async(dispatch, getState) => {
    console.log("your action")
    console.log("steat",getState())
    console.log(text)
}

export const addLocation = (location) => {
    return async dispatch => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`);
        if(!response.ok){
            throw new Error('Something went wrong!');
        }

        const resData = await response.json();
        if(!resData.results){
            throw new Error('Something went wrong!');
        }
        const address = resData.results[0].formatted_address
        console.log('action', address);
        dispatch({type: ADD_LOACATION, locationData:{location: location, address: address}})

    }
}

export const addReport = (text) => {
    return { type: ADD_REPORT, text:text };
}
