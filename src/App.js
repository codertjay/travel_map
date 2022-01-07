import React, {useEffect, useState} from 'react';
import {CssBaseline, Grid} from '@mui/material';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {getPlacesData, getWeatherData} from './api/index'

const theme = createTheme();
const App = () => {
    const [type, setType] = useState('restaurants');
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [rating, setRating] = useState('');
    const [places, setPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState(null);
    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [autoComplete, setAutoComplete] = useState(null);
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({
                 coords: {latitude, longitude}
             }) => setCoordinates({lat: latitude, lng: longitude}))
    }, []);

    const onLoad = (autoC) => setAutoComplete(autoC)

    const onPlaceChanged = () => {
        const lat = autoComplete.getPlace().geometry.location.lat();
        const lng = autoComplete.getPlace().geometry.location.lng();

        setCoordinates({lat, lng});
    };

    useEffect(() => {
        const filtered = places.filter((place) => Number(place.rating) > rating);
        setFilteredPlaces(filtered);
    }, [rating]);

    useEffect(() => {
        setIsLoading(true)
        if (bounds) {
            getWeatherData(coordinates.lat, coordinates.lng)
                .then((data) => setWeatherData(data))

            getPlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
                    console.log(data)
                    setPlaces(data?.filter(
                        (place) => place.name && place.num_reviews > 0))
                    setFilteredPlaces([]);
                    setIsLoading(false)
                })
        }

    }, [bounds, type]);


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad}/>
            <Grid container spacing={3} style={{width: '100%'}}>
                <Grid item xs={12} md={4}>
                    <List places={
                        filteredPlaces.length ? filteredPlaces : places
                    }
                          childClicked={childClicked}
                          isLoading={isLoading}
                          type={type}
                          setType={setType}
                          rating={rating}
                          setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={places}
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                    />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default App;