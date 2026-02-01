import axios from "axios";

const API_URL = "http://localhost:8080";

axios.defaults.baseURL = API_URL;

export const setAuthHeaders = (token) => {
    console.log("token: " + token);
    localStorage.setItem("token", token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const clearAuthHeaders = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common['Authorization'];
}

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

// security
export const register = (user) => {
    return axios.post(`${API_URL}/users/register`, user);
}

export const login = (credentials) => {
    return axios.post(`${API_URL}/authenticate`, credentials);
}

export const fetchCurrentUser = () => {
    return axios.get(`${API_URL}/users`, getAuthHeaders());
}

export const updateCurrentUser = (user) => {
    return axios.put(`${API_URL}/users`, user, getAuthHeaders());
}

export const deleteCurrentUser = () => {
    return axios.delete(`${API_URL}/users`, getAuthHeaders());
}

// admin users management

export const adminFetchAllUsers = () => {
    return axios.get(`${API_URL}/admin/all-users`, getAuthHeaders());
}

export const adminDeleteUser = (username) => {
    return axios.delete(`${API_URL}/admin/delete-user/${username}`, getAuthHeaders());
}


// items

export const getAllItems = () => {
    return axios.get("/items");
}

export const getItemById = (id) => {
    return axios.get(`/items/${id}`);
}

export const searchItems = (query) => {
    return axios.get("/items/search", { params: { q: query } });
}

// admin crud items

export const adminCreateItem = (item) => {
    return axios.post("/admin/items", item, getAuthHeaders());
}

export const adminUpdateItem = (id, item) => {
    return axios.put(`/admin/items/${id}`, item, getAuthHeaders());
}


export const adminDeleteItem = (itemId) => {
    return axios.delete(`/admin/items/${itemId}`, getAuthHeaders());
}

export const adminUpdateItemStock = (itemId, stock) => {
    return axios.put(`/admin/items/${itemId}/stock`, null, { params: { stock }, ...getAuthHeaders() });
}

// favories

export const getFavorites = () => {
    return axios.get("/favorites", getAuthHeaders());
}

export const addFavorite = (itemId) => {
    return axios.post(`/favorites/${itemId}`, null, getAuthHeaders());
}

export const removeFavorite = (itemId) => {
    return axios.delete(`/favorites/${itemId}`, getAuthHeaders());
}

// orders

export const getCartItems = () => {
    return axios.get("/orders/cart", getAuthHeaders());
}

export const addToCart = (itemId, quantity = 1) => {
    return axios.post("/orders/cart/items", null, { params: { itemId, quantity }, ...getAuthHeaders() });
}

export const removeFromCart = (itemId) => {
    return axios.delete(`/orders/cart/items/${itemId}`, getAuthHeaders());
}
export const checkout = (shippingAddress) => {
    return axios.post("/orders/checkout", null, { params: { shippingAddress }, ...getAuthHeaders() });
}

export const getOrders = () => {
    return axios.get("/orders", getAuthHeaders());
}

export const getOrderDetails = (orderId) => {
    return axios.get(`/orders/${orderId}`, getAuthHeaders());
}