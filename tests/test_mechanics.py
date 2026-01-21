# run tests: python3 -m unittest discover tests
from app import create_app
from app.models import Mechanic, Service_Ticket, db
import unittest
from werkzeug.security import check_password_hash, generate_password_hash
from app.util.auth import encode_token
from app.blueprints.service_tickets.routes import assign_mechanic

class TestMechanic(unittest.TestCase):

    #Runs before each test_method
    def setUp(self):
        self.app = create_app('TestingConfig')
        self.mechanic = Mechanic(first_name="Test", last_name="LastTest", email="test@email.com", address="test 123 st", schedule="M-F 9-5", password=generate_password_hash('12345'))
        self.ticket = Service_Ticket(customer_id=1, service_desc="Oil Change", total_cost=300.00)
        with self.app.app_context():
            db.drop_all()
            db.create_all()
            db.session.add(self.mechanic)
            db.session.add(self.ticket)
            assign_mechanic(1, 1)
            db.session.commit()
        self.token = encode_token(1)
        self.client = self.app.test_client()

    #test creating a mechanic (IMPORTANT: All test functions must start with 'test')
    def test_create_mechanic(self):
        mechanic_payload = {
            "first_name": "Test",
            "last_name": "LastTest",
            "email": "test1@email.com",
            "address": "test 123 st",
            "schedule": "M-F 9-5",
            "password": "12345"
        }
        response = self.client.post('/mechanics/create-mechanic', json=mechanic_payload)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json['first_name'], "Test")
        self.assertEqual(response.json['last_name'], "LastTest")
        self.assertEqual(response.json['email'], "test1@email.com")
        self.assertEqual(response.json['address'], "test 123 st")
        self.assertEqual(response.json['schedule'], "M-F 9-5")
        self.assertIsNone(response.json['salary'])
        self.assertTrue(check_password_hash(response.json['password'], '12345'))

    # Negative check: See what happens when we intentionally try and break our endpoint
    def test_invalid_create(self):
        mechanic_payload = {
        "first_name": "Test",
        "last_name": "LastTest",
        "address": "test 123 st",
        "schedule": "M-F 9-5",
        "password": "12345"
    }
        
        response = self.client.post('/mechanics/create-mechanic', json=mechanic_payload)
        self.assertEqual(response.status_code, 400)
        self.assertIn('email', response.json)

    def test_login_mechanic(self):
        mechanic_login_payload = {
            'email': 'test@email.com',
            'password': '12345'
        }

        response = self.client.post('/mechanics/login', json=mechanic_login_payload)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['message'], 'Welcome Test')
        self.assertIsNotNone(response.json['token'])
    # Negative Checks
    def test_invalid_login(self):
        mechanic_login_payload = {
            'email': 'test@email.com',
            'password': '123'
        }

        response = self.client.post('/mechanics/login', json=mechanic_login_payload)
        self.assertEqual(response.status_code, 401)
        self.assertNotIn('token', response.json)

    def test_get_mechanic(self):
        headers = {"Authorization": "Bearer " + self.token}
        response = self.client.get('/mechanics/read-mechanics', headers=headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json[0]['email'], "test@email.com")
        self.assertEqual(response.json[0]['first_name'], "Test")
        self.assertEqual(response.json[0]['last_name'], "LastTest")
        self.assertEqual(response.json[0]['email'], "test@email.com")
        self.assertEqual(response.json[0]['address'], "test 123 st")
        self.assertEqual(response.json[0]['schedule'], "M-F 9-5")
        self.assertIsNone(response.json[0]['salary'])
        self.assertTrue(check_password_hash(response.json[0]['password'], '12345'))

    def test_update_mechanic(self):

        mechanic_payload = {
        "first_name": "UpdateTest",
        "last_name": "UpdateLastTest",
        "email": "Updatetest@email.com",
        "address": "Update test 123 st",
        "schedule": "Update M-F 9-5",
        "password": "Update 12345"
    }
        headers = {"Authorization": "Bearer " + self.token}

        response = self.client.put('/mechanics/1/update-mechanic', json=mechanic_payload, headers=headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['first_name'], "UpdateTest")
        self.assertEqual(response.json['last_name'], "UpdateLastTest")
        self.assertEqual(response.json['email'], "Updatetest@email.com")
        self.assertEqual(response.json['address'], "Update test 123 st")
        self.assertEqual(response.json['schedule'], "Update M-F 9-5")
        self.assertTrue(check_password_hash(response.json['password'], "Update 12345"))

    # Negative Checks
    def test_invalid_update(self):
        mechanic_payload = {
            "first_name": "UpdateTest",
            "last_name": "UpdateLastTest",
            "email": "Updatetest@email.com",
            "address": "Update test 123 st",
            "schedule": "Update M-F 9-5",
            "password": "Update 12345"
        }

        headers = {"Authorization": "Bearer " + self.token}

        # Mechanic not found
        response = self.client.put('/mechanics/2/update-mechanic', json=mechanic_payload, headers=headers)
        self.assertEqual(response.status_code, 404)

        
    def test_delete_mechanic(self):
        headers = {"Authorization": "Bearer " + self.token}
        response = self.client.delete('/mechanics/1/delete-mechanic', headers=headers)
        self.assertEqual(response.status_code, 200)

        # Negative Checks
    def test_invalid_delete(self):
        headers = {'Authorization': 'Bearer ' + self.token}
        response = self.client.delete('/mechanics/2/delete-mechanic', headers=headers) #You can only update your own account
        self.assertEqual(response.status_code, 403)

    def test_my_tickets(self):
        headers = {'Authorization': 'Bearer ' + self.token}
        response = self.client.get('/mechanics/1/my-tickets', headers=headers)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)

    def test_mechanic_tickets(self):
        headers = {'Authorization': 'Bearer ' + self.token}
        response = self.client.get('/mechanics/1/my-tickets', headers=headers)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)
    # Negative Checks
    def test_invalid_mechanic_tickets(self):
        headers = {'Authorization': 'Bearer ' + self.token}
        response = self.client.get('/mechanics/3/my-tickets', headers=headers)
        self.assertEqual(response.status_code, 404)

    def test_get_mechanics_by_tickets(self):
        response = self.client.get('/mechanics/rankings/by-tickets')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)
    
    # Negative Checks
    def test_invalid_get_mechanics_by_tickets(self):
        with self.app.app_context():
            db.session.query(Mechanic).delete()
            db.session.commit()
        response = self.client.get('/mechanics/rankings/by-tickets')
        self.assertEqual(response.status_code, 404)
        self.assertIn('No mechanics found.', response.json['message'])


        

    
    

        

