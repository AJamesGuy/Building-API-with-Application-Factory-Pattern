from . import mechanics_service_tickets_bp
from schemas import mechanics_service_ticket_schema, mechanics_service_tickets_schema
from flask import request, jsonify
from marshmallow import ValidationError
from app.models import Mechanics_Service_Tickets, db
from app.extensions import limiter, cache
from sqlalchemy import select

# ---------- CRUD operations for Mechanics_Service_Tickets ----------

# create a new mechanics_service_ticket
@mechanics_service_tickets_bp.route('', methods=['POST'])
def create_mechanics_service_ticket():
    try:
        data = mechanics_service_ticket_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400

    new_ticket = Mechanics_Service_Tickets(**data)
    db.session.add(new_ticket)
    db.session.commit()
    return mechanics_service_ticket_schema.jsonify(new_ticket), 201

# read all mechanics_service_tickets
@mechanics_service_tickets_bp.route('', methods=['GET'])
@limiter.limit("10 per minute")
def get_mechanics_service_tickets():
    try:
        tickets = db.session.query(Mechanics_Service_Tickets).all()
        return mechanics_service_tickets_schema.jsonify(tickets), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# update mechanics_service_ticket
@mechanics_service_tickets_bp.route('/<int:ticket_id>', methods=['PUT'])
def update_mechanics_service_ticket(ticket_id):
    ticket = db.session.get(Mechanics_Service_Tickets, ticket_id)
    if not ticket:
        return jsonify({"error": "Mechanics Service Ticket not found"}), 404

    try:
        data = mechanics_service_ticket_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400

    for key, value in data.items():
        setattr(ticket, key, value)

    db.session.commit()
    return mechanics_service_ticket_schema.jsonify(ticket), 200

# delete a mechanics_service_ticket
@mechanics_service_tickets_bp.route('/<int:ticket_id>', methods=['DELETE'])
def delete_mechanics_service_ticket(ticket_id):
    ticket = db.session.get(Mechanics_Service_Tickets, ticket_id)
    if not ticket:
        return jsonify({"error": "Mechanics Service Ticket not found"}), 404
    
    db.session.delete(ticket)
    db.session.commit()
    return jsonify({"message": "Mechanics Service Ticket deleted"}), 200

