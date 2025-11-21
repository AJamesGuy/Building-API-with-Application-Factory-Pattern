from flask import Flask
from .models import db
from .extensions import ma, limiter, cache
from .blueprints.mechanics import mechanics_bp
from .blueprints.customers import customers_bp
from .blueprints.mechanics_service_tickets import mechanics_service_tickets_bp
from .blueprints.service_tickets import service_tickets_bp

def create_app(config_name):
    app = Flask(__name__)
    app.config.from_objects(f'config.{config_name}')

    db.init_app(app)
    ma.init_app(app)
    limiter.init_app(app)
    cache.init_app(app)

    app.register_blueprint(mechanics_bp, url_prefix='/mechanics')
    app.register_blueprint(customers_bp, url_prefix='/customers')
    app.register_blueprint(service_tickets_bp, url_prefix='/service_tickets')

    return app
