// src/pages/DashboardPage.js
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  const [myProjects, setMyProjects] = useState([]);
  const [backedProjects, setBackedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Redirect if not logged in
    if (!authLoading && !user) {
      navigate('/login', { state: { redirectTo: '/dashboard' } });
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const [projectsRes, backedRes] = await Promise.all([ 
          api.get('/user/projects/'), 
          api.get('/user/backed/') 
        ]);
        setMyProjects(projectsRes.data);
        setBackedProjects(backedRes.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user, authLoading, navigate]);

  if (authLoading || loading) {
    return <div className="d-flex justify-content-center align-items-center h-64">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container py-4 text-center">
        <div className="alert alert-danger">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="max-w-5xl mx-auto">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h1 className="h4 mb-0">Dashboard</h1>
          </div>
          <div className="card-body">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`nav-link ${activeTab === 'projects' ? 'active' : ''}`}
                >
                  My Projects
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => setActiveTab('backed')}
                  className={`nav-link ${activeTab === 'backed' ? 'active' : ''}`}
                >
                  Projects I've Backed
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                >
                  Profile
                </button>
              </li>
            </ul>

            <div className="mt-4">
              {activeTab === 'projects' && (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>My Projects</h2>
                    <Link to="/create-project" className="btn btn-success">
                      Create New Project
                    </Link>
                  </div>
                  {myProjects.length === 0 ? (
                    <div className="text-center py-5 border border-dashed border-gray-300 rounded-md">
                      <p className="text-muted mb-4">You haven't created any projects yet.</p>
                      <Link to="/create-project" className="btn btn-primary">
                        Start Your First Project
                      </Link>
                    </div>
                  ) : (
                    <div className="list-group">
                      {myProjects.map((project) => (
                        <div key={project.id} className="list-group-item border mb-3">
                          <div className="d-flex flex-column flex-sm-row">
                            <div className="sm-w-25 mb-3 mb-sm-0 pr-3">
                              <img
                                src={project.image_url || "/api/placeholder/200/150"}
                                alt={project.title}
                                className="img-fluid rounded"
                              />
                            </div>
                            <div className="sm-w-75">
                              <div className="d-flex justify-content-between mb-2">
                                <h5>{project.title}</h5>
                                <span
                                  className={`badge ${project.status === 'active' ? 'bg-success' : project.status === 'funded' ? 'bg-primary' : 'bg-secondary'}`}
                                >
                                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                </span>
                              </div>
                              <p>{project.description}</p>
                              <div className="mb-3">
                                <div className="d-flex justify-content-between">
                                  <span className="font-weight-bold">${project.current_amount.toLocaleString()}</span>
                                  <span className="text-muted">
                                    {Math.round((project.current_amount / project.goal_amount) * 100)}%
                                  </span>
                                </div>
                                <div className="progress" style={{ height: '8px' }}>
                                  <div
                                    className="progress-bar bg-primary"
                                    style={{
                                      width: `${Math.min(100, (project.current_amount / project.goal_amount) * 100)}%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="text-muted">
                                  <span>{project.backers_count} backers</span>
                                  <span className="mx-2">•</span>
                                  <span>
                                    {Math.ceil((new Date(project.end_date) - new Date()) / (1000 * 60 * 60 * 24))}{' '}
                                    days left
                                  </span>
                                </div>
                                <div>
                                  <Link to={`/dashboard/projects/${project.id}/edit`} className="btn btn-sm btn-outline-secondary mr-2">
                                    Edit
                                  </Link>
                                  <Link to={`/projects/${project.id}`} className="btn btn-sm btn-primary">
                                    View
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {activeTab === 'backed' && (
                <>
                  <h2>Projects I've Backed</h2>
                  {backedProjects.length === 0 ? (
                    <div className="text-center py-5 border border-dashed border-gray-300 rounded-md">
                      <p className="text-muted mb-4">You haven't backed any projects yet.</p>
                      <Link to="/" className="btn btn-primary">
                        Discover Projects
                      </Link>
                    </div>
                  ) : (
                    <div className="list-group">
                      {backedProjects.map((backing) => (
                        <div key={backing.id} className="list-group-item border mb-3">
                          <div className="d-flex flex-column flex-sm-row">
                            <div className="sm-w-25 mb-3 mb-sm-0 pr-3">
                              <img
                                src={backing.project.image_url || "/api/placeholder/200/150"}
                                alt={backing.project.title}
                                className="img-fluid rounded"
                              />
                            </div>
                            <div className="sm-w-75">
                              <h5>{backing.project.title}</h5>
                              <p>{backing.project.description}</p>
                              <div className="mb-3">
                                <div className="d-flex justify-content-between">
                                  <span className="font-weight-bold">${backing.project.current_amount.toLocaleString()}</span>
                                  <span className="text-muted">
                                    {Math.round((backing.project.current_amount / backing.project.goal_amount) * 100)}%
                                  </span>
                                </div>
                                <div className="progress" style={{ height: '8px' }}>
                                  <div
                                    className="progress-bar bg-primary"
                                    style={{
                                      width: `${Math.min(100, (backing.project.current_amount / backing.project.goal_amount) * 100)}%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <span className="font-weight-bold">Your contribution: </span>
                                  <span className="text-primary">
                                    ${backing.amount.toLocaleString()}
                                  </span>
                                  <span className="mx-2 text-muted">•</span>
                                  <span>{new Date(backing.created_at).toLocaleDateString()}</span>
                                </div>
                                <Link to={`/projects/${backing.project.id}`} className="btn btn-sm btn-primary">
                                  View Project
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {activeTab === 'profile' && (
                <>
                  <h2>Profile Settings</h2>
                  <div className="max-w-md mx-auto">
                    <div className="text-center mb-4">
                      <div className="rounded-circle overflow-hidden mb-3">
                        <img
                          src={user.avatar || "/api/placeholder/100/100"}
                          alt={user.name}
                          className="img-fluid"
                        />
                      </div>
                      <h4>{user.name}</h4>
                      <p>{user.email}</p>
                    </div>
                    <form>
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          id="name"
                          defaultValue={user.name}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="bio">Bio</label>
                        <textarea
                          id="bio"
                          rows="3"
                          defaultValue={user.bio}
                          className="form-control"
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input
                          type="text"
                          id="location"
                          defaultValue={user.location}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="avatar">Profile Picture</label>
                        <input
                          type="file"
                          id="avatar"
                          accept="image/*"
                          className="form-control"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary btn-block mt-4">
                        Update Profile
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
