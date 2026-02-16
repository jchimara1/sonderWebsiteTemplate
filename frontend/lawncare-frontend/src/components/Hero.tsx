// src/components/HeroSection.tsx
import { Container, Button } from "@mui/material";



export default function Hero() {
    return (
        <section className="hero" id="home" aria-label="Hero">
            <Container className="hero-container">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Fast &amp; Affordable
                        <br />
                        Junk Removal
                        <br />
                        in Austin, TX
                    </h1>

                    <p className="hero-sub">
                        Same-day service • Cleanouts
                        <br />

                        Hauling • Yard Debris
                    </p>

                    <div className="hero-actions">
                        <Button variant="contained" sx={{
                            background: 'linear-gradient(  180deg,\n' +
                                '  #6FA043 0%,\n' +
                                '  #4F7F2F 100%)',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                            fontWeight: 1000,

                            color: 'white'}} >
                            Get a Free Estimate
                        </Button>

                    </div>
                </div>

                <div className="hero-badge" aria-hidden="true">
                    <div className="hero-badge-inner">
                        <div className="hero-badge-stars">★ ★ ★</div>
                        <div className="hero-badge-text">
                            SAME-DAY
                            <br />
                            SERVICE
                        </div>
                        <div className="hero-badge-check">✓</div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
