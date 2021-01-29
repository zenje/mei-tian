from datetime import date
from .extensions import db, ma


class Word(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False, default=date.today())
    simplified = db.Column(db.String(100), index=True)
    traditional = db.Column(db.String(100), index=True)
    definitions = db.relationship(
        "Definition", lazy="joined", backref=db.backref("word", lazy="joined")
    )

    def __init__(self, simplified, traditional, id=None):
        self.simplified = simplified
        self.traditional = traditional
        self.id = id


class WordSchema(ma.Schema):
    class Meta:
        fields = ("id", "date", "simplified", "traditional")


class Definition(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False, default=date.today())
    word_id = db.Column(db.Integer, db.ForeignKey("word.id"), nullable=False)
    pinyin = db.Column(db.String(100))
    definition = db.Column(db.String(300))

    def __init__(self, pinyin, definition, word_id):
        self.pinyin = pinyin
        self.definition = definition
        self.word_id = word_id


class Hsk2(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False, default=date.today())
    word = db.Column(db.String(100), unique=True)
    level = db.Column(db.Integer)

    def __init__(self, word, level):
        self.word = word
        self.level = level


class Hsk3(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False, default=date.today())
    word = db.Column(db.String(100), unique=True)
    level = db.Column(db.Integer)

    def __init__(self, word, level):
        self.word = word
        self.level = level
