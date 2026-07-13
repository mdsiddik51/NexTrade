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
