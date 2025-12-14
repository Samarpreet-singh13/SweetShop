import { Router } from "express"
import { adminOnly, authMiddleware } from "../middlewares/Auth.middleware.js"
import { addSweets, deleteSweet, getSweets, purchaseSweet, restockSweet, searchSweets, updateSweet } from "../controllers/sweet.controller.js";

const router = Router();
router.route("/").get(getSweets);
router.route("/search").get(searchSweets);
router.route("/:id/purchase").post(authMiddleware, purchaseSweet);
router.route("/").post(authMiddleware,adminOnly, addSweets);
router.route("/:id").patch(authMiddleware,adminOnly, updateSweet);
router.route("/:id").delete(authMiddleware, adminOnly, deleteSweet);
router.route("/:id/restock").post(authMiddleware, adminOnly, restockSweet);

export default router