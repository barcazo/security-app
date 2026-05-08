// Brand & contact configuration. All UI reads from this file.
export const BRAND = {
    name: "SECTOR9",
    tagline: "Tactical CCTV Systems",
    region: "South Africa",
    whatsappNumber: "+27820000000", // Update with real number
    whatsappDisplay: "+27 82 000 0000",
    email: "bothwell@consultant.com",
    serviceArea: "Johannesburg & Surrounds · Nationwide on quote",
    hours: "Mon–Sat · 07:00 – 19:00 SAST",
};

export const buildWhatsAppUrl = (msg = "") => {
    const text = encodeURIComponent(
        msg ||
            `Hi ${BRAND.name}, I'd like a quote for CCTV installation. Could you assist?`
    );
    return `https://wa.me/${BRAND.whatsappNumber.replace(/\D/g, "")}?text=${text}`;
};

export const buildMailto = (subject = "CCTV Quote Enquiry") =>
    `mailto:${BRAND.email}?subject=${encodeURIComponent(subject)}`;

export const SERVICES = [
    {
        id: "residential",
        code: "R-01",
        title: "Residential CCTV",
        blurb:
            "Discreet camera placement, perimeter coverage and tamper-resistant wiring for homes and estates.",
        bullets: [
            "2–16 channel HD/4K systems",
            "Estate & boundary integration",
            "PoE and wireless options",
        ],
    },
    {
        id: "commercial",
        code: "C-02",
        title: "Commercial & Office",
        blurb:
            "Multi-zone surveillance for warehouses, retail and offices with role-based access to recordings.",
        bullets: [
            "Up to 64-channel NVR/DVR",
            "POS & access control sync",
            "Cloud + on-prem retention",
        ],
    },
    {
        id: "ip-nvr",
        code: "I-03",
        title: "IP / NVR / DVR Setup",
        blurb:
            "Hardened network video recorder configuration with VLAN isolation and encrypted streams.",
        bullets: [
            "Hikvision · Dahua · Ubiquiti",
            "VLAN + firewall hardening",
            "RAID storage planning",
        ],
    },
    {
        id: "remote",
        code: "R-04",
        title: "Remote Viewing & App",
        blurb:
            "Mobile and desktop access with multi-user permissions and event-based push alerts.",
        bullets: [
            "iOS · Android · Web",
            "DDNS / static IP setup",
            "Push & email alerts",
        ],
    },
    {
        id: "amc",
        code: "M-05",
        title: "AMC & Maintenance",
        blurb:
            "Scheduled health checks, firmware updates and rapid-response repair contracts.",
        bullets: [
            "Quarterly diagnostics",
            "Firmware patching",
            "48-hour SLA on faults",
        ],
    },
    {
        id: "consult",
        code: "S-06",
        title: "Site Survey & Audit",
        blurb:
            "On-site assessment producing a precise camera plan, cable schedule and itemised quote.",
        bullets: [
            "Free initial walkthrough",
            "Coverage diagram",
            "Itemised cost breakdown",
        ],
    },
];

export const STATS = [
    { k: "24 / 7", v: "Monitored Systems" },
    { k: "1,200+", v: "Sites Configured" },
    { k: "48h", v: "Fault Response SLA" },
    { k: "99.9%", v: "Uptime Target" },
];

export const PROCESS = [
    {
        step: "01",
        title: "Consult",
        body: "Free phone or on-site assessment to map zones, blind spots and cabling routes.",
    },
    {
        step: "02",
        title: "Design",
        body: "Itemised quote with camera count, cable schedule, NVR specs and recording retention plan.",
    },
    {
        step: "03",
        title: "Install",
        body: "Clean cable routing, weather-rated mounts, firmware-locked devices and VLAN isolation.",
    },
    {
        step: "04",
        title: "Secure",
        body: "Remote access setup, password rotation, owner handover and 12-month support window.",
    },
];

export const FAQS = [
    {
        q: "How long does a typical residential install take?",
        a: "A 4–8 camera home install is usually completed in a single day. Larger estate or commercial jobs are scheduled across 2–5 days depending on cabling complexity and switchgear changes.",
    },
    {
        q: "Do you supply the cameras or do I buy them separately?",
        a: "Either works. We supply Hikvision, Dahua and Ubiquiti hardware at trade pricing, or we'll configure equipment you've already purchased — provided it meets the security baseline.",
    },
    {
        q: "Can I view the cameras on my phone?",
        a: "Yes. Every install includes mobile + desktop client setup, secure DDNS or VPN tunnelling where needed, and tested push alerts on motion or line-crossing events.",
    },
    {
        q: "What about POPIA and recording compliance?",
        a: "We configure systems with signage prompts, retention windows aligned to POPIA guidance, role-based playback access and audit logs. Compliance documentation is provided on request.",
    },
    {
        q: "Do you offer maintenance contracts?",
        a: "Yes — quarterly diagnostics, firmware patching and a 48-hour fault response SLA. Contracts are month-to-month with no lock-in beyond the current period.",
    },
];

export const NAV_LINKS = [
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Quote", href: "#quote" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
];
