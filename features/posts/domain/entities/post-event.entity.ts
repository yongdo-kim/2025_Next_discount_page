export interface PostEventProps {
  organizer: string;
  entryMethod: string;
  winners: string;
  prize: string;
  period: string;
}

export class PostEventEntity {
  public readonly organizer: string;
  public readonly entryMethod: string;
  public readonly winners: string;
  public readonly prize: string;
  public readonly period: string;

  constructor(props: PostEventProps) {
    this.organizer = props.organizer;
    this.entryMethod = props.entryMethod;
    this.winners = props.winners;
    this.prize = props.prize;
    this.period = props.period;
  }
}
