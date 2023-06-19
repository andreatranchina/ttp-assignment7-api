import React,{useState,useEffect} from 'react';
import axios from 'axios';


//finding the distance between two zipcodes
const DistanceSearch = () => {
    const [zip1, setZip1] = useState('');
    const [zip2, setZip2] = useState('');
    const [distance, setDistance] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    //using zip-api.eu to get the lat and long of the zipcodes
    //https://zip-api.eu/api/v1/distance/[country_code]-[postal_code]/[country_code]-[postal_code];
    const isEmpty = zip1 === '' || zip2 === '';
    const notFiveDigits = (zip1.length !== 5) || (zip2.length !==5); 
    const notNumber = isNaN(zip1) || isNaN(zip2);
    const notValid = notNumber || isEmpty || notFiveDigits;

    const getDistance = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const res = await axios.get(`https://zip-api.eu/api/v1/distance/US-${zip1}/US-${zip2}/mi`);
            setDistance(Number(res.data.distance).toFixed(2));
            setLoading(false);
        }catch(err){
            setError(err.message);
            setLoading(false);
        }
    }


    return(
        <div>
            {/* <h1>Distance Finder</h1> */}
            <div className="container-search-distance">
                <form className="form-two-container" onSubmit={getDistance}>
                    <input className="input-zip-one" type="text" placeholder="Zipcode 1" value={zip1} onChange={(e) => setZip1(e.target.value)} />
                    <input className="input-zip-two" type="text" placeholder="Zipcode 2" value={zip2} onChange={(e) => setZip2(e.target.value)} />
                    <button className="btn-distance" type="submit" disabled={notValid}>Find Distance</button>
                </form>
                <div className="response-search-distance">
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    {distance?<h1>{distance} miles</h1>: <h1>Get Distance!!</h1>}                    
                </div>

            </div>
        </div>
    )




}



export default DistanceSearch;




//https://zip-api.eu/api/v1/distance/US-11103/US-11105