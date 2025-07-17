import React from 'react';

const CommentList = ({ comments }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      {comments?.length ? comments.map((comment, i) => (
        <div key={i} className="border-b py-1 text-sm">
          <p><strong>{comment.user?.username}</strong>: {comment.text}</p>
          <p className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleString()}</p>
        </div>
      )) : <p>No comments yet.</p>}
    </div>
  );
};

export default CommentList