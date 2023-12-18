var sqlite3 = require("sqlite3").verbose();
const { rejects } = require("assert");
const fs = require("fs");
require("dotenv").config();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
    } else {
        console.log("Connected to the SQLite database.");
        const sql = fs.readFileSync(__dirname + "/schema.sql", "utf-8");

        const shouldInit = process.env.INIT_DB ? process.env.INIT_DB : false;

        if (shouldInit) {
            console.log("Initializing database.");
            db.exec(sql, (err) => {
                if (err) {
                    // Table already created
                    console.log("ERROR STARTING DB");
                } else {
                    console.log("Done loading DB");
                }
            });
        }
    }
});

const get_user = (username) => {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM user WHERE username='${username}'`,
            (err, row) => {
                if (err) {
                    return resolve(null);
                } else {
                    return resolve(row);
                }
            }
        );
    });
};

const get_leaderboard = () => {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM leaderboard INNER JOIN user ON user.id=leaderboard.guesser_id`,
            (err, rows) => {
                if (err) {
                    console.log("ERR GETTING LEADERBOARD: ", err);
                    return resolve([]);
                } else {
                    return resolve(rows ? rows : []);
                }
            }
        );
    });
};

const get_in_progress_round = (uid) => {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT round_id, guesser_id, word_id, completed FROM wordle_round WHERE (guesser_id='${uid}' AND completed=0)`,
            (err, row) => {
                if (err) {
                    console.log("ERR WHEN GETTING IN PROGRESS ROUND: ", err);
                    return reject();
                } else {
                    return resolve(row);
                }
            }
        );
    });
};

const get_all_attempts = (rid) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM attempt WHERE round_id=${rid}`, (err, rows) => {
            if (err) {
                console.log("ERROR GETTING ALL ATTEMPTS FOR ROUND: ", err);
                return resolve([]);
            } else {
                return resolve(rows);
            }
        });
    });
};

const get_word_details = (wid) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM word WHERE id=${wid}`, (err, row) => {
            if (err) {
                return resolve(null);
            } else {
                return resolve(row);
            }
        });
    });
};

const get_all_words = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM word`, (err, rows) => {
            if (err) {
                return resolve([]);
            } else {
                return resolve(rows ? rows : []);
            }
        });
    });
};

const get_all_completed_words = (uid) => {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM wordle_round INNER JOIN word ON wordle_round.word_id=word.id WHERE (guesser_id=${uid} AND completed=1)`,
            (err, rows) => {
                if (err) {
                    console.log(
                        "ERROR GETTING ALL COMPLETED WORDS FOR USER: ",
                        err
                    );
                    return resolve([]);
                } else {
                    return resolve(rows ? rows : []);
                }
            }
        );
    });
};

const create_new_round = (uid, new_word_id) => {
    return new Promise((resolve, reject) => {
        db.exec(
            `INSERT INTO wordle_round (guesser_id, word_id, completed) VALUES (${uid}, ${new_word_id}, 0)`,
            (err) => {
                if (err) {
                    console.log("ERROR CREATING NEW ROUND: ", err);
                }
                return resolve();
            }
        );
    });
};

const get_round = (rid) => {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM wordle_round WHERE round_id=${rid}`,
            (err, row) => {
                if (err) {
                    console.log("ERROR GETTING ROUND INFO: ", err);
                    resolve(null);
                } else {
                    resolve(row);
                }
            }
        );
    });
};

const is_word_in_db = (word) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM word WHERE word='${word}'`, (err, row) => {
            if (err) {
                console.log("ERROR SEEING IF WORD IS IN DB: ", err);
                return resolve(false);
            } else {
                if (row) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            }
        });
    });
};

const attempt_word = (roundId, currentGuess, attempt, attemptCorrectMap) => {
    return new Promise((resolve, reject) => {
        db.exec(
            `INSERT INTO attempt (round_id, attempt_number, attempt_input, attempt_correct_map) VALUES (${roundId}, ${attempt}, '${currentGuess}', '${attemptCorrectMap}')`,
            (err) => {
                if (err) {
                    console.log("ERROR INSERTING ATTEMPT INTO DB: ", err);
                }
                return resolve(this.lastID);
            }
        );
    });
};

const complete_round = (rid) => {
    return new Promise((resolve, reject) => {
        db.exec(
            `UPDATE wordle_round SET completed=1 WHERE round_id=${rid}`,
            (err) => {
                if (err) {
                    console.log("ERROR COMPLETING ROUND: ", err);
                }
                return resolve(this.lastID);
            }
        );
    });
};

const get_current_score = (uid) => {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM leaderboard WHERE guesser_id=${uid}`,
            (err, row) => {
                if (err) {
                    console.log("ERROR RETRIEVING SCORE: ", err);
                    return resolve(null);
                } else {
                    return resolve(row);
                }
            }
        );
    });
};

const add_score_to_leaderboard = async (uid, scoreToAdd) => {
    const currentScoreObj = await get_current_score(uid);
    let currentScore = 0;

    if (currentScoreObj) {
        currentScore = currentScoreObj["score"];
    }

    const score = scoreToAdd + currentScore;

    return new Promise((resolve, reject) => {
        db.get(
            `INSERT OR REPLACE INTO leaderboard (guesser_id, score) VALUES (${uid},${score})`,
            (err) => {
                if (err) {
                    console.log("ERROR INSERTING SCORE: ", err);
                }
                return resolve();
            }
        );
    });
};

module.exports = {
    db,
    get_leaderboard,
    get_user,
    get_in_progress_round,
    get_all_attempts,
    get_word_details,
    get_all_words,
    get_all_completed_words,
    create_new_round,
    get_round,
    is_word_in_db,
    attempt_word,
    complete_round,
    add_score_to_leaderboard,
};
