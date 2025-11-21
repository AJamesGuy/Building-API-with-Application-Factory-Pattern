from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import String, Date, INTEGER, TEXT, FLOAT
from datetime import date

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///app.db"

# Base class inherits from DeclarativeBase for models set-up
class Base(DeclarativeBase):
    pass

# SQLAlchemy instantiated as db object
db = SQLAlchemy(model_class = Base)
 
db.init_app(app)

class Customers(Base):
    __tablename__ = "customers"

    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(80), nullable=False)
    last_name: Mapped[str] = mapped_column(String(80), nullable=False)
    email: Mapped[str] = mapped_column(String(80), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(80), nullable=False)
    phone: Mapped[str] = mapped_column(String(80), nullable=False)

    service_tickets: Mapped[list['Service_Tickets']] = relationship('Service_Tickets', back_populates='customers')

class Service_Tickets(Base):
    __tablename__ = "service_tickets"

    id: Mapped[int] = mapped_column(primary_key=True)
    customer_id: Mapped[int] = mapped_column(Foreign_Key=True)
    vin: Mapped[int] = mapped_column(INTEGER, nullable=False, unique=True)
    mechanics: Mapped[str] = mapped_column(String(80), nullable=False)
    service_desc: Mapped[str] = mapped_column(TEXT, nullable=False)
    price: Mapped[int] = mapped_column(INTEGER, nullable=False)

    customers: Mapped['Customers'] = relationship('Customers', back_populates='service_tickets')
    mechanic_service: Mapped[list['Mechanics']] = relationship('')

class Mechanics_Service_Tickets(Base):
    __tablename__ = "mechanics_service_tickets"

    ticket_id: Mapped[int] = mapped_column(Foreign_Key=True)
    mechanics_id: Mapped[int] = mapped_column(Foreign_Key=True)


class Mechanics(Base):
    __tablename__ = "mechanics"

    id: Mapped[int] = mapped_column(Primary_Key=True)
    first_name: Mapped[str] = mapped_column(String(80), nullable=False)
    last_name: Mapped[str] = mapped_column(String(80), nullable=False)
    email: Mapped[str] = mapped_column(String(80), nullable=False, unique=True)
    address: Mapped[str] = mapped_column(String(80), nullable=False)
    schedule: Mapped[str] = mapped_column(String(80), nullable=False)
    salary: Mapped[int] = mapped_column(FLOAT, nullable=True)

