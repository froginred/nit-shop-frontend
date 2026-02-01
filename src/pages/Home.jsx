import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import '../styles/Home.css'
import UserContext from '../contexts/UserContext'
import ItemCard from '../components/ItemCard'
import { addFavorite, addToCart, getAllItems, getFavorites, removeFavorite, searchItems } from '../services/ApiService'

const Home = () => {
    const { currentUser } = useContext(UserContext);
    const location = useLocation();

    const [items, setItems] = useState([]);
    const [favoritesItemIds, setFavoritesItemIds] = useState(new Set());
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const loadAllItems = () => {
        setIsLoading(true);
        setMessage("");

        getAllItems()
            .then((res) => {
                setItems(res.data || []);
            })
            .catch(() => {
                setMessage("Failed to load items.");
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const loadFavorites = () => {
        if (!currentUser) {
            setFavoritesItemIds(new Set());
            return;
        }

        getFavorites()
            .then((res) => {
                const ids = new Set((res.data || []).map((f) => f.itemId));
                setFavoritesItemIds(ids);
            })
            .catch(() => {
                setFavoritesItemIds(new Set());
            })
    }

    const handleSearch = (q) => {
        const trimmed = (q || "").trim();

        if (trimmed.length === 0) {
            loadAllItems();
            return;
        }

        setIsLoading(true);
        setMessage("");

        searchItems(trimmed)
            .then((res) => {
                const data = res.data || [];
                setItems(data);

                if (data.length === 0) {
                    setMessage(`No items found for "${trimmed}"`);
                }
            })
            .catch(() => {
                setMessage("Search failed.");
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    // initial load
    useEffect(() => {
        loadAllItems();
    }, []);

    // refresh favorites ids when user changes
    useEffect(() => {
        loadFavorites();
    }, [currentUser]);

    // listen to navbar "store-search" event
    useEffect(() => {
        const listener = (e) => handleSearch(e.detail);
        window.addEventListener("store-search", listener);

        return () => window.removeEventListener("store-search", listener);
    }, []);

    // if navbar searched from another page: navigate("/", { state: { q } })
    useEffect(() => {
        const q = location.state?.q;
        if (q !== undefined) {
            handleSearch(q);
        }
    }, [location.state]);

    const handleAddToCart = (itemId) => {
        if (!currentUser) {
            setMessage("Please login to add items to cart.");
            return;
        }

        addToCart(itemId, 1)
            .then(() => {
                setMessage("Added to cart.");
                loadAllItems(); // refresh stock display
            })
            .catch((err) => {
                const serverMsg = err?.response?.data;
                setMessage(serverMsg || "Failed to add to cart.");
            })
    }

    const handleAddFavorite = (itemId) => {
        if (!currentUser) {
            setMessage("Please login to use favorites.");
            return;
        }

        addFavorite(itemId)
            .then(() => {
                const updated = new Set(favoritesItemIds);
                updated.add(itemId);
                setFavoritesItemIds(updated);
            })
            .catch((err) => {
                const serverMsg = err?.response?.data;
                setMessage(serverMsg || "Failed to add favorite.");
            })
    }

    const handleRemoveFavorite = (itemId) => {
        if (!currentUser) return;

        removeFavorite(itemId)
            .then(() => {
                const updated = new Set(favoritesItemIds);
                updated.delete(itemId);
                setFavoritesItemIds(updated);
            })
            .catch((err) => {
                const serverMsg = err?.response?.data;
                setMessage(serverMsg || "Failed to remove favorite.");
            })
    }

    return (
        <div className='home'>
            <div className='home-hero'>
                <h1>Nit Shop</h1>
                <p>Welcome!</p>
            </div>

            {message && <div className='home-message'>{message}</div>}
            {isLoading && <div className='home-message'>Loading...</div>}

            <div className='items-grid'>
                {items.map((item) => {
                    const isFav = favoritesItemIds.has(item.id);

                    return (
                        <ItemCard
                            key={item.id}
                            item={item}
                            isFavorite={isFav}
                            onAddToCart={() => handleAddToCart(item.id)}
                            onAddFavorite={currentUser ? () => handleAddFavorite(item.id) : null}
                            onRemoveFavorite={currentUser ? () => handleRemoveFavorite(item.id) : null}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Home
