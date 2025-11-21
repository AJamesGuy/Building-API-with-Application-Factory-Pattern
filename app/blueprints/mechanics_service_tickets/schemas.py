from app.extensions import ma
from app.models import Mechanics_Service_Tickets

class MechanicsServiceTicketSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Mechanics_Service_Tickets

mechanics_service_ticket_schema = MechanicsServiceTicketSchema()
mechanics_service_tickets_schema = MechanicsServiceTicketSchema(many=True)