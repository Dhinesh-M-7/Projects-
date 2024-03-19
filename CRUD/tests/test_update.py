from website.models import Data
from website import db

def test_redirection(client, app):
    response = client.post('/insert', data = {'name':'Dhinesh', 'email':'msd@gmail.com', 'phone':'6382810767'})
    response = client.post("/update/1/", data = {'name':'Dhinesh Murugesan', 'email':'msd@gmail.com', 'phone':'6382810767'})
    assert response.status_code == 302


def test_wrong_endpoint(client, app):
    response = client.post("/insert", data = {'name':'Dhinesh', 'email':'msd@gmail.com', 'phone':'6382810767'})
    response = client.post("/update", data = {'name':'Dhinesh Murugesan', 'email':'msd@gmail.com', 'phone':'6382810767'})
    assert response.status_code == 404
    

def test_updated_value(client, app):
    client.post("/insert", data = {'name':'Dhinesh', 'email':'msd@gmail.com', 'phone':'6382810767'})
    client.post("/insert", data = {'name':'Miguel', 'email':'miguel@gmail.com', 'phone':'6384560767'})
    
    client.post("/update/1/", data = {'name':'Dhinesh', 'email':'dhinesh@gmail.com', 'phone':'6382810767'})
    client.post("/update/2/", data = {'name':'Arjun', 'email':'miguel@gmail.com', 'phone':'6384560767'})
    
    with app.app_context():
        assert Data.query.count() == 2
        
        assert db.session.get(Data, 1).email == 'dhinesh@gmail.com'
        assert db.session.get(Data, 2).name == 'Arjun'
        

        