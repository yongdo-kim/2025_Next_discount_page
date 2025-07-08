export interface PostSourceProps {
  scrapingSourceUrl: string;
  originSourceUrl?: string | null;
}

export class PostSourceEntity {
  public readonly scrapingSourceUrl: string;
  public readonly originSourceUrl?: string | null;

  constructor(props: PostSourceProps) {
    this.scrapingSourceUrl = props.scrapingSourceUrl;
    this.originSourceUrl = props.originSourceUrl;
  }
}
