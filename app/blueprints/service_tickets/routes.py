from . import service_tickets_bp
from .schemas import service_ticket_schema, service_tickets_schema
from flask import request, jsonify
from marshmallow import ValidationError
from app.models import Service_Ticket, db, Mechanic, Customer, Part
from app.extensions import limiter, cache
from sqlalchemy import select

# ---------- CRUD operations for Mechanics ----------
# create a new service_ticket
@service_tickets_bp.route('/', methods=['POST'])
def create_service_ticket():
    try:
        data = service_ticket_schema.load(request.json) # data is now the JSON input from the front end
    except ValidationError as err:
        return jsonify(err.messages), 400

    new_service_ticket = Service_Ticket(**data)
    db.session.add(new_service_ticket)
    db.session.commit() # Commit new Service_Ticket object to data base. Added as new_service_ticket.
    return service_ticket_schema.jsonify(new_service_ticket), 201 # Serialize data for front end usability.

# read all service_tickets
@service_tickets_bp.route('/get-tickets', methods=['GET'])
@limiter.limit("10 per minute")
def get_service_tickets():
    try:
        tickets = db.session.query(Service_Ticket).all() # Query all existing tickets from database
        return service_tickets_schema.jsonify(tickets), 200 # Serialize the many=True service_tickets_schema -> return to front end
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# assign a mechanic to a service ticket
@service_tickets_bp.route('/<int:ticket_id>/assign-mechanic/<int:mechanic_id>', methods=['PUT'])
def assign_mechanic(ticket_id, mechanic_id):
    ticket = db.session.get(Service_Ticket, ticket_id) # Query ticket by ticket_id specified in request 
    if not ticket:
        return jsonify({'error': 'Service ticket not found'})
    
    mechanic = db.session.get(Mechanic, mechanic_id) # Query mechanic by mechanic_id also specified in request
    if not mechanic:
        return jsonify({"error": "Mechanic not found."})
    if mechanic in ticket.mechanics: # iterate through mechanics list to check if mechanic is already assigned to this ticket. The relationship in the Service_Ticket model.
        return jsonify({"message": "Mechanic already assigned to this ticket"}), 403
    
    ticket.mechanics.append(mechanic) # if mechanic (selected by id) is not assigned to the ticket (selected by id), append the mechanic in the Service_Ticket mechanics relationship list.
    db.session.commit() # commit changes

    return service_ticket_schema.jsonify(ticket), 200 #Serialize python ticket object and return ticket to front end.


# remove a mechanic from a service ticket
@service_tickets_bp.route('/<int:ticket_id>/remove-mechanic/<int:mechanic_id>', methods=['PUT'])
def remove_mechanic(ticket_id, mechanic_id):
    ticket = db.session.get(Service_Ticket, ticket_id) # Query ticket by id
    if not ticket:
        return jsonify({"error": "Service ticket not found"}), 404
    
    mechanic = db.session.get(Mechanic, mechanic_id) # Query mechanic by id
    if not mechanic:
        return jsonify({"message": "Mechanic not be found"}), 404
    
    if mechanic not in ticket.mechanics: # Cannot remove a relationship between service ticket and mechanic
        return jsonify({"message": "Mechanic not assigned to this ticket"}), 200
    
    ticket.mechanics.remove(mechanic) # Remove relationship between service ticket (selected by id) and mechanic (selected by id)
    db.session.commit()

    return service_ticket_schema.jsonify(ticket), 200 # Serialize updated service-ticket-python-object -> JSON and return to front end

@service_tickets_bp.route('/<int:ticket_id>/add-part/<int:part_id>', methods=['POST'])
def add_part(ticket_id, part_id):
    ticket = db.session.get(Service_Ticket, ticket_id)
    if not ticket:
        return jsonify({"error": "Service ticket not found"}), 404

    part = db.session.get(Part, part_id)
    if not part:
        return jsonify({"error": "Part not found"}), 404

    if part in ticket.parts:
        return jsonify({"message": "Part already added to this ticket"}), 200

    ticket.parts.append(part)
    db.session.commit()

    return service_ticket_schema.jsonify(ticket), 200