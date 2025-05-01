import './App.css';
import { Routes, Route, Navigate} from 'react-router-dom';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CountryList from './pages/CountryList';
import CountryDetails from './pages/CountryDetails';
import FavoriteCountries from './pages/FavoriteCountries';

function App() {
  return (
    <>
      <NavBar />
        <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
          <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/countries" element={<CountryList/>}/>
            <Route path="/country/:countryCode" element={<CountryDetails/>}/>
            <Route path="/favorites" element={<FavoriteCountries />} />
          </Routes>
          </div>
          <Footer />
        </div>
    </>
  );
}

export default App;
