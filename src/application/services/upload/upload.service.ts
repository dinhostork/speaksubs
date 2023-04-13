import { Subtitle, SubtitleDocument } from "../../../domain/subtitle/subtitle.entity";
import { SubtitleRepository } from "../../../infrastructure/database/repositories/subtitle/subtitle.repository";
import { extractSubtitleData, SubtitleData } from "./extractSubtitleData";
import iconv from 'iconv-lite';
import jschardet from 'jschardet';
import { UploadSubtitleDTO } from "../../dto/subtitle/uploadSubtitle.dto";

export class UploadService {
  constructor(private readonly subtitleRepository: SubtitleRepository) {}

  async uploadSubtitle(payload: UploadSubtitleDTO): Promise<SubtitleDocument> {
    const {file, informations} = payload;

    const { mimetype, data } = file;

    if(!informations.title) {
      throw new Error("Informações do filme não foram enviadas.");
    }

    if (!mimetype.includes("srt") && !mimetype.includes("vtt") && !mimetype.includes("x-subrip")) {
      throw new Error("Formato de arquivo inválido. Use SRT ou VTT.");
    }


    
    const detectedCharset = jschardet.detect(data).encoding;
    const utf8Content = iconv.decode(data, "iso-8859-1" || "utf-8");


    const subtitleData: SubtitleData[] = extractSubtitleData(utf8Content, mimetype);
    
    const subtitle = new Subtitle({ 
      movieInformation: informations,
      subtitleData: subtitleData });
    
    await this.subtitleRepository.save(subtitle);

    return subtitle;
  }
}
