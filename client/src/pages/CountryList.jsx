import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import CHLogo from "../asserts/CountryHubLogo(png).png";
import flexImg from "../asserts/FlexImg1.jpg";
import facebook from "../asserts/facebook.svg";
import instagram from "../asserts/instagram.svg";
import twitter from "../asserts/twitter.svg";

const socialMedia = [
  { src: facebook, alt: "facebook logo" },
  { src: twitter, alt: "twitter logo" },
  { src: instagram, alt: "instagram logo" },
];

function CountryList() {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [region, setRegion] = useState('');
    const [language, setLanguage] = useState('');
    const [favorites, setFavorites] = useState([]);
    const token = localStorage.getItem("token");

    // Fetch countries
    useEffect(() => {
        document.title = "COUNTRY HUB | Home";
        let url = 'https://restcountries.com/v3.1/all';

        if (searchTerm.trim()) {
            if (searchTerm.trim().length <= 3) {
                url = `https://restcountries.com/v3.1/alpha/${searchTerm}`;
            } else {
                url = `https://restcountries.com/v3.1/name/${searchTerm}`;
            }
        } else if (region) {
            url = `https://restcountries.com/v3.1/region/${region}`;
        } else if (language) {
            url = `https://restcountries.com/v3.1/lang/${language}`;
        }

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const sorted = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
                setCountries(sorted);
            })
            .catch(error => {
                console.error("Error fetching countries:", error);
                setCountries([]);
            });
    }, [searchTerm, region, language]);

    // Fetch favorite countries
    useEffect(() => {
        if (token) {
            fetch("https://countryhubbackend-production.up.railway.app/api/favorites", {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => setFavorites(data))
                .catch(err => console.error("Error loading favorites:", err));
        }
    }, [token]);

    // Check if a country is already favorite
    const isFavorite = (code) => favorites.some(fav => fav.countryCode === code);

    // Toggle to select favorite countries
    const toggleFavorite = async (countryCode, countryName) => {
        if (!token) return alert("Please log in to favorite countries.");
        try {
            if (isFavorite(countryCode)) {
                await fetch(`https://countryhubbackend-production.up.railway.app/api/favorites/${countryCode}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setFavorites(prev => prev.filter(fav => fav.countryCode !== countryCode));
            } else {
                const res = await fetch("https://countryhubbackend-production.up.railway.app/api/favorites", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ countryCode, countryName })
                });
                const newFav = await res.json();
                setFavorites(prev => [...prev, newFav]);
            }
        } catch (err) {
            console.error("Favorite toggle error:", err);
        }
    };

    return (
        <div className="animate-gradient bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-size-200 bg-pos-0">
        <div className="pt-20 container mx-auto p-2">
            
            {/* Site Logo and name */}
            <div className="flex items-center justify-center mt-[20px] flex-wrap">
                <img src={CHLogo} alt="Logo" className="w-12 h-12 sm:w-20 sm:h-20" />
                <div className="banner items-center justify-center ml-2 sm:ml-4">
                    <h1 className="font-roboto text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">COUNTRY <span className="text-blue-700">HUB</span></h1>
                    <h5 className="font-roboto text-[0.4rem] sm:text-[0.6rem] md:text-[0.7rem] font-bold text-center text-black tracking-[0.5em] sm:tracking-[0.75em]">LEARN ABOUT COUNTRIES</h5>
                </div>
            </div><br/>

            {/* Main Image flex */}
            <div className="relative w-full h-[80vh] overflow-hidden">
                <img
                    src={flexImg}
                    alt="Banner"
                    className="w-full h-full object-cover brightness-75"
                />

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <h1 className="text-white text-4xl md:text-6xl font-bold animate-fadeInUp">
                    Welcome to <span className="text-blue-700" style={{ WebkitTextStroke: '2px black' }}>COUNTRY HUB</span>
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

            <div className="flex items-center justify-center mt-[70px]">
                <div className="flex-grow border-t border-blue-700 mb-4"></div>
                <h2 className="font-roboto text-2xl font-bold text-center mb-4 mx-4 tracking-widest">COUNTRIES OF THE WORLD</h2>
                <div className="flex-grow border-t border-blue-700 mb-4"></div>
            </div>

            {/* Search bar and filter options */}
            <div className="sticky top-20 z-40">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 mt-10">
                <div className="relative w-full">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500"><FiSearch /></span>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by country name / code..."
                        className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                    />
                </div>
                
                {/* Filter by region */}
                <select
                    value={region}
                    onChange={(e) => {
                        setRegion(e.target.value);
                        setLanguage('');
                        setSearchTerm('');
                    }}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                >
                    <option value="">Filter country by Region</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
        
                {/* Filter by language */}
                <select
                    value={language}
                    onChange={(e) => {
                        setLanguage(e.target.value);
                        setRegion('');
                        setSearchTerm('');
                    }}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                >
                    <option value="">Filter country by Language</option>
                    <option value="Sinhala">Sinhala</option>
                    <option value="English">English</option>
                    <option value="Tamil">Tamil</option>
                    <option value="French">French</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Arabic">Arabic</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Russian">Russian</option>
                    <option value="Portuguese">Portuguese</option>
                </select>
            </div>
            </div><br/>

            {/* Display countries as grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {countries.map((country) => (
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
                        {/* Favorite Toggle */}
                        <div className="group flex justify-center items-center space-x-2 mt-2 hover:bg-gray-200 rounded transition duration-300 p-2">
                            <button
                                onClick={() => toggleFavorite(country.cca2, country.name.common)}
                                className="text-xl"
                            >
                                {isFavorite(country.cca2) ? <AiFillHeart size={20} className="text-red-600 group-hover:text-red-600 transition duration-300"/> : <AiOutlineHeart size={20} className="text-gray-600 group-hover:text-red-600 transition duration-300"/>}
                            </button>
                            <p className="text-gray-600 group-hover:text-red-600 cursor-pointer">
                                {isFavorite(country.cca2) ? "Remove Favorite" : "Add Favorite"}
                            </p>
                        </div>
                        
                    </div>
                ))}
            </div><br/>
        </div>
        </div>
    );
}

export default CountryList;
