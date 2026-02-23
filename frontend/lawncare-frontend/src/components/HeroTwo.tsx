import { Paper, Button, Box, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useEffect, useMemo, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type Service = { Name: string; Description: string; Image: string };

export default function HeroTwo() {
    const fallbackServices: Service[] = useMemo(
        () => [

            {
            Name: "Lawn Mowing & Edging",
            Description: "Mowing, trimming, and edging with weekly/biweekly options.",
            Image: "https://pub-0f607f44220f49b387e9b1b28259c7a0.r2.dev/lawnEdging.jpg",
        },
            {
                Name: "Residential Junk Removal",
                Description:
                    "Full-service removal of unwanted household items including furniture and clutter.",
                Image: "https://pub-0f607f44220f49b387e9b1b28259c7a0.r2.dev/lance-grandahl-VSXT9AV19Is-unsplash.jpg",
            },
            {
                Name: "Garage & Property Cleanouts",
                Description:
                    "Complete cleanouts for garages, rentals, and estate transitions.",
                Image:
                    "https://pub-0f607f44220f49b387e9b1b28259c7a0.r2.dev/point3d-commercial-imaging-ltd-SP4oH94qOCU-unsplash.jpg",
            },
        ],
        []
    );

    const [services, setServices] = useState<Service[]>(fallbackServices);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentKey, setCurrentKey] = useState<number>(0);

    const ServicesSlide = (service: Service) => {
        return (
            <Paper
                className="carousel-slide"
                elevation={0}
                sx={{
                    // keep your responsive heights here if you want,
                    // CSS already sets a default height
                    height: { xs: 360, sm: 420, md: 520 },
                    backgroundImage: `url(${service.Image})`,
                }}
            >
                {/* overlay for readability */}
                <Box className="carousel-overlay" />

                {/* content */}
                <Box className="carousel-content">
                    <Typography className="carousel-title" variant="h4">
                        {service.Name}
                    </Typography>

                    <Typography className="carousel-desc">{service.Description}</Typography>

                    <Button className="carousel-cta" variant="contained"
                            sx={{
                                backgroundColor: "rgb(236,236,236)",
                                backdropFilter: "blur(6px)",
                                WebkitBackdropFilter: "blur(6px)",
                                color: "#000000",
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
                            }}>
                        View Services
                    </Button>
                </Box>
            </Paper>
        );
    };

    useEffect(() => {
        const controller = new AbortController();

        async function fetchServices() {
            try {
                setLoading(true);
                const response = await fetch("https://your-api.com/services", {
                    signal: controller.signal,
                });

                if (!response.ok) throw new Error(`HTTP ${response.status}`);

                const data = await response.json();

                const formatted: Service[] = (Array.isArray(data) ? data : []).map(
                    (item: any) => ({
                        Name: String(item?.name ?? ""),
                        Description: String(item?.description ?? ""),
                        Image: String(item?.image ?? ""),
                    })
                );

                const cleaned = formatted.filter((s) => s.Name && s.Description && s.Image);

                if (cleaned.length > 0) {
                    setServices(cleaned);
                    setCurrentKey(0);
                } else {
                    setServices(fallbackServices);
                    setCurrentKey(0);
                }
            } catch (err) {
                if ((err as any)?.name !== "AbortError") {
                    console.error("Failed to fetch services:", err);
                    setServices(fallbackServices);
                    setCurrentKey(0);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchServices();
        return () => controller.abort();
    }, [fallbackServices]);

    const handleUpClick = () => {
        const max = services.length - 1;
        if (max < 0) return;

        setCurrentKey((prev) => (prev >= max ? 0 : prev + 1));
    };

    const handleDownClick = () => {
        const max = services.length - 1;
        if (max < 0) return;

        setCurrentKey((prev) => (prev <= 0 ? max : prev - 1));
    };

    return (
        <section className="carousel-bleed">
            <Box
                className="carousel-wrap"
                sx={{
                    position: "relative",
                    width: "100%",
                }}
            >
                <Carousel autoPlay={false} index={currentKey} navButtonsAlwaysInvisible>
                    {services.map((service, i) => (
                        <ServicesSlide
                            key={`${service.Name}-${i}`}
                            Name={service.Name}
                            Description={service.Description}
                            Image={service.Image}
                        />
                    ))}
                </Carousel>

                {/* Left Button (KEEPING YOUR ORIGINAL sx STYLING) */}
                <Button
                    onClick={handleDownClick}
                    disabled={loading || services.length <= 1}
                    className="carousel-nav carousel-nav--left"
                    sx={{
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 2,
                        minWidth: 0,
                        width: 70,
                        height: 70,
                        borderRadius: "50%",
                        bgcolor: "rgba(255,255,255,0.6)",
                        backdropFilter: "blur(6px)",
                        WebkitBackdropFilter: "blur(6px)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                        "&:hover": { bgcolor: "rgba(255,255,255,0.75)" },
                        "&.Mui-disabled": { opacity: 0.4 },
                    }}
                >
                    <ArrowBackIcon />
                </Button>

                {/* Right Button (KEEPING YOUR ORIGINAL sx STYLING) */}
                <Button
                    onClick={handleUpClick}
                    disabled={loading || services.length <= 1}
                    className="carousel-nav carousel-nav--right"
                    sx={{
                        position: "absolute",
                        right: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 2,
                        minWidth: 0,
                        width: 70,
                        height: 70,
                        borderRadius: "50%",
                        bgcolor: "rgba(255,255,255,0.6)",
                        backdropFilter: "blur(6px)",
                        WebkitBackdropFilter: "blur(6px)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                        "&:hover": { bgcolor: "rgba(255,255,255,0.75)" },
                        "&.Mui-disabled": { opacity: 0.4 },
                    }}
                >
                    <ArrowForwardIcon />
                </Button>
            </Box>
        </section>
    );
}