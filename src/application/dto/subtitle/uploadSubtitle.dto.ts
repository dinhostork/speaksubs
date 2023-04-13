import { SubtitleData } from "../../../application/services/upload/extractSubtitleData";
import { MovieInformation } from "../../../domain/subtitle/subtitle.entity";
import { UploadedFile } from "express-fileupload";

export interface UploadSubtitleDTO{
    file: UploadedFile,
    informations: MovieInformation
}