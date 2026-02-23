
import './App.css'
import { useMediaQuery} from "@mui/material";
import Navbar from "./components/NavBar.tsx";
import Hero from "./components/Hero.tsx";
import HeroTwo from "./components/HeroTwo.tsx";



function App() {

    const isMobile = useMediaQuery("(max-width:900px)");
    return (
        <>


                {/* Buttons at top */}

                <Navbar />
                {isMobile ?
                    (<><br/><br/><br/><br/></>) : (<><br/><br/><br/><br/><br/></>) }

                <Hero/>
<br/><br/>
            <HeroTwo/>










        </>
    );
}

export default App;