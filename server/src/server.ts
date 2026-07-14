import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import { validateServiceInput } from "./middleware/validator";

dotenv.config();

export interface Asset {
  _id?: string | ObjectId;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  pricePerUnit: number;
  rating: number;
  reviewCount: number;
  exchange: string;
  assetName: string;
  assetEmail: string;
  volume24h: number;
  marketCap: number;
  availability: "available" | "limited" | "closed";
  createdAt?: string;
  userId: string;
}

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// ─── MongoDB Setup ───
const MONGO_URI = process.env.MONGO_DB_URI || "";
let db: any = null;
let assetsCollection: any = null;
let testimonialsCollection: any = null;
let faqCollection: any = null;
let statsCollection: any = null;
let categoriesCollection: any = null;

async function connectDB() {
  if (!MONGO_URI) {
    console.log("⚠️ MONGO_DB_URI not found in env. Running with in-memory mockup.");
    return;
  }
  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db(process.env.DB_CU || "nextrade");
    assetsCollection = db.collection("assets");
    testimonialsCollection = db.collection("testimonials");
    faqCollection = db.collection("faq");
    statsCollection = db.collection("stats");
    categoriesCollection = db.collection("categories");
    console.log("🚀 Connected to MongoDB successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection failed, falling back to mockup mode:", error);
  }
}

// ─── Temporary In-Memory Storage for Demo Fallback ───
let mockAssets: any[] = [
  {
    _id: "ast-001",
    title: "NVIDIA Corp (NVDA)",
    shortDescription: "Leading AI semiconductor stock with dominant GPU market share and explosive data center revenue growth.",
    fullDescription: "NVIDIA Corporation is the global leader in GPU-accelerated computing, powering AI training, data centers, autonomous vehicles, and gaming.",
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
    createdAt: new Date().toISOString(),
    userId: "usr-001",
  },
  {
    _id: "ast-002",
    title: "Bitcoin (BTC)",
    shortDescription: "The original decentralized cryptocurrency. Digital gold with the largest market cap in the crypto ecosystem.",
    fullDescription: "Bitcoin is the first and most recognized cryptocurrency, operating on a decentralized peer-to-peer network.",
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
    createdAt: new Date().toISOString(),
    userId: "usr-002",
  },
];

let mockTestimonials: any[] = [
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

let mockFaq: any[] = [
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

let mockStats: any[] = [
  { value: "2,400+", label: "Assets Listed" },
  { value: "18K+", label: "Trades / Day" },
  { value: "99.7%", label: "Uptime SLA" },
  { value: "$4.2B", label: "Volume Tracked" },
];

let mockCategories: any[] = [
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

// ─── API Routes ───

// GET /api/health
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "up",
    uptime: process.uptime(),
    database: assetsCollection ? "mongodb" : "mockup-fallback",
    timestamp: new Date().toISOString(),
  });
});

// GET /api/testimonials
app.get("/api/testimonials", async (req: Request, res: Response) => {
  try {
    if (testimonialsCollection) {
      const data = await testimonialsCollection.find({}).toArray();
      res.json(data);
    } else {
      res.json(mockTestimonials);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/faq
app.get("/api/faq", async (req: Request, res: Response) => {
  try {
    if (faqCollection) {
      const data = await faqCollection.find({}).toArray();
      res.json(data);
    } else {
      res.json(mockFaq);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/stats
app.get("/api/stats", async (req: Request, res: Response) => {
  try {
    if (statsCollection) {
      const data = await statsCollection.find({}).toArray();
      res.json(data);
    } else {
      res.json(mockStats);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/categories
app.get("/api/categories", async (req: Request, res: Response) => {
  try {
    if (categoriesCollection) {
      const data = await categoriesCollection.find({}).toArray();
      res.json(data);
    } else {
      res.json(mockCategories);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});


// GET /api/services (kept path for frontend route simplicity, handling Assets)
app.get("/api/services", async (req: Request, res: Response) => {
  try {
    const { search, category, minRating, sort, page = "1", limit = "8" } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    if (assetsCollection) {
      const query: any = {};
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } },
          { assetName: { $regex: search, $options: "i" } },
          { shortDescription: { $regex: search, $options: "i" } },
        ];
      }
      if (category) {
        query.category = category;
      }
      if (minRating) {
        query.rating = { $gte: parseFloat(minRating as string) };
      }

      const sortQuery: any = {};
      if (sort === "price-asc") sortQuery.pricePerUnit = 1;
      else if (sort === "price-desc") sortQuery.pricePerUnit = -1;
      else if (sort === "volume-desc") sortQuery.volume24h = -1;
      else sortQuery.rating = -1;

      const total = await assetsCollection.countDocuments(query);
      const data = await assetsCollection
        .find(query)
        .sort(sortQuery)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .toArray();

      res.json({
        data,
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      });
    } else {
      let result = [...mockAssets];
      if (search) {
        const q = (search as string).toLowerCase();
        result = result.filter(
          (s) =>
            s.title.toLowerCase().includes(q) ||
            s.assetName.toLowerCase().includes(q) ||
            s.shortDescription.toLowerCase().includes(q)
        );
      }
      if (category) {
        result = result.filter((s) => s.category === category);
      }
      if (minRating) {
        result = result.filter((s) => s.rating >= parseFloat(minRating as string));
      }

      if (sort === "price-asc") result.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
      else if (sort === "price-desc") result.sort((a, b) => b.pricePerUnit - a.pricePerUnit);
      else result.sort((a, b) => b.rating - a.rating);

      const total = result.length;
      const paginated = result.slice((pageNum - 1) * limitNum, pageNum * limitNum);

      res.json({
        data: paginated,
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/services/:id
app.get("/api/services/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (assetsCollection) {
      let queryId;
      try {
        queryId = new ObjectId(id as string);
      } catch {
        return res.status(404).json({ message: "Invalid ID format" });
      }
      const asset = await assetsCollection.findOne({ _id: queryId });
      if (!asset) return res.status(404).json({ message: "Asset not found" });
      res.json(asset);
    } else {
      const asset = mockAssets.find((s) => s._id === id);
      if (!asset) return res.status(404).json({ message: "Asset not found" });
      res.json(asset);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/services/user/:userId
app.get("/api/services/user/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (assetsCollection) {
      const data = await assetsCollection.find({ userId }).toArray();
      res.json(data);
    } else {
      const data = mockAssets.filter((s) => s.userId === userId);
      res.json(data);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/services
app.post("/api/services", validateServiceInput, async (req: Request, res: Response) => {
  try {
    const newAsset = {
      ...req.body,
      createdAt: new Date().toISOString(),
    };

    if (assetsCollection) {
      const result = await assetsCollection.insertOne(newAsset);
      res.status(201).json({ ...newAsset, _id: result.insertedId });
    } else {
      const createdAsset = {
        ...newAsset,
        _id: `ast-${Date.now()}`,
      };
      mockAssets.push(createdAsset);
      res.status(201).json(createdAsset);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/services/:id
app.delete("/api/services/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (assetsCollection) {
      let queryId;
      try {
        queryId = new ObjectId(id as string);
      } catch {
        return res.status(404).json({ message: "Invalid ID format" });
      }
      const result = await assetsCollection.deleteOne({ _id: queryId });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Asset not found" });
      }
      res.json({ message: "Asset deleted successfully" });
    } else {
      const index = mockAssets.findIndex((s) => s._id === id);
      if (index === -1) return res.status(404).json({ message: "Asset not found" });
      mockAssets.splice(index, 1);
      res.json({ message: "Asset deleted successfully" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Connect to DB on module load (for serverless cold starts)
connectDB();

// Start Server only when running locally (not on Vercel)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`📡 Server running on http://localhost:${PORT}`);
  });
}

// Export for Vercel serverless
export default app;
