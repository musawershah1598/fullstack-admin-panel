import dotenv from "dotenv";
import { ConnectOptions } from "mongoose";
import ms from "ms";

dotenv.config();

interface IConfig {
  env: string;
  port: number;
  database: {
    url: string;
    options: ConnectOptions;
  };
  jwt: {
    secret: string;
    accessExpiration: number | ms.StringValue | undefined;
    refreshExpiration: number | ms.StringValue | undefined;
  };
  email: {
    smtp: {
      host: string;
      port: number;
      auth: {
        user: string;
        pass: string;
      };
    };
    from: string;
  };
  frontendUrl: string;
}

const config: IConfig = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "5000", 10),

  database: {
    url: process.env.DATABASE_URL || "mongodb://localhost:27017/admin_panel",
    options: {},
  },

  jwt: {
    secret: process.env.JWT_SECRET || "your-secret-key-change-in-production",
    accessExpiration:
      (process.env.JWT_ACCESS_EXPIRATION as ms.StringValue) || "15m",
    refreshExpiration:
      (process.env.JWT_REFRESH_EXPIRATION as ms.StringValue) || "7d",
  },

  email: {
    smtp: {
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587", 10),
      auth: {
        user: process.env.SMTP_USER || "",
        pass: process.env.SMTP_PASS || "",
      },
    },
    from: process.env.EMAIL_FROM || "noreply@yourapp.com",
  },

  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
};

export default config;
