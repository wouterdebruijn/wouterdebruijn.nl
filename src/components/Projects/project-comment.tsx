import { Comment } from "@/types/collections";

interface ProjectCommentProps {
  comment: Comment;
  replies?: Comment[];
}

function CommentReply({ comment }: { comment: Comment }) {
  return (
    <div className="mt-2">
      <h1 className="text-xl">@{comment.author}</h1>
      <p className="whitespace-pre-line">{comment.content}</p>
    </div>
  );
}

export default function ProjectComment({
  comment: { author, content },
  replies,
}: ProjectCommentProps) {
  return (
    <section className="bg-white shadow-md p-4 relative my-2">
      <h1 className="text-xl">@{author}</h1>
      <p className="whitespace-pre-line">{content}</p>

      <div className="ml-8">
        {replies?.map((c) => (
          <CommentReply key={c.id} comment={c} />
        ))}
      </div>

      <div className="text-right text-gray-400 absolute bottom-2 right-4">
        <p className="text-xs m-0">
          Created: {new Date().toLocaleDateString()}
        </p>
      </div>
    </section>
  );
}
