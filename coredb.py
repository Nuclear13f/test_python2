from config import session_factory, sync_engine
from sqlalchemy import Integer, and_, func, insert, select, text, update, func, cast, delete
from model import type_products, s1_products, s2_products, s3_products


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