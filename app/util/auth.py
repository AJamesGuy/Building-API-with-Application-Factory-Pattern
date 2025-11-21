from datetime import datetime, timedelta, timezone
from functools import wraps
from jose import jwt
from flask import request, jsonify

SECRET_KEY = "your_secret_key"

def encode_token(user_id):
    payload = {
        'exp': datetime.now(tz=timezone.utc) + timedelta(days=1),
        'iat': datetime.now(tz=timezone.utc),
        'sub': user_id
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            print(data)
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except jose.exceptions.JWTError:
            return jsonify({'message': 'Token is invalid!'}), 401
        return f(*args, **kwargs)
    return decorated