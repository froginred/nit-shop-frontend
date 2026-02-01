import React, { useEffect, useState } from 'react'
import '../styles/AdminAddItemForm.css'

const AdminAddItemForm = ({ initialItem, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        item_category: "GENERAL",
        title: "",
        description: "",
        image_url: "",
        price: "",
        stock: ""
    });

    useEffect(() => {
        if (initialItem) {
            setFormData({
                item_category: initialItem.item_category || "GENERAL",
                title: initialItem.title || "",
                description: initialItem.description || "",
                image_url: initialItem.image_url || "",
                price: initialItem.price ?? "",
                stock: initialItem.stock ?? ""
            });
        }
    }, [initialItem]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!onSubmit) return;

        const payload = {
            item_category: formData.item_category,
            title: formData.title.trim(),
            description: formData.description.trim() || null,
            image_url: formData.image_url.trim(),
            price: Number(formData.price),
            stock: Number(formData.stock)
        };

        onSubmit(payload);
    }

    return (
        <div className='admin-form-wrapper'>
            <h3>{initialItem ? "Edit Item" : "Add New Item"}</h3>

            <form className='admin-form' onSubmit={handleSubmit}>
                <label>Category</label>
                <select name="item_category" value={formData.item_category} onChange={handleChange}>
                    <option value="GENERAL">GENERAL</option>
                    <option value="ELECTRONICS">ELECTRONICS</option>
                    <option value="HOME">HOME</option>
                    <option value="FASHION">FASHION</option>
                    <option value="FOOD">FOOD</option>
                </select>

                <label>Title</label>
                <input name="title" value={formData.title} onChange={handleChange} required />

                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} />

                <label>Image URL</label>
                <input name="image_url" value={formData.image_url} onChange={handleChange} />

                <label>Price (USD)</label>
                <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />

                <label>Stock</label>
                <input name="stock" type="number" value={formData.stock} onChange={handleChange} required />

                <div className='admin-form-buttons'>
                    <button type="submit">{initialItem ? "Update" : "Create"}</button>
                    {onCancel && (
                        <button type="button" onClick={onCancel}>Cancel</button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default AdminAddItemForm
