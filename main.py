from __init__ import create_app
from flask_bcrypt import Bcrypt







app = create_app()


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0');