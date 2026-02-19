// src/components/HeroSection.tsx
import { Container, Button } from "@mui/material";



export default function Hero() {
    return (
        <section className="hero" id="home" aria-label="Hero">
            <Container className="hero-container">
                <div className="hero-content">
                    <h1 className="hero-title">
                        PROFESSIONAL JUNK REMOVAL SERVICES DELIVERED TO YOUR DOORSTEP
                    </h1>

                    <p className="hero-sub">
                        brings fast, reliable junk removal directly to you—residential cleanouts, furniture and appliance removal, yard debris hauling, and full property cleanups handled with precision and care. Serving Austin, Texas and surrounding communities, we’re known for professional service, transparent pricing, and leaving every space cleaner than we found it.
                    </p>

                    <div className="hero-actions">
                        <Button
                            variant="contained"
                            disableElevation
                            sx={{
                                backgroundColor: "rgba(0, 0, 0, 0.65)",
                                backdropFilter: "blur(6px)",
                                WebkitBackdropFilter: "blur(6px)",
                                color: "#fff",
                                borderRadius: "14px",
                                px: 3,
                                py: 1.4,
                                fontWeight: 600,
                                fontSize: "14px",
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                "&:hover": {
                                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
                                },
                            }}
                        >
                            GET A QUOTE
                        </Button>

                    </div>
                </div>

            </Container>
        </section>
    );
}
