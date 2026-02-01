import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Orders.css'
import UserContext from '../contexts/UserContext'
import NavBar from '../components/NavBar'
import Order from '../components/Order'
import { addToCart, checkout, getCartItems, getItemById, getOrderDetails, getOrders, removeFromCart } from '../services/ApiService'

const Orders = () => {
    const { currentUser, isRequestToGetCurrentUserDone } = useContext(UserContext);
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [cartItems, setCartItems] = useState([]);
    const [itemsById, setItemsById] = useState({}); // { [itemId]: item }

    const [orderDetails, setOrderDetails] = useState(null); // for CLOSE
    const [shippingAddress, setShippingAddress] = useState("");

    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isRequestToGetCurrentUserDone) return;

        if (!currentUser) {
            navigate("/login");
            return;
        }

        setShippingAddress(currentUser.address || "");
        loadOrders();
    }, [isRequestToGetCurrentUserDone, currentUser]);

    const tempOrder = useMemo(() => {
        return (orders || []).find((o) => o.status === "TEMP") || null;
    }, [orders]);

    const loadOrders = () => {
        setIsLoading(true);
        setMessage("");

        getOrders()
            .then((res) => {
                const data = res.data || [];
                setOrders(data);

                // auto-select TEMP if exists
                const t = data.find((o) => o.status === "TEMP");
                if (t) {
                    setSelectedOrder(t);
                    loadCart(); // show cart in right panel
                } else {
                    setSelectedOrder(null);
                    setCartItems([]);
                    setOrderDetails(null);
                }
            })
            .catch(() => {
                setMessage("Failed to load orders.");
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const loadCart = async () => {
        setIsLoading(true);
        setMessage("");
        setOrderDetails(null);

        try {
            const { data } = await getCartItems();
            const cart = data || [];
            setCartItems(cart);

            // load item details for display (title/photo)
            const uniqueIds = [...new Set(cart.map((ci) => ci.itemId))];
            const responses = await Promise.all(uniqueIds.map((id) => getItemById(id)));

            const map = {};
            responses.forEach((r) => {
                if (r && r.data) map[r.data.id] = r.data;
            });
            setItemsById(map);

            if (cart.length === 0) {
                setMessage("Your cart is empty.");
            }
        } catch (err) {
            setMessage("Failed to load cart.");
        } finally {
            setIsLoading(false);
        }
    }

    const loadClosedOrderDetails = (orderId) => {
        setIsLoading(true);
        setMessage("");
        setCartItems([]);

        getOrderDetails(orderId)
            .then(async (res) => {
                const details = res.data;
                setOrderDetails(details);

                // load items for display
                const ids = [...new Set((details?.items || []).map((i) => i.itemId))];
                const responses = await Promise.all(ids.map((id) => getItemById(id)));

                const map = {};
                responses.forEach((r) => {
                    if (r && r.data) map[r.data.id] = r.data;
                });
                setItemsById(map);
            })
            .catch((err) => {
                const serverMsg = err?.response?.data;
                setMessage(serverMsg || "Failed to load order details.");
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const handleSelectOrder = (order) => {
        setSelectedOrder(order);
        setMessage("");

        if (order.status === "TEMP") {
            loadCart();
        } else {
            loadClosedOrderDetails(order.id);
        }
    }

    const cartTotal = useMemo(() => {
        return (cartItems || []).reduce((sum, ci) => {
            const price = Number(ci.price || 0);
            const qty = Number(ci.quantity || 0);
            return sum + price * qty;
        }, 0);
    }, [cartItems]);

    const handleAddOne = (itemId) => {
        setMessage("");

        addToCart(itemId, 1)
            .then(() => {
                loadCart();
                loadOrders();
            })
            .catch((err) => {
                const serverMsg = err?.response?.data;
                setMessage(serverMsg || "Failed to add item.");
            })
    }

    const handleRemoveItem = (itemId) => {
        setMessage("");

        removeFromCart(itemId)
            .then(() => {
                // if cart became empty, backend deletes TEMP order
                loadOrders();
                loadCart();
            })
            .catch((err) => {
                const serverMsg = err?.response?.data;
                setMessage(serverMsg || "Failed to remove item.");
            })
    }

    const handleCheckout = () => {
        setMessage("");

        if (!shippingAddress.trim()) {
            setMessage("Shipping address is required.");
            return;
        }

        checkout(shippingAddress)
            .then(() => {
                setMessage("Payment successful. Order is now CLOSED.");
                loadOrders();
            })
            .catch((err) => {
                const serverMsg = err?.response?.data;
                setMessage(serverMsg || "Checkout failed.");
            })
    }

    return (
        <>

            <div className="Orders">
                <h1>My Orders</h1>

                {message && <div style={{ marginBottom: 12 }}>{message}</div>}
                {isLoading && <div style={{ marginBottom: 12 }}>Loading...</div>}

                <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 16, alignItems: "start" }}>
                    {/* left: orders list */}
                    <div className="orders-list">
                        {(orders || []).map((o) => (
                            <Order
                                key={o.id}
                                order={o}
                                isSelected={selectedOrder && selectedOrder.id === o.id}
                                onClick={() => handleSelectOrder(o)}
                            />
                        ))}

                        {(orders || []).length === 0 && !isLoading && (
                            <div>No orders yet.</div>
                        )}
                    </div>

                    {/* right: TEMP cart OR CLOSE details */}
                    <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 12, background: "#fff" }}>
                        {!selectedOrder && (
                            <div>Select an order to view details.</div>
                        )}

                        {selectedOrder && selectedOrder.status === "TEMP" && (
                            <div>
                                <h2 style={{ marginTop: 0 }}>Order Process (TEMP)</h2>

                                <div style={{ marginBottom: 10 }}>
                                    <label style={{ display: "block", marginBottom: 6 }}>Shipping Address</label>
                                    <input
                                        value={shippingAddress}
                                        onChange={(e) => setShippingAddress(e.target.value)}
                                        style={{ width: "100%", padding: 8, border: "1px solid #ddd", borderRadius: 6 }}
                                        placeholder="Country, City, Street..."
                                    />
                                </div>

                                <div style={{ marginBottom: 10 }}>
                                    <strong>Total:</strong> ${cartTotal.toFixed(2)}
                                </div>

                                <div style={{ display: "grid", gap: 10 }}>
                                    {(cartItems || []).map((ci) => {
                                        const item = itemsById[ci.itemId];
                                        return (
                                            <div key={ci.id} style={{ border: "1px solid #eee", borderRadius: 8, padding: 10 }}>
                                                <div style={{ display: "flex", gap: 12 }}>
                                                    {item?.image_url && (
                                                        <img
                                                            src={item.image_url}
                                                            alt={item.title}
                                                            style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 6 }}
                                                            onError={(e) => (e.target.style.display = "none")}
                                                        />
                                                    )}

                                                    <div style={{ flex: 1 }}>
                                                        <div><strong>{item?.title || `Item #${ci.itemId}`}</strong></div>
                                                        <div>Price: ${ci.price}</div>
                                                        <div>Quantity: {ci.quantity}</div>

                                                        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                                                            <button onClick={() => handleAddOne(ci.itemId)}>+ Add 1</button>
                                                            <button onClick={() => handleRemoveItem(ci.itemId)}>Remove item</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}

                                    {(cartItems || []).length === 0 && !isLoading && (
                                        <div>Your cart is empty.</div>
                                    )}
                                </div>

                                <div style={{ marginTop: 12 }}>
                                    <button onClick={handleCheckout} disabled={(cartItems || []).length === 0}>
                                        Pay & Close Order
                                    </button>
                                </div>
                            </div>
                        )}

                        {selectedOrder && selectedOrder.status === "CLOSE" && (
                            <div>
                                <h2 style={{ marginTop: 0 }}>Order Details (CLOSE)</h2>

                                <div style={{ marginBottom: 10 }}>
                                    <div><strong>Order ID:</strong> {orderDetails?.order?.id || selectedOrder.id}</div>
                                    <div><strong>Total:</strong> ${orderDetails?.order?.totalPrice ?? selectedOrder.totalPrice ?? 0}</div>
                                    <div><strong>Shipping:</strong> {orderDetails?.order?.shippingAddress || "-"}</div>
                                </div>

                                <div style={{ display: "grid", gap: 10 }}>
                                    {(orderDetails?.items || []).map((oi) => {
                                        const item = itemsById[oi.itemId];
                                        return (
                                            <div key={oi.id} style={{ border: "1px solid #eee", borderRadius: 8, padding: 10 }}>
                                                <div style={{ display: "flex", gap: 12 }}>
                                                    {item?.image_url && (
                                                        <img
                                                            src={item.image_url}
                                                            alt={item.title}
                                                            style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 6 }}
                                                            onError={(e) => (e.target.style.display = "none")}
                                                        />
                                                    )}

                                                    <div>
                                                        <div><strong>{item?.title || `Item #${oi.itemId}`}</strong></div>
                                                        <div>Price: ${oi.price}</div>
                                                        <div>Quantity: {oi.quantity}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Orders
