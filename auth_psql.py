import flask_login
from flask import Blueprint, render_template, request, redirect, url_for, jsonify, json
from flask_login import login_required, current_user, logout_user, login_user
from model import users
from flask_bcrypt import Bcrypt
from coredb import select_clients, select_contracts, select_order, select_service, select_contractor
import os, sys, glob, shutil, time, copy
from excel import CoreXLSX

auth_psql = Blueprint('auth_psql', __name__)

@auth_psql.route('/get_clients', methods=['GET', 'POST'])
# @login_required
def get_clients1():
    print('getClient')
    dict = []
    # data = request.get_json()
    data = select_clients()
    for d in data:
        s = {'id': d.id, 'client': d.alias}
        dict.append(s)
    return jsonify(dict)

@auth_psql.route('/get_contracts', methods=['GET', 'POST'])
# @login_required
def get_contracts():
    dict = []
    data = select_contracts(request.get_json())
    for d in data:
        s = {'id': d.id, 'contracts': d.name_contract}
        dict.append(s)
    print(dict)
    return jsonify(dict)

@auth_psql.route('/get_orders_psql', methods=['GET', 'POST'])
# @login_required
def get_orders_psql():
    print('ok psql')
    con = request.get_json()
    data = select_order(con['id_contract'], con['id_adress'])
    return jsonify(data)

@auth_psql.route('/get_service_psql', methods=['GET', 'POST'])
# @login_required
def get_service_psql():
    con = request.get_json()
    data = select_service(con['id_contract'], con['id_adress'])
    return jsonify(data)

@auth_psql.route('/get_contractor_psql', methods=['GET', 'POST'])
# @login_required
def get_contractor_psql():
    data = select_contractor(request.get_json())
    return jsonify(data)










