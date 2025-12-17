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

mechanics_service = Table(
    "mechanics_service",
    Base.metadata,
    Column("ticket_id", ForeignKey("service_tickets.id"), primary_key=True),
    Column("mechanic_id", ForeignKey("mechanics.id"), primary_key=True)
)

# association table between parts and service tickets (parts used on tickets)
part_service_tickets = Table(
    "part_service_tickets",
    Base.metadata,
    Column("id", Integer, primary_key=True),
    Column("part_id", ForeignKey("parts.id"), nullable=False),
    Column("ticket_id", ForeignKey("service_tickets.id"), nullable=False)
)

# association table between parts and invoices (parts sold on invoices)
part_invoices = Table(
    "part_invoices",
    Base.metadata,
    Column("id", Integer, primary_key=True),
    Column("invoice_id", ForeignKey("invoices.id"), nullable=False),
    Column("part_id", ForeignKey("parts.id"), nullable=False)
)


class Customer(Base):
    __tablename__ = "customers"

    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(80), nullable=False)
    last_name: Mapped[str] = mapped_column(String(80), nullable=False)
    email: Mapped[str] = mapped_column(String(80), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(80), nullable=False)
    phone: Mapped[str] = mapped_column(String(80), nullable=False)
    address: Mapped[str] = mapped_column(String(200), nullable=True)

    service_tickets: Mapped[list['Service_Ticket']] = relationship('Service_Ticket', back_populates='customer')

class Service_Ticket(Base):
    __tablename__ = "service_tickets"

    id: Mapped[int] = mapped_column(primary_key=True)
    customer_id: Mapped[int] = mapped_column(ForeignKey("customers.id"), nullable=False)
    service_desc: Mapped[str] = mapped_column(String(300), nullable=False)
    total_cost: Mapped[float] = mapped_column(Float, nullable=False)
    
    customer: Mapped["Customer"] = relationship("Customer", back_populates="service_tickets")
    mechanics: Mapped[list['Mechanic']] = relationship('Mechanic', secondary=mechanics_service, back_populates="service_tickets")
    parts: Mapped[list['Part']] = relationship('Part', secondary=part_service_tickets, back_populates='service_tickets')



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

    service_tickets: Mapped[list["Service_Ticket"]] = relationship("Service_Ticket", secondary=mechanics_service, back_populates="mechanics")


class InventoryDescription(Base):
    __tablename__ = "inventory_descriptions"

    id: Mapped[int] = mapped_column(primary_key=True)
    description: Mapped[str] = mapped_column(String(300), nullable=False)
    name: Mapped[str] = mapped_column(String(80), nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=False)

    parts: Mapped[list["Part"]] = relationship("Part", back_populates="desc")


class Invoice(Base):
    __tablename__ = "invoices"

    id: Mapped[int] = mapped_column(primary_key=True)
    sale_date: Mapped[date] = mapped_column(Date, nullable=False)
    total_amount: Mapped[float] = mapped_column(Float, nullable=False)
    car_id: Mapped[int] = mapped_column(ForeignKey("cars.id"), nullable=True)
    customer_id: Mapped[int] = mapped_column(ForeignKey("customers.id"), nullable=False)
    salesperson_id: Mapped[int] = mapped_column(ForeignKey("salespersons.id"), nullable=True)

    parts: Mapped[list["Part"]] = relationship("Part", secondary=part_invoices, back_populates="invoices")


class SalesPerson(Base):
    __tablename__ = "salespersons"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(80), nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=True)
    email: Mapped[str] = mapped_column(String(120), nullable=True)
    phone: Mapped[str] = mapped_column(String(40), nullable=True)


class Car(Base):
    __tablename__ = "cars"

    id: Mapped[int] = mapped_column(primary_key=True)
    make: Mapped[str] = mapped_column(String(80), nullable=False)
    model: Mapped[str] = mapped_column(String(80), nullable=False)
    vin: Mapped[str] = mapped_column(String(17), nullable=False, unique=True)
    cost: Mapped[float] = mapped_column(Float, nullable=True)

class Part(Base):
    __tablename__ = "parts"

    id: Mapped[int] = mapped_column(primary_key=True)
    desc_id: Mapped[int] = mapped_column(ForeignKey("inventory_descriptions.id"), nullable=False)
    name: Mapped[str] = mapped_column(String(80), nullable=False)
    serial_num: Mapped[str] = mapped_column(String(80), nullable=True)

    desc: Mapped["InventoryDescription"] = relationship("InventoryDescription", back_populates="parts")
    service_tickets: Mapped[list["Service_Ticket"]] = relationship('Service_Ticket', secondary=part_service_tickets, back_populates='parts')
    invoices: Mapped[list["Invoice"]] = relationship('Invoice', secondary=part_invoices, back_populates='parts')
    