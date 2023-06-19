import React, {useState, useEffect} from 'react';
import axios from 'axios';

function CityFinder(){
    const [cityList, setCityList] = useState("");
    const [currentZipCode, setCurrentZipCode] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const isEmpty = currentZipCode === "";
    const notFiveDigits = (currentZipCode.length !==5); 
    const notNumber = isNaN(currentZipCode);
    const notValid = notNumber || isEmpty || notFiveDigits;

    function handleChange(event){
        setCurrentZipCode(event.target.value);
    }

    function handleSubmit(event){
        event.preventDefault();
        getCities();
    }

    async function getCities(){
        setLoading(true);
        try {
            const response = await axios.get(`https://zip-api.eu/api/v1/info/US-${currentZipCode}`);
            setCityList(response.data); 
            setLoading(false);
            setError("");
        }
        catch(err){
            setError(err.message);
            setLoading(false);
        }
  
    }

    console.log(cityList);
    console.log(currentZipCode);

    return(
        <div className= "container-search-by-zip">
            {/* <div className="form-one-container"> */}
                <form className="form-one-container">
                    <input className="input-zip" type="text" placeholder="zip code" onChange={handleChange}></input>
                    <button className="btn-search-by-zip" onClick={handleSubmit} disabled={notValid}>Search</button>      
                </form>
            {/* </div> */}
            <div className="response-city">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {cityList.place_name?<h1>{cityList.place_name}</h1>:
                <h1>Get City Name</h1>}
            </div>
        </div>
    )
}

export default CityFinder;