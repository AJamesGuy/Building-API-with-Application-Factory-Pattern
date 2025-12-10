from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import String, Date, Integer, Text, Float, ForeignKey, Column, Table
from datetime import date

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///app.db"

# Base class inherits from DeclarativeBase for models set-up
class Base(DeclarativeBase):
    pass

# SQLAlchemy instantiated as db object
db = SQLAlchemy(model_class = Base)
 
db.init_app(app)

mechanics_service_tickets = Table(
    "mechanics_service_tickets",
    Base.metadata,
    Column("tickets_id", ForeignKey("service_tickets.id"), primary_key=True),
    Column("mechanics_id", ForeignKey("mechanics.id"), primary_key=True)
    )

inventory_service_tickets = Table(
    "inventory_service_tickets",
    Base.metadata,
    Column()

)



class Customer(Base):
    __tablename__ = "customers"

    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(80), nullable=False)
    last_name: Mapped[str] = mapped_column(String(80), nullable=False)
    email: Mapped[str] = mapped_column(String(80), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(80), nullable=False)
    phone: Mapped[str] = mapped_column(String(80), nullable=False)

    service_tickets: Mapped[list['Service_Ticket']] = relationship('Service_Ticket', back_populates='customer')

class Service_Ticket(Base):
    __tablename__ = "service_tickets"

    id: Mapped[int] = mapped_column(primary_key=True)
    customer_id: Mapped[int] = mapped_column(ForeignKey("customers.id"), nullable=False)
    vin: Mapped[str] = mapped_column(String(17), nullable=False, unique=True)
    service_desc: Mapped[str] = mapped_column(Text, nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=False)
    
    customer: Mapped["Customer"] = relationship("Customer", back_populates="service_tickets")
    mechanics: Mapped[list['Mechanic']] = relationship('Mechanic', secondary=mechanics_service_tickets, back_populates="service_tickets")
    parts: Mapped[list['Part']] = relationship('Part', back_populates='ticket')



class Mechanic(Base):
    __tablename__ = "mechanics"

    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(80), nullable=False)
    last_name: Mapped[str] = mapped_column(String(80), nullable=False)
    email: Mapped[str] = mapped_column(String(120), nullable=False, unique=True)
    address: Mapped[str] = mapped_column(String(200), nullable=False)
    schedule: Mapped[str] = mapped_column(String(100), nullable=False)
    salary: Mapped[float] = mapped_column(Float, nullable=True)
    password: Mapped[str] = mapped_column(String(80), nullable=False)

    service_tickets: Mapped[list["Service_Ticket"]] = relationship("Service_Ticket", secondary=mechanics_service_tickets, back_populates="mechanics")


class PartDescription(Base):
    __tablename__ = "part_descriptions"

    id: Mapped[int] = mapped_column(primary_key=True)
    description: Mapped[str] = mapped_column(String(300), nullable=False)

    parts: Mapped[list["Part"]] = relationship("Part", back_populates="desc")


class Inventory(Base):
    __tablename__ = "inventory"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(80), nullable=False)
    price: Mapped[str] = mapped_column(Float, nullable=False)
    description: Mapped[str] = mapped_column(String(200), nullable=False)

class Part(Base):
    __tablename__ = "parts"

    id: Mapped[int] = mapped_column(primary_key=True)
    desc_id: Mapped[int] = mapped_column(ForeignKey("part_descriptions.id"), nullable=False)
    ticket_id: Mapped[int] = mapped_column(ForeignKey("service_tickets.id"), nullable=True)

    desc: Mapped["PartDescription"] = relationship("PartDescription", back_populates="parts")
    ticket: Mapped["Service_Ticket"] = relationship("Service_Ticket", back_populates="parts")
    