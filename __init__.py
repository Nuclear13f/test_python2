from flask import Flask, session
from flask_sqlalchemy import SQLAlchemy
from config import settings
from flask_login import LoginManager, logout_user





db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'hjshjhdjah kjshkjdhjs'
    app.secret_key = "something only you know"
    app.config['SQLALCHEMY_DATABASE_URI'] = settings.DATABASE_URL_psycopg
    print(settings.DATABASE_URL_psycopg)
    app.config['UNLOAD_DIR'] = 'uploads/'
    db.init_app(app)
    from auth import auth
    app.register_blueprint(auth, url_prefix='/')
    from model import users

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)
    @login_manager.user_loader
    def load_user(id):
        print(id)
        sas = users.query.get(int(id))
        print(sas)
        return users.query.get(int(id))


    return app




