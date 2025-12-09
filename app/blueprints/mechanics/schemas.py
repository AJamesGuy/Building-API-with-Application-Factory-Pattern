from app.extensions import ma
from app.models import Mechanic
from marshmallow import fields

class MechanicSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Mechanic
    id = fields.Integer(dump_only=True)
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    email = fields.Email(required=True)
    address = fields.Str(required=True)
    schedule = fields.Str(required=True)
    salary = fields.Float(allow_none=True)
    password = fields.Str(required=True)


mechanic_schema = MechanicSchema()
mechanics_schema = MechanicSchema(many=True)
login_schema = MechanicSchema(exclude=['first_name', 'last_name', 'address', 'schedule', 'salary'])