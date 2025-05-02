[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mNaxAqQD)


# 🌍 COUNTRY HUB - Learn About Countries

COUNTRY HUB is a modern country based website to explore and filter countries from around the world using the [REST Countries API](https://restcountries.com/). Users can search by country name, filter by region and language, and mark countries as favorites.



## Features of our system

- 🧑‍💻 User authentication (Register/Login).
- 🔍 Search by country name.
- 🌐 Filter by region.
- 🗣️ Filter by language.
- ⭐ Add/remove favorite countries.
- 🎨 Responsive and modern UI.

## Tech Stack we have used

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js for auth and favorites APIs
- **API:** [REST Countries v3](https://restcountries.com/)
- **Authentication:** JWT-web token
- **Frontend Testing:** Jest, React Testing Libraries
- **State Management:** React Context / useState

---

## How To Setup

### Prerequisities:

- Node.js.
- Git.
- MongoDB for DB Facility.

### Clone the repositoty:

```bash
git clone https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-ThisalFernando.git
cd af-2-ThisalFernando
```

### Install Dependencies:

```bash
npm install
```

### Start the application

- Frontend Server

```bash
npm start
```

- Backend Server

```bash
node index.js
```

The application will be available at http://localhost:3000/

---

## API Endpoints

- User Registration:

```http
  http://localhost:5000/api/auth/register
```

- Use Login:

```http
  http://localhost:5000/api/auth/login
```

- Add/Get country as favorite:

```http
  http://localhost:5000/api/favorites
```

- Remove country from favorites:

```http
  http://localhost:5000/api/favorites/:countryCode
```

- Fetch country list:

```http
  https://restcountries.com/v3.1/all
```

- Fetch country details:

```http
  https://restcountries.com/v3.1/alpha/:countryCode
```

- Search by country name:

```http
  https://restcountries.com/v3.1/name/{name}
```

- Search by country code:

```http
  https://restcountries.com/v3.1/alpha/{countryCode}
```

- Filter by region:

```http
  https://restcountries.com/v3.1/region/{region}
```

- Filter by language:

```http
  https://restcountries.com/v3.1/lang/{language}
```

---

## Running Tests

### Unit and Integration Testing

- Open the terminal and run the application.
- Next, open another terminal and enter the following command to run all test cases,

```bash
  npm test
```
- Enter the following command to run only one test for a one component,

```bash
  npm test -- src/tests/<test-file-name.test.js>
```
---

## Build For Production

```bash
  npm run build
```

This will generate optimized static files in the dist/ directory.

---

## Connect With Me

🧑‍🎓[Thisal Fernando - GitHub](https://github.com/ThisalFernando)





