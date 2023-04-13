import { Router, Request, Response } from "express";
import { UploadService } from "../services/upload/upload.service";
import { SubtitleRepository } from "../../infrastructure/database/repositories/subtitle/subtitle.repository";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import { getDb } from "../../infrastructure/database/mongodb.config";
import { UploadSubtitleDTO } from "../dto/subtitle/uploadSubtitle.dto";


const router = Router();
const slug = "/upload";

router.use(fileUpload());
router.post("/", async function (req, res) {
  try {
    const db = await getDb();
    const payload: UploadSubtitleDTO = {
      file: req.files.subtitle as fileUpload.UploadedFile,
      informations: req.body,
    };

    const subtitleRepository = new SubtitleRepository(db);
    const uploadService = new UploadService(subtitleRepository);
    const subtitle = await uploadService.uploadSubtitle(payload);
    res.status(201).json({ subtitle });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { router, slug };
