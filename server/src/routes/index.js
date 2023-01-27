import express from "express"
import userRoute from "./userRoute.js"
import mediaRoute from "./mediaRoute.js"
import personRoute from "./personRoute.js"
import reviewRoute from "./reviewRoute.js"

const router = express.Router()

router.use("/user", userRoute)
router.use("/person", personRoute)
router.use("/reviews", reviewRoute)
router.use("/:mediaType", mediaRoute)

export default router
