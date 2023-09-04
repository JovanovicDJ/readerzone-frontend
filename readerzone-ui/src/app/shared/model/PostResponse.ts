import { Post } from "./Post";

export interface PostResponse {
    posts: Post[],
    totalPosts: number
}