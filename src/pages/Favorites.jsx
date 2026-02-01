import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Favorites.css'
import UserContext from '../contexts/UserContext'
import ItemCard from '../components/ItemCard'
import { addToCart, getFavorites, getItemById, removeFavorite } from '../services/ApiService'

const Favorites = () => {
    const { currentUser, isRequestToGetCurrentUserDone } = useContext(UserContext);
    const navigate = useNavigate();

    const [allItems, setAllItems] = useState([]);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const loadFavoritesItems = () => {
        setIsLoading(true);
        setMessage("");

        getFavorites()
            .then(async (res) => {
                const favorites = res.data || [];

                if (favorites.length === 0) {
                    setAllItems([]);
                    setItems([]);
                    setMessage("No favorite items yet.");
                    return;
                }

                const itemPromises = favorites.map((f) => getItemById(f.itemId));
                const itemResponses = await Promise.all(itemPromises);

                const loadedItems = itemResponses.map((r) => r.data).filter(Boolean);

                setAllItems(loadedItems);
                setItems(loadedItems);
            })
            .catch(() => {
                setMessage("Failed to load favorites.");
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    // protect route
    useEffect(() => {
        if (!isRequestToGetCurrentUserDone) return;

        if (!currentUser) {
            navigate("/login");
            return;
        }

        loadFavoritesItems();
    }, [isRequestToGetCurrentUserDone, currentUser]);

    // listen to navbar "favorites-search"
    useEffect(() => {
        const listener = (e) => {
            const q = (e.detail || "").trim().toLowerCase();

            if (!q) {
                setItems(allItems);
                if (allItems.length === 0) setMessage("No favorite items yet.");
                else setMessage("");
                return;
            }

            const filtered = allItems.filter((item) =>
                (item.title || "").toLowerCase().includes(q)
            );

            setItems(filtered);

            if (filtered.length === 0) {
                setMessage(`No favorites found for "${e.detail}"`);
            } else {
                setMessage("");
            }
        };

        window.addEventListener("favorites-search", listener);
        return () => window.removeEventListener("favorites-search", listener);
    }, [allItems]);

    const handleRemoveFavorite = (itemId) => {
        setMessage("");

        removeFavorite(itemId)
            .then(() => {
                const newAll = allItems.filter((i) => i.id !== itemId);
                const newItems = items.filter((i) => i.id !== itemId);

                setAllItems(newAll);
                setItems(newItems);

                if (newAll.length === 0) {
                    setMessage("No favorite items yet.");
                }
            })
            .catch((err) => {
                const serverMsg = err?.response?.data;
                setMessage(serverMsg || "Failed to remove favorite.");
            })
    }

    const handleAddToCart = (itemId) => {
        setMessage("");

        addToCart(itemId, 1)
            .then(() => {
                setMessage("Added to cart.");
            })
            .catch((err) => {
                const serverMsg = err?.response?.data;
                setMessage(serverMsg || "Failed to add to cart.");
            })
    }

    return (
        <div className='favorites'>
            <h1>My Favorites</h1>

            {message && <div className='favorites-message'>{message}</div>}
            {isLoading && <div className='favorites-message'>Loading...</div>}

            <div className='favorites-grid'>
                {items.map((item) => (
                    <ItemCard
                        key={item.id}
                        item={item}
                        isFavorite={true}
                        onAddToCart={() => handleAddToCart(item.id)}
                        onRemoveFavorite={() => handleRemoveFavorite(item.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Favorites
