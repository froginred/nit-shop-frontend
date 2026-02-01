
# Final Project – Shopping Website (Frontend - nit - shop)

## Project Overview

This repository contains the **frontend side** of the **Nit Shop** project.

Nit Shop is a full end-to-end shopping website that allows users to browse items, search products, manage favorites, and place orders using a temporary cart flow.
This frontend application is built using **React** and communicates with the backend service via REST APIs.

The project follows the structure and principles learned in the course, including:

* Component-based architecture
* State management with React hooks
* Client-side routing
* Separation between UI, logic, and API calls

---

## Main Features

### Public Features

* View all available items in the store
* Search items by name using the navigation bar
* View item price and stock availability
* View “out of stock” indication when stock is 0

### Authentication

* User login and registration
* JWT-based authentication (token stored in localStorage)
* Automatic login state restoration on refresh

### Favorites

* Add items to a personal favorites list
* Remove items from favorites
* Favorites are persisted per user
* Separate favorites page with dedicated search (“Search in favorites”)

### Orders & Cart

* Add items to a temporary cart
* Only one TEMP order per user
* Remove items from cart
* Checkout process that closes the order
* Orders page displaying TEMP and CLOSED orders

### Admin (ADMIN role only)

* View all users
* Create, update, and delete items
* Manage item stock

---

## Technology Stack

### Frontend

* **React**
* **JavaScript (ES6+)**
* **React Router**
* **Axios**
* **Material UI Icons**
* **CSS (per component/page)**

### Backend (connected service)

* Java
* Spring Boot
* JDBC
* H2 Database
* JWT Authentication

---

## Project Structure

```
src/
│
├── components/        # Reusable UI components (Navbar, ItemCard, SearchBar, etc.)
├── pages/             # Application pages (Home, Favorites, Orders, Profile, Admin)
├── services/          # API service (Axios requests)
├── contexts/          # User authentication context
├── styles/            # CSS files per component/page
├── App.js             # Routing configuration
└── index.js           # Application entry point
```

Each component or page has a dedicated CSS file to keep styling scoped and readable.

---

## Search Behavior

* The search bar is located in the **navigation bar**
* Search behavior depends on the current page:

  * **Home / other pages** → searches the entire store
  * **Favorites page** → searches only favorite items
* Pressing **Enter** or clicking the search icon triggers the search
* Clear icon resets the search results

---

## Running the Project

### Prerequisites

* Node.js (v16 or later recommended)
* Backend server running on `http://localhost:8080`

### Installation

```bash
npm install
```

### Run the frontend

```bash
npm start
```

The application will be available at:

```
http://localhost:3000
```

---

## Backend Connection

The frontend communicates with the backend using REST APIs.

* Base URL: `http://localhost:8080`
* Authentication uses JWT tokens
* Axios is configured with a default base URL
* Authorization header is attached automatically after login

---

## Notes & Assumptions

* Business logic validation is handled mainly by the backend
