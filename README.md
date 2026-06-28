# 🌦️ React Weather Dashboard

A modern weather dashboard built with React that allows users to search weather information for any city and automatically loads weather for the current location on startup.

![React](https://img.shields.io/badge/React-19-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![Status](https://img.shields.io/badge/Status-Completed-success)

---

## 🚀 Features

* 🔍 Search weather by city name
* 📍 Automatically fetch current location weather
* 🏙️ Fallback to Mumbai if location access is denied
* ⌨️ Press **Enter** to search
* ⏳ Loading indicators during API requests
* ❌ Graceful error handling
* ♿ Basic accessibility support with ARIA labels
* 🎨 Clean and responsive UI
* 🌡️ Weather condition mapping (Rain, Snow, Thunderstorm, etc.)
* 🔒 Prevents duplicate searches while loading

---

## 📸 Screenshots

### Home Screen

![Home Screen](./screenshots/home.png)

### Search Result

![Search Result](./screenshots/search-result.png)

### Error State

![Error State](./screenshots/error.png)

---

## 🛠️ Technologies Used

* React
* JavaScript (ES6+)
* CSS3
* Open-Meteo Weather API
* Open-Meteo Geocoding API
* Browser Geolocation API

---

## 📂 Project Structure

```text
src/
├── Weather.jsx
├── App.css
└── main.jsx
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/pradeepk1787/react-weather-dashboard.git
```

Move into the project directory:

```bash
cd react-weather-dashboard
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## 🧠 Concepts Practiced

This project helped practice:

* React state management with `useState`
* Side effects with `useEffect`
* Controlled components
* Async/await
* Fetch API
* Error handling
* Conditional rendering
* Geolocation APIs
* Data transformation
* Separation of concerns
* Single Responsibility Principle (SRP)
* Basic accessibility principles

---

## 🔮 Future Improvements

* Reverse geocoding to display actual city names instead of "Current Location"
* 🔍 City autocomplete suggestions while typing
* 5-day weather forecast
* Weather icons based on weather conditions
* Dark mode support
* Recently searched cities using Local Storage
* Custom `useWeather` hook
* TypeScript migration
* Unit and integration tests
* Request cancellation using `AbortController`

---

## 📜 License

This project is created for learning and portfolio purposes.


---

**Author:** Pradeep Kamble
**Learning Path:** React Mastery Journey 🚀
