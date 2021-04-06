from flask import Blueprint
from .dictionary import get_dictionary, get_hsk2, get_hsk3

from flask import render_template_string, request, session, redirect, url_for

import json
import requests
import opencc
from bs4 import BeautifulSoup
from xpinyin import Pinyin
from random import sample

words = Blueprint("words", __name__)
p = Pinyin()
converter = opencc.OpenCC(
    "s2t.json"
)  # converter utility to convert from simplified to traditional


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
            sentence["simplified"] = text
            sentence["traditional"] = convert_to_traditional(text)
            sentence["pinyin"] = get_pinyin(text)
            sentences.append(sentence)

    return sentences


def convert_to_traditional(simplified_text):
    return converter.convert(simplified_text)


def get_pinyin(chinese_text):
    pinyin = p.get_pinyin(chinese_text, tone_marks="marks", splitter=" ")
    pinyin = (
        pinyin.replace(" 。", ".")
        .replace(" ，", ",")
        .replace("；", ";")
        .replace("：", ":")
        .replace("（", "(")
        .replace("）", ")")
    )
    return pinyin


@words.route("/api/word/<word>")
def fetch_word(word):
    word_entry = get_dictionary().lookup(word)
    return format_word_entry(word_entry)


@words.route("/api/randomWord")
def fetch_random_word():
    word_entry = get_random_in_hsk()
    return format_word_entry(word_entry)
    # result = {}
    # result["word"] = {
    #     "word": word,
    #     "definitions": word.get_definition_entries_formatted(),
    #     "category": word.category,
    #     "sentences": get_sentences(word.simp),
    # }
    # return json.dumps(result, default=lambda o: o.__dict__)


def format_word_entry(word_entry):
    word_simp = word_entry.simp
    word_entry.sentences = get_sentences(word_simp)
    word_entry.hsk2 = get_hsk2().get_level_for_word(word_simp)
    word_entry.hsk3 = get_hsk3().get_category_for_word(word_simp)

    result = {}
    result["word"] = word_entry

    return json.dumps(result, default=lambda o: o.__dict__)


def fetch_hsk2(level):
    hsk2 = get_hsk2()
    return hsk2.get_words_for_level(level)


@words.route("/api/hsk2/<level>")
def fetch_hsk2_endpoint(level):
    return json.dumps(fetch_hsk2(int(level)), default=lambda o: o.__dict__)


def fetch_hsk3(category):
    hsk3 = get_hsk3()
    category = category.lower()
    result = None

    if category == "entry":
        result = hsk3.get_entry()
    elif category == "intermediate":
        result = hsk3.get_intermediate()
    elif category == "advanced":
        result = hsk3.get_advanced()
    else:
        result = hsk3.get_supplemental()

    return result


@words.route("/api/hsk3/<category>")
def fetch_hsk3_endpoint(category):
    return json.dumps(fetch_hsk3(category), default=lambda o: o.__dict__)


@words.route("/api/flashcards")
def fetch_flashcards():
    hsk = request.args.get("hsk")
    levels = request.args.getlist("level")
    number = request.args.get("number")

    word_list = []
    for level in levels:
        if hsk == "hsk2":
            word_list += fetch_hsk2(int(level))
        else:
            word_list += fetch_hsk3(level)

    random_subset = sample(word_list, int(number))
    print(len(random_subset))
    print(random_subset[0].simp)
    print(random_subset[1].simp)
    session["flashcards"] = random_subset

    return json.dumps(random_subset, default=lambda o: o.__dict__)


@words.route("/api/get_flashcards")
def fetch_flashcards_session():
    flashcards = session.get("flashcards")
    if flashcards is None:
        return """
        <div>
            No flashcards.
        </div>
        """

    return json.dumps(flashcards, default=lambda o: o.__dict__)


@words.route("/api/clear_flashcards")
def clear_flashcards():
    session.pop("flashcards", default=None)
    return "<h1>Flashcards deleted!</h1>"


@words.route("/set_email", methods=["GET", "POST"])
def set_email():
    if request.method == "POST":
        # Save the form data to the session object
        session["email"] = request.form["email_address"]
        return redirect(url_for("words.get_email"))

    return """
        <form method="post">
            <label for="email">Enter your email address:</label>
            <input type="email" id="email" name="email_address" required />
            <button type="submit">Submit!</button
        </form>
        """


@words.route("/get_email")
def get_email():
    return render_template_string(
        """
            {% if session['email'] %}
                <h1>Welcome {{ session['email'] }}!!</h1>
            {% else %}
                <h1>Welcome! Please enter your email <a href="{{ url_for('words.set_email') }}">here.</a></h1>
            {% endif %}
        """
    )


@words.route("/delete_email")
def delete_email():
    # Clear the email stored in the session object
    session.pop("email", default=None)
    return "<h1>Session deleted!</h1>"
