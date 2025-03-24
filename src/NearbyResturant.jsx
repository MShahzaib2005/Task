import { useEffect, useState } from "react";
import axios from "axios";

const NearbyResturant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        console.log("Location:", lat, lng);

        try {
          const response = await axios.get("https://overpass-api.de/api/interpreter", {
            params: {
              data: `[out:json];node[amenity=restaurant](around:10000,${lat},${lng});out 50;`
            }
          });

          console.log("📡 API Response:", response.data);

          if (response.data.elements) {
            setRestaurants(response.data.elements);
          } else {
            setError("No restaurants found.");
          }
        } catch (err) {
          console.error("Error fetching restaurants:", err);
          setError("Failed to fetch restaurants");
        }
        setLoading(false);
      },
      (err) => {
        console.error(" Geolocation error:", err);
        setError("Failed to get location. Please enable location access.");
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (

<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
  <h2 className="text-2xl font-bold text-white bg-blue-600 px-6 py-3 rounded-md shadow-md">
    Nearby Restaurants
  </h2>
  <ul className="mt-4 w-full max-w-md bg-white shadow-lg rounded-lg p-4">
    {restaurants.length > 0 ? (
      restaurants.slice(0, 10).map((restaurant) => (
        <li
          key={restaurant.id}
          className="border-b last:border-b-0 border-gray-300 py-2 px-3 flex justify-between"
        >
          <div className="flex flex-col w-full">
            <strong className="text-lg font-semibold text-black break-words">
              {restaurant.tags.name || "Restaurant"}
            </strong>
            <span className="text-sm text-gray-500">
              ({restaurant.lat}, {restaurant.lon})
            </span>
          </div>
        </li>
      ))
    ) : (
      <p className="text-center text-gray-600">No restaurants found.</p>
    )}
  </ul>
</div>


  );
};

export default NearbyResturant;
