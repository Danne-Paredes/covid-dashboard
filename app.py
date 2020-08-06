from flask import Flask, render_template
from flask_pymongo import PyMongo
# import scrape_mars

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
# app.config["MONGO_URI"] = "mongodb://localhost:27017/mars_app"
# mongo = PyMongo(app)

# Or set inline
# mongo = PyMongo(app, uri="mongodb://localhost:27017/mars_app")


@app.route("/")
def index():
    # mars = mongo.db.mars.find_one()
    return render_template("index.html")


# @app.route("/scrape")
# def scrape():
#     mars = mongo.db.mars
#     mars_data = scrape_mars.scrape_all()
#     mars.replace_one({}, mars_data, upsert=True)
#     return "Scraping Successful!"


if __name__ == "__main__":
    app.run()
