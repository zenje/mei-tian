from flask import Blueprint, jsonify
from .dictionary import get_dictionary, get_hsk3

import json
import requests
from bs4 import BeautifulSoup

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


def get_sentences(word):
    URL = "http://www.jukuu.com/search.php?q=%s" % word
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, "html.parser")

    sentences = []
    sentence = None
    for element in soup.find_all("tr", class_=["c", "e"]):
        if element["class"][0] == "e":
            sentence = {}
            sentence["english"] = element.get_text().strip()
        else:
            sentence["chinese"] = element.get_text().strip()
            sentences.append(sentence)

    return sentences


@words.route("/api/randomWord")
def get_random_word():
    word = get_random_in_hsk()
    result = {
        "word": word,
        "definitions": word.get_definition_entries_formatted(),
        "category": word.category,
        "sentences": get_sentences(word.simp),
    }
    return json.dumps(result, default=lambda o: o.__dict__)
