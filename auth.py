from flask import Blueprint, render_template, request, redirect, url_for, jsonify, json
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
        print('Тута')
        # password = request.form.get('password')
        login = request.form['login']
        password = request.form['pass']
        print(password)
        print(login)
        user = users.query.filter_by(login=login).first()
        if user:
            if user.password == password:
                login_user(user, remember=True)
                print('УРЯЯЯЯЯЯЯЯЯЯЯЯ')
                # return render_template("home.html", user=current_user, master='GGG')
                return jsonify('success')
            print("Есть такой пользователь")
        else: print('Нет такого пользователя')



    return render_template('login.html', user=current_user)

@auth.route('/logout')
def logout():
    logout_user()
    print('un reg')
    return redirect(url_for('auth.login'))

