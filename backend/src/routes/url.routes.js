import express from "express";
import generateCode from "../utils/generateCode.js";
import urlModel from "../models/url.model.js";

const router = express.Router();

/***
 * @POST /api/url
 */

router.post("/", async function(req, res) {
    const { url } = req.body;

    if(!url){
        return res.status(400).json({ message: "URL is required" });

    }

    if(!url.startsWith("http://") && !url.startsWith("https://")){
        return res.status(400).json({ message: "Invalid URL format" });

    }

    if(url.length > 2048){
        return res.status(400).json({ message: "URL is too long" });

    }

    const shortCode = generateCode();

    const newUrl = new urlModel({
        url,
        shortCode,
    });

    await newUrl.save();
    return res.status(201).json(newUrl);
});

export default router;