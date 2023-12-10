DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS word;
DROP TABLE IF EXISTS attempt;
DROP TABLE IF EXISTS leaderboard;
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
CREATE TABLE attempt (
    guesser_id INTEGER PRIMARY KEY,
    word_id INTEGER,
    attempt_number INTEGER NOT NULL,
    attempt_input TEXT NOT NULL,
    FOREIGN KEY (guesser_id) REFERENCES user (id),
    FOREIGN KEY (word_id) REFERENCES word (id)
);
CREATE TABLE leaderboard (
    guesser_id INTEGER PRIMARY KEY,
    correct_guesses INTEGER NOT NULL,
    FOREIGN KEY (guesser_id) REFERENCES user (id)
);
INSERT INTO user (username)
VALUES ('Hans');
INSERT INTO user (username)
VALUES ('Beryl');
INSERT INTO word (word, body, f_name)
VALUES ('beryl', 'The best cutie', 'test.png');
INSERT INTO word (word, body, f_name)
VALUES ('simba', 'The best cat', 'test.png');
INSERT INTO word (word, body, f_name)
VALUES ('hans', 'guy', 'test.png');