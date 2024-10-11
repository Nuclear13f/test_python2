from config import session_factory, sync_engine
from sqlalchemy import Integer, and_, func, insert, select, text, update, func, cast, delete
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
    if flag:
        for w in flag:
            param_type.append(int(w))
    else: param_type[1,2]
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

        query = (
            select(products
                   )
            .filter(products.type_product_id.in_(param_type))
            # .filter((AddressBook.lastname == 'bulger') | (AddressBook.firstname == 'whitey'))
        #     not_null_filters =[]
        #     if filter.title:
        #     not_null_filters.append(Book.title.ilike(filter.title))
        # if filter.author:
        # #     not_null_filters.append(Book.author.ilike(filter.author))
        #
        # if len(not_null_filters) > 0:
        #     query = query.filter(or_(*not_null_filters))

            # .limit(page['limit'])
            # .offset(page['offset'])
        )
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