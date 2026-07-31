"use client";

import { FormEvent, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { Comment } from "@/lib/types/comment.types";
import { getComments } from "@/lib/api/comment/get";
import { createComment } from "@/lib/api/comment/create";
import { deleteComment } from "@/lib/api/comment/delete";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface CommentSectionProps {
  taskid: string;
  initialComments?: Comment[];
  currentUsername?: string;
}

export const CommentSection = ({ taskid, initialComments, currentUsername }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>(initialComments ?? []);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const refresh = async () => {
    try {
      const res = await getComments(taskid);
      setComments(res.data.comments);
    } catch {
      // no-op
    }
  };

  useEffect(() => {
    if (!initialComments) refresh();
  }, [taskid]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitting(true);
    try {
      const res = await createComment({ taskid, text });
      setComments((prev) => [...prev, res.data.comment]);
      setText("");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message ?? "Could not post comment");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentid: string) => {
    try {
      await deleteComment(commentid);
      setComments((prev) => prev.filter((c) => c._id !== commentid));
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message ?? "Delete failed");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-border">
        <div className="text-lg font-semibold">Activity</div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {comments.length === 0 ? (
          <div className="text-sm text-muted-foreground">No comments yet.</div>
        ) : (
          comments.map((c) => (
            <div key={c._id} className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold shrink-0">
                {c.username?.[0]?.toUpperCase() ?? "?"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{c.username}</span>
                  <span>{new Date(c.createdAt).toLocaleString()}</span>
                  {currentUsername === c.username && (
                    <button
                      type="button"
                      onClick={() => handleDelete(c._id)}
                      className="ml-auto text-muted-foreground hover:text-destructive"
                      aria-label="Delete comment"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  )}
                </div>
                <div className="mt-1 rounded-lg bg-muted px-3 py-2 text-sm whitespace-pre-wrap break-words">
                  {c.text}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t border-border flex flex-col gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="w-full min-h-16 resize-y rounded-md border border-border bg-background p-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={submitting || !text.trim()} size="sm">
            {submitting ? "Posting..." : "Post"}
          </Button>
        </div>
      </form>
    </div>
  );
};
