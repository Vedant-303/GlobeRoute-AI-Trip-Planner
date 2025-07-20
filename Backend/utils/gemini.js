import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateTrip = async ({
  fromDate,
  toDate,
  origin,
  destination,
  budget,
  group,
  people,
}) => {
  const prompt = `You are an API that returns only valid JSON.

Generate a travel itinerary from ${origin} to ${destination} for dates ${fromDate} to ${toDate}. 
User Info:
- Budget: ${budget}
- Group Type: ${group}

Return ONLY valid, clean JSON with this exact structure (no explanations, no markdown):

{
  "name": "Trip Title",
  "description": "Brief description",
  "estimatedPrice": "Rs. xxxx give just the estimated price eg. Rs. 3,50,000 - Rs. 4,50,000",
  "duration": "Number of days",
  "group": "${group}",
  "people": "${people}"
  "budget": "${budget}",
  "threatAnalysis": [
    "Safety concern 1",
    "Safety concern 2"
  ],
  "currentweatherInfo": [
    "☀️ Season: temperature range in Celsius"
  ],
  "location": {
    "city": "City Name",
    "coordinates": [latitude, longitude],
    "openStreetMap": "https://..."
  },
  "howToReach": [
    "First Mode of transport",
    "Second Mode of transport"
    ...
  ],
  "accomodations": [
    "accomodation recommendation 1",
    "accomodation recommendation 1",
    "accomodation recommendation 1",
  ],
  "localCuisine": [
    "Must try food"
    ...
  ],
  "localTransport": [
    "local transport options",
    ...
  ],
  "itinerary": [
    {
      "day": 1,
      "location": "City/Region Name",
      "activities": [
        { "time": "Morning", "description": "🏰 Visit a castle"},
        { "time": "Afternoon", "description": "🖼️ Visit museum"},
        { "time": "Evening", "description": "🍷 Dinner at rooftop"}
      ]
    }
  ],
  "EmergencyInfoHelplines": [
    { "EmergencyHelplines": "Local emergency numbers (police, ambulance, fire)" }
     if traveling out of nation
    { "Embassy": "Nearest embassy/consulate of traveler's country" }
  ],
  "localLanguageSentence": [
    "provide some sentences in local language that are commonly used by travelers keep the english sentences first then in local language"
    "Hello"
    "Thank you"
    "Welcome"
    "Sorry"
    "Plase"
    "How do I get to this place?"
    "Where is the nearest bus or train station?"
    "What local food do you recommend?"
    "How much does this cost?"
    "Where is the nearest hospital or clinic?"
    "What are some must-visit places nearby?"
    "Does this dish veg or non veg?"
    "How much does a taxi to [place] cost?"
    "Are there any customs or rules I should know?"
  ],
}`;

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const json = JSON.parse(text);
    console.log(json);
    return json;
  } catch (e) {
    throw new Error("Failed to parse Gemini response as JSON");
  }
};
