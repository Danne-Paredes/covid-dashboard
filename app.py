from flask import Flask, render_template, redirect, Blueprint, jsonify
from flask_pymongo import PyMongo
import pymongo


# Create an instance of Flask
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/classdb/students"

# Use PyMongo to establish Mongo connection
# mongo = PyMongo(app, uri="mongodb://localhost:27017")
connection = "mongodb://localhost:27017"
client= pymongo.MongoClient(connection)

    # Create an instance of Flask
app = Flask(__name__)







@app.after_request
def after_request(response):
    header = response.headers
    header["Access-control-allow-origin"] = '*'
    return response


@app.route("/")
def index():
    # mars = mongo.db.mars.find_one()
    return render_template("index.html")


# Route that will trigger the scrape function
@app.route("/api")
def api():
    # data1 = mongo["covid_db"].covid.find({}, {'_id': False})
    data1= client["covid_db"].USdata.find({}, {'_id': False})

    cases = [case for case in data1]
    data = {

    "cases": cases
    }

    return jsonify(data)

@app.route("/api/march")
def marchapi():
    # data1 = mongo["covid_db"].covid.find({}, {'_id': False})
    marchcoll= client["covid_db"].USdata.find({ "Date":  {"$regex":"3/\d*/2020"}}, {'_id': False})

    marchcases = [case for case in marchcoll]
    marchdata = {

    "cases": marchcases
    }

    return jsonify(marchdata)

@app.route("/api/april")
def aprilapi():
    # data1 = mongo["covid_db"].covid.find({}, {'_id': False})
    aprilcoll= client["covid_db"].USdata.find({ "Date":  {"$regex":"4/\d*/2020"}}, {'_id': False})

    aprilcases = [case for case in aprilcoll]
    aprildata = {

    "cases": aprilcases
    }

    return jsonify(aprildata)




if __name__ == "__main__":
    app.run(debug=True)
