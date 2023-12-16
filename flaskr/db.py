import sqlite3

import click
from flask import current_app, g


def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(
            current_app.config["DATABASE"], detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db


def close_db(e=None):
    db = g.pop("db", None)

    if db is not None:
        db.close()


def init_db():
    db = get_db()

    with current_app.open_resource("schema.sql") as f:
        db.executescript(f.read().decode("utf8"))


def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)


@click.command("init-db")
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo("Initialized the database.")


def get_user(username):
    db = get_db()

    user = db.execute(f"SELECT * FROM user WHERE username='{username}'").fetchone()

    if user:
        return dict(user)
    else:
        return None


def get_leaderboard():
    db = get_db()

    leaderboard = db.execute(f"SELECT * FROM leaderboard").fetchall()

    if leaderboard:
        return [dict(x) for x in leaderboard]
    else:
        return []


def get_all_words():
    db = get_db()

    words = db.execute(f"SELECT * FROM word").fetchall()

    return [dict(w) for w in words]


def get_word(word_id: int):
    db = get_db()

    w = db.execute(f"SELECT word FROM word WHERE id='{word_id}'").fetchone()

    return dict(w)["word"]


def is_word_in_db(word: str):
    db = get_db()

    w = db.execute(f"SELECT count(*) FROM word WHERE word='{word}'").fetchone()

    if w:
        return True
    else:
        return False


def is_word_correct(word: str, round_id: int):
    db = get_db()

    w = db.execute(
        f"SELECT * FROM wordle_round INNER JOIN word ON wordle_round.word_id=word.id"
    ).fetchone()

    correctWord = dict(w)["word"]

    if word == correctWord:
        return True
    else:
        return False


def get_in_progress_round(user_id: str):
    db = get_db()

    inProgressRound = db.execute(
        f"SELECT round_id, guesser_id, word_id, completed FROM wordle_round WHERE (guesser_id='{user_id}' AND completed=0)"
    ).fetchone()
    if inProgressRound:
        return dict(inProgressRound)
    else:
        return None


def get_attempts_for_round(round_id: int):
    db = get_db()

    attempts = db.execute(f"SELECT * FROM attempt WHERE round_id={round_id}").fetchall()

    return [dict(a) for a in attempts]


def get_completed_rounds_with_words(user_id: str):
    db = get_db()

    rounds = db.execute(
        f"SELECT * FROM wordle_round INNER JOIN word ON wordle_round.word_id=word.id WHERE (guesser_id='{user_id}' AND completed=1)"
    ).fetchall()

    return [dict(r) for r in rounds]


def create_new_round(user_id: int, new_word_id: str):
    db = get_db()

    a = db.execute(
        f"INSERT INTO wordle_round (guesser_id, word_id, completed) VALUES ('{user_id}', '{new_word_id}', 0)"
    )

    db.commit()

    return a.lastrowid


def get_guesses_made(user_id: int):
    r = get_in_progress_round(user_id)
    if not r:
        return None

    a = get_attempts_for_round(r["round_id"])

    currentGuess = len(a) + 1

    return currentGuess


def attempt_word(user_id: int, attempt: str, attemptCorrectMap: str):
    r = get_in_progress_round(user_id)
    roundId = r["round_id"]

    a = get_attempts_for_round(roundId)

    currentGuess = len(a) + 1

    db = get_db()

    a = db.execute(
        f"INSERT INTO attempt (round_id, attempt_number, attempt_input, attempt_correct_map) VALUES ({roundId}, {currentGuess}, '{attempt}', '{attemptCorrectMap}')"
    )

    db.commit()

    return a.lastrowid


def complete_round(round_id: int):
    db = get_db()

    a = db.execute(f"UPDATE wordle_round SET completed=1 WHERE round_id={round_id}")

    db.commit()

    return a.lastrowid


def add_score_to_leaderboard(user_id: int, score_to_add: int):
    db = get_db()

    s = db.execute(
        f"SELECT score FROM leaderboard WHERE guesser_id={user_id}"
    ).fetchone()

    if s:
        currentScore = s[0]

        a = db.execute(
            f"UPDATE leaderboard SET score={currentScore + score_to_add} WHERE guesser_id={user_id}"
        )
    else:
        currentScore = 0

        a = db.execute(
            f"INSERT INTO leaderboard (guesser_id, score) VALUES ('{user_id}',{currentScore + score_to_add})"
        )

    db.commit()

    return a.lastrowid
