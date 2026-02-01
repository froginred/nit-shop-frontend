import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Admin.css'
import UserContext from '../contexts/UserContext'
import AdminAddItemForm from '../components/AdminAddItemForm'
import { getAllItems, adminCreateItem, adminUpdateItem, adminDeleteItem, adminUpdateItemStock } from '../services/ApiService'

const Admin = () => {
    const { currentUser, isRequestToGetCurrentUserDone } = useContext(UserContext);
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [editingItem, setEditingItem] = useState(null);
    const [stockEdits, setStockEdits] = useState({}); // { [itemId]: value }

    useEffect(() => {
        if (!isRequestToGetCurrentUserDone) return;

        if (!currentUser) {
            navigate("/login");
            return;
        }

        if (currentUser.role !== "ADMIN") {
            navigate("/");
            return;
        }

        loadItems();
    }, [isRequestToGetCurrentUserDone, currentUser]);

    const loadItems = () => {
        setIsLoading(true);
        setMessage("");

        getAllItems()
            .then((res) => {
                const data = res.data || [];
                setItems(data);

                const map = {};
                data.forEach((i) => { map[i.id] = i.stock; });
                setStockEdits(map);
            })
            .catch(() => {
                setMessage("Failed to load items.");
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const handleCreate = (payload) => {
        setMessage("");

        adminCreateItem(payload)
            .then(() => {
                setMessage("Item created.");
                loadItems();
            })
            .catch((err) => {
                const serverMsg = err?.response?.data;
                setMessage(serverMsg || "Failed to create item.");
            })
    }

    const handleUpdate = (payload) => {
        if (!editingItem) return;
        setMessage("");

        adminUpdateItem(editingItem.id, payload)
            .then(() => {
                setMessage("Item updated.");
                setEditingItem(null);
                loadItems();
            })
            .catch((err) => {
                const serverMsg = err?.response?.data;
                setMessage(serverMsg || "Failed to update item.");
            })
    }

    const handleDelete = (itemId) => {
        setMessage("");

        const ok = window.confirm("Delete this item?");
        if (!ok) return;

        adminDeleteItem(itemId)
            .then(() => {
                setMessage("Item deleted.");
                loadItems();
            })
            .catch((err) => {
                const serverMsg = err?.response?.data;
                setMessage(serverMsg || "Failed to delete item.");
            })
    }

    const handleStockChange = (itemId, value) => {
        setStockEdits({ ...stockEdits, [itemId]: value });
    }

    const handleSaveStock = (itemId) => {
        setMessage("");

        const newStock = Number(stockEdits[itemId]);
        if (Number.isNaN(newStock) || newStock < 0) {
            setMessage("Stock must be 0 or more.");
            return;
        }

        adminUpdateItemStock(itemId, newStock)
            .then(() => {
                setMessage("Stock updated.");
                loadItems();
            })
            .catch((err) => {
                const serverMsg = err?.response?.data;
                setMessage(serverMsg || "Failed to update stock.");
            })
    }

    return (
        <>

            <div className='admin-page'>
                <h1>Admin - Items</h1>

                {message && <div className='admin-message'>{message}</div>}
                {isLoading && <div className='admin-message'>Loading...</div>}

                <div className='admin-grid'>
                    <div className='admin-left'>
                        <AdminAddItemForm
                            initialItem={editingItem}
                            onSubmit={editingItem ? handleUpdate : handleCreate}
                            onCancel={editingItem ? () => setEditingItem(null) : null}
                        />
                    </div>

                    <div className='admin-right'>
                        <h3>Items List</h3>

                        <table className='admin-table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>${item.price}</td>
                                        <td>
                                            <div className='stock-cell'>
                                                <input
                                                    type="number"
                                                    value={stockEdits[item.id] ?? item.stock}
                                                    onChange={(e) => handleStockChange(item.id, e.target.value)}
                                                />
                                                <button onClick={() => handleSaveStock(item.id)}>Save</button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='row-actions'>
                                                <button onClick={() => setEditingItem(item)}>Edit</button>
                                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin
