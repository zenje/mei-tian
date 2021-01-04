from flask import Blueprint
import time

from chinese_english_lookup import Dictionary, HSK3

test = Blueprint("short", __name__)

dictionary = Dictionary()
hsk3 = HSK3(dictionary)


@test.route("/hello")
def hello():
    return "Hello, World!"


@test.route("/time")
def get_current_time():
    return {"time": time.time()}


def get_random():
    return dictionary.random_entry()


def get_random_in_hsk():
    hsk_category = None
    while hsk_category is None:
        random = get_random()
        random_simp = random.simp
        hsk_category = hsk3.get_category_for_word(random_simp)
        print(random_simp + " " + str(hsk_category))
    return random


@test.route("/chinese")
def chinese():
    return {"word": str(get_random_in_hsk())}
