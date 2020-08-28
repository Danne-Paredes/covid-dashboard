from flask import Flask, render_template, redirect, Blueprint, jsonify
import pymongo

# Create an instance of Flask
app = Flask(__name__)


# Use PyMongo to establish Mongo connection
connection = "mongodb://localhost:27017"
client = pymongo.MongoClient(connection)


@app.after_request
def after_request(response):
    header = response.headers
    header["Access-control-allow-origin"] = '*'
    return response






@app.route("/")
def index():
    return render_template("index2.html")


@app.route("/calijuly")
def calijuly():
    return render_template("calijuly.html")


@app.route("/dataindex")
def dataindex():
    return render_template("dataindex.html")


@app.route("/pie")
def pieindex():
    return render_template("pieindex.html")


@app.route("/heatindex")
def heatindex():
    return render_template("heatindex.html")






# Route that will trigger the scrape function
@app.route("/api")
def api():
    # data1 = mongo["covid_db"].covid.find({}, {'_id': False})
    data1 = client["covid_db"].GUSdata.find({}, {'_id': False})

    cases = [case for case in data1]
    data = {

        "cases": cases
    }

    return jsonify(data)


@app.route("/api/march")
def marchapi():
    # data1 = mongo["covid_db"].covid.find({}, {'_id': False})
    marchcoll = client["covid_db"].GUSdata.find(
        {"Date":  {"$regex": "3/\d*/2020"}}, {'_id': False})

    marchcases = [case for case in marchcoll]
    marchdata = {

        "cases": marchcases
    }

    return jsonify(marchdata)


@app.route("/api/april")
def aprilapi():
    # data1 = mongo["covid_db"].covid.find({}, {'_id': False})
    aprilcoll = client["covid_db"].GUSdata.find(
        {"Date":  {"$regex": "4/\d*/2020"}}, {'_id': False})

    aprilcases = [case for case in aprilcoll]
    aprildata = {

        "cases": aprilcases
    }

    return jsonify(aprildata)


@app.route("/api/may")
def mayapi():
    # data1 = mongo["covid_db"].covid.find({}, {'_id': False})
    maycoll = client["covid_db"].GUSdata.find(
        {"Date":  {"$regex": "5/\d*/2020"}}, {'_id': False})

    maycases = [case for case in maycoll]
    maydata = {

        "cases": maycases
    }

    return jsonify(maydata)


@app.route("/api/june")
def juneapi():
    # data1 = mongo["covid_db"].covid.find({}, {'_id': False})
    junecoll = client["covid_db"].GUSdata.find(
        {"Date":  {"$regex": "6/\d*/2020"}}, {'_id': False})

    junecases = [case for case in junecoll]
    junedata = {

        "cases": junecases
    }

    return jsonify(junedata)


@app.route("/api/july")
def julyapi():
    # data1 = mongo["covid_db"].covid.find({}, {'_id': False})
    julycoll = client["covid_db"].GUSdata.find(
        {"Date":  {"$regex": "7/\d*/2020"}}, {'_id': False})

    julycases = [case for case in julycoll]
    julydata = {

        "cases": julycases
    }

    return jsonify(julydata)






# Route that will trigger the scrape function
@app.route("/apidata")
def apidata():
    # data1 = mongo["covid_db"].covid.find({}, {'_id': False})
    data2 = client["covid_db"].USdata.find({}, {'_id': False})

    cases2 = [case for case in data2]
    data2 = {

        "cases": cases2
    }

    return jsonify(data2)







@app.route("/api/all-heat")
def heatAPI():
    Heatcoll = client["covid_db"].allHeat.find({}, {'_id': False})

    Heatcases = [case for case in Heatcoll]
    Heatdata = {

        "cases": Heatcases
    }

    return jsonify(Heatdata)


@app.route("/api/march-heat")
def heatMarchAPI():
    HeatMarcoll = client["covid_db"].marchHeat.find({}, {'_id': False})

    HeatMarcases = [case for case in HeatMarcoll]
    HeatMardata = {

        "cases": HeatMarcases
    }

    return jsonify(HeatMardata)


@app.route("/api/april-heat")
def heatAprilAPI():
    Heatcoll = client["covid_db"].aprilHeat.find({}, {'_id': False})

    Heatcases = [case for case in Heatcoll]
    Heatdata = {

        "cases": Heatcases
    }

    return jsonify(Heatdata)


@app.route("/api/may-heat")
def heatMayAPI():
    Heatcoll = client["covid_db"].mayHeat.find({}, {'_id': False})

    Heatcases = [case for case in Heatcoll]
    Heatdata = {

        "cases": Heatcases
    }

    return jsonify(Heatdata)


@app.route("/api/june-heat")
def heatJuneAPI():
    Heatcoll = client["covid_db"].juneHeat.find({}, {'_id': False})

    Heatcases = [case for case in Heatcoll]
    Heatdata = {

        "cases": Heatcases
    }

    return jsonify(Heatdata)


@app.route("/api/july-heat")
def heatJulyAPI():
    Heatcoll = client["covid_db"].julyHeat.find({}, {'_id': False})

    Heatcases = [case for case in Heatcoll]
    Heatdata = {

        "cases": Heatcases
    }

    return jsonify(Heatdata)


if __name__ == "__main__":
    app.run(debug=True)
