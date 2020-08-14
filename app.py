from flask import Flask, render_template, redirect, Blueprint, jsonify
from flask_pymongo import PyMongo


# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/covid_db")

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

    covid_data = mongo.db.collection.find({}, {'_id': False})
    cases = [case for case in covid_data]
    data = {

    "cases": cases
    }

    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
