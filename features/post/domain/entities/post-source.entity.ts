export interface PostSourceProps {
  scrapingSourceUrl: string;
  originSourceUrl?: string;
}

export class PostSourceEntity {
  public readonly scrapingSourceUrl: string;
  public readonly originSourceUrl?: string;

  constructor(props: PostSourceProps) {
    this.scrapingSourceUrl = props.scrapingSourceUrl;
    this.originSourceUrl = props.originSourceUrl;
  }
}
