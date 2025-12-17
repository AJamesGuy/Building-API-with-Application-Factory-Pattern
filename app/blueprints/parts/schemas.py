from app.extensions import ma
from app.models import Part, InventoryDescription
from marshmallow import fields

class PartsSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Part
    id = fields.Integer(dump_only=True)
    desc_id = fields.Integer(required=True)
    name = fields.String(required=True)
    serial_num = fields.String(required=True)


part_schema = PartsSchema()
parts_schema = PartsSchema(many=True)

class PartDescriptionSchema(ma.SQLAlchemySchema):
    class Meta:
        model = InventoryDescription
    id = fields.Integer(dump_only=True)
    description = fields.String(required=True)
    name = fields.String(required=True)
    price = fields.Float(required=True)


part_description_schema = PartDescriptionSchema()
parts_description_schema = PartDescriptionSchema(many=True)