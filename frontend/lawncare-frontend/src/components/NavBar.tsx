import {
    AppBar,
    Box,
    Button,
    Container, IconButton,
    Link, Menu, MenuItem,
    Toolbar, useMediaQuery,

} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import logo from "../assets/garbageTruckLogo.png";
import {useState} from "react";


export default function NavBar() {

    const isMobile = useMediaQuery("(max-width:900px)");
    const navItems = [
        { label: "Home", href: "#home" },
        { label: "Services", href: "services", dropdown: true },
        { label: "Contact", href: "contact" },
    ]

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const openMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
    const closeMenu = () => setAnchorEl(null);

    return (
        <AppBar
            position="absolute"
            elevation={0}
            sx={{
                bgcolor: "transparent",
                // dark, slightly glossy gradient like the detailing site
                backgroundImage:
                    "linear-gradient(180deg, rgba(35,35,35,0.98) 0%, rgba(20,20,20,0.98) 100%)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                // subtle top highlight line
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
        >
            <Toolbar
                disableGutters
                sx={{
                    minHeight: 88,
                    px: { xs: 2, md: 3 },
                }}
            >
                <Container
                    maxWidth="lg"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                    }}
                >
                    {/* LEFT: LOGO */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        {/* replace with your logo image if you have one */}
                        <Box
                            component="img"
                            src={logo}
                            alt="Logo"
                            sx={{ height: 100, width: "auto" }}
                        />
                    </Box>

                    {/* CENTER: NAV */}

                    { !isMobile ?
                    <Box
                        sx={{
                            display: { xs: "none", md: "flex" },
                            alignItems: "center",
                            justifyContent: "center",
                            flex: 1,
                            gap: 3,
                        }}
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href="#"
                                underline="none"
                                sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                    color: "rgba(255,255,255,0.92)",
                                    fontSize: 13,
                                    fontWeight: 500,
                                    letterSpacing: "0.10em",
                                    textTransform: "uppercase",
                                    py: 1,
                                    transition: "color 150ms ease",
                                    "&:hover": { color: "#fff" },
                                }}
                            >
                                {item.label}
                                {item.dropdown ? (
                                    <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18, opacity: 0.9 }} />
                                ) : null}
                            </Link>
                        ))}
                    </Box> :
                        (
                        <>
                        <IconButton size={'large'} sx={{width:100}} onClick={openMenu} aria-label="menu">
                    <MenuIcon sx={{color: 'white'}} fontSize='large'/>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={closeMenu}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    {navItems.map((item) => (
                        <MenuItem key={item.label} onClick={closeMenu} component="a" href={item.href}>
                            {item.label}
                        </MenuItem>
                    ))}
                    <MenuItem onClick={closeMenu} component="a" href="tel:+15125557890">
                        Call (512) 555-7890
                    </MenuItem>
                </Menu>
            </>

                        )   }


                    {/* RIGHT: CTA */}
                    {
                        isMobile ?
                            null :
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                <Button
                                    variant="contained"
                                    disableElevation
                                    sx={{
                                        backgroundColor: "rgba(244,221,95,0.65)",
                                        color: "#1a1a1a",
                                        borderRadius: "14px",
                                        px: 3,
                                        py: 1.4,
                                        fontWeight: 700,
                                        fontSize: 13,
                                        letterSpacing: "0.10em",
                                        textTransform: "uppercase",
                                        boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
                                        "&:hover": {
                                            backgroundColor: "#dcdcdc",
                                            boxShadow: "0 10px 24px rgba(0,0,0,0.32)",
                                        },
                                    }}
                                >
                                    GET A QUOTE
                                </Button>
                            </Box>
                    }
                </Container>
            </Toolbar>
        </AppBar>
    );
}
