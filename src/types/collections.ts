export type Comment = {
  id: string;
  author: string;
  project: string;
  reply_to: string | null;
  replies: Comment[];
  content: string;
  created: Date;
  updated: Date;
};

export enum ReactionType {
  LIKE = "👍",
  LOVE = "❤️",
  THINKING = "🤔",
  EYES = "👀",
  DISLIKE = "👎",
  BORING = "😴",
}

export type Reaction = {
  id: string;
  project: string;
  reaction: ReactionType;
  author: string;
  created: Date;
  updated: Date;
};
