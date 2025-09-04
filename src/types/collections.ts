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
