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
  /** Official company/asset logo URL */
  logoUrl?: string;
  /** Ordered media gallery array */
  images?: string[];
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

// Purely dynamic database backend - no mockup fallback arrays

// ─── API Routes ───

// GET /
app.get("/", (req: Request, res: Response) => {
  res.send("NexTrade API Server is running.");
});

// GET /api/health
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "up",
    uptime: process.uptime(),
    database: db ? "connected" : "offline",
    timestamp: new Date().toISOString(),
  });
});

// GET /api/testimonials
app.get("/api/testimonials", async (req: Request, res: Response) => {
  try {
    if (!db) {
      return res.status(503).json({ message: "Database connection offline" });
    }
    const data = await testimonialsCollection.find({}).toArray();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/faq
app.get("/api/faq", async (req: Request, res: Response) => {
  try {
    if (!db) {
      return res.status(503).json({ message: "Database connection offline" });
    }
    const data = await faqCollection.find({}).toArray();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/stats
app.get("/api/stats", async (req: Request, res: Response) => {
  try {
    if (!db) {
      return res.status(503).json({ message: "Database connection offline" });
    }
    const data = await statsCollection.find({}).toArray();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/categories
app.get("/api/categories", async (req: Request, res: Response) => {
  try {
    if (!db) {
      return res.status(503).json({ message: "Database connection offline" });
    }
    const data = await categoriesCollection.find({}).toArray();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/services (kept path for frontend route simplicity, handling Assets)
app.get("/api/services", async (req: Request, res: Response) => {
  try {
    if (!db) {
      return res.status(503).json({ message: "Database connection offline" });
    }
    const { search, category, minRating, sort, page = "1", limit = "8" } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

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
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/services/:id
app.get("/api/services/:id", async (req: Request, res: Response) => {
  try {
    if (!db) {
      return res.status(503).json({ message: "Database connection offline" });
    }
    const { id } = req.params;
    let queryId;
    try {
      queryId = new ObjectId(id as string);
    } catch {
      return res.status(404).json({ message: "Invalid ID format" });
    }
    const asset = await assetsCollection.findOne({ _id: queryId });
    if (!asset) return res.status(404).json({ message: "Asset not found" });
    res.json(asset);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/services/user/:userId
app.get("/api/services/user/:userId", async (req: Request, res: Response) => {
  try {
    if (!db) {
      return res.status(503).json({ message: "Database connection offline" });
    }
    const { userId } = req.params;
    const data = await assetsCollection.find({ userId }).toArray();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/services
app.post("/api/services", validateServiceInput, async (req: Request, res: Response) => {
  try {
    if (!db) {
      return res.status(503).json({ message: "Database connection offline" });
    }
    const newAsset = {
      ...req.body,
      createdAt: new Date().toISOString(),
    };

    const result = await assetsCollection.insertOne(newAsset);
    res.status(201).json({ ...newAsset, _id: result.insertedId });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/services/:id
app.delete("/api/services/:id", async (req: Request, res: Response) => {
  try {
    if (!db) {
      return res.status(503).json({ message: "Database connection offline" });
    }
    const { id } = req.params;
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
