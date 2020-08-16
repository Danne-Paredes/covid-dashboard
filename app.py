from flask import Flask, render_template, redirect, Blueprint, jsonify
from flask_pymongo import PyMongo


# Create an instance of Flask
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/classdb/students"

# Use PyMongo to establish Mongo connection
# mongo = PyMongo(app, uri="mongodb://localhost:27017")
mongo=PyMongo(app)

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
    data1= client["covid_db"].covid.find({ "Country":  "US"}, {'_id': False})

    cases = [case for case in data1]
    data = {

    "cases": cases
    }

    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)


if __name__ == "__main__":
    app.run(debug=True)
