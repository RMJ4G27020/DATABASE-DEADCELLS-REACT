from flask import Flask

from .database import init_db
from .routes import register_routes


def create_app() -> Flask:
    """Application factory that configures the Flask app and database."""
    app = Flask(__name__)
    init_db()
    register_routes(app)
    return app
