from __init__ import db
from flask_login import UserMixin
from sqlalchemy import Table, Column, Integer, String, MetaData, Boolean, func, ForeignKey, DateTime, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship, DeclarativeBase
import datetime


class Base(DeclarativeBase):
    pass
class users(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(20))
    password = db.Column(db.String(50))
    hash_password = db.Column(db.String(256))


class type_products(Base):
    __tablename__ = 'type_products'
    id: Mapped[int] = mapped_column(primary_key=True)
    name_type_product: Mapped[str]
    products: Mapped['products'] = relationship(back_populates='type_product')

class s1_products(Base):
    __tablename__ = 's1_products'
    id: Mapped[int] = mapped_column(primary_key=True)
    name_s1: Mapped[str]
    type_product_id: Mapped[int] = mapped_column(ForeignKey('type_products.id'))


class s2_products(Base):
    __tablename__ = 's2_products'
    id: Mapped[int] = mapped_column(primary_key=True)
    name_s2: Mapped[str]
    s1_product_id: Mapped[int] = mapped_column(ForeignKey('s1_products.id'))
    product: Mapped[list['products']] = relationship(back_populates='s2', lazy="joined")

class s3_products(Base):
    __tablename__ = 's3_products'
    id: Mapped[int] = mapped_column(primary_key=True)
    name_s3: Mapped[str]
    s2_product_id: Mapped[int] = mapped_column(ForeignKey('s2_products.id'))

class products(Base):
    __tablename__ = 'products'
    id: Mapped[int] = mapped_column(primary_key=True)
    name_product: Mapped[str]
    id_product: Mapped[str]
    img_name: Mapped[str]
    unit: Mapped[str]
    ratio: Mapped[float]
    created: Mapped[datetime.datetime] = mapped_column(server_default=func.now())
    provider_id: Mapped[int] = mapped_column(ForeignKey('provider.id'))
    type_product_id: Mapped[int] = mapped_column(ForeignKey('type_products.id'))
    s1_id: Mapped[int] = mapped_column(ForeignKey('s1_products.id'))
    s2_id: Mapped[int] = mapped_column(ForeignKey('s2_products.id'))
    s3_id: Mapped[int] = mapped_column(ForeignKey('s3_products.id'))
    s4_id: Mapped[int] = mapped_column(ForeignKey('s3_products.id'))
    type_product: Mapped['type_products'] = relationship(back_populates='products')
    provider: Mapped['provider'] = relationship(back_populates='product')
    s2: Mapped['s2_products'] = relationship(back_populates='product')


class provider(Base):
    __tablename__ = "provider"
    id: Mapped[int] = mapped_column(primary_key=True)
    provider: Mapped[str]
    little_provider: Mapped[str]
    adress: Mapped[str]
    scope: Mapped[str]
    inn: Mapped[str]
    contact: Mapped[str]
    manadger: Mapped[str]
    note: Mapped[str]
    stip_pay_agr: Mapped[str]
    code_provider: Mapped[str]
    flg_own_id: Mapped[bool]
    cpp: Mapped[str]
    product: Mapped['products'] = relationship(back_populates='provider')
    # order_delay: Mapped['delay_order'] = relationship(back_populates='provider')