import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import CHLogo from "../asserts/CountryHubLogo(png).png";

function CountryDetails(){
    const {countryCode} = useParams();
    const [country, setCountry] = useState(null);

    // Fetch country details of selected country
    useEffect(() => {
        document.title = "COUNTRY HUB | Country Info";
        fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
        .then(response => response.json())
        .then(data => setCountry(data[0]))
        .catch(error => console.error('Error fetching country details: ', error));
    }, [countryCode]);

    if(!country){
        return <p className="text-center mt-10">Loading...</p>;
    }

    return(
        <div className="animate-gradient bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-size-200 bg-pos-0">
        <div className="pt-20 container mx-auto p-2">

            {/* Site name and logo */}
            <div className="flex items-center justify-center mt-[20px] flex-wrap">
                <img src={CHLogo} alt="Logo" className="w-12 h-12 sm:w-20 sm:h-20" />
                <div className="banner items-center justify-center ml-2 sm:ml-4">
                    <h1 className="font-roboto text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">COUNTRY <span className="text-blue-700">HUB</span></h1>
                    <h5 className="font-roboto text-[0.4rem] sm:text-[0.6rem] md:text-[0.7rem] font-bold text-center text-black tracking-[0.5em] sm:tracking-[0.75em]">LEARN ABOUT COUNTRIES</h5>
                </div>
            </div>
            <div className="flex items-center justify-center my-6">
                <div className="flex-grow border-t border-blue-700 mb-4"></div>
                <h2 className="font-roboto text-1xl sm:text-2xl font-bold text-center mb-4 mx-4 tracking-widest">COUNTRIES OF THE WORLD</h2>
                <div className="flex-grow border-t border-blue-700 mb-4"></div>
            </div>

            {/* Back button */}
            <Link to="/countries" className="flex items-center text-black hover:text-blue-700 font-bold mt-10 sm:mt-14 text-sm sm:text-base md:text-lg"><ArrowLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-black hover:text-blue-700 mr-2" />BACK TO HOME</Link><br/>

            {/* Display details of the selected country */}
            <div className="mt-4 bg-white shadow-md rounded-lg p-6 text-center">
                <h2 className="text-4xl font-bold mb-4 text-blue-700">{country.name.common}</h2>
                <hr/><br/>
                <img
                    src={country.flags.svg}
                    alt={`Flag of ${country.name.common}`}
                    className="w-full h-60 object-cover mb-4 rounded-lg"
                />
    
                <p className="mb-4"><span className="text-gray-600 text-2xl font-bold">OFFICIAL NAME: </span><span className="font-bold text-2xl"> {country.name.official}</span></p>

                <hr/>

                <div className="mt-10 flex flex-col items-center">
                {[
                    { label: "COUNTRY CODE", value: country.cca2 },
                    { label: "CAPITAL", value: country.capital?.[0] || 'N/A' },
                    { label: "REGION", value: country.region },
                    { label: "SUBREGION", value: country.subregion || 'N/A' },                              
                    {
                    label: "CURRENCY",
                    value: country.currencies
                        ? Object.values(country.currencies)
                            .map(curr => `${curr.name} (${curr.symbol || ''})`)
                            .join(", ")
                        : "N/A"
                    },
                    { label: "POPULATION", value: country.population.toLocaleString() },
                    { label: "AREA", value: `${country.area.toLocaleString()} km²` },
                    {
                    label: "LANGUAGES",
                    value: country.languages ? Object.values(country.languages).join(', ') : 'N/A'
                    },
                    { label: "TIMEZONES", value: country.timezones.join(', ') },
                ].map((item, index) => (
                    <div
                    key={index}
                    className="w-full max-w-xl flex justify-between text-[18px] text-gray-800 mt-3"
                    >
                    <span className="text-gray-600">{item.label}:</span>
                    <span className="font-semibold text-right">{item.value}</span>
                    </div>
                ))}
                </div>
                
            </div><br/>
        </div>
        </div>
    );
}

export default CountryDetails;
