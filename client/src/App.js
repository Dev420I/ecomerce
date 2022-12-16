import {useEffect} from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Home from "./scenes/home/Home";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import Checkout from "./scenes/checkout/Checkout";


const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  },[pathname])

  return null
}


function App() {
  return <div className="App">
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path= "/" element={<Home />} />
        <Route path= "item/:itemId"  element={<ItemDetails />} />
        <Route path= "checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>

  </div>

}

export default App;

