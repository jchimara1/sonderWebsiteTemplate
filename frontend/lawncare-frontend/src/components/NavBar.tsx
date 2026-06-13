import {
    AppBar,Box,
} from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';


import {useState} from "react";
import AnchorTemporaryDrawer from "./AnchorTemporaryDrawer.tsx";


export default function NavBar() {

    // const isMobile = useMediaQuery("(max-width:900px)");


    const [menuStatus, setMenuStatus] = useState<boolean>(true)

    const openMenu = () => {
        setMenuStatus(false)

    }

    const closeMenu =() =>{
        setMenuStatus(true)
    }

    return (
        <AppBar
            position="absolute"
            elevation={0}
            color='transparent'
        >
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                { menuStatus ?(
                <MenuIcon  sx={{
                    color: 'white',
                    width: 50,
                    minHeight: 100,        // S
                    padding: .5,
                    filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.15))',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.05)',
                        filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.25))',
                    }
                }}
                onClick={openMenu}/> )

                : null

                }
            </Box>

            {
              !menuStatus?
                  ( <div onClick={closeMenu}><AnchorTemporaryDrawer   /></div>) : null
            }

        </AppBar>
    );
}
