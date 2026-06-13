import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneIcon from '@mui/icons-material/Phone';

const LIME = '#CCFF00';
const WHITE = 'rgba(255,255,255,0.9)';

const navItems = [
    { label: 'About Us',          path: '/about-us' },
    { label: 'Services',          path: '/services' },
    { label: 'Contact',           path: '/contact' },
    { label: 'Events',            path: '/events' },
    { label: 'Videos',            path: '/videos' },
];

interface AnchorTemporaryDrawerProps {
    onMenuStatusChange?: (value: boolean) => void;
}

export default function AnchorTemporaryDrawer({ onMenuStatusChange }: AnchorTemporaryDrawerProps) {
    const [state, setState] = React.useState({ right: true });
    const navigate = useNavigate();
    const location = useLocation();

    const toggleDrawer = (open: boolean) => {
        setState({ right: open });
        onMenuStatusChange?.(open);
    };

    const handleNavClick = (path: string) => {
        navigate(path);
        toggleDrawer(false);
    };

    return (
        <Drawer
            anchor="right"
            open={state.right}
            onClose={() => toggleDrawer(false)}
            PaperProps={{
                sx: {
                    width: '70vw',
                    height: '100vh',
                    backgroundColor: 'rgb(58 58 58 / 0.27)',
                    boxShadow: 'none',
                    display: 'flex',
                    flexDirection: 'row',
                    overflow: 'hidden',
                },
            }}
        >
            {/* Main content */}
            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'start',
                py: 15,
                pr: { xs: 6, md: 12 },
                pl: 4,
                position: 'relative',
            }}>

                {/* Close button */}
                <IconButton
                    onClick={() => toggleDrawer(false)}
                    sx={{
                        position: 'absolute',
                        top: 32,
                        color: WHITE,
                        transition: 'transform 0.3s ease-in-out',
                        right: 8,
                        '&:hover': {
                            transform: 'rotate(720deg)', // Rotates 90 degrees on hover
                            color: LIME,       // Changes color on hover
                        },
                        '&:active': {
                            transform: 'scale(0.9)',   // Slightly shrinks on click
                        }

                    }}
                >
                    <CloseIcon sx={{ fontSize: 32 }} />
                </IconButton>

                {/* Nav items */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5 }}>
                    {navItems.map(({ label, path }) => {
                        const isActive = location.pathname === path;
                        return (
                            <Box
                                key={path}
                                onClick={() => handleNavClick(path)}
                                sx={{ cursor: 'pointer', py: 1, userSelect: 'none' }}
                            >
                                <Typography sx={{
                                    fontFamily: '"Bebas Neue", sans-serif',
                                    fontSize: { xs: '1.5rem', md: '1.9rem' },
                                    letterSpacing: '0.12em',
                                    color: isActive ? LIME : WHITE,
                                    lineHeight: 1.15,
                                    transition: 'color 0.2s',
                                    '&:hover': { color: LIME },
                                }}>
                                    {label.toUpperCase()}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>
            </Box>

            {/* Right social rail */}
            <Box sx={{
                width: 64,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                borderLeft: '1px solid rgba(255,255,255,0.06)',
                py: 4,
            }}>
                {[
                    { icon: <InstagramIcon />, href: 'https://instagram.com' },
                    { icon: <FacebookIcon />,  href: 'https://facebook.com' },
                    { icon: <PhoneIcon />,     href: 'tel:+1234567890' },
                ].map(({ icon, href }, i) => (
                    <IconButton
                        key={i}
                        component="a"
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            width: 44, height: 44,
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '50%',
                            color: 'rgba(255,255,255,0.5)',
                            '&:hover': {
                                color: LIME,
                                borderColor: LIME,
                                backgroundColor: 'rgba(204,255,0,0.06)',
                            },
                        }}
                    >
                        {icon}
                    </IconButton>
                ))}
            </Box>
        </Drawer>
    );
}