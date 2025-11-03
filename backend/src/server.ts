import config from "@/config/env";
import connectDB from "@/config/database";
import logger from "@/utils/logger";
import app from "@/app";

const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await connectDB();

    // Start server
    app.listen(config.port, () => {
      logger.info(
        `Server running on port ${config.port} in ${config.env} mode`
      );
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  logger.error("UNHANDLED REJECTION! Shutting down...");
  logger.error(err.name, err.message);
  process.exit(1);
});

startServer();
