def test_home_title(client):
    response = client.get("/")
    assert b'<title> Manage Employee Details </title>' in response.data
    
    
def test_home_status_code(client):
    response = client.get("/")
    assert response.status_code == 200
    
    
def test_home_wrong_endpoint(client):
    response = client.get("/any")
    assert response.status_code == 404