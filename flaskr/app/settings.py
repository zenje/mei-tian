import os
from pathlib import Path

#'sqlite:///db.sqlite3'

# SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")
SQLALCHEMY_TRACK_MODIFICATIONS = False

basedir = os.path.abspath(os.path.dirname(__file__))
parent_path = Path(basedir).parent
SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(parent_path, "db.sqlite3")

DEBUG = True  # some Flask specific configs
CACHE_TYPE = "filesystem"  # Flask-Caching related configs
CACHE_DIR = "/tmp"
CACHE_DEFAULT_TIMEOUT = 300
