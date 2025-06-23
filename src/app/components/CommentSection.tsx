"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function CommentSection({ projectId }: { projectId: string }) {
  const [comments, setComments] = useState<
    {
      id: string;
      message: string;
      createdAt: string;
      user: {
        name: string;
        image: string;
      };
    }[]
  >([]);
  const [message, setMessage] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    fetch(`/api/projects/${projectId}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [projectId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;

    await fetch(`/api/projects/${projectId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, projectId }),
    });

    setMessage("");
    const res = await fetch(`/api/projects/${projectId}/comments`);
    const data = await res.json();
    setComments(data);
  };

  return (
    <div className="mt-20 max-w-2xl mx-auto">
      {session ? (
        <>
          <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>
          <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <textarea
              value={message}
              placeholder="Your comment"
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              rows={4}
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 cursor-pointer"
            >
              Submit
            </button>
          </form>
        </>
      ) : (
        <p>Please sign in to leave a comment.</p>
      )}

      <div>
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="border-t py-4 flex gap-4 items-start"
          >
            <img
              src={comment.user?.image || "/default-avatar.png"}
              alt={comment.user?.name || "User avatar"}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">
                {comment.user?.name || "Anonymous"}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
              <p className="mt-1">{comment.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
