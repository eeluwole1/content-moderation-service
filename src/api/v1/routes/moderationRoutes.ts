import { Router } from "express";
import {
	moderatePost,
	flagUser,
	getPostById,
	getUserProfile,
	getFlaggedContentStats,
} from "../controllers/moderationController";

const router: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Moderation
 *   description: API endpoints for content moderation and management
 */

/**
 * @swagger
 * /api/v1/moderation/post/{id}:
 *   get:
 *     summary: Retrieve a post by ID
 *     tags: [Moderation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 */
router.get("/post/:id", getPostById);

/**
 * @swagger
 * /api/v1/moderation/post/{id}/moderate:
 *   post:
 *     summary: Moderate a post by ID
 *     tags: [Moderation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to moderate
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post moderated successfully
 */
router.post("/post/:id/moderate", moderatePost);

/**
 * @swagger
 * /api/v1/moderation/user/{id}/profile:
 *   get:
 *     summary: Retrieve a user profile by ID
 *     tags: [Moderation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user profile
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 */
router.get("/user/:id/profile", getUserProfile);

/**
 * @swagger
 * /api/v1/moderation/user/{id}/flag:
 *   post:
 *     summary: Flag a user by ID
 *     tags: [Moderation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to flag
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 example: "Spam"
 *                 description: Reason for flagging the user
 *     responses:
 *       200:
 *         description: User flagged successfully
 */
router.post("/user/:id/flag", flagUser);

/**
 * @swagger
 * /api/v1/moderation/content/flags/stats:
 *   get:
 *     summary: Retrieve statistics on flagged content
 *     tags: [Moderation]
 *     responses:
 *       200:
 *         description: Flagged content statistics retrieved successfully
 */
router.get("/content/flags/stats", getFlaggedContentStats);
export default router;