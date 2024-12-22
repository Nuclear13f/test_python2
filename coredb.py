from config import session_factory, sync_engine
from sqlalchemy.orm import aliased
from sqlalchemy import Integer, and_, func, insert, select, text, update, func, cast, delete, or_, desc, Float
from model import type_products, s1_products, s2_products, s3_products, products, provider, order, payment_, \
    item_orders, services_, payment_services_, payment_reimburs, contractor_, payment_contractor_, clients\
    , contracts, adress_client, adress_refreshment, company
import time, datetime
from sqlalchemy.orm import joinedload, selectinload

# def select_type_products(self):
#     with session_factory() as session:
#         query = (
#             select(type_products)
#         )
#         res = session.execute(query)
#         resu = res.scalars().all()
#     with session_factory() as session:
#         query = (
#             select(s1_products)
#         )
#         res2 = session.execute(query)
#         resu2 = res2.scalars().all()
#     with session_factory() as session:
#         query = (
#             select(s2_products)
#         )
#         res3 = session.execute(query)
#         resu3 = res3.scalars().all()
#     with session_factory() as session:
#         query = (
#             select(s3_products)
#         )
#         res4 = session.execute(query)
#         resu4 = res4.scalars().all()
#         dict = {'type': resu, 's1': resu2, 's2': resu3, 's3': resu4}
#     return (dict)

def sel_products_input_check(id, q):
    p_id_provider = id
    p_query = q
    with session_factory() as session:
        query = select(products.name_product, products.id_product,  func.similarity(products.name_product, p_query).label('simi'),).\
            filter(products.provider_id==int(p_id_provider)).where(products.name_product.bool_op('%')(p_query)).\
            order_by(func.similarity(products.name_product, p_query).desc()).limit(3)
        # query = select(products.name_product).where(products.name_product.bool_op('%')('Аккумулятор'))
        # query = select(products, func.count(products.name_product).label("sss")).where(products.name_product.bool_op('%')('Аккумулятор')).group_by(products.id)
        # query = select(products.name_product, func.similarity(products.name_product, 'Аккумулятор'))
        res = session.execute(query).all()
        dict_data = []
        for w in res:
            dict_data.append({'name_product': w.name_product, 'similarity': w.simi, 'id_product': w.id_product})
        dict = {'data': dict_data}
    return (dict)

def sel_products_check_stat(text):
    dict_data = []
    with session_factory() as session:
        query = select(products.name_product, products.id_product,
                       products.type_product_id, products.s1_id, products.s2_id, products.s3_id,
                       func.similarity(products.name_product, text).label('simi'), ).where(products.name_product.bool_op('%')(text)). \
            order_by(func.similarity(products.name_product, text).desc())
    res = session.execute(query).all()
    arrG = []
    arrTemp = []
    for w in res:
        arrTemp = [w.type_product_id, w.s1_id, w.s2_id, w.s3_id]
        flg = False
        if not arrG:
            arrG.append([arrTemp, 1])
        else:
            for s in arrG:
                if s[0] == arrTemp:
                    s[1] = s[1] + 1
                    flg = True
            if flg == False:
                arrG.append([arrTemp, 1])
    for i in range(len(arrG)):
        dict_data.append({'stat': arrG[i][0], 'similarity': round((arrG[i][1] / len(res)), 2)})
    dict = {'data': dict_data}
    print(dict)
    return (dict)


def select_products(flag, page):
    param_type = []
    param_provider = []
    param_query = ''
    if flag['type']:
        for w in flag['type']:
            param_type.append(int(w))
    if flag['provider']:
        for w in flag['provider']:
            param_provider.append(int(w))
    if flag['query']:
        param_query = str(flag['query'])
    print(param_query)
    # if flag:
    #     for w in flag:
    #         if w['type']:

            # if w['type']:
            #     for s in w['type']:
            #         param_type.append(int(s))
            # if w['provider']:
            #     for s in w['provider']:
            #         param_provider.append(int(s))


    with session_factory() as session:
        query_filter = []
        if param_type:
            query_filter.append(products.type_product_id.in_(param_type))
        if param_provider:
            query_filter.append(products.provider_id.in_(param_provider))
        # query = (select(products).filter(products.s2.has(s2_products.name_s2=='Щит')))
        # query = (select(products).join(s2_products).filter(and_(func.similarity(products.name_product, 'Болт') > 0.3,
        #     func.similarity(s2_products.name_s2, 'Болт') > 0.5)))


        # query = select(products).join(s2_products).filter(func.similarity(products.name_product, 'Болт') > 0.2).filter(func.similarity(s2_products.name_s2, 'Болт') > 0.1)

        query = (select(products).filter(*query_filter))


        # query = (select(products).filter(*query_filter)).filter(func.similarity(products.s2.name_s2, 'Щит') > 0.2)
        # query = (select(products).filter(*query_filter)).filter(products.name_product.match(param_query))

        # query = (select(products).filter(*query_filter)).filter(func.similarity(products.s2.has(s2_products.name_s2), 'Щит') > 0.2)

        # res = session.query(Person).filter(Person.name.match('foo')).all(
        # query = (select(products).filter(*query_filter)).filter(func.similarity(products.s2.name_s2, param_query) > 0.2)

        # query = (select(func.show_trgm(products.name_product)))
        # query = select(products, func.similarity(products.name_product, 'Аккумулятор')).where(products.name_product.bool_op('%')('Аккумулятор'))
        # query = select(products.name_product, func.similarity(products.name_product, 'fdsdfdfsd dsdasa awad'))
        # query = select(products).filter(func.similarity(products.name_product, 'плитка напольная') > 0.2)
        # query = select(products.name_product.match('Веник'))
        # query = select(products).filter(products.name_product.match('плитка настенн зоопарк') )


        res = session.execute(query).scalars().all()

        count = len(res)
        query = query.limit(page['limit'])
        query = query.offset(page['offset'])
        res = session.execute(query).scalars().all()
        dict_data = []
        for w in res:
            str1 = str(w.provider_id) + ".png"
            str2 = str(w.provider.provider).replace("\"",'&#39;').replace("\"",'&#187;')
            dict_data.append({'id': w.id, 'name_product': w.name_product, 'id_product': w.id_product, 'img_product': w.img_name, 'img_logo': str1, 'provider': str2})
            print(w.s2.name_s2)
        dict = {'count': count, 'data': dict_data}
    return(dict)

def get_data_provider(self):
    print('get_provider 1')
    dict_data = [];
    with session_factory() as session:
        query = (
            select(provider)
        )
        res = session.execute(query).scalars().all()
        for w in res:
            dict_data.append({'id': w.id, 'name_provider': w.provider, 'flg_own_ip': w.flg_own_id})
        dict = {'name': 'provider', 'data': dict_data}
        return (dict)

def mod_sql_products(dict1):
    with session_factory() as session:
        index = 0
        query = (
            select(products)
        ).filter(products.id_product==str(dict1['id_product']))
        res = session.execute(query).scalars().all()
        if res:
            for w in res:
                w.s1_id = dict1['c1']
                w.s2_id = dict1['c2']
                w.s3_id = dict1['c3']
                w.type_product_id = dict1['type']
                w.name_product = dict1['product']
                w.unit = dict1['unit']
                w.ratio = float(dict1['ratio'])
                session.commit()
        else:
            print('запись', dict1['id_product'])
            set_con = products(id_product=dict1['id_product'], name_product=dict1['product'],
                               s1_id=dict1['c1'], s2_id=dict1['c2'], s3_id=dict1['c3'], s4_id=0,
                               type_product_id=dict1['type'], provider_id=dict1['provider_id'],
                               unit=dict1['unit'], ratio=float(dict1['ratio']))
            session.add_all([set_con])
            session.flush()
            session.commit()


def max_id_prod(id):
    with session_factory() as session:
        search = "%PD" + id + "%"
        query = select(products.id_product).filter(products.provider_id==int(id)).filter(products.id_product.ilike(search))
        res = session.execute(query).scalars().all()
        mass = []
        max_id = ''
        if res:
            for r in res:
                mass.append(int(str(r).split('/')[1]))
            max_id = str(max(mass) + 1)
        else: max_id = '1'
        return (max_id)

def select_type_products():
    dict = [];
    with session_factory() as session:
        query = (select(type_products.id, type_products.name_type_product))
        rType = session.execute(query).all()
    with session_factory() as session:
        query = (select(s1_products.id, s1_products.name_s1, s1_products.type_product_id)).order_by(s1_products.name_s1)
                                                            # order_by(desc(s1_products.name_s1)) sort в обратном порядке
        rS1 = session.execute(query).all()
    with session_factory() as session:
        query = (select(s2_products.id, s2_products.name_s2, s2_products.s1_product_id)).order_by(s2_products.name_s2)
        rS2 = session.execute(query).all()
    with session_factory() as session:
        query = (select(s3_products.id, s3_products.name_s3, s3_products.s2_product_id)).order_by(s3_products.name_s3)
        rS3 = session.execute(query).all()
    dict = {'type': rType, 's1': rS1, 's2': rS2, 's3': rS3}

    return (dict)

def select_clients():
    with session_factory() as session:
        query = (select(clients)).order_by(clients.alias)
        res = session.execute(query).scalars().all()
        return res

def select_contracts(id_client):
    with session_factory() as session:
        query = (select(contracts)).filter_by(client_id=int(id_client))
        res = session.execute(query).scalars().all()
        return res


# select contracts.contract_num, clients.alias, sum(orders_.order_total)::int from orders_ join contracts on contracts.id = orders_.id_contract
# join clients on clients.id = contracts.client_id group by contracts.contract_num, clients.alias
def select_order(idContarct, idAdress):
    with session_factory() as session:
        c = aliased(contracts)
        o = aliased(order)
        i = aliased(item_orders)
        cl = aliased(clients)
        a = aliased(adress_client)
        ar = aliased(adress_refreshment)
        p = aliased(products)
        pr = aliased(provider)
        pay = aliased(payment_)
        co = aliased(company)
        query_filter_info = []
        query_filter_order = []
        js = []
        if int(idAdress) > 0:
            js.append(int(idAdress))
            # query_filter_info.append(a.id.in_(js))
            query_filter_order.append(o.id_adress_refreshment.in_(js))

        qInfo = (select(c.contract_num, a.adress, ar.id_adress)).select_from(c).join(ar, c.id==ar.id_contract).\
            join(a, a.id==ar.id_adress).filter(c.id==int(idContarct)).filter(*query_filter_info)
        res = session.execute(qInfo)
        result = res.all()
        adress = [];
        contract_num = '';
        for d in result:
            contract_num = d[0]
            adress.append({'id': d[2], 'adress': d[1]})
        s = {'contact_num': contract_num, 'adress': adress}
        info = {'info': s}
        print(info)

        subq = (select(c.contract_num,
                       func.sum(o.order_total).cast(Float).label('fffff')
                       )
                ).select_from(o).join(c, c.id==o.id_contract).filter(o.id_contract==int(idContarct)).\
            filter(*query_filter_order).group_by(c.contract_num)
        res = session.execute(subq)
        result = res.all()
        total = round(result[0][1], 2)

        # subq = (select(c.contract_num, func.sum(o.order_total).cast(Float).label('fffff'))
        #         ).select_from(o).join(c, c.id == o.id_contract).join(i, i.id_order == o.id).filter(
        #     o.id_contract == int(idContarct)).group_by(c.contract_num)
        qTBO = (select(c.contract_num, func.sum(i.total).cast(Float).label('fffff'))
                ).select_from(o).join(c, c.id == o.id_contract).join(i, i.id_order == o.id).filter(
            o.id_contract == int(idContarct)).filter(i.id_product == 11255).filter(*query_filter_order).group_by(c.contract_num)
        res = session.execute(qTBO)
        result = res.all()
        tbo = 0
        if result:
            tbo = result[0][1]
        else: tbo = 0
        dict = []
        dict.append(info)
        dict.append({'total': total})
        dict.append({'tbo': tbo})

        qOrder =  (select(o.id, o.id_name, o.order_date, o.order_total, pr.provider)).\
            join(pr, pr.id == o.id_provider).filter(o.id_contract==int(idContarct)).filter(*query_filter_order)
        res = session.execute(qOrder)
        result = res.all()
        dictOrder = []
        companyPay = ''
        for d in result:
            qItem = (select(i.id_product, i.cost, i.amount, i.total, p.name_product)).join(p, p.id == i.id_product).\
                filter(i.id_order == int(d[0]))
            res_i = session.execute(qItem)
            result_i = res_i.all()
            dict_i = []
            flgItem = 'ok'
            flgPay = 'err'
            if result_i:
                for u in result_i:
                    dict_i.append({'id': u.id_product, 'name': u.name_product, 'cost': u.cost, 'amount': u.amount, 'total': u.total})
            else: flgItem = 'err'
            strComp = ''
            qPay = (select(pay.payment_check, co.name)).select_from(pay).join(co, co.id == pay.id_company).filter(pay.id_order == int(d[0]))
            res_pay = session.execute(qPay)
            result_pay = res_pay.all()
            if result_pay:
                flgPay = 'ok'
                strComp = result_pay[0][1]

            dictOrder.append({'order': d[1], 'date': d[2], 'total': d[3], 'items': dict_i, 'provider': d[4],
                              'flgItem': flgItem, 'flgPay': flgPay, 'company': strComp})
        dict.append({'ORDER': dictOrder})
        return dict


def select_service(idContarct, idAdress):
    with session_factory() as session:
        print('services')
        c = aliased(contracts)
        s = aliased(services_)
        pr = aliased(provider)
        ps = aliased(payment_services_)
        co = aliased(company)
        query_filter_service = []
        js = []
        if int(idAdress) > 0:
            js.append(int(idAdress))
            # query_filter_info.append(a.id.in_(js))
            query_filter_service.append(s.id_adress_refreshment.in_(js))

        dService = []
        qService = (select(s.id, s.name_service, s.service_date, s.cost_service, pr.provider)).\
            select_from(s).join(pr, pr.id == s.id_provider).filter(s.id_contract == int(idContarct)).filter(*query_filter_service)
        res = session.execute(qService)
        result = res.all()
        if result:
            for s in result:
                dictPay = []
                flgPay = 'err'
                qPay = (select(ps.invoice_number, ps.invoice_cost, ps.invoice_date, co.name)).select_from(ps).\
                    join(co, co.id == ps.id_company).filter(ps.id_service == int(s.id))
                resPay = session.execute(qPay)
                resultPay = resPay.all()
                if resultPay:
                    for p in resultPay:
                        flgPay = 'ok'
                        dictPay.append({'date': p.invoice_date, 'cost': p.invoice_cost, 'company': p.name,
                                        'invoice': p.invoice_number})
                d = {'provider': s.provider, 'service': s.name_service, 'date': s.service_date,
                     'cost': s.cost_service, 'flgPay': flgPay, 'pay': dictPay}
                dService.append(d)
        return dService

def select_contractor(idContarct):
    with session_factory() as session:
        print('contractor')
        c = aliased(contracts)
        ct = aliased(contractor_)
        pr = aliased(provider)
        co = aliased(company)
        pc = aliased(payment_contractor_)
        dContractor = []
        qContractor = (select(ct.id, ct.name_contract, ct.contract_num, ct.contract_date, ct.cost_contract, pr.provider, co.name)). \
            select_from(ct).join(pr, pr.id == ct.id_provider).join(co, co.id == ct.id_customer).filter(ct.id_contract == int(idContarct))
        res = session.execute(qContractor)
        result = res.all()
        if result:
            for s in result:
                dictPay = []
                flgPay = 'err'
                qPay = (select(pc.date_payment, pc.cost_payment)).select_from(pc).filter(pc.id_contractor == int(s.id))
                resPay = session.execute(qPay)
                resultPay = resPay.all()
                if resultPay:
                    for p in resultPay:
                        flgPay = 'ok'
                        dictPay.append({'date': p.date_payment, 'cost': p.cost_payment})
                d = {'provider': s.provider, 'name_contract': s.name_contract, 'date': s.contract_date,
                     'cost_contract': s.cost_contract, 'contract_num': s.contract_num, 'custamer': s.name,
                     'flg': flgPay, 'pay': dictPay}
                dContractor.append(d)
        print(dContractor)
        return dContractor


def check_prod(rows):
    with session_factory() as session:
        exception_word = ['Доставка товара', 'Подъем']
        start = time.time()
        dict = []
        for c1, c2 in rows:
            if c1.value:
                if not c2.value in exception_word:
                    ids = str(c1.value).strip()
                    query = select(products.id_product).filter_by(id_product=ids)
                    res = session.execute(query).all()
                    if res:
                        dict.append({'id': c1.value, 'product': c2.value, 'flg': 'ok'})
                    else:
                        dict.append({'id': c1.value, 'product': c2.value, 'flg': 'err'})
        stop = time.time()
        s = stop-start
        print(dict)
        print('\n', round(s,6), 'сек.')
        return dict




# region ******* Миграция в PSQL
def mod_sql_order(dict):
    with session_factory() as session:
        session.execute(insert(order), dict);
        session.flush();
        session.commit();


def mod_sql_payment(dict):
    with session_factory() as session:
        dicts = []
        for d in dict:
            query = select(order.id).filter_by(id_contract=d['id_contract']).filter_by(id_name=d['id_name']).\
                filter_by(id_adress_refreshment=int(d['id_refs']))
            res = session.execute(query).scalars().all()
            print(res[0], d['id_name'], d['account_number'])
            s = {'id_order': res[0], 'payment_check': d['payment_check'], 'payment_date': d['payment_date'],
                 'id_company': d['id_company'], 'account_number': d['account_number'],
                 'created': d['created'], 'update': d['update']}
            dicts.append(s)
        print(dicts)
        session.execute(insert(payment_), dicts);
        session.flush();
        session.commit();

def mod_sql_item_orders(dict):
    dicts = []
    with session_factory() as session:
        for d in dict:
            query = (select(products)).filter_by(id_product=str(d['id_product']))
            query2 = (select(order)).filter_by(id_name=str(d['id_name'])).\
                filter_by(id_contract=int(d['id_contract'])).filter_by(id_adress_refreshment=int(d['id_refs']))
            product_i = session.execute(query).scalars().all()
            orders = session.execute(query2).scalars().all()
            ds = {'id_order': orders[0].id, 'id_product': product_i[0].id, 'cost': d['cost'], 'amount': d['amount'],
                  'total': d['total'], 'created': d['created'], 'update': d['update'], 'id_old_product':d['id_product']}
            dicts.append(ds)
        session.execute(insert(item_orders), dicts);
        session.flush();
        session.commit();
def mod_sql_service(dict, flg):
    dicts = []
    with session_factory() as session:
        session.execute(insert(services_), dict);
        session.flush();
        session.commit();


def mod_sql_service_pay(dict, flg):
    dicts = []
    with session_factory() as session:
        for d in dict:
            query_s = (select(services_)).filter_by(temp_col=str(d['temp_col']))
            temp = session.execute(query_s).scalars().all()
            ds = {'id_service': temp[0].id, 'id_company': int(d['id_company']), 'invoice_date': d['invoice_date'],
                  'invoice_number': d['invoice_number'], 'invoice_cost': d['invoice_cost'],
                  'created': d['created'], 'update': d['update']}
            dicts.append(ds)
        session.execute(insert(payment_services_), dicts);
        session.flush();

        session.commit();


def mod_sql_reimburs(dict, flg):
    with session_factory() as session:
        print(dict)
        session.execute(insert(payment_reimburs), dict);
        session.flush();
        if flg == False:
            session.commit();
            pass

def mod_sql_contractor(dict, flg):
    with session_factory() as session:
        session.execute(insert(contractor_), dict);
        session.flush();
        session.commit();

def mod_sql_contractor_pay(dict, flg):
    dicts = []
    with session_factory() as session:
        for d in dict:
            query_s = (select(contractor_)).filter_by(id_contract=int(d['id_contract'])).filter_by(contract_num=str(d['contract_num']))
            temp = session.execute(query_s).scalars().all()
            ds = {'id_contractor': temp[0].id, 'date_payment': d['date_payment'], 'cost_payment': d['cost_payment'],
                  'created': d['created'], 'update': d['update']}
            dicts.append(ds)
        session.execute(insert(payment_contractor_), dicts);
        session.flush();
        session.commit();

# endregion