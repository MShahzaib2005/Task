import { useState } from 'react'
import './App.css'
import NearbyResturant from './NearbyResturant'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 px-2 shadow-lg">
  <h1 className="text-4xl font-extrabold text-center tracking-wide drop-shadow-lg">
    Find Nearby Restaurants 🍽️
  </h1>
  <p className="text-center text-lg mt-2 opacity-90">
    Discover the best places to eat near you!
  </p>
  <div className="mt-8 flex justify-center w-full max-w-6xl mx-auto">
    <div className="w-full lg:w-8/12">
      <NearbyResturant />
    </div>
  </div>
</div>


    </>
  )
}

export default App
