import { Subtitle, SubtitleDocument } from "../../../../domain/subtitle/subtitle.entity";
import { Db, Collection, ObjectId } from "mongodb";

export class SubtitleRepository {
  private readonly subtitles: Collection<SubtitleDocument>;

  constructor(db: Db) {
    this.subtitles = db.collection<SubtitleDocument>("subtitles");
  }

  async save(subtitle: SubtitleDocument): Promise<void> {
    this.subtitles.insertOne(subtitle);
  }

  async findById(id: string): Promise<SubtitleDocument | null> {
    const result = await this.subtitles.findOne({ _id: new ObjectId(id) });
    return result ? new Subtitle(result) : null;
  }

  async findAll(): Promise<SubtitleDocument[]> {
    const result = await this.subtitles.find().toArray();
    return result.map((r) => new Subtitle(r));
  }

  async delete(id: string): Promise<void> {
    await this.subtitles.deleteOne({ _id: new ObjectId(id) });
  }
}
