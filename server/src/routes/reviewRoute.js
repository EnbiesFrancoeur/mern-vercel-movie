import express from "express"
import { body } from "express-validator"
import reviewController from "../controllers/reviewController.js"
import tokenMiddleware from "../middlewares/tokenMiddleware.js"
import requestHandler from "../handlers/requestHandler.js"

const router = express.Router({ mergeParams: true })

router.get("/", tokenMiddleware.auth, reviewController.getUserReviews)

router.post(
  "/",
  tokenMiddleware.auth,
  body("mediaId")
    .exists()
    .withMessage("mediaId is required")
    .isLength({ min: 1 })
    .withMessage("mediaId is required"),
  body("content")
    .exists()
    .withMessage("content is required")
    .isLength({ min: 1 })
    .withMessage("Whoops... You forgot to fill your review"),
  body("mediaType")
    .exists()
    .withMessage("mediaType is required")
    .custom((type) => ["movie", "tv"].includes(type))
    .withMessage("mediaType is invalid"),
  body("mediaTitle").exists().withMessage("mediaTitle is required"),
  body("mediaPoster").exists().withMessage("mediaPoster is required"),
  requestHandler.validate,
  reviewController.addReview
)

router.delete("/:reviewId", tokenMiddleware.auth, reviewController.removeReview)

export default router
