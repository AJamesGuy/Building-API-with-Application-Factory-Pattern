from . import parts_bp
from .schemas import part_schema, parts_schema, part_description_schema, parts_description_schema
from flask import request, jsonify
from marshmallow import ValidationError
from app.models import Service_Ticket, db, Mechanic, Customer, Part, InventoryDescription
from app.extensions import limiter, cache
from sqlalchemy import select

# ---------- CRUD operations for Parts ----------

# create a new part
@parts_bp.route('/', methods=['POST'])
def create_part():
    try:
        data = part_schema.load(request.json) # data is now the JSON input from the front end
    except ValidationError as err:
        return jsonify(err.messages), 400
    
    new_part = Part(**data)
    db.session.add(new_part)
    db.session.commit() # Commit new Part object to data base. Added as new_part.
    return part_schema.jsonify(new_part), 201 # Serialize data for front end usability.

# Create and Add description to part
@parts_bp.route('/<int:part_id>/add-description', methods=['PUT'])
def add_description_to_part(part_id):
    part = db.session.get(Part, part_id)
    if not part:
        return jsonify({"error": "Part not found"}), 404

    try:
        data = part_description_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400

    new_description = InventoryDescription(**data)
    part.desc = new_description
    db.session.add(new_description)
    db.session.commit()

    return part_schema.jsonify(part), 200



# read all parts
@parts_bp.route('/', methods=['GET'])
@limiter.limit("10 per minute")
def get_parts():
    try:
        parts = db.session.query(Part).all() # Query all existing parts from database
        return parts_schema.jsonify(parts), 200 # Serialize the many=True parts_schema -> return to front end
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# update part
@parts_bp.route('/<int:part_id>/update-part', methods=['PUT'])
def update_part(part_id):
    part = db.session.get(Part, part_id)
    if not part:
        return jsonify({"error": "Part not found"}), 404

    try:
        data = part_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400

    for key, value in data.items():
        setattr(part, key, value)

    db.session.commit()
    return part_schema.jsonify(part), 200

# delete part
@parts_bp.route('/<int:part_id>/delete-part', methods=['DELETE'])
def delete_part(part_id):
    part = db.session.get(Part, part_id)
    if not part:
        return jsonify({"error": "Part not found"}), 404

    db.session.delete(part)
    db.session.commit()
    return jsonify({"message": "Part deleted successfully"}), 200
