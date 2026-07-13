import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// ─── MongoDB Setup ───
const MONGO_URI = process.env.MONGO_DB_URI || "";
let db: any = null;
let servicesCollection: any = null;

async function connectDB() {
  if (!MONGO_URI) {
    console.log("⚠️ MONGO_DB_URI not found in env. Running with in-memory mockup.");
    return;
  }
  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db(process.env.DB_CU || "lextrade");
    servicesCollection = db.collection("services");
    console.log("🚀 Connected to MongoDB successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection failed, falling back to mockup mode:", error);
  }
}

// ─── Temporary In-Memory Storage for Demo Fallback ───
let mockServices: any[] = [
  {
    _id: "svc-001",
    title: "Corporate Mergers & Acquisitions",
    shortDescription: "Expert guidance on corporate mergers, acquisitions, and restructuring for enterprises of all scales.",
    fullDescription: "Our corporate M&A practice provides end-to-end legal support for businesses navigating complex transactions. From due diligence and valuation to regulatory compliance and post-merger integration, we ensure seamless execution.",
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
    createdAt: new Date().toISOString(),
    userId: "usr-001",
  },
  {
    _id: "svc-002",
    title: "Criminal Defense Litigation",
    shortDescription: "Aggressive defense strategies for federal and state criminal charges with proven courtroom success.",
    fullDescription: "When facing criminal charges, you need a defense attorney who fights relentlessly. Our criminal defense practice handles everything from white-collar fraud to complex federal cases.",
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
    createdAt: new Date().toISOString(),
    userId: "usr-002",
  },
];

// ─── API Routes ───

// GET /api/services
app.get("/api/services", async (req: Request, res: Response) => {
  try {
    const { search, category, minRating, sort, page = "1", limit = "8" } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    if (servicesCollection) {
      // Build MongoDB query
      const query: any = {};
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } },
          { lawyerName: { $regex: search, $options: "i" } },
          { shortDescription: { $regex: search, $options: "i" } },
        ];
      }
      if (category) {
        query.category = category;
      }
      if (minRating) {
        query.rating = { $gte: parseFloat(minRating as string) };
      }

      // Sort
      const sortQuery: any = {};
      if (sort === "price-asc") sortQuery.pricePerHour = 1;
      else if (sort === "price-desc") sortQuery.pricePerHour = -1;
      else if (sort === "experience-desc") sortQuery.yearsExperience = -1;
      else sortQuery.rating = -1; // default highest rated

      const total = await servicesCollection.countDocuments(query);
      const data = await servicesCollection
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
      // Mock Filtering
      let result = [...mockServices];
      if (search) {
        const q = (search as string).toLowerCase();
        result = result.filter(
          (s) =>
            s.title.toLowerCase().includes(q) ||
            s.lawyerName.toLowerCase().includes(q) ||
            s.shortDescription.toLowerCase().includes(q)
        );
      }
      if (category) {
        result = result.filter((s) => s.category === category);
      }
      if (minRating) {
        result = result.filter((s) => s.rating >= parseFloat(minRating as string));
      }

      // Mock Sorting
      if (sort === "price-asc") result.sort((a, b) => a.pricePerHour - b.pricePerHour);
      else if (sort === "price-desc") result.sort((a, b) => b.pricePerHour - a.pricePerHour);
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
    if (servicesCollection) {
      let queryId;
      try {
        queryId = new ObjectId(id);
      } catch {
        return res.status(404).json({ message: "Invalid ID format" });
      }
      const service = await servicesCollection.findOne({ _id: queryId });
      if (!service) return res.status(404).json({ message: "Service not found" });
      res.json(service);
    } else {
      const service = mockServices.find((s) => s._id === id);
      if (!service) return res.status(404).json({ message: "Service not found" });
      res.json(service);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/services/user/:userId
app.get("/api/services/user/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (servicesCollection) {
      const data = await servicesCollection.find({ userId }).toArray();
      res.json(data);
    } else {
      const data = mockServices.filter((s) => s.userId === userId);
      res.json(data);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/services
app.post("/api/services", async (req: Request, res: Response) => {
  try {
    const newService = {
      ...req.body,
      createdAt: new Date().toISOString(),
    };

    if (servicesCollection) {
      const result = await servicesCollection.insertOne(newService);
      res.status(201).json({ ...newService, _id: result.insertedId });
    } else {
      const createdService = {
        ...newService,
        _id: `svc-${Date.now()}`,
      };
      mockServices.push(createdService);
      res.status(201).json(createdService);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/services/:id
app.delete("/api/services/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (servicesCollection) {
      let queryId;
      try {
        queryId = new ObjectId(id);
      } catch {
        return res.status(404).json({ message: "Invalid ID format" });
      }
      const result = await servicesCollection.deleteOne({ _id: queryId });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json({ message: "Service deleted successfully" });
    } else {
      const index = mockServices.findIndex((s) => s._id === id);
      if (index === -1) return res.status(404).json({ message: "Service not found" });
      mockServices.splice(index, 1);
      res.json({ message: "Service deleted successfully" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`📡 Server running on http://localhost:${PORT}`);
  connectDB();
});
