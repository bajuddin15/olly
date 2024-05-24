import dotenv from "dotenv";
dotenv.config();

const config = {};
config.PORT = process.env.PORT ?? 4000;
config.MONGODB_URI = process.env.MONGODB_URI;

export { config };
