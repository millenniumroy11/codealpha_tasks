# Crowdfunding Backend

This is the Django backend for the Crowdfunding platform.

## Setup Instructions

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
- Windows:
```bash
.\venv\Scripts\activate
```
- Unix/MacOS:
```bash
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create a superuser:
```bash
python manage.py createsuperuser
```

6. Run the development server:
```bash
python manage.py runserver
```

The server will start at http://localhost:8000/

## API Endpoints

- `/api/auth/` - Authentication endpoints
- `/api/projects/` - Project management endpoints
- `/api/users/` - User management endpoints
- `/api/donations/` - Donation management endpoints

## Environment Variables

Create a `.env` file in the root directory with the following variables:
```
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=your-database-url
```

## Features

- User authentication and authorization
- Project CRUD operations
- Donation management
- User profile management
- File uploads for project images
- RESTful API endpoints 