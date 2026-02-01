import React, { useContext, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../styles/Navbar.css'
import UserContext from '../contexts/UserContext'
import CustomLink from './CustomLink'
import CircleEmpty from './AssetComponents/CircleEmpty'
import SearchBar from './SearchBar'

const Navbar = () => {
  const { currentUser, updateCurrentUserContext, isRequestToGetCurrentUserDone } = useContext(UserContext);
  const navigate = useNavigate();
  const [logoError, setLogoError] = useState(false);


  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const isFavoritesPage = location.pathname === "/favorites";
  const placeholder = isFavoritesPage ? "Search in favorites" : "Search in store";

  const handleSearch = () => {
    const q = (searchQuery || "").trim();

    // If we are on favorites page - filter favorites only
    if (isFavoritesPage) {
      window.dispatchEvent(new CustomEvent("favorites-search", { detail: q }));
      return;
    }

    // If we are on home - search store directly
    if (location.pathname === "/") {
      window.dispatchEvent(new CustomEvent("store-search", { detail: q }));
      return;
    }

    // Any other page - go to home and search store
    navigate("/", { state: { q } });
  };

  const handleClear = () => {
    setSearchQuery("");

    if (isFavoritesPage) {
      window.dispatchEvent(new CustomEvent("favorites-search", { detail: "" }));
    } else {
      window.dispatchEvent(new CustomEvent("store-search", { detail: "" }));
    }
  };



  const handleLogout = () => {
    setTimeout(() => {
      localStorage.removeItem("token");
      updateCurrentUserContext(null);
      navigate("/");
    }, 1000);
  }

  return (
    <div className='navbar'>
      <CustomLink to="/" className="navbar-logo">
        {!logoError ? (
          <CircleEmpty
            className="logo"
            primary="black"
            onError={() => setLogoError(true)}
          />
        ) : (
          <span className="navbar-title">Nit shop</span>
        )}
      </CustomLink>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onSearch={handleSearch}
        onClear={handleClear}
        placeholder={placeholder}
      />

      <div className='navbar-links'>
        <CustomLink to={'/orders'}>Orders</CustomLink>
        <CustomLink to={'/favorites'}>Favorites</CustomLink>

        {isRequestToGetCurrentUserDone && !currentUser && (
          <>
            <CustomLink to={'/login'}>Login</CustomLink>
            <CustomLink to={'/register'}>Sign Up</CustomLink>
          </>
        )}

        {currentUser && (
          <>
            <CustomLink to={'/profile'}>Profile</CustomLink>
            {(currentUser.role == "ADMIN") && <CustomLink to={'/admin'}>Admin</CustomLink>}
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar