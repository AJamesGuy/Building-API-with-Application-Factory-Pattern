from flask import Blueprint

mechanics_service_tickets_bp = Blueprint('mechanics_service_tickets', __name__)

from . import routes