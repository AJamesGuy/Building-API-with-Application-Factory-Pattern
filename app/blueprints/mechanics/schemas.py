from app.extensions import ma
from app.models import Mechanics

class MechanicSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Mechanics

mechanic_schema = MechanicSchema()
mechanics_schema = MechanicSchema(many=True)