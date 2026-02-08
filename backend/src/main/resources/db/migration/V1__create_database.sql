-- Enable UUID support
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create table
CREATE TABLE contact_requests
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(150),
    last_name VARCHAR(150),
    email VARCHAR(255),
    phone VARCHAR(20),

    message TEXT,
    service_type VARCHAR(50),
    address VARCHAR(255),
    preferred_contact VARCHAR(10),

    status VARCHAR(20) DEFAULT 'NEW',
    source VARCHAR(50) DEFAULT 'website',

    consent_to_contact BOOLEAN DEFAULT false,

    created_at TIMESTAMPTZ DEFAULT NOW()
);
