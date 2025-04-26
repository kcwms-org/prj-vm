import { Rating } from "./Rating.enum";

export default class Testimonial {
  _id: string | undefined;
  createdAt: Date;
  hideEmail: boolean = true;
  name: string | undefined;
  rating: Rating = Rating.Four;
  text: string;

  constructor(rating: Rating = Rating.Five, text: string = "", createdAt: Date = new Date()) {
    this.text = text;
    this.rating = rating;
    this.createdAt = createdAt;
  }
}
