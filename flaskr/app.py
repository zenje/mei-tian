from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os

app = Flask(__name__, instance_relative_config=True)
basedir = os.path.abspath(os.path.dirname(__file__))

app.config.from_mapping(
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

word_schema = WordSchema()
words_schema = WordSchema(many=True)

@app.route('/word', methods=['POST'])
def add_word():
    data = request.get_json()
    word = data.get('word')
    definition = data.get('definition')
    hsk = data.get('hsk')
    level = data.get('level')
    
    new_word = Word(word, definition, hsk, level)
    
    db.session.add(new_word)
    db.session.commit()
    
    return word_schema.jsonify(new_word)
    
@app.route('/words', methods=['GET'])
def get_words():
    all_words = Word.query.all()
    print(all_words)
    if all_words:
        result = words_schema.dump(all_words)
        print(result)
        return jsonify(result)
    else:
        return {}

# a simple page that says hello
@app.route('/hello')
def hello():
    return 'Hello, World!'
    
if __name__ == '__main__':
    app.run(debug=True)
