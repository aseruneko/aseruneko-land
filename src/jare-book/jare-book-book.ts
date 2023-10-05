export interface JareBookBook {
  authorId: string;
  pages: JareBookPage[];
  title?: string;
}

export interface JareBookPage {
  writerId: string;
  content?: string;
}
