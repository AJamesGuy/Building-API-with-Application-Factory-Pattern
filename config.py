import os

class DevelopmentConfig:
  SQLALCHEMY_DATABASE_URI = 'sqlite:///app.db'
  DEBUG = True
  CACHE_TYPE = "SimpleCache"
  CACHE_DEFAULT_TIMEOUT = 300

class TestingConfig:
  SQLALCHEMY_DATABASE_URI = 'sqlite:///testing.db'
  DEBUG = True
  CACHE_TYPE = "SimpleCache"
  CACHE_DEFAULT_TIMEOUT =300
  TESTING = True

class ProductionConfig:
  database_uri = os.environ.get('SQLALCHEMY_DATABASE_URI') or 'sqlite:///app.db'
  # Handle Render PostgreSQL SSL connection
  if database_uri and 'postgres' in database_uri:
    # Ensure we're using postgresql:// and add SSL parameters
    database_uri = database_uri.replace('postgres://', 'postgresql://')
    if '?' not in database_uri:
      database_uri += '?sslmode=require'
    elif 'sslmode' not in database_uri:
      database_uri += '&sslmode=require'
  SQLALCHEMY_DATABASE_URI = database_uri
  SQLALCHEMY_ENGINE_OPTIONS = {
    'pool_pre_ping': True,
    'pool_recycle': 300,
    'connect_args': {
      'sslmode': 'require',
    } if 'postgres' in database_uri else {}
  }
  CACHE_TYPE = "SimpleCache"
  
