import mongoose from "mongoose";
import config from "./env";
import logger from "@/utils/logger";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(
      config.database.url,
      config.database.options
    );
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(
      `MongoDB Connection Error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  logger.warn("MongoDB disconnected");
});

mongoose.connection.on("error", (err: Error) => {
  logger.error(`MongoDB error: ${err.message}`);
});

export default connectDB;
