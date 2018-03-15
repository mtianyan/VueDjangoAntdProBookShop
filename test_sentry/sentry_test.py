# encoding: utf-8
__author__ = 'mtianyan'
__date__ = '2018/3/15 0015 22:15'

from raven import Client

client = Client('http://ad429813913e4071ab33a6e70d31e37b:346631d638cd49c3b8c0ee6186838938@115.159.122.64:9000//2')

try:
    1 / 0
except ZeroDivisionError:
    client.captureException()
