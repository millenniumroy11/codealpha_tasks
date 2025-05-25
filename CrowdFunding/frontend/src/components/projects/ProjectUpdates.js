import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ProjectUpdates = ({ projectId, isCreator }) => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await api.get(`/projects/${projectId}/updates/`);
        setUpdates(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load project updates');
        setLoading(false);
      }
    };

    fetchUpdates();
  }, [projectId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '8rem' }}>
        Loading updates...
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (updates.length === 0) {
    return (
      <div className="text-center p-4 border border-secondary border-dashed rounded">
        <p className="text-muted">No updates yet.</p>
        {isCreator && (
          <button className="btn btn-primary mt-3">Post First Update</button>
        )}
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-4">
      {updates.map(update => (
        <div key={update.id} className="border-bottom pb-3 mb-4">
          <div className="d-flex align-items-center mb-3">
            <img
              src={update.creator_avatar || "/api/placeholder/40/40"}
              alt={update.creator_name}
              className="rounded-circle me-3"
              style={{ width: '2rem', height: '2rem' }}
            />
            <div>
              <p className="fw-semibold mb-0">{update.creator_name}</p>
              <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>
                {new Date(update.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <h5 className="fw-bold">{update.title}</h5>
          <div dangerouslySetInnerHTML={{ __html: update.content }} />
        </div>
      ))}
    </div>
  );
};

export default ProjectUpdates;
