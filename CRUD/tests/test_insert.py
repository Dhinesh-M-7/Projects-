from website.models import Data
from website import db

def test_redirection(client):
    response = client.post('/insert', data = {'name':'Dhinesh', 'email':'msd@gmail.com', 'phone':'6382810767'})
    assert response.status_code == 302
    
    
def test_wrong_endpoint(client):
    response = client.post("/insert/1/", data = {'name':'Dhinesh', 'email':'msd@gmail.com', 'phone':'6382810767'})
    assert response.status_code == 404


def test_data_insertion(client, app):
    client.post("/insert", data = {'name':'Dhinesh', 'email':'msd@gmail.com', 'phone':'6382810767'})
    with app.app_context():
        assert Data.query.count() == 1
        assert db.session.get(Data, 1).name == 'Dhinesh'


def test_multiple_data_insertion(client, app):
    client.post("/insert", data = {'name':'Dhinesh', 'email':'msd@gmail.com', 'phone':'6382810767'})
    client.post("/insert", data = {'name':'Dhinesh Murugesan', 'email':'abd@gmail.com', 'phone':'6380980767'})
    client.post("/insert", data = {'name':'Miguel', 'email':'miguel@gmail.com', 'phone':'6384560767'})
    
    with app.app_context():
        assert Data.query.count() == 3
        assert db.session.get(Data, 1).name == 'Dhinesh'
        assert db.session.get(Data, 2).phone == '6380980767'
        assert db.session.get(Data, 3).email == 'miguel@gmail.com'
