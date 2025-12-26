import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  try {
    // Increment visitor count
    const count = await kv.incr("portfolio_visits");

    res.status(200).json({ visitors: count });
  } catch (error) {
    res.status(500).json({ error: "Failed to count visit" });
  }
}
