import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { AiFillHeart } from "react-icons/ai";
import CHLogo from "../asserts/CountryHubLogo(png).png";
import flexImg2 from "../asserts/FlexImg2.png";
import facebook from "../asserts/facebook.svg";
import instagram from "../asserts/instagram.svg";
import twitter from "../asserts/twitter.svg";

// Assert links for social media
const socialMedia = [
  { src: facebook, alt: "facebook logo" },
  { src: twitter, alt: "twitter logo" },
  { src: instagram, alt: "instagram logo" },
];

function FavoriteCountries() {
    const [favorites, setFavorites] = useState([]);
    const [countryDetails, setCountryDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    // Fetch favorite countries
    useEffect(() => {
        document.title = "COUNTRY HUB | Favorite Countries";
        const fetchFavorites = async () => {
            try {
                const res = await fetch("https://countryhubbackend-production.up.railway.app/api/favorites", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                setFavorites(data);
            } catch (err) {
                console.error("Error fetching favorites:", err);
            }
        };

        if (token) {
            fetchFavorites();
        }
    }, [token]);

    // Fetch favorite Country Details
    useEffect(() => {
        const fetchCountryDetails = async () => {
            if (favorites.length === 0) {
                setCountryDetails([]);
                setLoading(false);
                return;
            }

            try {
                const details = await Promise.all(
                    favorites.map(async (fav) => {
                        const res = await fetch(`https://restcountries.com/v3.1/alpha/${fav.countryCode}`);
                        const data = await res.json();
                        return data[0];
                    })
                );
                setCountryDetails(details);
            } catch (err) {
                console.error("Error fetching country details:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCountryDetails();
    }, [favorites]);

    // Check whether the user is logged in or not
    if (!token) {
        return (
            <div className="text-center mt-20">
                <h2 className="text-2xl font-bold">Please log in to view favorite countries.</h2>
            </div>
        );
    }

    return (
        <div className="animate-gradient bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-size-200 bg-pos-0">
        <div className="pt-20 container mx-auto p-2">
            <div className="flex items-center justify-center mt-[20px] flex-wrap">
                <img src={CHLogo} alt="Logo" className="w-12 h-12 sm:w-20 sm:h-20" />
                <div className="banner items-center justify-center ml-2 sm:ml-4">
                    <h1 className="font-roboto text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">COUNTRY <span className="text-blue-700">HUB</span></h1>
                    <h5 className="font-roboto text-[0.4rem] sm:text-[0.6rem] md:text-[0.7rem] font-bold text-center text-black tracking-[0.5em] sm:tracking-[0.75em]">LEARN ABOUT COUNTRIES</h5>
                </div>
            </div><br/>

            <div className="relative w-full h-[80vh] overflow-hidden">
                <img
                    src={flexImg2}
                    alt="Banner"
                    className="w-full h-full object-cover brightness-75"
                />

                {/* Main Image Flex */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <h1 className="text-white text-4xl md:text-6xl font-bold animate-fadeInUp">
                    Welcome to <span className="text-blue-700" style={{ WebkitTextStroke: '2px black' }}>FAVORITES</span>
                    </h1>
                    <p className="text-white text-lg mt-4 animate-fadeInUp delay-100">
                    Discover and favorite countries around the world.
                    </p>
                    <hr className="mt-10"/>

                    <p className="text-white font-semibold text-lg mt-20 animate-fadeInUp delay-100">
                    Follow us on
                    </p>
                    <div className="flex justify-center mt-5 animate-fadeInUp delay-100">
                    <div className="flex items-center gap-7">
                        {socialMedia.map((icon) => (
                        <div
                            className="flex justify-center items-center w-12 h-12 bg-white rounded-2xl"
                            key={icon.alt}
                        >
                            <a href="https://res.cloudinary.com/fmart/image/upload/v1745471470/CountryHubLogo_xpgvql.png">
                            <img src={icon.src} alt={icon.alt} width={24} height={24} />
                            </a>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
            </div>

            {/* Back Button */} 
            <Link to="/countries" className="flex items-center text-black hover:text-blue-700 font-bold mt-10 sm:mt-[70px] text-sm sm:text-base md:text-lg"><ArrowLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-black hover:text-blue-700 mr-2" />BACK TO HOME</Link><br/>

            {/* Display the favorite countriies the user added */}
            {loading ? (
                <p className="text-center">Loading your favorites countries...</p>
            ) : countryDetails.length === 0 ? (
                <p className="text-center text-gray-600">No favorite countries added yet!</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {countryDetails.map((country) => (
                        <div key={country.cca2} className="bg-white rounded shadow p-2 relative">
                            <Link to={`/country/${country.cca3}`}>
                                <img
                                    src={country.flags.svg}
                                    alt={`Flag of ${country.name.common}`}
                                    className="w-full h-32 object-cover rounded-lg mb-2"
                                />
                                <h2 className="text-lg font-bold text-blue-700">{country.name.common}</h2>
                                <p><span className="text-gray-600">Country Code:</span> {country.cca2}</p>
                                <p><span className="text-gray-600">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
                                <hr className="mt-5"/>
                            </Link>
                            <div className="flex justify-center items-center space-x-2 mt-2 p-2 text-red-600 curson-pointer hover:bg-gray-200 rounded transition duration-300">
                            <div className="text-xl">
                                <AiFillHeart size={20}/>
                            </div>
                            <p>Favorite {country.name.common}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}<br/>
        </div>
        </div>
    );
}

export default FavoriteCountries;
