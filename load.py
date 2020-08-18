import json 
from pymongo import MongoClient 
import os


# Making Connection 
myclient = MongoClient("mongodb://localhost:27017/") 

# database 
db = myclient["covid_db"] 

# Created or Switched to collection 
# names: GeeksForGeeks 
Collection = db["test2"] 
for filename in os.listdir('static/data'):
	print(filename)
	# Loading or Opening the json file 
	with open(f"static/data/{filename}") as file: 
		file_data = json.load(file) 
		
	# Inserting the loaded data in the Collection 
	# if JSON contains data more than one entry 
	# insert_many is used else inser_one is used 
	if isinstance(file_data, list): 
		Collection.insert_many(file_data) 
	else: 
		Collection.insert_one(file_data) 
