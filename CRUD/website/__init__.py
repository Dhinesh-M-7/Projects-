from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app(database_uri = "sqlite:///database.db"):
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'It\'s a secret key '
    app.config['SQLALCHEMY_DATABASE_URI'] = database_uri
    db.init_app(app)
    
    from .views import views
    app.register_blueprint(views, url_prefix = '/')
    
    with app.app_context():
        db.create_all()
    return app

        
