import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

// ─── All Collection Data ───────────────────────────────────────

const assets = [
  {
    title: "NVIDIA Corp (NVDA)",
    shortDescription:
      "Leading AI semiconductor stock with dominant GPU market share and explosive data center revenue growth.",
    fullDescription:
      "NVIDIA Corporation is the global leader in GPU-accelerated computing, powering AI training, data centers, autonomous vehicles, and gaming. With the AI revolution driving unprecedented demand for its H100 and Blackwell chips, NVDA has become the centerpiece of technology-focused portfolios worldwide.",
    category: "stocks",
    pricePerUnit: 134.52,
    rating: 4.9,
    reviewCount: 2847,
    exchange: "NASDAQ",
    assetName: "NVIDIA Corporation",
    assetEmail: "ir@nvidia.com",
    volume24h: 42500000,
    marketCap: 3300000000000,
    availability: "available",
    createdAt: new Date("2025-11-15T10:00:00Z"),
    userId: "usr-001",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a4/NVIDIA_logo.svg",
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
      "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=800&q=80",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&q=80",
    ],
  },
  {
    title: "Bitcoin (BTC)",
    shortDescription:
      "The original decentralized cryptocurrency. Digital gold with the largest market cap in the crypto ecosystem.",
    fullDescription:
      "Bitcoin is the first and most recognized cryptocurrency, operating on a decentralized peer-to-peer network. With a capped supply of 21 million coins and institutional adoption from major financial firms, Bitcoin serves as both a store of value and a hedge against traditional market volatility.",
    category: "crypto",
    pricePerUnit: 67234.18,
    rating: 4.8,
    reviewCount: 12453,
    exchange: "Binance",
    assetName: "Bitcoin",
    assetEmail: "info@bitcoin.org",
    volume24h: 28700000000,
    marketCap: 1320000000000,
    availability: "available",
    createdAt: new Date("2025-12-03T14:30:00Z"),
    userId: "usr-002",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg",
    images: [
      "https://images.unsplash.com/photo-1516245834210-c4c142787335?w=800&q=80",
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
      "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800&q=80",
    ],
  },
  {
    title: "Vanguard S&P 500 ETF (VOO)",
    shortDescription:
      "Low-cost index ETF tracking the S&P 500. The benchmark for passive equity investment strategies.",
    fullDescription:
      "VOO provides broad exposure to 500 of the largest U.S. companies across all sectors. With an expense ratio of just 0.03%, it's the gold standard for passive investors seeking diversified equity exposure with minimal fees and maximum tax efficiency.",
    category: "etf",
    pricePerUnit: 482.37,
    rating: 4.9,
    reviewCount: 8921,
    exchange: "NYSE",
    assetName: "Vanguard S&P 500",
    assetEmail: "info@vanguard.com",
    volume24h: 5200000,
    marketCap: 420000000000,
    availability: "available",
    createdAt: new Date("2025-10-20T09:15:00Z"),
    userId: "usr-003",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/81/Vanguard.svg",
    images: [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
      "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&q=80",
      "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800&q=80",
    ],
  },
  {
    title: "Gold Futures (GC)",
    shortDescription:
      "Precious metal commodity futures. The ultimate safe-haven asset for portfolio hedging and wealth preservation.",
    fullDescription:
      "Gold futures contracts provide leveraged exposure to the price of gold, the world's most recognized store of value. Widely used for hedging against inflation, currency devaluation, and geopolitical uncertainty, gold remains a cornerstone of diversified investment portfolios.",
    category: "commodities",
    pricePerUnit: 2341.6,
    rating: 4.7,
    reviewCount: 3456,
    exchange: "COMEX",
    assetName: "Gold Futures",
    assetEmail: "info@cmegroup.com",
    volume24h: 180000,
    marketCap: 14500000000000,
    availability: "available",
    createdAt: new Date("2025-09-12T11:45:00Z"),
    userId: "usr-004",
    logoUrl: "https://images.unsplash.com/photo-1624996379697-f01d168b1a52?w=200&q=80",
    images: [
      "https://images.unsplash.com/photo-1624996379697-f01d168b1a52?w=800&q=80",
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&q=80",
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
      "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&q=80",
    ],
  },
  {
    title: "Ethereum (ETH)",
    shortDescription:
      "The leading smart contract platform powering DeFi, NFTs, and the decentralized web ecosystem.",
    fullDescription:
      "Ethereum is the world's most utilized blockchain platform, enabling decentralized applications, smart contracts, and the entire DeFi ecosystem. Post-merge to proof-of-stake, ETH offers staking yields while maintaining its position as the foundation of Web3 development.",
    category: "crypto",
    pricePerUnit: 3487.92,
    rating: 4.8,
    reviewCount: 9876,
    exchange: "Coinbase",
    assetName: "Ethereum",
    assetEmail: "info@ethereum.org",
    volume24h: 15200000000,
    marketCap: 419000000000,
    availability: "available",
    createdAt: new Date("2026-01-08T16:00:00Z"),
    userId: "usr-005",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg",
    images: [
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
      "https://images.unsplash.com/photo-1516245834210-c4c142787335?w=800&q=80",
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    ],
  },
  {
    title: "Manhattan Commercial REIT",
    shortDescription:
      "Premium commercial real estate investment trust focused on Class A office space in Manhattan.",
    fullDescription:
      "This REIT provides exposure to premium commercial real estate in Manhattan's most sought-after districts. With a diversified portfolio of Class A office buildings, retail spaces, and mixed-use properties, it offers quarterly dividends and long-term capital appreciation.",
    category: "real-estate",
    pricePerUnit: 78.45,
    rating: 4.6,
    reviewCount: 1234,
    exchange: "NYSE",
    assetName: "Manhattan REIT",
    assetEmail: "ir@manhattanreit.com",
    volume24h: 890000,
    marketCap: 12400000000,
    availability: "available",
    createdAt: new Date("2025-08-25T13:30:00Z"),
    userId: "usr-006",
    logoUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=200&q=80",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    ],
  },
  {
    title: "EUR/USD Forex Pair",
    shortDescription:
      "The most liquid currency pair in the forex market. Euro against US Dollar with tight spreads.",
    fullDescription:
      "EUR/USD is the world's most traded currency pair, representing the exchange rate between the Euro and the US Dollar. With exceptional liquidity, tight spreads, and 24-hour trading availability, it's the preferred instrument for both institutional and retail forex traders.",
    category: "forex",
    pricePerUnit: 1.0892,
    rating: 4.7,
    reviewCount: 5678,
    exchange: "Forex.com",
    assetName: "EUR/USD",
    assetEmail: "support@forex.com",
    volume24h: 720000000000,
    marketCap: 0,
    availability: "available",
    createdAt: new Date("2026-02-14T08:00:00Z"),
    userId: "usr-007",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg",
    images: [
      "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&q=80",
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
      "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&q=80",
    ],
  },
  {
    title: "US Treasury 10Y Bond",
    shortDescription:
      "US Government 10-year bond. The global benchmark for risk-free return and fixed-income investment.",
    fullDescription:
      "The US 10-Year Treasury Bond is the cornerstone of the global fixed-income market. Backed by the full faith and credit of the US government, it serves as the benchmark for mortgage rates, corporate bonds, and risk-free return calculations worldwide.",
    category: "bonds",
    pricePerUnit: 96.42,
    rating: 4.9,
    reviewCount: 4321,
    exchange: "Treasury Direct",
    assetName: "US 10Y Bond",
    assetEmail: "info@treasurydirect.gov",
    volume24h: 650000000000,
    marketCap: 25000000000000,
    availability: "available",
    createdAt: new Date("2026-03-01T10:30:00Z"),
    userId: "usr-008",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg",
    images: [
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
      "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&q=80",
      "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&q=80",
    ],
  },
];

const testimonials = [
  {
    name: "Marcus Wei",
    role: "Portfolio Manager, Apex Capital",
    rating: 5,
    comment:
      "NexTrade's data precision and clean interface have become essential to my daily workflow. The real-time asset analytics saved us significant alpha on three consecutive quarters.",
  },
  {
    name: "Elena Rossi",
    role: "Independent Day Trader",
    rating: 5,
    comment:
      "I switched from two other platforms. NexTrade's minimalist design removes the noise so I can focus on what matters—execution speed and data clarity. No distractions, just results.",
  },
  {
    name: "James Okafor",
    role: "Crypto Fund Analyst",
    rating: 5,
    comment:
      "The cross-market visibility is unmatched. Monitoring stocks, crypto, and commodities from a single dashboard with verified listings gives our fund a serious edge.",
  },
];

const faq = [
  {
    question: "What types of assets can I trade on NexTrade?",
    answer:
      "NexTrade supports stocks, cryptocurrency, ETFs, forex pairs, commodities, bonds, real estate tokens, and NFTs. All listings are verified and include real-time market data.",
  },
  {
    question: "How are asset listings verified?",
    answer:
      "Every asset on NexTrade undergoes a multi-step verification process including exchange validation, market data cross-referencing, and compliance checks to ensure accuracy and legitimacy.",
  },
  {
    question: "Is my portfolio data secure?",
    answer:
      "Absolutely. NexTrade uses enterprise-grade encryption, secure JWT authentication, and follows strict data privacy protocols. Your portfolio and trading data are protected with bank-level security.",
  },
  {
    question: "Can I track assets across multiple exchanges?",
    answer:
      "Yes. NexTrade aggregates data from major exchanges including NASDAQ, NYSE, Binance, Coinbase, COMEX, and forex platforms, giving you a unified view of all your positions.",
  },
  {
    question: "How do I list a new asset on the platform?",
    answer:
      "Verified analysts can list new assets by navigating to 'List Asset' in the dashboard. Provide the asset details, exchange information, and market data. Our team reviews submissions within 24 hours.",
  },
  {
    question: "Does NexTrade charge trading fees?",
    answer:
      "NexTrade provides market data and portfolio management tools. Trading execution happens through your connected exchange accounts. We charge no commission on trades—our revenue comes from premium analytics features.",
  },
];

const stats = [
  { value: "2,400+", label: "Assets Listed" },
  { value: "18K+", label: "Trades / Day" },
  { value: "99.7%", label: "Uptime SLA" },
  { value: "$4.2B", label: "Volume Tracked" },
];

const categories = [
  {
    title: "Stocks",
    description: "Equities from NASDAQ, NYSE, and global exchanges.",
    icon: "TrendingUp",
    color: "#3B82F6",
  },
  {
    title: "Cryptocurrency",
    description: "Bitcoin, Ethereum, and 500+ verified digital assets.",
    icon: "Coins",
    color: "#F59E0B",
  },
  {
    title: "Real Estate",
    description: "REITs, tokenized properties, and commercial portfolios.",
    icon: "Building2",
    color: "#10B981",
  },
  {
    title: "Commodities",
    description: "Gold, silver, oil futures, and agricultural products.",
    icon: "Gem",
    color: "#EF4444",
  },
  {
    title: "ETFs",
    description: "Index funds, sector ETFs, and thematic baskets.",
    icon: "BarChart3",
    color: "#8B5CF6",
  },
  {
    title: "Forex",
    description: "Major, minor, and exotic currency pairs with live spreads.",
    icon: "Globe",
    color: "#06B6D4",
  },
];

// ─── Seed Runner ───────────────────────────────────────────────

async function seed() {
  const uri = process.env.MONGO_DB_URI;
  if (!uri) {
    console.error("❌ MONGO_DB_URI is not set in .env");
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const dbName = process.env.DB_CU || "nextrade";
    const db = client.db(dbName);

    console.log(`🔗 Connected to MongoDB — database: "${dbName}"`);

    // Seed each collection (drop first to avoid duplicates on re-run)
    const collections: { name: string; data: any[] }[] = [
      { name: "assets", data: assets },
      { name: "testimonials", data: testimonials },
      { name: "faq", data: faq },
      { name: "stats", data: stats },
      { name: "categories", data: categories },
    ];

    for (const col of collections) {
      const collection = db.collection(col.name);
      await collection.deleteMany({});
      const result = await collection.insertMany(col.data);
      console.log(
        `  ✅ ${col.name}: inserted ${result.insertedCount} documents`
      );
    }

    console.log("\n🎉 All collections seeded successfully!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  } finally {
    await client.close();
    process.exit(0);
  }
}

seed();
