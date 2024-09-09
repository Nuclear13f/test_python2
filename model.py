from __init__ import db
from flask_login import UserMixin
from sqlalchemy import Table, Column, Integer, String, MetaData, Boolean, func, ForeignKey, DateTime, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship, DeclarativeBase



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

class s3_products(Base):
    __tablename__ = 's3_products'
    id: Mapped[int] = mapped_column(primary_key=True)
    name_s3: Mapped[str]
    s2_product_id: Mapped[int] = mapped_column(ForeignKey('s2_products.id'))