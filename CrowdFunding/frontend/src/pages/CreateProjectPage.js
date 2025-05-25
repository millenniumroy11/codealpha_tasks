import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import ReactQuill from 'react-quill'; // You would need to install this
import 'react-quill/dist/quill.snow.css'; // And import the styles

const CreateProjectPage = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const [projectData, setProjectData] = useState({
    title: '',
    category: '',
    goal_amount: '',
    end_date: '',
    description: '',
    content: '',
    image: null,
    image_preview: null,
  });

  useEffect(() => {
    // Redirect if not logged in
    if (!authLoading && !user) {
      navigate('/login', { state: { redirectTo: '/create-project' } });
      return;
    }

    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories/');
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, [user, authLoading, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value
    });
  };

  const handleContentChange = (content) => {
    setProjectData({
      ...projectData,
      content
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProjectData({
        ...projectData,
        image: file,
        image_preview: URL.createObjectURL(file)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      Object.keys(projectData).forEach(key => {
        if (key !== 'image_preview' && projectData[key] !== null) {
          formData.append(key, projectData[key]);
        }
      });

      const response = await api.post('/projects/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate(`/projects/${response.data.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create project');
      window.scrollTo(0, 0);
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || loading) {
    return <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>Loading...</div>;
  }

  // Calculate min date for end date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="container py-4">
      <div className="mx-auto" style={{ maxWidth: '900px' }}>
        <h1 className="h3 mb-3 font-weight-bold">Start Your Project</h1>
        <p className="text-muted mb-4">Share your creative project with the world and get the funding you need.</p>

        {error && (
          <div className="alert alert-danger mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Project Basics</h5>
              
              <div className="form-group mb-3">
                <label htmlFor="title">Project Title <span className="text-danger">*</span></label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={projectData.title}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              
              <div className="form-group mb-3">
                <label htmlFor="category">Category <span className="text-danger">*</span></label>
                <select
                  id="category"
                  name="category"
                  value={projectData.category}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group mb-3">
                <label htmlFor="description">Short Description <span className="text-danger">*</span></label>
                <textarea
                  id="description"
                  name="description"
                  value={projectData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="form-control"
                  placeholder="Provide a short summary of your project (max 200 characters)"
                  maxLength="200"
                  required
                />
              </div>
              
              <div className="form-group mb-3">
                <label htmlFor="image">Project Image <span className="text-danger">*</span></label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-control-file"
                  required
                />
                {projectData.image_preview && (
                  <div className="mt-3">
                    <img 
                      src={projectData.image_preview} 
                      alt="Preview" 
                      className="img-fluid rounded"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Funding</h5>
              
              <div className="form-group mb-3">
                <label htmlFor="goal_amount">Funding Goal ($) <span className="text-danger">*</span></label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                  </div>
                  <input
                    type="number"
                    id="goal_amount"
                    name="goal_amount"
                    value={projectData.goal_amount}
                    onChange={handleInputChange}
                    className="form-control"
                    min="1"
                    step="1"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group mb-3">
                <label htmlFor="end_date">Campaign End Date <span className="text-danger">*</span></label>
                <input
                  type="date"
                  id="end_date"
                  name="end_date"
                  value={projectData.end_date}
                  onChange={handleInputChange}
                  min={minDate}
                  className="form-control"
                  required
                />
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Project Details</h5>
              
              <div className="form-group mb-3">
                <label htmlFor="content">Project Content <span className="text-danger">*</span></label>
                <div className="border rounded">
                  <ReactQuill
                    value={projectData.content}
                    onChange={handleContentChange}
                    theme="snow"
                    className="h-100"
                  />
                </div>
                <small className="form-text text-muted mt-2">
                  Describe your project in detail. Include your background, what you're planning to create, how the funds will be used, etc.
                </small>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn btn-outline-secondary mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectPage;
