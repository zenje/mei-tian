from flask import Flask

from datetime import timedelta

from flask import render_template_string, request, session, redirect, url_for
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

    @app.route("/set_email", methods=["GET", "POST"])
    def set_email():
        if request.method == "POST":
            # Save the form data to the session object
            session["email"] = request.form["email_address"]
            return redirect(url_for("get_email"))

        return """
            <form method="post">
                <label for="email">Enter your email address:</label>
                <input type="email" id="email" name="email_address" required />
                <button type="submit">Submit!</button
            </form>
            """

    @app.route("/get_email")
    def get_email():
        return render_template_string(
            """
                {% if session['email'] %}
                    <h1>Welcome {{ session['email'] }}!!</h1>
                {% else %}
                    <h1>Welcome! Please enter your email <a href="{{ url_for('set_email') }}">here.</a></h1>
                {% endif %}
            """
        )

    @app.route("/delete_email")
    def delete_email():
        # Clear the email stored in the session object
        session.pop("email", default=None)
        return "<h1>Session deleted!</h1>"

    @app.route("/")
    def index():
        return app.send_static_file("index.html")

    @app.errorhandler(404)
    def not_found(e):
        return app.send_static_file("index.html")

    return app


# if __name__ == "__main__":
# app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
