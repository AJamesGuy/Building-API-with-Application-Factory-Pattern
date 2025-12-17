from app.extensions import ma
from app.models import Customer
from marshmallow import fields

class CustomerSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Customer
    id = fields.Integer(dump_only=True)
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    email = fields.Email(required=True)
    password = fields.Str(required=True)
    phone = fields.Str(required=True)


customer_schema = CustomerSchema()
customers_schema = CustomerSchema(many=True)
# simple schema for login (only email and password)
login_schema = CustomerSchema(only=("email", "password"))