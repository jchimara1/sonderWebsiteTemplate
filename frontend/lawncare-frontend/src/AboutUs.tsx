import {useMediaQuery} from "@mui/material";
import Navbar from "./components/NavBar.tsx";


function AboutUs() {

    const isMobile = useMediaQuery("(max-width:900px)");
    return (
        <>


            {/* Buttons at top */}

            <Navbar />
            {isMobile ?
                (<><br/><br/><br/><br/></>) : (<><br/><br/><br/><br/><br/></>) }
 
            <br/><br/>










        </>
    );
}

export default AboutUs;