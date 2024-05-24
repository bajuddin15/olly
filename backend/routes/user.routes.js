import express from "express";
import {
  createAboutBusiness,
  createUser,
  getUser,
} from "../controllers/user.controllers.js";

const router = express.Router();

// Prefix - /api/users
router.post("/create", createUser);
router.post("/aboutBusiness/create/:id", createAboutBusiness);
router.post("/getUser", getUser);

export default router;
