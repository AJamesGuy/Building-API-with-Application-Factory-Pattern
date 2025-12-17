from . import customers_bp
from .schemas import customer_schema, customers_schema, login_schema
from flask import request, jsonify
from marshmallow import ValidationError
from app.models import Customer, db
from app.extensions import limiter, cache
from sqlalchemy import select
from werkzeug.security import check_password_hash, generate_password_hash
from app.util.auth import encode_token, token_required


# ---------- CRUD operations for Customers ----------

# create a new customer
@customers_bp.route('/', methods=['POST'])
def create_customer():
    try:
        data = customer_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400
    data['password'] = generate_password_hash(data['password'])

    new_customer = Customer(**data)
    db.session.add(new_customer)
    db.session.commit()
    return customer_schema.jsonify(new_customer), 201

@customers_bp.route('/login', methods=['POST'])
def login():
    try:
        data = login_schema.load(request.json)
    except ValidationError as e:
        return jsonify(e.messages), 400
    customer = db.session.query(Customer).where(Customer.email == data['email']).first()

    if customer and check_password_hash(customer.password, data['password']):
        token = encode_token(customer.id)
        return jsonify({"message": f"Welcome {customer.first_name}!",
                        "token": token}), 200
    return jsonify({"error": "Wrong email or password."})    

# read all customers
@customers_bp.route('/read-customers', methods=['GET'])
@limiter.limit("10 per minute")
@token_required
def get_customers():
    try:
        page = int(request.args.get("page", 1))
        per_page = int(request.args.get("per_page", 10))
        query = select(Customer)
        customers = db.paginate(query, page=page, per_page=per_page)
        return customers_schema.jsonify(customers), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# update customer
@customers_bp.route('/<int:customer_id>/update-customer', methods=['PUT'])
@token_required
def update_customer(customer_id):
    if request.logged_in_user_id != customer_id:
        return jsonify({"error": "Unauthorized - you can only update your own account."}), 403
    customer = db.session.get(Customer, customer_id)
    if not customer:
        return jsonify({"error": "Customer not found"}), 404

    try:
        data = customer_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400

    for key, value in data.items():
        setattr(customer, key, value)

    db.session.commit()
    return customer_schema.jsonify(customer), 200

# delete a customer
@customers_bp.route('/<int:customer_id>/delete-customer', methods=['DELETE'])
@token_required
def delete_customer(customer_id):
    if request.logged_in_user_id != customer_id:
        return jsonify({"error": "Unauthorized - you can only delete your own account."}), 403
    customer = db.session.get(Customer, customer_id)
    if not customer:
        return jsonify({"error": "Customer not found"}), 404
    
    db.session.delete(customer)
    db.session.commit()
    return jsonify({"message": "Customer deleted"}), 200

@customers_bp.route('/search-customer', methods=['GET'])
@token_required
def search_customer():
    data = customer_schema.load(request.json)

    customer = db.session.query(Customer).where(Customer.email == data['email']).first()

    if not customer:
        return jsonify({"error": "Customer not found."})
    
    return jsonify({
        "Customer ID": customer.id,
        "First Name": customer.first_name,
        "Last Name": customer.last_name,
        "Email": customer.email,
        "Phone": customer.phone
    })