import './App.css';
import Navbar from "./components/NavBar.tsx";

function HomePage() {



    return (
        <div style={{ overflowX: 'hidden', background: '#080808' }}>
            <Navbar />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Bebas+Neue&display=swap');

                @keyframes zoomInOut {
                    0%   { transform: translate(-50%, -50%) scale(1); }
                    50%  { transform: translate(-50%, -50%) scale(1.1); }
                    100% { transform: translate(-50%, -50%) scale(1); }
                }
                @keyframes fadeUp {
                    0%   { opacity: 0; transform: translateY(32px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                @keyframes shimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                @keyframes lineDraw {
                    0%   { width: 0; }
                    100% { width: 80px; }
                }

                .splash-headline {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(3.5rem, 10vw, 9rem);
                    letter-spacing: 0.18em;
                    line-height: 0.9;
                    background: linear-gradient(90deg, #fff 0%, #c9a96e 40%, #fff 60%, #c9a96e 100%);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: fadeUp 1.2s cubic-bezier(.16,1,.3,1) 0.3s both, shimmer 6s linear 1.5s infinite;
                }
                .splash-sub {
                    font-family: 'Cormorant Garamond', serif;
                    font-style: italic;
                    font-weight: 300;
                    font-size: clamp(0.95rem, 2vw, 1.25rem);
                    color: rgba(201,169,110,0.75);
                    letter-spacing: 0.35em;
                    text-transform: uppercase;
                    animation: fadeUp 1.2s cubic-bezier(.16,1,.3,1) 0.7s both;
                }
                .splash-cta {
                    font-family: 'Bebas Neue', sans-serif;
                    letter-spacing: 0.25em;
                    font-size: 0.85rem;
                    color: #080808;
                    background: #c9a96e;
                    border: none;
                    padding: 14px 40px;
                    cursor: pointer;
                    animation: fadeUp 1.2s cubic-bezier(.16,1,.3,1) 1.1s both;
                    transition: background 0.3s, color 0.3s;
                }
                .splash-cta:hover {
                    background: #fff;
                    color: #080808;
                }
                .scroll-hint {
                    position: absolute;
                    bottom: 32px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    animation: fadeUp 1s ease 1.6s both;
                }
                .scroll-hint span {
                    font-family: 'Cormorant Garamond', serif;
                    font-style: italic;
                    color: rgba(201,169,110,0.6);
                    font-size: 0.75rem;
                    letter-spacing: 0.3em;
                    text-transform: uppercase;
                }
                .scroll-line {
                    width: 1px;
                    height: 48px;
                    background: linear-gradient(to bottom, rgba(201,169,110,0.6), transparent);
                    animation: fadeUp 1s ease 2s both;
                }

                /* Content section */
                .content-section {
                    background: #080808;
                    padding: clamp(60px, 10vw, 120px) clamp(24px, 8vw, 140px);
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 80px;
                    align-items: start;
                }
                @media (max-width: 900px) {
                    .content-section { grid-template-columns: 1fr; gap: 48px; }
                }
                .content-label {
                    font-family: 'Cormorant Garamond', serif;
                    font-style: italic;
                    color: #c9a96e;
                    font-size: 0.8rem;
                    letter-spacing: 0.4em;
                    text-transform: uppercase;
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }
                .content-label::after {
                    content: '';
                    display: block;
                    height: 1px;
                    width: 48px;
                    background: rgba(201,169,110,0.4);
                }
                .content-heading {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(2.4rem, 5vw, 4rem);
                    color: #fff;
                    letter-spacing: 0.08em;
                    line-height: 1;
                    margin-bottom: 24px;
                }
                .content-body {
                    font-family: 'Cormorant Garamond', serif;
                    font-weight: 300;
                    font-size: clamp(1rem, 1.5vw, 1.15rem);
                    color: rgba(255,255,255,0.55);
                    line-height: 1.85;
                    letter-spacing: 0.02em;
                }
                .stat-block {
                    border-left: 1px solid rgba(201,169,110,0.25);
                    padding-left: 28px;
                    margin-top: 40px;
                }
                .stat-number {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 3.5rem;
                    color: #c9a96e;
                    letter-spacing: 0.05em;
                    line-height: 1;
                }
                .stat-label {
                    font-family: 'Cormorant Garamond', serif;
                    font-style: italic;
                    color: rgba(255,255,255,0.4);
                    font-size: 0.85rem;
                    letter-spacing: 0.25em;
                    text-transform: uppercase;
                }
                .divider {
                    width: 100%;
                    height: 1px;
                    background: linear-gradient(to right, transparent, rgba(201,169,110,0.3), transparent);
                    margin: 0 clamp(24px, 8vw, 140px);
                    width: calc(100% - clamp(48px, 16vw, 280px));
                }
            `}</style>

            {/* Splash */}
            <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
                <video
                    autoPlay muted loop playsInline
                    style={{
                        position: 'absolute',
                        top: '50%', left: '50%',
                        width: '110%', height: '110%',
                        objectFit: 'cover',
                        objectPosition: 'clamp(68%, 75vw, 100%) center',
                        animation: 'zoomInOut 8s ease-in-out infinite',
                    }}
                >
                    <source src="/SplashPageVideo.mp4" type="video/mp4" />
                </video>

                {/* Dark gradient overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, rgba(8,8,8,0.35) 0%, rgba(8,8,8,0.15) 40%, rgba(8,8,8,0.7) 100%)',
                }} />

                {/* Vignette */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(8,8,8,0.65) 100%)',
                }} />

                {/* Hero text */}
                <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', alignItems: 'center',
                    textAlign: 'center',
                    padding: '0 24px',
                    gap: '20px',
                }}>
                    <p className="splash-sub">Austin's Premier Nightlife Experience</p>
                    <h1 className="splash-headline">
                        After<br/>Dark
                    </h1>
                    <button className="splash-cta">Reserve Your Night</button>
                </div>

                {/* Scroll hint */}
                <div className="scroll-hint">
                    <span>Scroll</span>
                    <div className="scroll-line" />
                </div>
            </div>

            {/* Bottom fade into content */}
            <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: '220px',
                background: 'linear-gradient(to bottom, transparent, #080808)',
                zIndex: 2,
            }} />

            {/* Content section */}
            <div className="content-section">
                <div>
                    <div className="content-label">The Experience</div>
                    <h2 className="content-heading">Where the Night Becomes Legend</h2>
                    <p className="content-body">
                        Beneath the city lights, something electric stirs. We curate nights that blur the line between
                        exclusivity and abandon — world-class DJs, precision-crafted cocktails, and an atmosphere
                        engineered to make you forget everything outside these walls.
                    </p>
                    <div className="stat-block-row" style={{ display: 'flex', gap: '48px', marginTop: '40px' }}>
                        <div className="stat-block">
                            <div className="stat-number">Fri</div>
                            <div className="stat-label">& Saturday</div>
                        </div>
                        <div className="stat-block">
                            <div className="stat-number">10P</div>
                            <div className="stat-label">Doors Open</div>
                        </div>
                        <div className="stat-block">
                            <div className="stat-number">21+</div>
                            <div className="stat-label">Only</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="content-label">This Week</div>
                    <h2 className="content-heading">Upcoming Events</h2>
                    {[
                        { date: 'FRI 13', title: 'NOCHE OSCURA', sub: 'Latin House · DJ Valentina' },
                        { date: 'SAT 14', title: 'OBSIDIAN', sub: 'Tech House · Residents Only' },
                        { date: 'FRI 20', title: 'VELVET NOIR', sub: 'Hip-Hop & R&B · Live Set' },
                    ].map((event, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: '24px',
                            padding: '20px 0',
                            borderBottom: '1px solid rgba(201,169,110,0.12)',
                        }}>
                            <div style={{
                                fontFamily: "'Bebas Neue', sans-serif",
                                fontSize: '1rem',
                                color: '#c9a96e',
                                letterSpacing: '0.1em',
                                minWidth: '52px',
                            }}>{event.date}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{
                                    fontFamily: "'Bebas Neue', sans-serif",
                                    fontSize: '1.4rem',
                                    color: '#fff',
                                    letterSpacing: '0.12em',
                                }}>{event.title}</div>
                                <div style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                    fontStyle: 'italic',
                                    color: 'rgba(255,255,255,0.4)',
                                    fontSize: '0.85rem',
                                    letterSpacing: '0.15em',
                                }}>{event.sub}</div>
                            </div>
                            <div style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontStyle: 'italic',
                                color: 'rgba(201,169,110,0.6)',
                                fontSize: '0.75rem',
                                letterSpacing: '0.3em',
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                borderBottom: '1px solid rgba(201,169,110,0.3)',
                                paddingBottom: '2px',
                            }}>RSVP</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;