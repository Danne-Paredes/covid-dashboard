from flask import Flask, render_template, redirect, Blueprint, jsonify
import pymongo


# Create an instance of Flask
# app = Flask(__name__)
# app.config["MONGO_URI"] = "mongodb://localhost:27017"

# Use PyMongo to establish Mongo connection
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
    data1= client["covid_db"].GUSdata.find({}, {'_id': False})

    cases = [case for case in data1]
    data = {

    "cases": cases
    }

    return jsonify(data)

@app.route("/api/march")
def marchapi():
    # data1 = mongo["covid_db"].covid.find({}, {'_id': False})
    marchcoll= client["covid_db"].GUSdata.find({ "Date":  {"$regex":"3/\d*/2020"}}, {'_id': False})

    marchcases = [case for case in marchcoll]
    marchdata = {

    "cases": marchcases
    }

    return jsonify(marchdata)

@app.route("/api/april")
def aprilapi():
    # data1 = mongo["covid_db"].covid.find({}, {'_id': False})
    aprilcoll= client["covid_db"].GUSdata.find({ "Date":  {"$regex":"4/\d*/2020"}}, {'_id': False})

    aprilcases = [case for case in aprilcoll]
    aprildata = {

    "cases": aprilcases
    }

    return jsonify(aprildata)

    
@app.route("/api/may")
def mayapi():
    # data1 = mongo["covid_db"].covid.find({}, {'_id': False})
    maycoll= client["covid_db"].GUSdata.find({ "Date":  {"$regex":"5/\d*/2020"}}, {'_id': False})

    maycases = [case for case in maycoll]
    maydata = {

    "cases": maycases
    }

    return jsonify(maydata)

@app.route("/api/june")
def juneapi():
    # data1 = mongo["covid_db"].covid.find({}, {'_id': False})
    junecoll= client["covid_db"].GUSdata.find({ "Date":  {"$regex":"6/\d*/2020"}}, {'_id': False})

    junecases = [case for case in junecoll]
    junedata = {

    "cases": junecases
    }

    return jsonify(junedata)

@app.route("/api/july")
def julyapi():
    # data1 = mongo["covid_db"].covid.find({}, {'_id': False})
    julycoll= client["covid_db"].GUSdata.find({ "Date":  {"$regex":"7/\d*/2020"}}, {'_id': False})

    julycases = [case for case in julycoll]
    julydata = {

    "cases": julycases
    }

    return jsonify(julydata)

@app.route("/api/heat")
def Heatapi():
    # data1 = mongo["covid_db"].covid.find({}, {'_id': False})
    Heatcoll= client["covid_db"].test2.find({}, {'_id': False})

    Heatcases = [case for case in Heatcoll]
    Heatdata = {

    "cases": Heatcases
    }

    return jsonify(Heatdata)





if __name__ == "__main__":
    app.run(debug=True)
