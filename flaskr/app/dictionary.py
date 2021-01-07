from flask import g
from chinese_english_lookup import Dictionary, HSK3


def get_dictionary():
    if "dictionary" not in g:
        g.dictionary = Dictionary()

    return g.dictionary


def get_hsk3():
    if "hsk3" not in g:
        g.hsk3 = HSK3(get_dictionary())

    return g.hsk3
