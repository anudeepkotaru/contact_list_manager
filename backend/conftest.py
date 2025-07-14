import pytest
from app import app, db, Contact

@pytest.fixture(scope='session')
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = ''

    with app.app_context():
        db.create_all()
        yield app.test_client()
        db.drop_all()
