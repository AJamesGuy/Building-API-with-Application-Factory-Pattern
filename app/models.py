from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import String, Date, Integer, Text, Float, ForeignKey
from datetime import date

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///app.db"

# Base class inherits from DeclarativeBase for models set-up
class Base(DeclarativeBase):
    pass

# SQLAlchemy instantiated as db object
db = SQLAlchemy(model_class = Base)
 
db.init_app(app)

class Customer(Base):
    __tablename__ = "customers"

    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(80), nullable=False)
    last_name: Mapped[str] = mapped_column(String(80), nullable=False)
    email: Mapped[str] = mapped_column(String(80), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(80), nullable=False)
    phone: Mapped[str] = mapped_column(String(80), nullable=False)

    service_tickets: Mapped[list['Service_Ticket']] = relationship('Service_Tickets', back_populates='customer')

class Service_Ticket(Base):
    __tablename__ = "service_tickets"

    id: Mapped[int] = mapped_column(primary_key=True)
    customer_id: Mapped[int] = mapped_column(ForeignKey(customers.id), nullable=False)
    vin: Mapped[int] = mapped_column(Integer, nullable=False, unique=True)
    mechanics: Mapped[str] = mapped_column(String(80), nullable=False)
    service_desc: Mapped[str] = mapped_column(Text, nullable=False)
    price: Mapped[Float] = mapped_column(Float, nullable=False)

    customers: Mapped['Customer'] = relationship('Customer', back_populates='service_tickets')
    mechanics: Mapped[list['Mechanic']] = relationship('Mechanic', secondary="mechanics_service_tickets", back_populates="service_tickets")

mechanics_service_tickets = db.Table(
    "mechanics_service_tickets",
    db.Column("tickets_id", ForeignKey("service_tickets.id"), primary_key=True),
    db.Column("mechanics_id", ForeignKey("mechanics.id"), primary_key=True)
    )

class Mechanic(Base):
    __tablename__ = "mechanics"

    id: Mapped[int] = mapped_column(Primary_Key=True)
    first_name: Mapped[str] = mapped_column(String(80), nullable=False)
    last_name: Mapped[str] = mapped_column(String(80), nullable=False)
    email: Mapped[str] = mapped_column(String(120), nullable=False, unique=True)
    address: Mapped[str] = mapped_column(String(200), nullable=False)
    schedule: Mapped[str] = mapped_column(String(100), nullable=False)
    salary: Mapped[float] = mapped_column(Float, nullable=True)

    service_tickets: Mapped[list["Service_Ticket"]] = relationship("Service_Ticket", secondary="mechanics_service_tickets", back_populates="mechanics")


