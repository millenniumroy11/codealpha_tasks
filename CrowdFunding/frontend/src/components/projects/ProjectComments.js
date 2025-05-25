import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';

const ProjectComments = ({ projectId }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/projects/${projectId}/comments/`);
        setComments(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load comments');
        setLoading(false);
      }
    };

    fetchComments();
  }, [projectId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const response = await api.post(`/projects/${projectId}/comments/`, {
        content: newComment
      });
      setComments([response.data, ...comments]);
      setNewComment('');
    } catch (err) {
      setError('Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '8rem' }}>
        Loading comments...
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      {user ? (
        <form onSubmit={handleSubmitComment} className="mb-4">
          <div className="mb-3">
            <label htmlFor="comment" className="form-label fw-semibold">
              Leave a comment
            </label>
            <textarea
              id="comment"
              rows="3"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="form-control"
              placeholder="Share your thoughts about this project"
              required
            ></textarea>
          </div>
          <div className="text-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      ) : (
        <div className="alert alert-secondary text-center">
          Please <a href="/login" className="text-decoration-underline">log in</a> to leave a comment.
        </div>
      )}

      <div className="d-flex flex-column gap-4">
        {comments.length === 0 ? (
          <p className="text-center text-muted py-4">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="border-bottom pb-3">
              <div className="d-flex align-items-start gap-3">
                <img
                  src={comment.user.avatar || "/api/placeholder/40/40"}
                  alt={comment.user.name}
                  className="rounded-circle"
                  style={{ width: '2.5rem', height: '2.5rem' }}
                />
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="fw-semibold mb-0">{comment.user.name}</p>
                      <small className="text-muted">{new Date(comment.created_at).toLocaleDateString()}</small>
                    </div>
                  </div>
                  <p className="mt-2 mb-0">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectComments;
