import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const config = {};
config.PORT = process.env.PORT ?? 5000;
config.MONGODB_URI = process.env.MONGODB_URI;

export { config };
