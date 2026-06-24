# Web Development Project 2 - CineQuiz

Submitted by: **Daniel Pramod Bayya**

This web app: **CineQuiz — a movie quote flashcard game where you guess the film from an iconic line. Reveal up to 3 hints per card, but each hint costs a point. Cards are shuffled randomly each round and your score is tracked throughout.**

Time spent: **4** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The app displays the title of the card set, a short description, and the total number of cards**
  - [x] Title of card set is displayed
  - [x] A short description of the card set is displayed
  - [x] A list of card pairs is created
  - [x] The total number of cards in the set is displayed
  - [x] Card set is represented as a list of card pairs (an array of dictionaries where each dictionary contains the question and answer is perfectly fine)
- [x] **A single card at a time is displayed**
  - [x] Only one half of the information pair is displayed at a time
- [x] **Clicking on the card flips the card over, showing the corresponding component of the information pair**
  - [x] Clicking on a card flips it over, showing the back with corresponding information
  - [x] Clicking on a flipped card again flips it back, showing the front
- [x] **Clicking on the next button displays a random new card**

The following **optional** features are implemented:

- [ ] Cards contain images in addition to or in place of text
- [x] Cards have different visual styles such as color based on their category
  - [x] Cards display the release year of the film as a category label

The following **additional** features are implemented:

* [x] Progressive hint system — reveal up to 3 hints per card, each costs −1 point
* [x] Live score tracker shown in the header throughout the game
* [x] End-of-game results screen with per-card breakdown and a rank title (Film Critic → First Timer)
* [x] Fuzzy answer matching — accepts common alternate spellings and partial movie titles
* [x] Wrong answer shake animation on the input field

## Video Walkthrough

Here's a walkthrough of implemented required features:

[Watch Walkthrough](https://drive.google.com/file/d/12OYoYZJAKEL6VQXZzVKnCldKSXtsIuyL/view?usp=sharing)

GIF created with [Kap](https://getkap.co/) for macOS

## Notes

The trickiest part was the hint-and-scoring system: `hintsRevealed` state lives inside `GameCard` but the score is calculated in `App`. Solved this by passing the hint count up through `onCorrect(hintsUsed)` and `onSkip(hintsUsed)` callbacks so the parent always has it when computing points.

Fuzzy matching was also tricky to tune — too strict and "Forrest Gump" vs "Forest Gump" fails, too loose and unrelated guesses pass. The current approach normalizes both strings (lowercase, strip punctuation) then checks for exact match or substring containment.

## License

    Copyright 2026 Daniel Pramod Bayya

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.