from flask import Flask, session
from flask_sqlalchemy import SQLAlchemy
from config import settings
from flask_login import LoginManager, logout_user



# for key in list(session.keys()):
#     session.pop(key)



db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'hEEkjshkjdhjs'
    app.secret_key = "something only you know"
    app.config['SQLALCHEMY_DATABASE_URI'] = settings.DATABASE_URL_psycopg
    print(settings.DATABASE_URL_psycopg)
    app.config['UNLOAD_DIR'] = 'uploads/'
    db.init_app(app)
    from auth import auth
    from auth_psql import auth_psql
    app.register_blueprint(auth, url_prefix='/')
    app.register_blueprint(auth_psql, url_prefix='/')



    from model import users
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)
    login_manager.session_protection = 'strong'
    login_manager.refresh_view = "accounts.reauthenticate"
    login_manager.needs_refresh_message = (
        u"To protect your account, please reauthenticate to access this page."
    )
    login_manager.needs_refresh_message_category = "info"


    @login_manager.user_loader
    def load_user(id):
        # print(id)
        sas = users.query.get(int(id))
        # print(sas)
        return users.query.get(int(id))


    return app




