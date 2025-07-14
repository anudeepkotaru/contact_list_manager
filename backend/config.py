import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'postgresql://postgres:postgres@localhost:5432/contact_manager')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
