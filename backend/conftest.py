import pytest
from app import create_app, Contact
from database import db

class TestConfig:
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'test_secret_key'

@pytest.fixture(scope='function')
def client():
    """Configures the app for testing, uses an in-memory SQLite database."""
    app = create_app(config_class=TestConfig)

    with app.app_context():
        db.create_all()
        yield app.test_client()
        db.session.remove()
        db.drop_all()