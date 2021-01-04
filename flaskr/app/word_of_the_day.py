from flask import Blueprint
from app import db, ma
from models import WordOfTheDay as Word, WordSchema

word_of_the_day = Blueprint("word_of_the_day")

word_schema = WordSchema()
words_schema = WordSchema(many=True)


@word_of_the_day.route("/word", methods=["POST"])
def add_word():
    data = request.get_json()
    word = data.get("word")
    definition = data.get("definition")
    hsk = data.get("hsk")
    level = data.get("level")

    new_word = Word(word, definition, hsk, level)

    db.session.add(new_word)
    db.session.commit()

    return word_schema.jsonify(new_word)


@word_of_the_day.route("/words", methods=["GET"])
def get_words():
    all_words = Word.query.all()
    print(all_words)
    if all_words:
        result = words_schema.dump(all_words)
        print(result)
        return jsonify(result)
    else:
        return {}
