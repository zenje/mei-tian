from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
        SQLALCHEMY_DATABASE_URI='sqlite:///' + os.path.join(basedir, 'db.sqlite'),
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
    )
    
    db = SQLAlchemy(app)
    ma = Marshmallow(app)
    
    class Word(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        word = db.Column(db.String(100), unique=True)
        definition = db.Column(db.String(300))
        hsk = db.Column(db.Integer)
        level = db.Column(db.Integer)
        
        def __init__(self, word, definition, hsk, level):
            self.word = word
            self.definition = definition
            self.hsk = hsk
            self.level = level
    
    class WordSchema(ma.Schema):
        class Meta:
            fields = ('id', 'word', 'definition', 'hsk', 'level')
    
    word_schema = WordSchema(strict=True)
    words_schema = WordSchema(many=True, strict=True)

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    return app
