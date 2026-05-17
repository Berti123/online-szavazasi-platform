from flask import Flask
from flask_cors import CORS

from database.db import InitDatabase
from database.seed import SeedDatabase
from routes.polls import polls_bp
from routes.votes import votes_bp


app = Flask(__name__)
CORS(app)

InitDatabase()
SeedDatabase()

app.register_blueprint(polls_bp)
app.register_blueprint(votes_bp)


@app.route("/")
def Home():
    return {
        "message": "Backend sikeresen fut"
    }


if __name__ == "__main__":
    app.run(debug=True)