from . import mechanics_bp
from .schemas import mechanic_schema, mechanics_schema
from flask import request, jsonify
from marshmallow import ValidationError
from app.models import Mechanic, db
from app.extensions import limiter, cache
from sqlalchemy import select

# ---------- CRUD operations for Mechanics ----------


# create a new mechanic
@mechanics_bp.route('', methods=['POST'])
def create_mechanic():
    try:
        data = mechanic_schema.load(request.json) # The JSON data is inserted in postman as a test for front end user input. 
    except ValidationError as err:
        return jsonify(err.messages), 400

    new_mechanic = Mechanic(**data)
    db.session.add(new_mechanic)
    db.session.commit()
    return mechanic_schema.jsonify(new_mechanic), 201

# read all mechanics
@mechanics_bp.route('', methods=['GET'])
@limiter.limit("10 per minute")
def get_mechanics():
    try:
        mechanics = db.session.query(Mechanic).all()
        return mechanics_schema.jsonify(mechanics), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# update mechanics
@mechanics_bp.route('/<int:mechanic_id>', methods=['PUT'])
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
@mechanics_bp.route('/<int:mechanic_id>', methods=['DELETE'])
def delete_mechanic(mechanic_id):
    mechanic = db.session.get(Mechanic, mechanic_id)
    if not mechanic:
        return jsonify({"error": "Mechanic not found"}), 404

    db.session.delete(mechanic)
    db.session.commit()
    return jsonify({"message": "Mechanic deleted"}), 200