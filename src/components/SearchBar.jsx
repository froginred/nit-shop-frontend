import React from 'react'
import '../styles/SearchBar.css'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const SearchBar = ({ value, onSearch, onClear, onChange, placeholder }) => {
    return (
        <div className="SearchBar">
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        onSearch();
                    }
                }}
            />

            {
                value && (
                    <button className="icon-btn" type="button" onClick={onClear}>
                        <ClearIcon />
                    </button>
                )
            }

            <button className="icon-btn" type="button" onClick={onSearch}>
                <SearchIcon />
            </button>
        </div>
    )
}

export default SearchBar
