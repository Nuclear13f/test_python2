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
        # dddd = (products.type_product_id==1)|(products.type_product_id==2)
        # dddd = (products.type_product_id == v for v in ('1','2'))
        # filter(or_(User.name == v for v in ('Alice', 'Bob', 'Carl')))

        # q({'id': 5}, 2, 50)
        # def q(filters, page=0, page_size=None):
        #     query = session.query(...).filter_by(**filters)
        #     if page_size:
        #         query = query.limit(page_size)
        #     if page:
        #         query = query.offset(page * page_size)
        #     return query

        query_filter = []
        if param_type:
            query_filter.append(products.type_product_id.in_(param_type))
        if param_provider:
            query_filter.append(products.provider_id.in_(param_provider))
        # query_filter.append(products.img_name.is_(None))
        # query_filter.append(products.img_name.is_not(None))
        query = (select(products).filter(*query_filter))
        res = session.execute(query).scalars().all()
        count = len(res)
        query = query.limit(page['limit'])
        query = query.offset(page['offset'])
        res = session.execute(query).scalars().all()
        dict_data = []
        for w in res:
            dict_data.append({'id': w.id, 'name_product': w.name_product, 'id_product': w.id_product})
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