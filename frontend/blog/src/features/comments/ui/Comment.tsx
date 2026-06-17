import Avatar from "@/ui/Avatar";
import Button from "@/ui/Button";
import { Reply } from "lucide-react";
import { CommentType } from "../types/comment";

interface CommentProps {
  comment: CommentType;
  onAddComment: () => void;
}

function Comment({ comment, onAddComment }: CommentProps) {
  return (
    <>
      <div className="flex items-center  justify-between mb-5 border-b border-b-secondary-100/50 pb-2 text/surfce">
        <div className="flex items-center gap-x-2">
          <Avatar />
          <div className="text-sm w-full">
            <span className="font-bold block mb-1">{comment.user?.name}</span>
            <span className="block text-xs">{comment.createdAt}</span>
          </div>
        </div>
        <div>
          {comment.openToComment && (
            <Button
              onClick={onAddComment}
              variant="secondary"
              className="text-sm flex gap-x-1 p-1 rounded-lg"
              icon={Reply}
            >
              پاسخ
            </Button>
          )}
        </div>
      </div>
      <p className="text-secondary-300 leading-loose lg:leading-8 text-xs lg:text-base">
        {comment.content?.text}
      </p>
    </>
  );
}

export default Comment;
