export const ADD_IMAGE = 'ADD_IMAGE';
export const ADD_LOACATION = 'ADD_LOACATION';
export const ADD_DESCRIPTION = 'ADD_DESCRIPTION';
export const ADD_REPORT = 'ADD_REPORT';
export const CREATE_REPORT = 'CREATE_REPORT';
export const SET_REPORTS = 'SET_REPORTS';
import Report from '../../models/report';
import ENV from '../../env';

export const addImage = (imageUrl) =>{
    return { type: ADD_IMAGE, image:imageUrl };
}

export const fetchReports = () =>{
    return async (dispatch, getState) =>{
        const userId = getState().auth.userId;
        try{
            const response = await fetch(
                `https://parkass-default-rtdb.firebaseio.com/reports/${userId}.json`
            );
            if(!response.ok){
                throw new Error('Somthing went wrong')
            }
            const resData = await response.json();
    
            const loadedReports = [];
            for (const key in resData) {
                loadedReports.push(new Report(
                    key,
                    userId, 
                    resData[key].date,
                    resData[key].image,
                    resData[key].lat,
                    resData[key].lng,
                    resData[key].address,
                    resData[key].text,
                ));
            }
            dispatch({
                type: SET_REPORTS, 
                loadedReports: loadedReports, 
                userReports: loadedReports.filter(report => report.userId === userId)
            })  
        } catch(err){
           throw err;
        }
    }
}

// export const createReport = (text, image, address) => async(dispatch, getState) => {
//     const state = getState().report
//     console.log(state)
//     // const image = state.image;
//     // console.log(image)
//     // const address = state.address;
//     const lat = state.lat;
//     const lng = state.lng;
//     // const description = state.description;
//     const date = new Date();
//     report(text, image, address, lat, lng, date)

// }

export const createReport = (text, image, address, lat, lng) =>{
    const date = new Date()
    return async (dispatch, getState) =>{
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(`https://parkass-default-rtdb.firebaseio.com/reports/${userId}.json?auth=${token}`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                image,
                address,
                lat,
                lng,
                text,
                date            
            })
        })
        
        const resData = await response.json();
        console.log(resData);

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
                userId
            }
        })
    }
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
        console.log(address)
        dispatch({type: ADD_LOACATION, locationData:{location: location, address: address}})

    }
}
