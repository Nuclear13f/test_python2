import flask_login
from flask import Blueprint, render_template, request, redirect, url_for, jsonify, json
from flask_login import login_required, current_user, logout_user, login_user
from model import users
from flask_bcrypt import Bcrypt
from coredb import select_type_products, select_products, get_data_provider,sel_products_input_check, max_id_prod
import copy
import json


auth = Blueprint('auth', __name__)

# @auth.route('/blog/', defaults={'page': 1})
@auth.route('/blog/',methods=['GET'] )
def blog():
    blogg = request.args.get('ddddddd')
    return 'sdfsfsdfsdfsdf'

@auth.route('/', methods=['GET', 'POST'])
@login_required #входят только зарегистрированные пользователи
def home():
    print('home')
    return render_template("home.html", user=current_user)

# @auth.route('/start/', defaults={'page': 1})
@auth.route('/start/', methods=['GET', 'POST'])
@login_required #входят только зарегистрированные пользователи
def start():

    return render_template("start.html", test='test')

@auth.route('/events/')
@login_required
def events():
    return render_template('events.html/', client="dddd")

@auth.route('/admin/')
@login_required
def admin():
    return render_template('admin.html', client="dddd")

@auth.route('/admin/product/')
@login_required
def admin_product():
    return render_template('input_product.html', client="dddd")


@auth.route('/grid/')
@login_required
def grid():
    return render_template('table.html', client="dddd")



# def showpage():
#     ...
#     test = [1,2,3,4,5,6]
#     test = json.dumps(test)
#     return render_template("sample.html",test=test)
#
# In the JavaScript code:
#
# <script> var counts = JSON.parse("{{ test }}"); </script>
#
#




@auth.route('/login/', methods=['GET','POST'])
def login():
    from main import bcrypt
    if request.method == 'POST':
        print('Тута')
        # password = request.form.get('password')
        login = request.form['login']
        password = request.form['pass']
        print(password)
        print(login)
        user = users.query.filter_by(login=login).first()
        print(user)
        if user:
            if bcrypt.check_password_hash(user.hash_password, password):
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

# @auth.route('/cabinet/')
# # @auth.route('/cabinet/<username>')
# def test():
#     return render_template('test_1.html/', client="dddd")






@auth.route('/cabinet/order/', methods=['GET', 'POST'])
# @auth.route('/cabinet/<username>')
def order():
    print('order')
    return render_template('test_1.html/', client="dddd")



@auth.route('/cabinet2/', methods=['GET', 'POST'])
def test2():
    str = request.args.get('username')
    str = request.args.get('page')
    print('Я тута')
    print(str)
    return redirect('/?page=')


@auth.route('/get_products', methods=['GET', 'POST'])
@login_required
def get_products():
    provider = []
    page = {'limit': 10, 'offset': 0}
    flag = {'type': [], 'provider': [], 'page': [], 'query': []}
    data = request.get_json()
    print(data)
    if data['type']:
        flag['type'] = data['type']
    if data['provider']:
        flag['provider'] = data['provider']
    if data['query']:
        flag['query'] = data['query']
    if data['page']:
        page['offset'] = (int(data['page'][0]) - 1)*10
    data = select_products(flag, page);
    return jsonify(data)

@auth.route('/get_prd_f_inp_prd', methods=['GET', 'POST'])
@login_required
def get_prd_f_inp_prd():
    data = request.get_json()
    id = data[0]['providerId']
    f = data[0]['data']
    dict = []
    for w in f:
        data = sel_products_input_check(id, w['query']);
        dict_o = {'count': w['count'], 'data': data};
        dict.append(dict_o)
    print(dict)
    return jsonify(dict)


@auth.route('/get_id_max_product', methods=['GET', 'POST'])
@login_required
def get_id_max_product():
    data = request.get_json()
    data = max_id_prod(data);
    return jsonify(data)


@auth.route('/get_provider', methods=['GET', 'POST'])
def get_provider():
    print('Шаг 1')
    prov = get_data_provider(id)
    return jsonify(prov)


@auth.route('/get_stat_product', methods=['GET', 'POST'])
@login_required
def stat_products():
    data = request.get_json()
    print('1')
    print(data)
    print(data['con'])
    print(data['sas'])
    dd = data['sas']
    print(dd['s'])


    prov = select_type_products(id)
    type = prov['type']
    s1 = prov['s1']
    s2 = prov['s2']
    s3 = prov['s3']
    dict_type = []
    dict_s1 = []
    dict_s2 = []
    dict_s3 = []
    for p in type:
        for p2 in s1:
            if p.id == p2.type_product_id:
                for p3 in s2:
                    if p2.id == p3.s1_product_id:
                        for p4 in s3:
                            if p3.id == p4.s2_product_id:
                                dict_s3.append({'id': p4.id, 'name': p4.name_s3})
                        dict_s2.append({'id': p3.id, 'name': p3.name_s2, 'child': copy.copy(dict_s3)})
                        dict_s3.clear();
                dict_s1.append({'id': p2.id, 'name': p2.name_s1, 'child': copy.copy(dict_s2)})
                dict_s2.clear();
        dict_type.append({'id': p.id, 'name': p.name_type_product, 'child': copy.copy(dict_s1)})
        dict_s1.clear();
    return jsonify(dict_type)


@auth.route('/unload_1', methods=['GET', 'POST'])
@login_required
def unload1():
    data = request.form
    print('fsfsfsfsfsdfsdfsd')
    print(data)

@auth.route('/testRequest', methods=['GET', 'POST'])
@login_required
def testRequest():
    print('testRequest')
    dict = [{'id': 1, 'name': 'Sergey'},{'id': 1, 'name': 'Dany'}]
    return jsonify(dict)

