import pymongo
from flask import Flask, render_template, jsonify, Blueprint

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
    #coll = client.covid_db.covid_data.find()
    coll= client["covid_db"].covid_data.find({ "Date":  {"$regex":"3/\d*/2020"}}, {'_id': False})
    cases = [case for case in coll]
    data = {

    "cases": cases
    }
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
