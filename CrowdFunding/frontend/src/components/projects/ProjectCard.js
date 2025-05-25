import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const percentFunded = Math.min(100, Math.round((project.current_amount / project.goal_amount) * 100));
  const daysLeft = Math.ceil((new Date(project.end_date) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="card shadow-sm h-100">
      <img
        src={project.image_url || "/api/placeholder/400/200"}
        alt={project.title}
        className="card-img-top"
        style={{ height: '12rem', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <span className="badge bg-primary text-light mb-2 align-self-start">
          {project.category}
        </span>
        <Link to={`/projects/${project.id}`} className="text-decoration-none">
          <h5 className="card-title text-dark mb-2">{project.title}</h5>
        </Link>
        <p className="card-text text-muted small mb-3" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {project.description}
        </p>

        <div className="mb-3">
          <div className="d-flex justify-content-between small mb-1">
            <strong>${project.current_amount.toLocaleString()}</strong>
            <span className="text-muted">{percentFunded}%</span>
          </div>
          <div className="progress" style={{ height: '0.5rem' }}>
            <div
              className="progress-bar bg-primary"
              role="progressbar"
              style={{ width: `${percentFunded}%` }}
              aria-valuenow={percentFunded}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>

        <div className="d-flex justify-content-between small text-muted mt-auto">
          <span>by {project.creator_name}</span>
          <span>{daysLeft > 0 ? `${daysLeft} days left` : 'Ended'}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
