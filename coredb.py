from config import session_factory, sync_engine
from sqlalchemy import Integer, and_, func, insert, select, text, update, func, cast, delete, or_, desc
from model import type_products, s1_products, s2_products, s3_products, products, provider
import time
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

def check_prod(rows):
    with session_factory() as session:
        start = time.time()
        for c1, c2 in rows:
            ids = str(c1.value).strip()
            query = select(products.id_product).filter_by(id_product=ids)
            res = session.execute(query).all()
            if res:
                print('ok')
            else: print('not')
        stop = time.time()
        s = stop-start
        print('\n', round(s,6), 'сек.')
