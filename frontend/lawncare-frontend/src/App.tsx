
import './App.css'
import {Box, useMediaQuery} from "@mui/material";
import ContactForm from "./components/ContactForm.tsx";
import Navbar from "./components/NavBar.tsx";
import Hero from "./components/Hero.tsx";



function App() {

    const isMobile = useMediaQuery("(max-width:900px)");
    return (
        <>


                {/* Buttons at top */}

                <Navbar />
                {isMobile ?
                    (<><br/><br/><br/><br/></>) : (<><br/><br/><br/><br/><br/><br/><br/><br/></>) }

                <Hero/>

                {/* Rest of page content */}
                <Box sx={{ p: 4,  mt: 6}}>
                    <h2>Elevate Your Outdoors, Enhance Your Life</h2>
                   <p> From concept to completion, we create landscapes that inspire and endure.</p>
                </Box>

                <ContactForm/>







        </>
    );
}

export default App;