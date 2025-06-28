Here's a suggested update for your `README.md` file based on the API documentation you've provided. This includes an overview, available endpoints, and how to use them.

---

# 🎬 Movie Booking System

A simple movie booking system that allows users to search for movies, view showtimes, and book seats in their preferred venue. Admins can manage movies, venues, and showtimes.

---

## 🔐 Authentication

Users and admins must register before logging in. Admin registration requires a secret key.

| Endpoint                | Method | Description              | Access     |
|-------------------------|--------|--------------------------|------------|
| `/api/auth/register`    | POST   | Register a normal user   | Public     |
| `/api/auth/register-admin` | POST | Register an admin        | Public (with secret) |
| `/api/auth/login`       | POST   | Log in and get JWT token | Public     |

> Note: The JWT token is required for all authenticated routes.

---

## 🎥 Admin Endpoints (Protected)

Admins can manage movies, venues, and shows.

| Endpoint               | Method | Description                   |
|------------------------|--------|-------------------------------|
| `/api/admin/movies`    | POST   | Add a new movie               |
| `/api/admin/venues`    | POST   | Add a new venue               |
| `/api/admin/shows`     | POST   | Create a new show             |

---

## 📅 User Endpoints (Protected)

Logged-in users can search for movies, book tickets, and view their history.

| Endpoint                          | Method | Description                              |
|-----------------------------------|--------|------------------------------------------|
| `/api/movies/search?city=Hyderabad` | GET  | Search movies and shows by city          |
| `/api/bookings/book`              | POST  | Book seats for a specific show           |
| `/api/bookings/history`           | GET   | View past bookings                       |

---

## 🛠️ How to Use

1. **Register** as a user or admin.
2. **Login** to receive a JWT token.
3. Use the token in the header (`Authorization: Bearer <token>`) to access protected endpoints.
4. Search movies, book tickets, or manage content depending on your role.

---

## 🧾 Example Requests

### Register User
```json
POST /api/auth/register
{
  "username": "john_doe",
  "password": "secure123"
}
```

### Register Admin (requires secret)
```json
POST /api/auth/register-admin
{
  "username": "admin1",
  "password": "adminpass",
  "secret": "admin_secret_key"
}
```

### Login
```json
POST /api/auth/login
{
  "username": "john_doe",
  "password": "secure123"
}
```

### Search Movies by City
```http
GET /api/movies/search?city=Hyderabad
Authorization: Bearer <your_token>
```

### Book Seats
```json
POST /api/bookings/book
Authorization: Bearer <your_token>
{
  "showId": "12345",
  "seats": ["A1", "A2"]
}
```

---

## ✅ Technologies Used

- Node.js / Express
- MongoDB / PostgreSQL (depending on setup)
- JWT for authentication
- RESTful API design

---

## 📁 Project Structure

```
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
└── README.md
```

---


![Screenshot 2025-06-28 at 3 58 15 PM](https://github.com/user-attachments/assets/26683bbd-ebc9-4044-a10a-293fa81c4976  )
![Screenshot 2025-06-28 at 3 58 04 PM](https://github.com/user-attachments/assets/41265bfc-5bd0-4951-bb55-002962094c3d  )
![Screenshot 2025-06-28 at 3 57 48 PM](https://github.com/user-attachments/assets/a2a51fec-651b-416c-b77c-2d6a017696a6  )
![Screenshot 2025-06-28 at 3 55 28 PM](https://github.com/user-attachments/assets/4cca5c3b-60f4-48c4-b081-a21228e5bdd3  )
![Screenshot 2025-06-28 at 3 55 13 PM](https://github.com/user-attachments/assets/714c7879-730c-4014-8822-95c9dba074f2  )
![Screenshot 2025-06-28 at 3 55 02 PM](https://github.com/user-attachments/assets/f4c8e352-a39d-44e1-9690-56e5ed99cedc  )


api's

| Method | Endpoint                            | Purpose                            | Who Can Access     |
| ------ | ----------------------------------- | ---------------------------------- | ------------------ |
| POST   | `/api/auth/register`                | Register normal user               | Public             |
| POST   | `/api/auth/register-admin`          | Register admin                     | Public with secret |
| POST   | `/api/auth/login`                   | Login user (get token)             | Public             |
| POST   | `/api/admin/movies`                 | Add a movie                        | Admin only         |
| POST   | `/api/admin/venues`                 | Add a venue                        | Admin only         |
| POST   | `/api/admin/shows`                  | Create show                        | Admin only         |
| POST   | `/api/bookings/book`                | Book movie seats                   | Logged-in user     |
| GET    | `/api/bookings/history`             | View booking history               | Logged-in user     |
| GET    | `/api/movies/search?city=Hyderabad` | Show movies and shows in that city | Logged-in user     |
update my read me file


Let me know if you'd like this formatted with badges, a getting started guide, or deployment instructions!
