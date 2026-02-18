import dotenv from "dotenv";
dotenv.config();

import { createApp } from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  await connectDB(process.env.MONGODB_URI);

  const app = createApp();
  app.listen(PORT, () => {
    console.log(`✅ API running on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error("❌ Server failed to start:", err);
  process.exit(1);
});