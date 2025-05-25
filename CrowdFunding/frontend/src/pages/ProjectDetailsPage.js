import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import ProjectUpdates from '../components/projects/ProjectUpdates';
import BackProjectForm from '../components/projects/BackProjectForm';
import ProjectComments from '../components/projects/ProjectComments';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${id}/`);
        setProject(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load project details');
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>Loading...</div>;
  }

  if (error) {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-danger">{error}</div>
        <button 
          onClick={() => navigate('/')}
          className="btn btn-primary"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container text-center py-5">
        <h2 className="h4 mb-4">Project not found</h2>
        <button 
          onClick={() => navigate('/')}
          className="btn btn-primary"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const percentFunded = Math.min(100, Math.round((project.current_amount / project.goal_amount) * 100));
  const daysLeft = Math.ceil((new Date(project.end_date) - new Date()) / (1000 * 60 * 60 * 24));
  const isCreator = user && user.id === project.creator_id;
  const isActive = daysLeft > 0;

  return (
    <div className="container py-5">
      <div className="card mb-4">
        <div className="position-relative">
          <img 
            src={project.image_url || "/api/placeholder/1200/400"} 
            alt={project.title}
            className="card-img-top"
            style={{ height: '300px', objectFit: 'cover' }}
          />
          <div className="position-absolute bottom-0 start-0 end-0 bg-gradient-to-top p-4">
            <h1 className="text-white">{project.title}</h1>
          </div>
        </div>

        <div className="card-body">
          <div className="d-flex flex-column flex-md-row">
            <div className="col-md-8 pe-md-5">
              <div className="d-flex align-items-center mb-4">
                <img 
                  src={project.creator_avatar || "/api/placeholder/40/40"} 
                  alt={project.creator_name}
                  className="rounded-circle me-3"
                  style={{ width: '40px', height: '40px' }}
                />
                <div>
                  <p className="mb-0 small text-muted">By {project.creator_name}</p>
                  <p className="mb-0 text-muted small">{project.creator_location}</p>
                </div>
              </div>

              <div className="border-bottom mb-4">
                <nav className="nav nav-pills">
                  <button
                    onClick={() => setActiveTab('about')}
                    className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
                  >
                    About
                  </button>
                  <button
                    onClick={() => setActiveTab('updates')}
                    className={`nav-link ${activeTab === 'updates' ? 'active' : ''}`}
                  >
                    Updates
                  </button>
                  <button
                    onClick={() => setActiveTab('comments')}
                    className={`nav-link ${activeTab === 'comments' ? 'active' : ''}`}
                  >
                    Comments
                  </button>
                </nav>
              </div>

              {activeTab === 'about' && (
                <div>
                  <p>{project.description}</p>
                  {project.content && (
                    <div className="mt-4" dangerouslySetInnerHTML={{ __html: project.content }} />
                  )}
                </div>
              )}

              {activeTab === 'updates' && (
                <ProjectUpdates projectId={project.id} isCreator={isCreator} />
              )}

              {activeTab === 'comments' && (
                <ProjectComments projectId={project.id} />
              )}
            </div>

            <div className="col-md-4 mt-4 mt-md-0">
              <div className="bg-light p-4 rounded sticky-top">
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="h5">${project.current_amount.toLocaleString()}</span>
                    <span className="text-muted small">pledged of ${project.goal_amount.toLocaleString()} goal</span>
                  </div>
                  <div className="progress mb-3" style={{ height: '10px' }}>
                    <div 
                      className="progress-bar" 
                      style={{ width: `${percentFunded}%` }}
                      role="progressbar"
                    />
                  </div>
                  <div className="d-flex justify-content-between small">
                    <span className="fw-bold">{percentFunded}%</span>
                    <span>{project.backers_count} backers</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="d-flex align-items-center mb-2">
                    <svg className="bi bi-calendar-week me-2" width="16" height="16" fill="currentColor">
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V2h10V.5a.5.5 0 0 1 1 0V2a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V.5a.5.5 0 0 1 .5-.5zM1 3v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3H1z"/>
                    </svg>
                    {daysLeft > 0 ? (
                      <span className="fw-bold">{daysLeft} days to go</span>
                    ) : (
                      <span className="fw-bold text-danger">Campaign ended</span>
                    )}
                  </div>
                  <p className="text-muted small">Campaign ends on {new Date(project.end_date).toLocaleDateString()}</p>
                </div>

                {isActive ? (
                  isCreator ? (
                    <div>
                      <button 
                        onClick={() => navigate(`/dashboard/projects/${project.id}/edit`)}
                        className="btn btn-primary w-100 mb-3"
                      >
                        Edit Project
                      </button>
                      <button 
                        onClick={() => navigate(`/dashboard/projects/${project.id}/updates/new`)}
                        className="btn btn-success w-100"
                      >
                        Post Update
                      </button>
                    </div>
                  ) : (
                    <BackProjectForm projectId={project.id} setProject={setProject} />
                  )
                ) : (
                  <div className="bg-light p-3 rounded text-center">
                    <p>This campaign has ended</p>
                  </div>
                )}

                <div className="mt-4">
                  <h5 className="mb-2">Share this project</h5>
                  <div className="d-flex">
                    <button className="btn btn-outline-primary me-2">
                      <i className="bi bi-twitter" />
                    </button>
                    <button className="btn btn-outline-primary me-2">
                      <i className="bi bi-facebook" />
                    </button>
                    <button className="btn btn-outline-primary me-2">
                      <i className="bi bi-linkedin" />
                    </button>
                    <button className="btn btn-outline-primary">
                      <i className="bi bi-envelope" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
