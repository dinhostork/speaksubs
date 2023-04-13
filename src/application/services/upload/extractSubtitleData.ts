import parseSRT from 'parse-srt';

export interface SubtitleData {
  text: string;
  start: number;
  end: number;
}

export function extractSubtitleData(fileContent: string, mimeType: string): SubtitleData[] {
  let subtitles: SubtitleData[];

  if (mimeType.includes("srt") || mimeType.includes("x-subrip")) {
    
    subtitles = parseSRT(fileContent);

    subtitles.forEach(subtitle => {
        subtitle.text = subtitle.text.replace(/<\/?[^>]+(>|$)/g, " ");
      });

  } else {

    throw new Error("Parsing de arquivos VTT ainda não foi implementado.");
  }

  return subtitles;
}
