from app.extensions import ma
from app.models import Service_Ticket
from marshmallow import fields

class ServiceTicketSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Service_Ticket
    id = fields.Integer(dump_only=True)
    customer_id = fields.Integer(required=True)
    service_desc = fields.Str(required=True)
    total_cost = fields.Float(required=True)

service_ticket_schema = ServiceTicketSchema()
service_tickets_schema = ServiceTicketSchema(many=True)