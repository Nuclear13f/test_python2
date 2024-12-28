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

class contracts(Base):
    __tablename__ = 'contracts'
    id: Mapped[int] = mapped_column(primary_key=True)
    name_contract: Mapped[str]
    client_id: Mapped[int] = mapped_column(ForeignKey('clients.id'))
    adress_id: Mapped[int] = mapped_column(ForeignKey('adress_clients.id'))
    company_id: Mapped[int] = mapped_column(ForeignKey('company.id'))
    contract_price: Mapped[float]
    contract_num: Mapped[str]
    contract_date: Mapped[datetime.date]
    status: Mapped[str]
    contract_date_close: Mapped[datetime.date]
    contract_price_close: Mapped[float]
    contract_name_file: Mapped[str]
    contract_exeс_period: Mapped[datetime.date]
    note: Mapped[str]
    year: Mapped[str]
    flg_mater_c: Mapped[bool]
    client: Mapped['clients'] = relationship(back_populates='contract')
    adress: Mapped['adress_client'] = relationship(back_populates='contract')
    company: Mapped['company'] = relationship(back_populates='contract')

class clients(Base):
    __tablename__ = 'clients'
    id: Mapped[int] = mapped_column(primary_key=True)
    full_name: Mapped[str]
    little_name: Mapped[str]
    inn: Mapped[str]
    alias: Mapped[str]
    update: Mapped[datetime.datetime] = mapped_column(server_default=func.now())  # используем лист при связи один ко многим
    adress: Mapped[list['adress_client']] = relationship(back_populates='client')
    contract: Mapped['contracts'] = relationship(back_populates='client')

class adress_client(Base):
    __tablename__ = 'adress_clients'
    id: Mapped[int] = mapped_column(primary_key=True)
    adress: Mapped[str]
    region: Mapped[str]
    client_id: Mapped[int] = mapped_column(ForeignKey('clients.id'))
    client: Mapped['clients'] = relationship(back_populates='adress')
    contract: Mapped['contracts'] = relationship(back_populates='adress')

class adress_refreshment(Base):
    __tablename__ = 'adress_refreshment'
    id: Mapped[int] = mapped_column(primary_key=True)
    id_contract: Mapped[int] = mapped_column(ForeignKey('contracts.id'))
    id_adress: Mapped[int] = mapped_column(ForeignKey('adress_clients.id'))


class order(Base):
    __tablename__ = 'orders_'
    id: Mapped[int] = mapped_column(primary_key=True)
    id_name: Mapped[str]
    order_date: Mapped[datetime.date]
    type: Mapped[str]
    order_total: Mapped[float]
    created: Mapped[datetime.datetime] = mapped_column(server_default=func.now())
    update: Mapped[datetime.datetime] = mapped_column(server_default=func.now())
    id_contract: Mapped[int] = mapped_column(ForeignKey('contracts.id'))
    id_provider: Mapped[int] = mapped_column(ForeignKey('provider.id'))
    id_adress_refreshment: Mapped[int] = mapped_column(ForeignKey('adress_clients.id'))
    # client: Mapped['clients'] = relationship(back_populates='adress')
    # contract: Mapped['contracts'] = relationship(back_populates='adress')


class company(Base):
    __tablename__ = 'company'
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    adress: Mapped[str]
    contract: Mapped['contracts'] = relationship(back_populates='company')
class payment_(Base):
    __tablename__ = 'payment_'
    id: Mapped[int] = mapped_column(primary_key=True)
    payment_check: Mapped[float]
    payment_date: Mapped[datetime.date]
    note: Mapped[str]
    account_number = Mapped[str]
    created: Mapped[datetime.datetime] = mapped_column(server_default=func.now())
    update: Mapped[datetime.datetime] = mapped_column(server_default=func.now())
    id_order: Mapped[int] = mapped_column(ForeignKey('orders_.id'))
    id_company: Mapped[int] = mapped_column(ForeignKey('company.id'))

class item_orders(Base):
    __tablename__ = 'item_orders'
    id: Mapped[int] = mapped_column(primary_key=True)
    cost: Mapped[float]
    amount: Mapped[float]
    total: Mapped[float]
    id_old_product = Mapped[str]
    created: Mapped[datetime.datetime] = mapped_column(server_default=func.now())
    update: Mapped[datetime.datetime] = mapped_column(server_default=func.now())
    id_order: Mapped[int] = mapped_column(ForeignKey('orders_.id'))
    id_product: Mapped[int] = mapped_column(ForeignKey('products.id'))

class services_(Base):
    __tablename__ = 'services_'
    id: Mapped[int] = mapped_column(primary_key=True)
    id_contract: Mapped[int] = mapped_column(ForeignKey('contracts.id'))
    id_provider: Mapped[int] = mapped_column(ForeignKey('provider.id'))
    id_adress_refreshment: Mapped[int] = mapped_column(ForeignKey('adress_clients.id'))
    name_service: Mapped[str]
    service_date: Mapped[datetime.date]
    cost_service: Mapped[float]
    temp_col: Mapped[str] = mapped_column(String(20))
    created: Mapped[datetime.datetime] = mapped_column(server_default=func.now())
    update: Mapped[datetime.datetime] = mapped_column(server_default=func.now())


class payment_services_(Base):
    __tablename__ = 'payment_services_'
    id: Mapped[int] = mapped_column(primary_key=True)
    id_service: Mapped[int] = mapped_column(ForeignKey('services_.id'))
    id_company: Mapped[int] = mapped_column(ForeignKey('company.id'))
    invoice_date: Mapped[datetime.date]
    invoice_cost: Mapped[float]
    invoice_number: Mapped[str]
    created: Mapped[datetime.datetime] = mapped_column(server_default=func.now())
    update: Mapped[datetime.datetime] = mapped_column(server_default=func.now())

class payment_reimburs(Base):
    __tablename__ = 'payment_reimburs'
    id: Mapped[int] = mapped_column(primary_key=True)
    id_contract: Mapped[int] = mapped_column(ForeignKey('contracts.id'))
    id_company: Mapped[int] = mapped_column(ForeignKey('company.id'))
    id_adress_refreshment: Mapped[int] = mapped_column(ForeignKey('adress_clients.id'))
    date_reimburs: Mapped[datetime.date]
    name_reimburs: Mapped[float]
    cost_reimburs: Mapped[float]
    created: Mapped[datetime.datetime] = mapped_column(server_default=func.now())
    update: Mapped[datetime.datetime] = mapped_column(server_default=func.now())

class contractor_(Base):
    __tablename__ = 'contractor_'
    id: Mapped[int] = mapped_column(primary_key=True)
    id_contract: Mapped[int] = mapped_column(ForeignKey('contracts.id'))
    id_customer: Mapped[int] = mapped_column(ForeignKey('company.id'))
    id_provider: Mapped[int] = mapped_column(ForeignKey('provider.id'))
    id_adress_refreshment: Mapped[int] = mapped_column(ForeignKey('adress_clients.id'))
    name_contract: Mapped[str]
    contract_num: Mapped[str]
    contract_date: Mapped[datetime.date]
    cost_contract: Mapped[float]
    status: Mapped[str]
    created: Mapped[datetime.datetime] = mapped_column(server_default=func.now())
    update: Mapped[datetime.datetime] = mapped_column(server_default=func.now())

class payment_contractor_(Base):
    __tablename__ = 'payment_contractor_'
    id: Mapped[int] = mapped_column(primary_key=True)
    id_contractor: Mapped[int] = mapped_column(ForeignKey('contractor_.id'))
    date_payment: Mapped[datetime.date]
    cost_payment: Mapped[float]
    created: Mapped[datetime.datetime] = mapped_column(server_default=func.now())
    update: Mapped[datetime.datetime] = mapped_column(server_default=func.now())

class coupler_contract(Base):
    __tablename__ = 'coupler_contract'
    id: Mapped[int] = mapped_column(primary_key=True)
    id_c_master: Mapped[int] = mapped_column(ForeignKey('contracts.id'))
    id_c_slave: Mapped[int] = mapped_column(ForeignKey('contracts.id'))

class rent_(Base):
    __tablename__ = 'rent_'
    id: Mapped[int] = mapped_column(primary_key=True)
    id_contract: Mapped[int] = mapped_column(ForeignKey('contracts.id'))
    id_company: Mapped[int] = mapped_column(ForeignKey('company.id'))
    id_provider: Mapped[int] = mapped_column(ForeignKey('provider.id'))
    id_adress_refreshment: Mapped[int]
    rent_name: Mapped[str]
    rent_num: Mapped[str]
    rent_date: Mapped[datetime.date]
    rent_cost: Mapped[float]
    created: Mapped[datetime.datetime] = mapped_column(server_default=func.now())
    update: Mapped[datetime.datetime] = mapped_column(server_default=func.now())