import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
  },
  name: String,
  description: String,
  estimatedPrice: String,
  duration: String,
  group: String,
  people: String,
  budget: String,
  threatAnalysis: [String],
  currentweatherInfo: [String],
  location: {
    city: String,
    coordinates: [Number],
    openStreetMap: String,
  },
  howToReach: [String],
  accomodations: [String],
  localCuisine: [String],
  localTransport: [String],
  itinerary: [
    {
      day: Number,
      location: String,
      activities: [
        {
          time: String,
          description: String,
        },
      ],
    },
  ],
  EmergencyInfoHelplines: [
    {
      EmergencyHelplines: String,
      Embassy: String,
    },
  ],
  localLanguageSentence: [String],
}, { timestamps: true });

export const Trip = mongoose.model("Trip", tripSchema);
