import { Router } from "express";
import { validate } from "../middleware/validateRequest.js";
import { getAccidentByIndex } from "../controllers/accidents/get-by-index.js";
import { getAccidentByLocation } from "../controllers/accidents/get-accident-by-location.js";
import { getAccidentByLocationSchema } from "../zodSchemas/accidents-schema.js";





export const router = Router();


router.get('/accidents/index/:index', validate(getAccidentByIndex) )

router.get('/accidents/get-by-location', validate(getAccidentByLocation, getAccidentByLocationSchema))