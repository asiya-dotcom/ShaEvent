# Sha Events

A full-stack event management website that allows users to browse event services (weddings, birthdays, corporate events) and submit booking inquiries. Built to practice front-end development and later extended with a backend to persist booking data.

## Features

- Responsive multi-page website (Home, Services, Gallery, Team, Testimonials, Contact)
- Booking inquiry form with email notifications via EmailJS
- Backend API to store booking submissions in a MySQL database

## Tech Stack

**Frontend:** HTML, CSS, JavaScript
**Backend:** Node.js, Express
**Database:** MySQL
**Email:** EmailJS

## Project Structure
ShaEvent/
├── mini project/     # Frontend (HTML, CSS, JS)
└── backend/          # Express server + MySQL API
## Running the Backend Locally

1. Navigate to the backend folder:
```bash
   cd backend
   npm install
```

2. Create a `.env` file in `backend/` with:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=sha_events
PORT=5000
3. Create the database and table in MySQL:
```sql
   CREATE DATABASE sha_events;
   USE sha_events;
   CREATE TABLE bookings (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     email VARCHAR(100) NOT NULL,
     phone VARCHAR(20),
     event_type VARCHAR(50),
     message TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
```

4. Start the server:
```bash
   node server.js
```

5. Open `mini project/contact.html` in your browser — submitting the form will save the booking to the database and send an email notification.

## API Endpoints

- `POST /api/bookings` — save a new booking
- `GET /api/bookings` — retrieve all bookings

## What I Learned

This project helped me practice full-stack development — from building a responsive front-end to designing a REST API and connecting it to a relational database. It also gave me hands-on experience with debugging real-world environment setup issues (MySQL service conflicts, port management).