DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS word;
DROP TABLE IF EXISTS leaderboard;
DROP TABLE IF EXISTS wordle_round;
DROP TABLE IF EXISTS attempt;
CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL
);
CREATE TABLE word (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word TEXT NOT NULL,
    body TEXT NOT NULL,
    f_name TEXT NOT NULL
);
CREATE TABLE leaderboard (
    guesser_id INTEGER PRIMARY KEY,
    score INTEGER NOT NULL,
    FOREIGN KEY (guesser_id) REFERENCES user (id)
);
CREATE TABLE wordle_round (
    round_id INTEGER PRIMARY KEY AUTOINCREMENT,
    guesser_id INTEGER,
    word_id INTEGER,
    completed INTEGER,
    done INTEGER,
    FOREIGN KEY (guesser_id) REFERENCES user (id),
    FOREIGN KEY (word_id) REFERENCES word (id)
);
CREATE TABLE attempt (
    attempt_id INTEGER PRIMARY KEY AUTOINCREMENT,
    round_id INTEGER,
    attempt_number INTEGER NOT NULL,
    attempt_input TEXT NOT NULL,
    attempt_correct_map TEXT NOT NULL,
    FOREIGN KEY (round_id) REFERENCES wordle_round (round_id)
);
INSERT INTO user (username)
VALUES ('hans');
INSERT INTO user (username)
VALUES ('beryl');
INSERT INTO word (word, body, f_name)
VALUES ('beryl', 'The best cutie', 'test.png');
INSERT INTO word (word, body, f_name)
VALUES ('simba', 'The best cat', 'test.png');
INSERT INTO word (word, body, f_name)
VALUES ('hans', 'guy', 'test.png');
INSERT INTO word (word, body, f_name)
VALUES ('madison', 'person', 'test.png');
INSERT INTO word (word, body, f_name)
VALUES ('paris', 'place', 'test.png');
INSERT INTO word (word, body, f_name)
VALUES ('dad', 'father', 'test.png');