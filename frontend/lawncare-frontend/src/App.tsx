
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./HomePage.tsx";
import ContactForm from "./components/ContactForm.tsx";
import ServicePage from "./components/ServicePage.tsx";



function App() {
    return (
        <BrowserRouter>


            {/* Routes */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicePage />} />
                <Route path="/contact" element={<ContactForm />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;