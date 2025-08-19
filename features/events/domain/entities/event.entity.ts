export interface EventProps {
  postId: number;
  eventId: number;
  title: string;
  prize: string;
  winners: string;
  endDate: string;
  link: string;
  eventMethod: string;
  originSourceUrl: string;
  ogImage: string;
}

export class EventEntity {
  public readonly postId: number;
  public readonly eventId: number;
  public readonly title: string;
  public readonly prize: string;
  public readonly winners: string;
  public readonly endDate: string;
  public readonly link: string;
  public readonly originSourceUrl: string;
  public readonly eventMethod: string;
  public readonly ogImage: string;

  constructor(props: EventProps) {
    this.postId = props.postId;
    this.eventId = props.eventId;
    this.title = props.title;
    this.prize = props.prize;
    this.winners = props.winners;
    this.endDate = props.endDate;
    this.link = props.link;
    this.eventMethod = props.eventMethod;
    this.originSourceUrl = props.originSourceUrl;
    this.ogImage = props.ogImage;
  }
}
