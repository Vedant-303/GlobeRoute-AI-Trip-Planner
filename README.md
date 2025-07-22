# ✈️ GlobeRoute: AI Travel Generator

An intelligent web application that uses Gemini AI to generate personalized travel plans based on user inputs. From destinations and budgets to detailed itineraries, this app helps users plan trips effortlessly and intuitively.

---

# 💻 Preview

![](https://github.com/Vedant-303/GlobeRoute-AI-Trip-Planner/blob/main/GIF_Folder/AITripGenerator.gif?raw=true)

---

## 🚀 Features

### ✅ Authentication
- User Sign Up / Login / Logout
- Secure session handling using **cookies** and **JWT**

### 📝 Trip Planning
- Enter trip details:
  - Origin & Destination
  - From & To Dates
  - Number of People / Group Type
  - Budget

### 🤖 AI-Powered Trip Creation
- Uses **Gemini API** to generate:
  - Detailed **Itinerary**
  - **Weather Forecast**
  - **Travel Cost Estimate**
  - **Threat Analysis & Safety**
  - **How to Reach**
  - Suggested **Accommodation**
  - **Must-Try Local Cuisine**
  - **Local Transport Guide**
  - Emergency contacts and help lines
  - Phrases in the **Local Language**

### 📂 Trip Management
- View all **previously created trips**
- Detailed **trip view page**
- Each trip is stored and easily accessible

### 📥 PDF Download
- Download complete trip details as a **PDF**

### 📸 Dynamic Images
- Relevant destination images powered by **Unsplash API**

### 📦 UI/UX
- Beautiful, responsive design with **Toast notifications** for success/error feedback
- Responsive for all platforms

---

## ⚙️ Tech Stack

### Frontend:

- React.js
- Custom CSS
- html2pdf.js

### Backend:

- Node.js + Express
- MongoDB + Mongoose
- Gemini API (Generative AI)
- Unsplash API

---

## 🧪 How to Run

### 1. Clone the repository

```
git clone https://github.com/Vedant-303/GlobeRoute-AI-Trip-Planner.git
cd GlobeRoute-AI-Trip-Planner
```

### 2. Set up the backend

```
cd Backend
npm install
```

Create a .env file:

```
PORT=3000
MONGO_URI=your_mongodb_url
GEMINI_API_KEY=your_gemini_key
UNSPLASH_ACCESS_KEY=your_unsplash_key
```

```
npm run dev
```

### 3. Set up the frontend

```
cd ../Frontend
npm install
```


Create a .env file:

```
UNSPLASH_ACCESS_KEY=your_unsplash_key
```

```
npm run dev
```

---

## 🤝 Contributions

Contributions are welcome! Open an issue or create a PR if you’d like to suggest improvements or fix bugs.

---

## 👨‍💻 Author

Made with ❤️ by [Vedant-303](https://github.com/Vedant-303)

## 📬 Connect with Me

[Vedant Jeughale](https://www.linkedin.com/in/vedantjeughale/)

---

## ⭐ Star this Repository

If you liked the project or found it helpful, consider giving it a ⭐ on GitHub!
