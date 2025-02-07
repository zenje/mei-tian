from flask import Flask

from datetime import timedelta

# from flask import render_template_string, request, session, redirect, url_for
from flask_session import Session


from .extensions import db, ma
from .routes import words


def create_app(config_file="settings.py"):
    app = Flask(__name__, static_folder="../../build", static_url_path="/")

    app.config.from_pyfile(config_file)

    db.init_app(app)
    ma.init_app(app)

    app.register_blueprint(words)

    server_session = Session(app)

    @app.route("/")
    def index():
        return app.send_static_file("index.html")

    @app.errorhandler(404)
    def not_found(e):
        return app.send_static_file("index.html")

    return app


# if __name__ == "__main__":
# app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
