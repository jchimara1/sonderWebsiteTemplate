import * as React from "react";
import {
    AppBar,
    Toolbar,
    Box,
    Button,
    IconButton,
    Typography,
    Container,
    Menu,
    MenuItem,
    useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PhoneIcon from "@mui/icons-material/Phone";

// Put your logo in src/assets/logo.png
import logo from "../assets/512JunkRemoval.png";

const navItems = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
    const isMobile = useMediaQuery("(max-width:900px)");
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const openMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
    const closeMenu = () => setAnchorEl(null);

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                bgcolor: "transparent",
                height: 30,
                color: "black",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",

            }}
        >
            <Container maxWidth="lg">
                <Toolbar sx={{ minHeight: 80, display: "flex", gap: 2 }}>
                    {/* Left: Logo */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexShrink: 0 }}>
                        <Box
                            component="img"
                            src={logo}
                            alt="512 Junk Removal"
                            sx={{
                                mb:2,
                                height: {
                                    xs: 100, // Full width on extra-small screens
                                    sm: 100,
                                    md: 200, // 300px width on medium screens and up
                                }, display: "block" }}
                        />
                    </Box>

                    {/* Center: Links (desktop) */}
                    {!isMobile && (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 3,
                                flexGrow: 1,
                                justifyContent: "center",
                            }}
                        >
                            {navItems.map((item) => (
                                <Button
                                    key={item.label}
                                    href={item.href}
                                    sx={{
                                        color: "rgba(0,0,0,0.75)",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        "&:hover": { bgcolor: "rgba(0,0,0,0.06)" },
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Box>
                    )}

                    {/* Right: Phone + CTA */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, ml: "auto" }}>
                        {!isMobile && (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <PhoneIcon fontSize="small" />
                                <Typography sx={{ fontWeight: 500 }}>(512) 555-7890</Typography>
                            </Box>
                        )}

                        {/* Mobile menu button */}
                        {isMobile && (
                            <>
                                <IconButton size={'large'} sx={{width:100}} onClick={openMenu} aria-label="menu">
                                    <MenuIcon fontSize='large'/>
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
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
