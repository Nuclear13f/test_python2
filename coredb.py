from config import session_factory, sync_engine
from sqlalchemy import Integer, and_, func, insert, select, text, update, func, cast, delete
from model import type_products, s1_products, s2_products, s3_products, products


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


def select_products(flag,page):
    print('select product_1')
    fil = {'s1_id': 5}
    print(fil)
    print(*fil)
    # print(**fil)
    with session_factory() as session:
        query = (
            select(products
                   )
            .filter_by(**flag)
            .limit(page['limit'])
            .offset(page['offset'])
        )


        res = session.execute(query).scalars().all()
        print('select product_2')
        print(res)
        for p in res:
            # print(p.name_product, "  ", p.type_product.name_type_product)
            print(p.name_product)
        print(len(res))

    return(res)