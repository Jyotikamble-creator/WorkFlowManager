import React from 'react';

// CommentList component displays a list of comments for a task
// Props:
//   comments: Array of comment objects to display
const CommentList = ({ comments }) => {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">💬 Comments</h3>

      {/* If there are comments, display them; otherwise show a message */}
      {comments?.length ? (
        <div className="space-y-3">
          {comments.map((comment, i) => (
            <div key={i} className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded">
              <div className="flex justify-between items-start">
                {/* Comment author */}
                <p className="font-bold text-gray-800">{comment.createdBy?.name || 'Anonymous'}</p>
                {/* Comment timestamp */}
                <p className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
              {/* Comment text */}
              <p className="text-gray-700 mt-2">{comment.text}</p>
            </div>
          ))}
        </div>
      ) : <p className="text-gray-600 text-center py-8">No comments yet. Be the first to comment!</p>}
    </div>
  );
};

export default CommentList