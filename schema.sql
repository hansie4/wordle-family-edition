/* SCHEMA */
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS word;
DROP TABLE IF EXISTS leaderboard;
DROP TABLE IF EXISTS wordle_round;
DROP TABLE IF EXISTS attempt;
CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    avatar_link TEXT
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
/* INSERTING USERS */
INSERT INTO user (username, avatar_link)
VALUES (
        'hans',
        '1-hZ6mW7YRimzhkBNG9faeIZe2jLv9DK8'
    );
INSERT INTO user (username, avatar_link)
VALUES (
        'beryl',
        '1-nNdQSsyU-raxv11iZrlxA398Xf_64U2'
    );
INSERT INTO user (username, avatar_link)
VALUES (
        'wes',
        '1-O7J0A9UW7oXCHBHN8mVyrhPEUWnMwGd'
    );
INSERT INTO user (username, avatar_link)
VALUES (
        'april l',
        '1-peKKCC46b2h7Bisimg9S9agGXjv768P'
    );
INSERT INTO user (username, avatar_link)
VALUES (
        'madison',
        '1-HY7YoNseOqPm3jWV-EAhQzvj7BgjJP_'
    );
INSERT INTO user (username, avatar_link)
VALUES (
        'austin',
        '1-eDsJac3fCenkzMhbuarOr2PtVaxyG9G'
    );
INSERT INTO user (username, avatar_link)
VALUES (
        'kaleb',
        '1-H_aTEiMlKLVCGADnDS9xHipNWLrQtLj'
    );
INSERT INTO user (username, avatar_link)
VALUES (
        'matt',
        '1083wNtgWlBcXZi3LcuXtQ2MXAeuxvs38'
    );
INSERT INTO user (username, avatar_link)
VALUES (
        'wendy',
        '1-yTLJd4vGFLKQtxyuIXLuPui6jAqus42'
    );
INSERT INTO user (username, avatar_link)
VALUES (
        'sandy',
        '1YEqkMHfuRngHb3EShchi-NdRq9OjJJ_G'
    );
INSERT INTO user (username, avatar_link)
VALUES (
        'steve',
        '1zMUutBdYt-rowaXU-kVEETwCEJr97Lji'
    );
INSERT INTO user (username, avatar_link)
VALUES (
        'kevin',
        '1-lQRaVz4TjdN_LtBen3YBKrvzoLuH5tZ'
    );
INSERT INTO user (username, avatar_link)
VALUES (
        'shane',
        '1-IrHL_MT2IoIXX0ndYq_ZJw5YzkBqiTz'
    );
INSERT INTO user (username, avatar_link)
VALUES (
        'april k',
        '108AKvpeLYo9bbvYRhHEQ0U8G7EQvNuJG'
    );
INSERT INTO user (username, avatar_link)
VALUES (
        'fran',
        '1-kK-_zuRI1MCqUQ-vXnxOJ3K7fmDj8fE'
    );
/* INSERTING PEOPLE WORDS */
INSERT INTO word (word, body, f_name)
VALUES ('hans', '', '11_FDzHTwZzNW-8QdlFNT-ENztvglTl9B');
INSERT INTO word (word, body, f_name)
VALUES ('beryl', '', '11rQxjmL9DZPX-psRFnf_l9OPhLFUBrMS');
INSERT INTO word (word, body, f_name)
VALUES (
        'aprill',
        '',
        '11mRNbWJYDYaMLchRZyaX3PlrklTGNZPY'
    );
INSERT INTO word (word, body, f_name)
VALUES ('wes', '', '11USZs6phlN_PzVbCewQT6fUX4y62-N3w');
INSERT INTO word (word, body, f_name)
VALUES ('matt', '', '13QX7RmdcqB6LHlrBmVe65bi8NmlcneyH');
INSERT INTO word (word, body, f_name)
VALUES ('wendy', '', '17DTAA93VV-lKiBFrFI91BCa2tTG5XZU3');
INSERT INTO word (word, body, f_name)
VALUES ('kaleb', '', '1qkDAYLbzJ1Lqt23f4vhK2CXVghIKLmAL');
INSERT INTO word (word, body, f_name)
VALUES (
        'madison',
        '',
        '11yZkTpx25NXJ-GeguAEjwtxvhaaKiFxA'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'austin',
        '',
        '10U6FvcZUvUTWRdivSyuk5BPE9EwPKd6b'
    );
INSERT INTO word (word, body, f_name)
VALUES ('steve', '', '1-Kvi5MwhIcmrpKPXRWlZAlZYnmyWEvnl');
INSERT INTO word (word, body, f_name)
VALUES ('kevin', '', '1g67RURS45PPwR1554lcjktHav81XNVOi');
INSERT INTO word (word, body, f_name)
VALUES ('shane', '', '1jnYRe79aTE8i2bbCUgyk7YOdAqKqM0W-');
INSERT INTO word (word, body, f_name)
VALUES (
        'aprilk',
        '',
        '108AKvpeLYo9bbvYRhHEQ0U8G7EQvNuJG'
    );
INSERT INTO word (word, body, f_name)
VALUES ('sandy', '', '11lRjcxPMW1_KcXN8VCC85aEkgl1XcLP8');
INSERT INTO word (word, body, f_name)
VALUES ('fran', '', '1bXdKfmeUTKVJ5Tb2D7O3gw7t6BcFr4Wm');
/* INSERTING WORDS */
INSERT INTO word (word, body, f_name)
VALUES (
        'paris',
        'Madison and Beryl trying alcohol in the Paris apartment.',
        '1bjf9VawFkVErLSnjAd2TOnRAvZsfRjNZ'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'maine',
        'Family trip to Maine.',
        '10JmtD_QCi4mJlwi6sSET2ukc0EpYbExV'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'hawaii',
        'Family trip to Hawaii.',
        '10QWODibgOaD_pu8swmUmuMRAYdcbggft'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'jungle',
        'Family trip to Costa Rica.',
        '1MT9re81nXmaaa5O4VUzOUh6tRXLJADDs'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'peas',
        'Madison, Beryl, Austin, and Kevin after the Mushy Peas incident. Not pictured: peas in Kevin''s beer.',
        '1p9w6eze9QbPPt5NKXZ-sOVg7IRn-NqCV'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'farm',
        'Austin, Wendy, Matt, April, Beryl, and Madison before playing paintball at the farm.',
        '10iUFbYjhdLYsnzMfxXhmCvyUunzBnG1E'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'beach',
        'Watching the surfers during our Hawaii family trip.',
        '10Ty0Gae-1ZLqsUYhln6HzUr26hI3-Piv'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'pontoon',
        'Steve and Kev on the pontoon. Not pictured: all the fried chicken we had.',
        '11QKykAlbCzdQw6RCud4TnnGHG9EhtmBc'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'pops',
        'The best father and grandfather who made amazing spaghetti and grew the best tomatoes.',
        '10eCytI1Jtvawx58uM1R7yZ0bGs1axjRh'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'virtual',
        'The Virtual Reality experience during our Hawaii family trip.',
        '10PLbHP3yqqLl2QcCgz8UBisN25ZAnojC'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'tomato',
        'Pops with his tomato crop.',
        '10rDFqSvSVes7H2TABf0dpGuMeKHcX8be'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'mitch',
        'Austin and Mitch before flying Mitch''s plane.',
        '10sL_7QHn8n5AGlHtLk_Yov3RsygTha14'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'cave',
        'Blanchard Springs Caverns in Arkansas.',
        '10vOP7Nqugtf6hSQd0tIB-ZcqjZGLnubv'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'crooked',
        'Madison and Beryl covering Austin in stone at the Crooked Creek.',
        '10wd8zzy8SbKFf3QtH-WT-AnGJy2FXmPO'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'fishing',
        'Pops, Austin, Matt, and Madison with the fish they caught in Arkansas.',
        '11M4VDbjZGe-68XltzOjZK2bVMVzSbrD2'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'tractor',
        'Madison and Beryl on the tractor at the farm.',
        '1123SkAq-hAVqfrx4otEF7SCySNboFVFZ'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'golf',
        'Madison and Matt golfing at the farm.',
        '11HB2ws1pDMogVi8qjdqI5nQ0mUFTVciu'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'reunion',
        'The Sanders Lloyd reunion in Arkansas.',
        '11Ihl5CgJ-SikCHx5tGQIUvENbzYY7nn5'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'iguana',
        'Iguana from Costa Rico. It was a daily occurrence to see them fall from the trees.',
        '11LNEgTkmZN7Hpt7lMURbUIu-7WQFUYpZ'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'wyoming',
        'Madison standing next to the Beryl Spring at Yellowstone National Park.',
        '11M3NlzXrUoJQ8F7Q620AHhDheDZPE-NV'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'palace',
        'Pops and April standing in front of Buckingham Palace.',
        '1PrUWIM95fR8wJ3LBhCch5UZ57V3EY2fX'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'boat',
        'Madison, Beryl, Maeve, and Everley on the boat in Galvy.',
        '1jtgbNCcDpshR00JStZgnQb2-xwS1luiM'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'buffalo',
        'April, Wendy, and Sandy near Buffalo River (?).',
        '1dIvW70BgS11pNMuIwnGEkvX_Ki0NPB4t'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'cards',
        'Austin and Sandy playing cards.',
        '1HfRgxB27qjDouqiAt29ZJZIRhegqTlZI'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'cheers',
        'Austin, Beryl, and Madison at the 2013 family photo shoot.',
        '11tz-Vd5Aza5vlfTZVo5NRyayVgAkXlFb'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'cooking',
        'Steve, Kev, Madison, Shane, and Beryl cooking in the Costa Rica kitchen.',
        '10_D7YielIv5WUsUyzI-GW4r4fYY_5YAr'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'corn',
        'Matt and Austin playing cornhole in Boston while the Asian tourists watched.',
        '1XqZ4HIAk09jm-HhBsFcpP-0WNkuVPSpR'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'eating',
        'Dinner during the Costa Rica family trip.',
        '1IVNkQFVHmKWDZCiSmfUiX1xF1rZlwApn'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'ginger',
        'Madison, Beryl, and Steve with their gingerbread house.',
        '11vZy7BxGhnjOlbIXIwqe-lfEI0onxbr0'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'orange',
        'Austin holding as many oranges as he can.',
        '1OC7BHsvkRVAEaVotKfIssqnGnbLuQOdf'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'oxford',
        'Wendy, Austin, and Pops in Oxford during the family trip to Europe.',
        '1I1pmDsJSZANb4fmdkVHb_6rPiJWlOgvi'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'tired',
        'The family looking tired in London.',
        '1nxtfJazLYRGFPt0P8V3PFNObiVPbdzki'
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'cherry',
        'We probably picked all the cherries the cherry farm had.',
        ''
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'ice',
        'All the adults rushed to be by Austin''s side while he napped on Pike''s Peak.',
        ''
    );
INSERT INTO word (word, body, f_name)
VALUES (
        'crown',
        'Steve and Kev wearing the paper crowns from our amazing Christmas Eve tradition of opening Poppers.',
        '1KjWylhzdgJpkoNOVSv-v64IAg2gkj1YK'
    );