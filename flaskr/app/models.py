from datetime import date
from .extensions import db


class WordOfTheDay(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False, default=date.today())
    word = db.Column(db.String(100), unique=True)
    definition = db.Column(db.String(300))
    hsk = db.Column(db.Integer)
    level = db.Column(db.Integer)

    def __init__(self, date, word, definition, hsk, level):
        self.date = date
        self.word = word
        self.definition = definition
        self.hsk = hsk
        self.level = level


class WordSchema(ma.Schema):
    class Meta:
        fields = ("id", "date", "word", "definition", "hsk", "level")
