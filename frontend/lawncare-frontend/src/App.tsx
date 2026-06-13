
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./HomePage.tsx";
import ContactPage from "./components/ContactPage.tsx";
import ServicePage from "./components/ServicePage.tsx";
import AboutUs from "./AboutUs.tsx";
import Events from "./Events.tsx";
import Videos from "./Videos.tsx";




function App() {
    return (
        <BrowserRouter>


            {/* Routes */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicePage />} />
                <Route path="/contact" element={<ContactPage/>} />
                <Route path="/about-us" element={<AboutUs/>} />
                <Route path="/events" element={<Events />} />
                <Route path="/videos" element={<Videos/>} />

            </Routes>
        </BrowserRouter>
    );
}
export default App;