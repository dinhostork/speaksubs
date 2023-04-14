import { Router, Request, Response } from "express";
import { UploadService } from "../services/upload/upload.service";
import { SubtitleRepository } from "../../infrastructure/database/repositories/subtitle/subtitle.repository";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import { getDb } from "../../infrastructure/database/mongodb.config";
import { UploadSubtitleDTO } from "../dto/subtitle/uploadSubtitle.dto";
import { RabbitMQService } from "../../infrastructure/queue/rabbitmq.service";


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
    const rabbitMQService = new RabbitMQService({
      url: process.env.RABBITMQ_URL || "",
      queue: process.env.RABBITMQ_QUEUE || "",
      exchange: process.env.RABBITMQ_EXCHANGE || "",
    })

    const uploadService = new UploadService(subtitleRepository, rabbitMQService);

    const subtitle = await uploadService.uploadSubtitle(payload);
    res.status(201).json({ subtitle });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { router, slug };
