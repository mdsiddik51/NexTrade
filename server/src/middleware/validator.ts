import { Request, Response, NextFunction } from "express";

export function validateServiceInput(req: Request, res: Response, next: NextFunction) {
  const { title, shortDescription, fullDescription, category, pricePerUnit, exchange, userId } = req.body;

  if (!title || typeof title !== "string" || title.trim().length < 5) {
    return res.status(400).json({ message: "Invalid title. Must be at least 5 characters long." });
  }

  if (!shortDescription || typeof shortDescription !== "string" || shortDescription.length > 150) {
    return res.status(400).json({ message: "Invalid short description. Must be 1-150 characters." });
  }

  if (!fullDescription || typeof fullDescription !== "string" || fullDescription.trim().length < 20) {
    return res.status(400).json({ message: "Invalid full description. Must be at least 20 characters long." });
  }

  if (!category || typeof category !== "string") {
    return res.status(400).json({ message: "Category is required." });
  }

  const price = Number(pricePerUnit);
  if (isNaN(price) || price < 0.0001) {
    return res.status(400).json({ message: "Price must be a valid positive number." });
  }

  if (!exchange || typeof exchange !== "string") {
    return res.status(400).json({ message: "Exchange is required." });
  }

  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ message: "UserId is required." });
  }

  next();
}
