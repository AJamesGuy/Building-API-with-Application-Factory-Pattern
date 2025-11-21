from . import service_tickets_bp
from .schemas import service_ticket_schema, service_tickets_schema
from flask import request, jsonify
from marshmallow import ValidationError
from app.models import Service_Tickets, db
from app.extensions import limiter, cache
from sqlalchemy import select

# ---------- CRUD operations for Mechanics ----------
# create a new service_ticket
@service_tickets_bp.route('', methods=['POST'])
def create_service_ticket():
    try:
        data = service_ticket_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400

    new_service_ticket = (Service_Tickets**data)
    db.session.add(new_service_ticket)
    db.session.commit()
    return service_tickets_schema.jsonify(new_service_ticket), 201

# read all service_tickets
@service_tickets_bp.route('', methods=['GET'])
@limiter.limit("10 per minute")
def get_service_ticket():
    try:
        service_ticket = db.session.query(Service_Tickets).all()
        return service_ticket_schema.jsonify(service_ticket), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# update service_ticket
@service_tickets_bp.route('/<int:service_ticket_id>', methods=['PUT'])
def update_service_ticket(service_ticket_id):
    service_ticket = db.session.get(Service_Tickets, service_ticket_id)
    if not service_ticket:
        return jsonify({"error": "Service Ticket not found"}), 404

    try:
        data = service_ticket_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400

    for key, value in data.items():
        setattr(service_ticket, key, value)

    db.session.commit()
    return service_ticket_schema.jsonify(service_ticket), 200

# delete a service_ticket
@service_tickets_bp.route('/<int:service_ticket_id>', methods=['DELETE'])
def delete_service_ticket(service_ticket_id):
    service_ticket = db.session.get(Service_Tickets, service_ticket_id)
    if not service_ticket:
        return jsonify({"error": "Service Ticket not found"}), 404
    
    db.session.delete(service_ticket)
    db.session.commit()
    return jsonify({"message": "Service Ticket deleted"}), 200



