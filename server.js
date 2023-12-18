const express = require("express");
const path = require("path");
var cors = require("cors");
const app = express();
const db = require("./db");
const fs = require("fs");

const PORT = 80;
const MAX_NUM_ATTEMPTS = 7;

const loadWords = () => {
    return JSON.parse(
        fs.readFileSync(__dirname + "/resources/words_dictionary.json", "utf-8")
    );
};

const createMapOfCorrectLetters = (guess, correctWord) => {
    let m = [];

    const correctLetters = new Set(correctWord.split(""));

    for (let x = correctWord.length - 1; x >= 0; x--) {
        const correctLetter = correctWord.charAt(x);
        const guessLetter = guess.charAt(x);

        if (guessLetter === correctLetter) {
            m.push("2");
        } else if (correctLetters.has(guessLetter)) {
            m.push("1");
        } else {
            m.push("0");
        }
    }

    m = m.reverse();
    const ans = m.join("");

    return ans;
};

const possibleWordBank = loadWords();
console.log(`Loaded ${Object.keys(possibleWordBank).length} words.`);

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, "app_ui", "build")));

app.get("/leaderboard", async (req, res) => {
    lb = await db.get_leaderboard();

    res.send(lb);
});

app.post("/login", async (req, res) => {
    if (!req.body.username) {
        res.sendStatus(400);
    }

    user = await db.get_user(req.body.username);

    if (user) {
        res.send(user);
    } else {
        res.sendStatus(401);
    }
});

app.get("/current-round", async (req, res) => {
    if (!req.headers.uid) {
        return res.sendStatus(400);
    }

    const uid = req.headers.uid;

    const currentRound = await db.get_in_progress_round(uid);

    if (currentRound) {
        const attemptsForRound = await db.get_all_attempts(
            currentRound.round_id
        );
        const w = await db.get_word_details(currentRound.word_id);
        const wordLength = w["word"].length;

        return res.send({
            attempts: attemptsForRound,
            wordLength: wordLength,
            round_id: currentRound.round_id,
        });
    } else {
        return res.status(404).send("No current round.");
    }
});

app.get("/attempts", async (req, res) => {
    if (!req.query.rid) {
        return res.sendStatus(400);
    }

    rid = req.query.rid;

    attempts = await db.get_all_attempts(rid);

    return res.send(attempts);
});

app.get("/word", async (req, res) => {
    if (!req.query.wid) {
        return res.status(400).send();
    }

    wid = req.query.wid;

    wordDetails = await db.get_word_details(wid);

    if (wordDetails) {
        return res.send(wordDetails);
    } else {
        return res.status(400).send();
    }
});

app.post("/new-round", async (req, res) => {
    if (!req.headers.uid) {
        return res.sendStatus(400);
    }

    const uid = req.headers.uid;

    const currentRound = await db.get_in_progress_round(uid);

    if (currentRound) {
        return res.send({ wordCreated: false, winner: false });
    }

    let words = await db.get_all_words();
    const completedRoundsWithWords = await db.get_all_completed_words(uid);
    const completedWords = completedRoundsWithWords.map((R) => R.word);

    words = words.filter((W) => !completedWords.find((W1) => W1 === W));

    if (words.length === 0) {
        return res.send({ wordCreated: false, winner: true });
    }

    const newWordId = words[Math.floor(Math.random() * words.length)].id;

    await db.create_new_round(uid, newWordId);

    return res.send({ wordCreated: true, winner: false });
});

app.post("/guess", async (req, res) => {
    if (!req.headers.uid) {
        return res.sendStatus(400);
    }

    const uid = req.headers.uid;

    if (!req.query.rid) {
        return res.sendStatus(400);
    }

    rid = req.query.rid;

    if (!req.body.guess) {
        return res.sendStatus(400);
    }

    let final_response = {};

    const guess = req.body.guess;

    const currentRound = await db.get_round(rid);
    const attemptsForRound = await db.get_all_attempts(rid);
    const wordsGuessedSoFar = new Set(
        attemptsForRound.map((A) => A.attempt_input)
    );

    const correctWordDetails = await db.get_word_details(currentRound.word_id);
    const correctWord = correctWordDetails["word"];

    const isWordTheCorrectWord = guess === correctWord;
    const hasWordAlreadyBeenGuessed = wordsGuessedSoFar.has(guess);
    const guessInWordBank = possibleWordBank[guess] ? true : false;
    const guessInDB = await db.is_word_in_db(guess);

    if (
        isWordTheCorrectWord ||
        (!hasWordAlreadyBeenGuessed && (guessInWordBank || guessInDB))
    ) {
        const attemptCorrectMap = createMapOfCorrectLetters(guess, correctWord);
        await db.attempt_word(
            currentRound.round_id,
            guess,
            attemptsForRound.length + 1,
            attemptCorrectMap
        );
        const updatedAttempts = await db.get_all_attempts(
            currentRound.round_id
        );

        const aId = updatedAttempts
            .map((A) => A.attempt_number)
            .sort()
            .pop();

        if (updatedAttempts.length === MAX_NUM_ATTEMPTS) {
            await db.complete_round(currentRound.round_id);
        }

        if (isWordTheCorrectWord) {
            await db.add_score_to_leaderboard(
                uid,
                MAX_NUM_ATTEMPTS - updatedAttempts.length
            );

            await db.complete_round(currentRound.round_id);

            console.log(currentRound);
            //const wDetails = await db.get_word_details(currentRound.word_id);
            const wDetails = {
                id: 4,
                word: "madison",
                body: "person",
                f_name: "test.png",
            };
            console.log(wDetails);

            final_response = {
                valid: true,
                correct: true,
                value: guess,
                attempt_id: aId,
                attempt_map: attemptCorrectMap,
                word_id: currentRound.word_id,
                word_details: wDetails,
            };
        } else {
            final_response = {
                valid: true,
                correct: false,
                value: guess,
                attempt_id: aId,
                attempt_map: attemptCorrectMap,
            };
        }
    } else {
        final_response = { valid: false };
    }

    return res.send(final_response);
});

app.get("/*", function (req, res) {
    res.sendFile(__dirname, "app_ui", "build", "index.html");
});

console.log(`App listening on port ${PORT}!`);
app.listen(PORT);
