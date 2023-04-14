from pymongo import MongoClient
from bson.objectid import ObjectId

client = MongoClient('localhost', 27017)
db = client['speaksubs']
subtitles_collection = db['subtitles']

def get_subtitle_text(subtitle_id):
    subtitle = subtitles_collection.find_one({'_id': ObjectId(subtitle_id)})

    return subtitle['text']