from dotenv import load_dotenv, dotenv_values




class Sett():
    @property
    def DATABASE_URL_psycopg(self):
        config = dotenv_values('.env')

        return (f"postgresql+psycopg://{config['DB_USER']}:{config['DB_PASS']}@{config['DB_HOST']}:"
                f"{config['DB_PORT']}/{config['DB_NAME']}")

settings = Sett()