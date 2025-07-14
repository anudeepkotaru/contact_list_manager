from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_

from config import Config
from database import db

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
db.init_app(app)

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f'<Contact {self.name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email
        }

with app.app_context():
    db.create_all()

@app.route('/contacts', methods=['POST'])
def add_contact():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')

    if not name or not email:
        return jsonify({'error': 'Name and email are required'}), 400

    existing_contact = Contact.query.filter_by(email=email).first()
    if existing_contact:
        return jsonify({'error': 'Contact with this email already exists'}), 409

    new_contact = Contact(name=name, email=email)
    try:
        db.session.add(new_contact)
        db.session.commit()
        return jsonify(new_contact.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        # Log the full error for debugging
        app.logger.error(f"Error adding contact: {e}", exc_info=True)
        return jsonify({'error': f'An error occurred while adding contact.'}), 500

@app.route('/contacts', methods=['GET'])
def get_contacts():
    search_query = request.args.get('q', '')
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    query = Contact.query.order_by(Contact.name.asc())

    if search_query:
        query = query.filter(
            or_(
                Contact.name.ilike(f'%{search_query}%'),
                Contact.email.ilike(f'%{search_query}%')
            )
        )

    try:
        pagination = query.paginate(page=page, per_page=per_page, error_out=False)
    except TypeError:
        pagination = query.paginate(page=page, per_page=per_page)


    contacts_data = [contact.to_dict() for contact in pagination.items]

    return jsonify({
        'contacts': contacts_data,
        'total_contacts': pagination.total,
        'total_pages': pagination.pages,
        'current_page': pagination.page,
        'per_page': pagination.per_page,
        'has_next': pagination.has_next,
        'has_prev': pagination.has_prev
    }), 200

@app.route('/contacts/<int:contact_id>', methods=['DELETE'])
def delete_contact(contact_id):
    contact = Contact.query.get(contact_id)
    if not contact:
        return jsonify({'error': 'Contact not found'}), 404
    try:
        db.session.delete(contact)
        db.session.commit()
        return jsonify({'message': 'Contact deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        app.logger.error(f"Error deleting contact: {e}", exc_info=True)
        return jsonify({'error': f'An error occurred while deleting contact.'}), 500


if __name__ == '__main__':
    app.run(debug=True)
