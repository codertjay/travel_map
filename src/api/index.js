import axios from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

export const getPlacesData = async (type, sw, ne) => {
    try {
        const {data: {data}} = await
            axios.get(
                `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
                    params: {
                        bl_latitude: sw.lat,
                        bl_longitude: sw.lng,
                        tr_longitude: ne.lng,
                        tr_latitude: ne.lat,
                    },
                    headers: {
                        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY
                    }
                });
        return data;
    } catch (e) {
        console.log(e)
    }
}



export const getWeatherData = async (lat, lng) => {
    try {
        const {data} = axios.get(
            'https://community-open-weather-map.p.rapidapi.com/weather',
            {
                params: {
                    lat: lat,
                    lon: lng,
                },
                headers: {
                    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_WEATHER_API_KEY
                }
            });
        console.log({data})
        return data;
    } catch (e) {
        console.log(e)
    }


}