import React from 'react'
import '../styles/Order.css'

const Order = ({ order, isSelected, onClick }) => {
    if (!order) return null;

    const isTemp = order.status === "TEMP";

    return (
        <div
            className="Order"
            onClick={onClick}
            style={{
                cursor: "pointer",
                border: isSelected ? "2px solid #333" : "1px solid #eee",
                background: isTemp ? "#fff7e6" : "#fff"
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <strong>Order #{order.id}</strong>
                <span>{isTemp ? "TEMP (Pending)" : "CLOSE"}</span>
            </div>

            <div className="meta">
                <div>Total: ${order.totalPrice ?? 0}</div>
                <div>Date: {order.orderDate ? String(order.orderDate).replace("T", " ") : "-"}</div>
            </div>
        </div>
    )
}

export default Order
