import random

import flaskr.db as db


def shouldAllowLogin(username: str):
    u = db.get_user(username.lower())

    return u


def getLeaderboard():
    lb = db.get_leaderboard()

    return lb


def getCurrentRound(user_id: str):
    currentRound = db.get_in_progress_round(user_id)

    if currentRound:
        attemptsForRound = db.get_attempts_for_round(currentRound["round_id"])

        return attemptsForRound
    else:
        return None


def generateNewRound(user_id: str):
    currentRound = db.get_in_progress_round(user_id)

    if currentRound:
        return False

    words = db.get_all_words()
    completedRoundsWithWords = db.get_completed_rounds_with_words(user_id)
    completedWords = list(map(lambda x: x["word"], completedRoundsWithWords))

    words = list(filter(lambda x: x["word"] not in completedWords, words))

    newWordId = random.choice(words)["id"]

    db.create_new_round(user_id, newWordId)

    return True


def makeGuess(user_id: str, guess: str, possibleWordBank: list):
    # Guesses available
    guessesMade = db.get_guesses_made(user_id)

    if guessesMade > 6:
        return {"valid": False}

    # Check if guess is valid
    currentRound = db.get_in_progress_round(user_id)

    guessInWordBank = guess in possibleWordBank
    wordInDB = db.is_word_in_db(guess)

    print("HEHRHEHAOWDAOWDJO")
    print(currentRound)

    wordIsCorrectWord = db.is_word_correct(guess, currentRound["round_id"])

    if wordIsCorrectWord or guessInWordBank or wordInDB:
        # Create attempt
        aId = db.attempt_word(user_id, guess)
        attempts = db.get_attempts_for_round(currentRound["round_id"])

        # If last attempt
        if len(attempts) == 6:
            db.complete_round(currentRound["round_id"])

        if wordIsCorrectWord:
            db.add_score_to_leaderboard(user_id, 7 - len(attempts))

            return {"valid": True, "correct": True, "value": guess, "attempt_id": aId}
        else:
            return {"valid": True, "correct": False, "value": guess, "attempt_id": aId}
    else:
        return {"valid": False}
