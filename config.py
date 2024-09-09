from dotenv import load_dotenv, dotenv_values
from sqlalchemy import String, create_engine, text
from sqlalchemy.orm import Session, sessionmaker, DeclarativeBase


class Sett():
    @property
    def DATABASE_URL_psycopg(self):
        config = dotenv_values('.env')

        return (f"postgresql+psycopg://{config['DB_USER']}:{config['DB_PASS']}@{config['DB_HOST']}:"
                f"{config['DB_PORT']}/{config['DB_NAME']}")

settings = Sett()

sync_engine = create_engine(
    url=settings.DATABASE_URL_psycopg,
    # echo=True,
    )

session_factory = sessionmaker(sync_engine)

