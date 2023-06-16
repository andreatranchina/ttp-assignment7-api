import React, {useState, useEffect} from 'react';
import axios from 'axios';

function CityFinder(){
    const [cityList, setCityList] = useState("");
    const [currentZipCode, setCurrentZipCode] = useState("");

    function handleChange(event){
        setCurrentZipCode(event.target.value);
    }

    function handleSubmit(){
        getCities();
    }

    async function getCities(){

        const response = await axios.get(`https://zip-api.eu/api/v1/info/US-${currentZipCode}`);

        setCityList(response.data);
        
    }

    // useEffect(() => {


    // }, []);



    console.log(cityList);
    console.log(currentZipCode);


    return(
        <div>
            <input type="text" placeholder="zip code" onChange={handleChange}></input>
            <button onClick={handleSubmit}>Search</button>
            <h1>{cityList.place_name}</h1>
        </div>
    )

}

export default CityFinder;