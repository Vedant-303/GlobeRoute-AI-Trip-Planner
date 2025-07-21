import axios from "axios";

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const fetchUnsplashImages = async (query, perPage = 5) => {
  try {
    const res = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query,
        per_page: perPage,
        orientation: "landscape",
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    return res.data.results;
  } catch (error) {
    console.error("Failed to fetch Unsplash images:", error);
    return [];
  }
};
