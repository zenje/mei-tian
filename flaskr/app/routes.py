from flask import Blueprint
from .dictionary import get_dictionary, get_hsk3

import json
import requests
from bs4 import BeautifulSoup
from xpinyin import Pinyin

words = Blueprint("words", __name__)
p = Pinyin()


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
        text = element.get_text().strip()
        if element["class"][0] == "e":
            sentence = {}
            sentence["english"] = text
        else:
            sentence["chinese"] = text
            sentence["pinyin"] = get_pinyin(text)
            sentences.append(sentence)

    return sentences


def get_pinyin(chinese_text):
    return p.get_pinyin(chinese_text, tone_marks="marks", splitter=" ")


@words.route("/api/randomWord")
def fetch_random_word():
    word = get_random_in_hsk()
    result = {
        "word": word,
        "definitions": word.get_definition_entries_formatted(),
        "category": word.category,
        "sentences": get_sentences(word.simp),
    }
    return json.dumps(result, default=lambda o: o.__dict__)


@words.route("/api/hsk3")
def fetch_hsk3():
    hsk3 = get_hsk3()
    entry_words = hsk3.get_entry()
    # for word in hsk3.get_entry():
    #    entry_words.append(word.simp)
    result = {"entry": entry_words}
    return json.dumps(result, default=lambda o: o.__dict__)
