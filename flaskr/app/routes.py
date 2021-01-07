from flask import Blueprint
from .dictionary import get_dictionary, get_hsk3

words = Blueprint("words", __name__)


def random_entry():
    return get_dictionary().random_entry()


def get_random_in_hsk():
    random = type("", (), {})()
    random.category = None
    while random.category is None:
        random = random_entry()
        random.category = get_hsk3().get_category_for_word(random.simp)
        print(random.simp + " " + str(random.category))
    return random


@words.route("/randomWord")
def get_random_word():
    word = get_random_in_hsk()
    return {"word": str(word), "category": word.category}
