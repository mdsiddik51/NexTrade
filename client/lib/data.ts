import type { Service } from "./types";

// ─── Featured Lawyers / Services ────────────────────────────────
export const featuredServices: Service[] = [
  {
    _id: "svc-001",
    title: "Corporate Mergers & Acquisitions",
    shortDescription:
      "Expert guidance on corporate mergers, acquisitions, and restructuring for enterprises of all scales.",
    fullDescription:
      "Our corporate M&A practice provides end-to-end legal support for businesses navigating complex transactions. From due diligence and valuation to regulatory compliance and post-merger integration, we ensure seamless execution. With decades of combined experience in cross-border transactions, our team has facilitated deals worth over $2 billion.",
    category: "corporate",
    pricePerHour: 350,
    rating: 4.9,
    reviewCount: 127,
    location: "New York, NY",
    lawyerName: "Sarah Mitchell",
    lawyerEmail: "sarah.mitchell@lexvizo.com",
    casesHandled: 342,
    yearsExperience: 18,
    availability: "available",
    createdAt: "2025-11-15T10:00:00Z",
    userId: "usr-001",
  },
  {
    _id: "svc-002",
    title: "Criminal Defense Litigation",
    shortDescription:
      "Aggressive defense strategies for federal and state criminal charges with proven courtroom success.",
    fullDescription:
      "When facing criminal charges, you need a defense attorney who fights relentlessly. Our criminal defense practice handles everything from white-collar fraud to complex federal cases. We combine thorough investigation, expert witness coordination, and compelling trial advocacy to protect your rights and freedom.",
    category: "criminal",
    pricePerHour: 280,
    rating: 4.8,
    reviewCount: 89,
    location: "Los Angeles, CA",
    lawyerName: "James Chen",
    lawyerEmail: "james.chen@lexvizo.com",
    casesHandled: 189,
    yearsExperience: 14,
    availability: "available",
    createdAt: "2025-12-03T14:30:00Z",
    userId: "usr-002",
  },
  {
    _id: "svc-003",
    title: "Family Law & Custody",
    shortDescription:
      "Compassionate yet strategic representation in divorce, custody, and family dispute matters.",
    fullDescription:
      "Family legal matters require both empathy and precision. Our family law practice guides clients through divorce proceedings, custody disputes, prenuptial agreements, and adoption processes. We prioritize mediation and collaborative solutions while being fully prepared for litigation when necessary.",
    category: "family",
    pricePerHour: 220,
    rating: 4.7,
    reviewCount: 156,
    location: "Chicago, IL",
    lawyerName: "Elena Rodriguez",
    lawyerEmail: "elena.rodriguez@lexvizo.com",
    casesHandled: 256,
    yearsExperience: 12,
    availability: "available",
    createdAt: "2025-10-20T09:15:00Z",
    userId: "usr-003",
  },
  {
    _id: "svc-004",
    title: "Intellectual Property Protection",
    shortDescription:
      "Comprehensive IP strategy including patents, trademarks, copyrights, and trade secret defense.",
    fullDescription:
      "In the innovation economy, protecting your intellectual property is critical. Our IP practice covers the full spectrum of protection—from patent prosecution and trademark registration to copyright enforcement and trade secret litigation. We work with startups, enterprises, and individual creators to safeguard their most valuable assets.",
    category: "intellectual-property",
    pricePerHour: 320,
    rating: 4.9,
    reviewCount: 98,
    location: "San Francisco, CA",
    lawyerName: "David Park",
    lawyerEmail: "david.park@lexvizo.com",
    casesHandled: 178,
    yearsExperience: 16,
    availability: "busy",
    createdAt: "2025-09-12T11:45:00Z",
    userId: "usr-004",
  },
  {
    _id: "svc-005",
    title: "Immigration & Visa Services",
    shortDescription:
      "Navigating complex immigration pathways including work visas, green cards, and citizenship applications.",
    fullDescription:
      "Our immigration practice assists individuals and businesses with the full range of immigration matters. From H-1B visa petitions and employment-based green cards to family reunification and naturalization, we provide strategic counsel to navigate the evolving immigration landscape.",
    category: "immigration",
    pricePerHour: 200,
    rating: 4.6,
    reviewCount: 203,
    location: "Miami, FL",
    lawyerName: "Amara Okafor",
    lawyerEmail: "amara.okafor@lexvizo.com",
    casesHandled: 412,
    yearsExperience: 10,
    availability: "available",
    createdAt: "2026-01-08T16:00:00Z",
    userId: "usr-005",
  },
  {
    _id: "svc-006",
    title: "Real Estate & Property Law",
    shortDescription:
      "End-to-end legal support for commercial and residential property transactions and disputes.",
    fullDescription:
      "Whether you are buying your first home or negotiating a multi-million dollar commercial lease, our real estate practice provides comprehensive legal support. We handle title searches, contract negotiations, zoning issues, landlord-tenant disputes, and property litigation with meticulous attention to detail.",
    category: "real-estate",
    pricePerHour: 240,
    rating: 4.8,
    reviewCount: 134,
    location: "Houston, TX",
    lawyerName: "Robert Williams",
    lawyerEmail: "robert.williams@lexvizo.com",
    casesHandled: 298,
    yearsExperience: 20,
    availability: "available",
    createdAt: "2025-08-25T13:30:00Z",
    userId: "usr-006",
  },
  {
    _id: "svc-007",
    title: "Employment & Labor Law",
    shortDescription:
      "Defending employee rights and advising businesses on workplace compliance and dispute resolution.",
    fullDescription:
      "Our employment law team represents both employees and employers in workplace matters. From wrongful termination and discrimination claims to employment contract negotiations and regulatory compliance, we deliver practical solutions that protect our clients' interests.",
    category: "employment",
    pricePerHour: 260,
    rating: 4.7,
    reviewCount: 76,
    location: "Boston, MA",
    lawyerName: "Katherine Lee",
    lawyerEmail: "katherine.lee@lexvizo.com",
    casesHandled: 167,
    yearsExperience: 11,
    availability: "available",
    createdAt: "2026-02-14T08:00:00Z",
    userId: "usr-007",
  },
  {
    _id: "svc-008",
    title: "Tax Law & Advisory",
    shortDescription:
      "Strategic tax planning, IRS audit representation, and international tax compliance consulting.",
    fullDescription:
      "Tax law is complex and constantly evolving. Our tax practice helps individuals and businesses minimize tax liability through strategic planning, represents clients in IRS audits and appeals, and provides guidance on international tax compliance. We turn complex tax challenges into clear, actionable strategies.",
    category: "tax",
    pricePerHour: 290,
    rating: 4.8,
    reviewCount: 62,
    location: "Washington, DC",
    lawyerName: "Michael Torres",
    lawyerEmail: "michael.torres@lexvizo.com",
    casesHandled: 145,
    yearsExperience: 15,
    availability: "busy",
    createdAt: "2026-03-01T10:30:00Z",
    userId: "usr-008",
  },
];

// ─── Testimonials ───────────────────────────────────────────────
export const testimonials = [
  {
    id: 1,
    name: "Marcus Thompson",
    role: "CEO, NovaTech Industries",
    rating: 5,
    comment:
      "LexVizo transformed how we handle corporate legal matters. Sarah Mitchell's expertise in M&A saved our company millions during a critical acquisition. The platform's transparency and professionalism are unmatched.",
  },
  {
    id: 2,
    name: "Linda Vasquez",
    role: "Small Business Owner",
    rating: 5,
    comment:
      "After a complex custody battle, Elena Rodriguez gave me hope when I had none. Her compassionate approach and sharp legal strategy changed the outcome for my family. Forever grateful.",
  },
  {
    id: 3,
    name: "Ryan Nakamura",
    role: "Startup Founder",
    rating: 5,
    comment:
      "David Park's IP expertise was critical in protecting our patented technology from infringement. His thorough understanding of patent law and swift action preserved our competitive advantage.",
  },
];

// ─── FAQ Data ───────────────────────────────────────────────────
export const faqData = [
  {
    question: "How do I find the right lawyer for my case?",
    answer:
      "Use our Explore page to search by practice area, location, rating, and price range. Each lawyer profile includes their experience, case history, and client reviews to help you make an informed decision.",
  },
  {
    question: "What are the consultation fees?",
    answer:
      "Consultation fees vary by lawyer and practice area. Each lawyer's profile displays their hourly rate. Many attorneys on LexVizo offer an initial consultation at a reduced rate or free of charge.",
  },
  {
    question: "Is my information secure on LexVizo?",
    answer:
      "Absolutely. We use enterprise-grade JWT encryption, secure HTTPS connections, and follow strict data privacy protocols. Your personal and case information is protected with bank-level security.",
  },
  {
    question: "Can I switch lawyers if I am not satisfied?",
    answer:
      "Yes. LexVizo allows you to consult with multiple lawyers before committing. If you are not satisfied with your current representation, you can explore other attorneys on the platform at any time.",
  },
  {
    question: "How do lawyers join the LexVizo platform?",
    answer:
      "Lawyers can register on LexVizo by creating an account with the 'Legal Architect' role. After registration, they can list their services, set their rates, and start connecting with clients.",
  },
  {
    question: "Does LexVizo operate in all states?",
    answer:
      "LexVizo connects clients with licensed attorneys across all 50 US states. Each lawyer's profile specifies their jurisdiction and bar admissions so you can find representation in your area.",
  },
];

// ─── Statistics ─────────────────────────────────────────────────
export const stats = [
  { value: "500+", label: "Verified Attorneys" },
  { value: "12K+", label: "Cases Resolved" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "24/7", label: "Support Available" },
];

// ─── Practice Areas ─────────────────────────────────────────────
export const practiceAreas = [
  {
    title: "Corporate Law",
    description: "Mergers, acquisitions, compliance, and business formation.",
    icon: "Building2",
    color: "#3B82F6",
  },
  {
    title: "Criminal Defense",
    description: "Federal and state criminal defense with proven trial success.",
    icon: "Shield",
    color: "#EF4444",
  },
  {
    title: "Family Law",
    description: "Divorce, custody, adoption, and family dispute resolution.",
    icon: "Heart",
    color: "#EC4899",
  },
  {
    title: "Intellectual Property",
    description: "Patents, trademarks, copyrights, and trade secrets.",
    icon: "Lightbulb",
    color: "#F59E0B",
  },
  {
    title: "Real Estate",
    description: "Property transactions, zoning, and real estate litigation.",
    icon: "Home",
    color: "#10B981",
  },
  {
    title: "Immigration",
    description: "Visas, green cards, citizenship, and immigration compliance.",
    icon: "Globe",
    color: "#8B5CF6",
  },
];
