
from datetime import datetime, timedelta, timezone
from functools import wraps
from jose import jwt
import jose
from flask import request, jsonify

SECRET_KEY = "fresh-secret-key-for-testing"

def encode_token(mechanic_id):
    payload = {
        'exp': datetime.now(tz=timezone.utc) + timedelta(days=1),
        'iat': datetime.now(tz=timezone.utc),
        'sub': mechanic_id
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            parts = request.headers['Authorization'].split()
            if len(parts) == 2 and parts[0] == "Bearer":
                token = parts[1]
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            request.logged_in_user_id = data['sub']
        except jose.exceptions.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except jose.exceptions.JWTError:
            return jsonify({'message': 'Token is invalid!'}), 401
        return f(*args, **kwargs)
    return decorated

