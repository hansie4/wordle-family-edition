import os
import json

from flask import Flask, request, render_template
from flaskr.service import (
    shouldAllowLogin,
    getLeaderboard,
    getCurrentRound,
    generateNewRound,
    makeGuess,
    getAllAttemptsForRound,
    getFullWordDetails,
)

from flask_cors import CORS, cross_origin


def loadWords():
    script_dir = os.path.dirname(__file__)
    rel_path = "../resources/words_dictionary.json"
    abs_file_path = os.path.join(script_dir, rel_path)

    f = open(abs_file_path, "r")

    ws = f.read()

    f.close()

    return json.loads(ws)


def create_app(test_config=None):
    # create and configure the app
    app = Flask(
        __name__,
        static_folder="../app_ui/build/static",
        template_folder="../app_ui/build",
        instance_relative_config=True,
    )
    CORS(app)
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

    @cross_origin(origin="*")
    @app.get("/hello")
    def hello():
        return "Hello!"

    @cross_origin(origin="*")
    @app.post("/login")
    def login():
        r = request.get_json()

        isAllowed = shouldAllowLogin(r["username"])

        if isAllowed:
            return isAllowed, 200
        else:
            return "Invalid login.", 400

    @cross_origin(origin="*")
    @app.get("/leaderboard")
    def getWordleLeaderboard():
        return getLeaderboard(), 200

    @cross_origin(origin="*")
    @app.get("/current-round")
    def getWordleCurrentRound():
        h = dict(request.headers)

        if "Uid" not in h:
            return "Missing uid.", 401

        uid = dict(request.headers)["Uid"]
        cr = getCurrentRound(uid)

        if cr == None:
            return "No current round.", 404
        else:
            return cr, 200

    @cross_origin(origin="*")
    @app.get("/attempts")
    def getWordleAttempts():
        rid = dict(request.args)["rid"]

        a = getAllAttemptsForRound(rid)
        return a, 200

    @cross_origin(origin="*")
    @app.post("/new-round")
    def genWordleNewRound():
        h = dict(request.headers)

        if "Uid" not in h:
            return "Missing uid.", 401

        uid = dict(request.headers)["Uid"]
        nr = generateNewRound(uid)

        if nr:
            return nr, 200
        else:
            return "Round still in progress.", 400

    @cross_origin(origin="*")
    @app.post("/guess")
    def makeWordleGuess():
        h = dict(request.headers)

        if "Uid" not in h:
            return "Missing uid.", 401

        uid = dict(request.headers)["Uid"]
        rid = dict(request.args)["rid"]

        r = request.get_json()

        guessAttempt = r["guess"]

        return makeGuess(uid, rid, guessAttempt, possibleWords)

    @cross_origin(origin="*")
    @app.get("/word")
    def getWord():
        wid = dict(request.args)["wid"]

        return getFullWordDetails(wid)

    return app


app = create_app()
