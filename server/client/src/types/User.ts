import { Blog } from "./Blog";

export interface User {
  _id: any;
  username: string;
  usernameAt: string;
  email: string;
  image: string;
  blogs: Blog[];
  followers: string[];
  following: string[];
  createdAt: string;
  updatedAt: string;
  bio: string;
  shortBio: string;
  blogsLiked: any;
}
