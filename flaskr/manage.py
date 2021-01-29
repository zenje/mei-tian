from flask_script import Manager

from app import create_app
from app.extensions import db
from app.models import Word, Definition, Hsk2, Hsk3
from datetime import datetime
import itertools

from app.dictionary import get_dictionary

app = create_app()
manager = Manager(app)


@manager.command
def hello():
    print("hello")


@manager.command
def create_tables():
    db.create_all()


@manager.command
def drop_tables():
    db.drop_all()


@manager.command
def add_word(simplified, traditional):
    w = Word(simplified=simplified, traditional=traditional)
    db.session.add(w)
    db.session.commit()
    print("word added for [" + simplified + ", " + traditional + "]")


@manager.command
def populate_word_definitions(chunk_size=1000):
    dictionary = get_dictionary()
    dictionary_words = dictionary.get_words()
    size = len(dictionary_words)
    it = iter(dictionary_words)
    id = 0

    # process and add to db by chunks
    for i in range(0, size, chunk_size):
        new_words = []
        new_definitions = []
        for word_entry in itertools.islice(it, chunk_size):
            new_word = Word(
                simplified=word_entry.simp, traditional=word_entry.trad, id=id
            )
            new_words.append(new_word)
            id += 1

            for definition_entry in word_entry.definition_entries:
                pinyin = definition_entry.pinyin
                definitions = "; ".join(str(x) for x in definition_entry.definitions)
                new_definition = Definition(pinyin, definitions, new_word.id)
                new_word.definitions.append(new_definition)
                new_definitions.append(new_definition)

        db.session.bulk_save_objects(new_words)
        db.session.bulk_save_objects(new_definitions)
        db.session.commit()
        print(
            "added chunk "
            + str(i)
            + ", last word added: id["
            + id
            + "] "
            + new_words[-1].simplified
        )

    print("all words added!")


@manager.command
def get_word_definition(word):
    found_word = Word.query.filter_by(simplified=word).first()
    if found_word is not None:
        print(str(found_word.definitions[0].definition))
    else:
        print("word [" + word + "] not found")


if __name__ == "__main__":
    manager.run()
