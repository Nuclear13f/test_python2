from config import session_factory, sync_engine
from sqlalchemy import Integer, and_, func, insert, select, text, update, func, cast, delete, or_
from model import type_products, s1_products, s2_products, s3_products, products, provider


def select_type_products(self):
    with session_factory() as session:
        query = (
            select(type_products)
        )
        res = session.execute(query)
        resu = res.scalars().all()
    with session_factory() as session:
        query = (
            select(s1_products)
        )
        res2 = session.execute(query)
        resu2 = res2.scalars().all()
    with session_factory() as session:
        query = (
            select(s2_products)
        )
        res3 = session.execute(query)
        resu3 = res3.scalars().all()
    with session_factory() as session:
        query = (
            select(s3_products)
        )
        res4 = session.execute(query)
        resu4 = res4.scalars().all()
        dict = {'type': resu, 's1': resu2, 's2': resu3, 's3': resu4}
    return (dict)

def select_products(flag, page):
    param_type = []
    param_provider = []
    if flag['type']:
        for w in flag['type']:
            param_type.append(int(w))
    if flag['provider']:
        for w in flag['provider']:
            param_provider.append(int(w))

    print('param', param_provider)
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
        query = (select(products).filter(*query_filter))
        # query = (select(func.show_trgm(products.name_product)))
        # query = select(products.name_product, func.similarity(products.name_product, 'Веник')).where(products.name_product.bool_op('%')('Веник'))
        # query = select(products.name_product, func.similarity(products.name_product, 'fdsdfdfsd dsdasa awad'))
        # query = select(products).filter(func.similarity(products.name_product, '') > 0.5)
        # query = select(products.name_product.match('Веник'))

        res = session.execute(query).scalars().all()
        # for w in res:
        #     print(w.name_product)

        count = len(res)
        query = query.limit(page['limit'])
        query = query.offset(page['offset'])
        res = session.execute(query).scalars().all()
        dict_data = []
        for w in res:
            str1 = str(w.provider_id) + ".png"
            str2 = str(w.provider.provider).replace("\"",'&#39;').replace("\"",'&#187;')
            dict_data.append({'id': w.id, 'name_product': w.name_product, 'id_product': w.id_product, 'img_product': w.img_name, 'img_logo': str1, 'provider': str2})
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
            dict_data.append({'id': w.id, 'name_provider': w.provider})
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


