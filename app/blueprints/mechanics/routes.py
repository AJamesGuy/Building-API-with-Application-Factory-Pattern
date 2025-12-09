from . import mechanics_bp
from .schemas import mechanic_schema, mechanics_schema, login_schema
from flask import request, jsonify
from marshmallow import ValidationError
from app.models import Mechanic, db
from app.extensions import limiter, cache
from sqlalchemy import select, func
from werkzeug.security import generate_password_hash, check_password_hash
from app.util.auth import encode_token, token_required

# ---------- CRUD operations for Mechanics ----------
@mechanics_bp.route('/login', methods=['POST'])
def login():
    try:
        data = login_schema.load(request.json)
    except ValidationError as e:
        return jsonify(e.messages), 400
    
    mechanic = db.session.query(Mechanic).where(Mechanic.email==data['email']).first()

    if mechanic and check_password_hash(mechanic.password, data['password']):
        token = encode_token(mechanic.id)
        return jsonify({
            "message": f"Welcome {mechanic.first_name}",
            "token": token
        }), 200
    else:
        return jsonify({"message": "Wrong email or password"}), 401


# create a new mechanic
@mechanics_bp.route('/create-mechanic', methods=['POST'])
def create_mechanic():
    try:
        data = mechanic_schema.load(request.json) # The JSON data is inserted in postman as an example of front end user input. 
    except ValidationError as err:
        return jsonify(err.messages), 400
    
    data['password'] = generate_password_hash(data['password'])

    new_mechanic = Mechanic(**data)
    db.session.add(new_mechanic)
    db.session.commit()
    return mechanic_schema.jsonify(new_mechanic), 201

# read all mechanics
@mechanics_bp.route('/read-mechanics', methods=['GET'])
@limiter.limit("10 per minute")
@token_required
def get_mechanics():
    try:
        mechanics = db.session.query(Mechanic).all()
        return mechanics_schema.jsonify(mechanics), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# update mechanics
@mechanics_bp.route('/<int:mechanic_id>/update-mechanic', methods=['PUT'])
@token_required
def update_mechanic(mechanic_id):
    mechanic = db.session.get(Mechanic, mechanic_id) # Get mechanic from db using int:mechanic_id specified in request.
    if not mechanic:
        return jsonify({"error": "Mechanic not found"}), 404

    try:
        data = mechanic_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400

    for key, value in data.items():
        setattr(mechanic, key, value) # Set each updated attribute for mechanic with route specified mechanic id from the deserialized json object saved in the data variable

    db.session.commit()
    return mechanic_schema.jsonify(mechanic), 200 #return serialized mechanic data


# delete a mechanic
@mechanics_bp.route('/<int:mechanic_id>/delete-mechanic', methods=['DELETE'])
@token_required
def delete_mechanic(mechanic_id):
    mechanic = db.session.get(Mechanic, mechanic_id)
    if not mechanic:
        return jsonify({"error": "Mechanic not found"}), 404

    db.session.delete(mechanic)
    db.session.commit()
    return jsonify({"message": "Mechanic deleted"}), 200

@mechanics_bp.route('/<int:mechanic_id>/my-tickets', methods=['GET'])
@token_required
@cache.cached(timeout=50)
def mechanic_tickets(mechanic_id):
    mechanic = db.session.get(Mechanic, mechanic_id)
    if not mechanic:
        return jsonify({"error": "Mechanic not found"}), 404
    


    tickets = mechanic.service_tickets
    
    return jsonify([{
        'id': ticket.id,
        'vin': ticket.vin,
        'service_desc': ticket.service_desc,
        'price': ticket.price,
        'customer_id': ticket.customer_id
    } for ticket in tickets]), 200


@mechanics_bp.route('/rankings/by-tickets', methods=['GET'])
@limiter.limit("10 per minute")
@cache.cached(timeout=300)
def get_mechanics_by_tickets():
    try:
        mechanics = db.session.query(Mechanic).all()

        if not mechanics:
            return jsonify({"message": "No mechanics found."})
        
        # Sort mechanics by the count of their service tickets in descending order
        sorted_mechanics = sorted(mechanics, key=lambda mechanic: len(mechanic.service_tickets), reverse=True)
        
        return jsonify([{
            'id': mechanic.id,
            'first_name': mechanic.first_name,
            'last_name': mechanic.last_name,
            'email': mechanic.email,
            'tickets_count': len(mechanic.service_tickets)
        } for mechanic in sorted_mechanics]), 200
    except Exception as e:
        return jsonify({"error": e.messages}), 500
