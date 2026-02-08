
import './App.css'
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import ContactForm from "./components/ContactForm.tsx";


function App() {
    return (
        <>

            <Box sx={{ minHeight: "100vh", minWidth: 'auto'}}>
                {/* Buttons at top */}

                <AppBar
                    position="fixed"
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', // semi-transparent
                        backdropFilter: 'blur(10px)',               // blur effect
                        WebkitBackdropFilter: 'blur(10px)',
                        zIndex: (theme: any) => theme.zIndex.drawer + 1,
                        boxShadow: 'none',
                        border: 'none',

                    }}
                >


                    <Toolbar>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', height: 80 , alignItems: 'center'}}>
                            <Button
                                color="inherit"
                                sx={{
                                    textTransform: "none",       // Keep text as typed
                                    alignItems: "center",        // Vertically center icon + text
                                }}
                            >
                                <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        Sonder
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                                        Lawn & Landscape
                                    </Typography>
                                </Box>
                            </Button>
                            <Typography>xxx-xxx-xxxx</Typography>
                        </Box>
                    </Toolbar>


                </AppBar>

                {/* Rest of page content */}
                <Box sx={{ p: 4,  mt: 6}}>
                    <h2>Elevate Your Outdoors, Enhance Your Life</h2>
                   <p> From concept to completion, we create landscapes that inspire and endure.</p>
                </Box>

                <ContactForm/>



            </Box>



        </>
    );
}

export default App;