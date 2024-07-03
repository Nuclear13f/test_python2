from flask import Blueprint, render_template, request, redirect, url_for
from flask_login import login_required, current_user, logout_user, login_user
from model import users


auth = Blueprint('auth', __name__)



@auth.route('/', methods=['GET', 'POST'])
@login_required #входят только зарегистрированные пользователи
def home():
    print('home')
    return render_template("home.html", user=current_user)



@auth.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        password = request.form.get('password')
        user = users.query.filter_by(login='Sergey').first()
        if user.password == password:
            login_user(user, remember=True)
            return render_template("home.html", user=current_user)



    return render_template('login.html', user=current_user)

@auth.route('/logout')
def logout():
    logout_user()
    print('un reg')
    return redirect(url_for('auth.login'))

