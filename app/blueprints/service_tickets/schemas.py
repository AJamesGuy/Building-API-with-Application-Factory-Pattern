from app.extensions import ma
from app.models import Service_Ticket

class ServiceTicketSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Service_Ticket

service_ticket_schema = ServiceTicketSchema()
service_tickets_schema = ServiceTicketSchema(many=True)