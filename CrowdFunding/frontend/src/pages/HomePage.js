import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ProjectCard from '../components/projects/ProjectCard';
import CategoryFilter from '../components/filters/CategoryFilter';

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [featuredProject, setFeaturedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, categoriesRes] = await Promise.all([
          api.get('/projects/'),
          api.get('/categories/')
        ]);
        
        setProjects(projectsRes.data);
        if (projectsRes.data.length > 0) {
          setFeaturedProject(projectsRes.data.find(p => p.featured) || projectsRes.data[0]);
        }
        setCategories(categoriesRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  if (loading) {
    return <div className="d-flex justify-content-center align-items-center" style={{ height: '256px' }}>Loading...</div>;
  }

  return (
    <div className="container py-5">
      {featuredProject && (
        <div className="mb-5">
          <h2 className="h3 font-weight-bold mb-4">Featured Project</h2>
          <div className="card shadow-lg overflow-hidden">
            <div className="row no-gutters">
              <div className="col-md-4">
                <img 
                  className="card-img" 
                  src={featuredProject.image_url || "/api/placeholder/400/320"} 
                  alt={featuredProject.title} 
                />
              </div>
              <div className="col-md-8 p-4">
                <div className="text-uppercase text-muted small font-weight-bold">
                  {featuredProject.category}
                </div>
                <Link to={`/projects/${featuredProject.id}`} className="h5 text-dark font-weight-bold mb-2 text-decoration-none">
                  {featuredProject.title}
                </Link>
                <p className="text-muted mb-3">{featuredProject.description.substring(0, 150)}...</p>
                <div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="badge badge-pill badge-info">
                      {Math.round((featuredProject.current_amount / featuredProject.goal_amount) * 100)}% Funded
                    </span>
                    <span className="text-muted small">
                      ${featuredProject.current_amount.toLocaleString()} of ${featuredProject.goal_amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="progress mb-4" style={{ height: '8px' }}>
                    <div 
                      style={{ width: `${Math.min(100, (featuredProject.current_amount / featuredProject.goal_amount) * 100)}%` }} 
                      className="progress-bar bg-info"
                    />
                  </div>
                </div>
                <div>
                  <Link 
                    to={`/projects/${featuredProject.id}`}
                    className="btn btn-primary btn-lg"
                  >
                    View Project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h3 font-weight-bold">Discover Projects</h2>
          <CategoryFilter 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />
        </div>
        
        {filteredProjects.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">No projects found in this category.</p>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
      
      <div className="card bg-light p-5">
        <div className="text-center">
          <h2 className="h3 font-weight-bold mb-4">Start Your Own Project</h2>
          <p className="mb-4">Have an idea? Get funded by sharing it with our community.</p>
          <Link 
            to="/create-project" 
            className="btn btn-success btn-lg"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
