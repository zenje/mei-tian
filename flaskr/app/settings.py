import os

#'sqlite:///db.sqlite3'

SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")
SQLALCHEMY_TRACK_MODIFICATIONS = False

# basedir = os.path.abspath(os.path.dirname(__file__))
# SQLALCHEMY_DATABASE_URI='sqlite:///' + os.path.join(basedir, 'db.sqlite3')
