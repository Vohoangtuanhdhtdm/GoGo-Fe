import { ThumbsUp, MessageSquare, CheckCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { Comment } from "@/types/learning";
import { Textarea } from "@/components/ui/textarea";

// Component cho một bình luận
const CommentCard = ({ comment }: { comment: Comment }) => (
  <div className="flex gap-4">
    <Avatar>
      <AvatarImage src={comment.author.avatar} />
      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
    </Avatar>
    <div className="flex-grow">
      <div className="flex items-center gap-2">
        <p className="font-semibold">{comment.author.name}</p>
        <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
      </div>
      <p className="mt-1">{comment.content}</p>
      <div className="flex items-center gap-4 mt-2 text-sm">
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <ThumbsUp className="h-4 w-4" /> {comment.likes}
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4" /> Trả lời
        </Button>
        {comment.isResolved && (
          <span className="flex items-center gap-1 text-green-600">
            <CheckCheck className="h-4 w-4" /> Đã giải quyết
          </span>
        )}
      </div>
      {comment.replies.length > 0 && (
        <div className="mt-4 space-y-4 pl-6 border-l-2">
          {comment.replies.map((reply) => (
            <CommentCard key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  </div>
);

export const QandASection = ({ comments }: { comments: Comment[] }) => (
  <div>
    <div className="mb-6">
      <h3 className="font-semibold mb-2">Đặt câu hỏi của bạn</h3>
      <Textarea placeholder="Viết bình luận hoặc câu hỏi của bạn ở đây..." />
      <Button className="mt-2">Gửi bình luận</Button>
    </div>
    <div className="space-y-6">
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  </div>
);
