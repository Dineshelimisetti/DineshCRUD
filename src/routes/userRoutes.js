import express from "express";
import { registerUser } from "../controllers/userController.js";
import { upload } from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ])
);

export default router;
