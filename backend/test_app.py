# backend/test_app.py
import json
from app import db, Contact

def test_add_contact_success(client):
    response = client.post('/contacts', json={'name': 'John Doe', 'email': 'john@example.com'})
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['name'] == 'John Doe'
    assert data['email'] == 'john@example.com'
    assert 'id' in data

    with client.application.app_context():
        contact = db.session.get(Contact, data['id'])
        assert contact is not None
        assert contact.name == 'John Doe'

def test_add_contact_missing_name(client):
    response = client.post('/contacts', json={'email': 'jane@example.com'})
    assert response.status_code == 400
    data = json.loads(response.data)
    assert 'error' in data
    assert 'Name and email are required' in data['error']

def test_add_contact_missing_email(client):
    response = client.post('/contacts', json={'name': 'Jane Doe'})
    assert response.status_code == 400
    data = json.loads(response.data)
    assert 'error' in data
    assert 'Name and email are required' in data['error']

def test_add_contact_duplicate_email(client):
    client.post('/contacts', json={'name': 'Alice', 'email': 'alice@example.com'})
    response = client.post('/contacts', json={'name': 'Alice Smith', 'email': 'alice@example.com'})
    assert response.status_code == 409
    data = json.loads(response.data)
    assert 'error' in data
    assert 'Contact with this email already exists' in data['error']


def test_search_contacts_by_name(client):
    client.post('/contacts', json={'name': 'Charlie', 'email': 'charlie@example.com'})
    client.post('/contacts', json={'name': 'Chuck', 'email': 'chuck@example.com'})
    client.post('/contacts', json={'name': 'David', 'email': 'david@example.com'})
    response = client.get('/contacts?q=char')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert len(data['contacts']) == 1
    assert data['contacts'][0]['name'] == 'Charlie'

def test_search_contacts_by_email(client):
    client.post('/contacts', json={'name': 'Eve', 'email': 'eve@mail.com'})
    client.post('/contacts', json={'name': 'Frank', 'email': 'frank@web.com'})
    response = client.get('/contacts?q=mail')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert len(data['contacts']) == 1
    # assert data['contacts'][0]['name'] == 'Eve'


def test_delete_contact_success(client):
    add_response = client.post('/contacts', json={'name': 'Delete Me', 'email': 'delete@example.com'})
    contact_id = json.loads(add_response.data)['id']

    delete_response = client.delete(f'/contacts/{contact_id}')
    assert delete_response.status_code == 200
    data = json.loads(delete_response.data)
    assert 'message' in data
    assert 'Contact deleted successfully' in data['message']

    with client.application.app_context():
        contact = db.session.get(Contact, contact_id)
        assert contact is None

def test_delete_contact_not_found(client):
    response = client.delete('/contacts/9999') # Assuming 9999 does not exist
    assert response.status_code == 404
    data = json.loads(response.data)
    assert 'error' in data
    assert 'Contact not found' in data['error']
