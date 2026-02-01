import React from "react";
import "../styles/ItemCard.css";

const ItemCard = ({ item, onAddToCart, isFavorite, onAddFavorite, onRemoveFavorite }) => {
    if (!item) return null;

    return (
        <div className="ItemCard">
            <img
                src={item.image_url}
                alt={item.title}
                onError={(e) => (e.target.style.display = "none")}
            />

            <div className='meta'>
                <h3>{item.title}</h3>
                <p>${item.price}</p>

                {item.stock === 0 ? (
                    <p style={{ color: "red" }}>0 items left in stock</p>
                ) : (
                    <p>{item.stock} items in stock</p>
                )}

                <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                    {onAddToCart && (
                        <button disabled={item.stock === 0} onClick={onAddToCart}>
                            Add to Cart
                        </button>
                    )}

                    {onAddFavorite && !isFavorite && <button onClick={onAddFavorite}>♡ Favorite</button>}
                    {onRemoveFavorite && isFavorite && <button onClick={onRemoveFavorite}>♥ Remove</button>}
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
