import { User } from "./User";

export interface Comment {
  text: string;
  username: string;
  date: string;
  image: string;
  isAuthor: boolean;
}

export interface Blog {
  _id: any;
  title: string;
  description: string;
  body: any;
  image: string;
  likes: string[];
  user: User;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}
