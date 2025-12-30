
export interface WhitePaperSection {
  id: string;
  title: string;
  content: string;
  isGenerating: boolean;
}

export interface ResearchSource {
  title: string;
  uri: string;
}

export interface GenerationResult {
  text: string;
  sources: ResearchSource[];
}
