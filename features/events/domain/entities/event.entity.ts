export interface EventProps {
  postId: number;
  eventId: number;
  title: string;
  prize: string;
  winners: string;
  endDate: Date;
  link: string;
  originSourceUrl: string;
}

export class EventEntity {
  public readonly postId: number;
  public readonly eventId: number;
  public readonly title: string;
  public readonly prize: string;
  public readonly winners: string;
  public readonly endDate: Date;
  public readonly link: string;
  public readonly originSourceUrl: string;

  constructor(props: EventProps) {
    this.postId = props.postId;
    this.eventId = props.eventId;
    this.title = props.title;
    this.prize = props.prize;
    this.winners = props.winners;
    this.endDate = props.endDate;
    this.link = props.link;
    this.originSourceUrl = props.originSourceUrl;
  }
}
