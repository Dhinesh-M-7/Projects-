from website.models import Data
from website import db


def test_redirection(client):
    response = client.post('/insert', data = {'name':'Dhinesh', 'email':'msd@gmail.com', 'phone':'6382810767'})
    response = client.post("/delete/1/")
    assert response.status_code == 302
    

    
def test_wrong_endpoint(client):
    response = client.post("/insert", data = {'name':'Dhinesh', 'email':'msd@gmail.com', 'phone':'6382810767'})
    response = client.post("/delete")
    assert response.status_code == 404



def test_delete_data(client, app):
    client.post("/insert", data = {'name':'Dhinesh', 'email':'msd@gmail.com', 'phone':'6382810767'})
     
    with app.app_context():
        assert Data.query.count() == 1
        
    client.post("/delete/1/")
    with app.app_context():
        assert Data.query.count() == 0



def test_other_data_safe(client, app):
    client.post("/insert", data = {'name':'Dhinesh', 'email':'msd@gmail.com', 'phone':'6382810767'})
    client.post("/insert", data = {'name':'Miguel', 'email':'miguel@gmail.com', 'phone':'6384560767'})
    client.post("/delete/1/")
    
    with app.app_context():
        assert Data.query.count() == 1
        assert db.session.get(Data, 2).name == 'Miguel'
        assert db.session.get(Data, 2).email == 'miguel@gmail.com'
        assert db.session.get(Data, 2).phone == '6384560767'