import os

from flask import Flask, request
from flaskr.service import (
    shouldAllowLogin,
    getLeaderboard,
    getCurrentRound,
    generateNewRound,
    makeGuess,
)


def loadWords():
    script_dir = os.path.dirname(__file__)
    rel_path = "../resources/possible_guesses.txt"
    abs_file_path = os.path.join(script_dir, rel_path)

    f = open(abs_file_path, "r")

    ws = f.read().splitlines()

    f.close()

    return ws


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY="dev",
        DATABASE=os.path.join(app.instance_path, "flaskr.sqlite"),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile("config.py", silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from . import db

    db.init_app(app)
    possibleWords = loadWords()

    print(f"Loaded {len(possibleWords)} words.")

    @app.get("/hello")
    def hello():
        return "Hello!"

    @app.post("/login")
    def login():
        r = request.get_json()

        isAllowed = shouldAllowLogin(r["username"])

        if isAllowed:
            return isAllowed, 200
        else:
            return "Invalid login.", 400

    @app.get("/leaderboard")
    def getWordleLeaderboard():
        return getLeaderboard(), 200

    @app.get("/current-round")
    def getWordleCurrentRound():
        uid = request.args["user_id"]
        cr = getCurrentRound(uid)

        if cr == None:
            return "No current round.", 404
        else:
            return cr, 200

    @app.post("/new-round")
    def genWordleNewRound():
        uid = request.args["user_id"]
        nr = generateNewRound(uid)

        if nr:
            return "", 204
        else:
            return "Round still in progress.", 400

    @app.post("/guess")
    def makeWordleGuess():
        uid = request.args["user_id"]

        r = request.get_json()

        guessAttempt = r["guess"]

        return makeGuess(uid, guessAttempt, possibleWords)

    return app
