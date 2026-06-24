# Web Development Project 3 - CineQuiz

Submitted by: **Daniel Pramod Bayya**

This web app: **CineQuiz — an extended movie quote flashcard game. Guess the film from an iconic line, navigate cards sequentially with back/next buttons, get instant visual feedback on your answers, and track your current and longest correct streaks. Cards can be shuffled on demand, and fuzzy matching accepts common alternate spellings.**

Time spent: **2** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The user can enter their guess into an input box *before* seeing the flipside of the card**
  - Application features a clearly labeled input box with a submit button where users can type in a guess
  - Clicking on the submit button with an **incorrect** answer shows visual feedback that it is wrong (red border + shake animation on the input)
  - Clicking on the submit button with a **correct** answer shows visual feedback that it is correct (green overlay with check mark on the card)
- [x] **The user can navigate through an ordered list of cards**
  - A forward/next button displayed on the card navigates to the next card in a set sequence when clicked
  - A previous/back button displayed on the card returns to the previous card in the set sequence when clicked
  - Both the next and back buttons gray out and become unclickable at the boundaries — Back is disabled on card 1, Next shows "See Results" on the last card — no wrap-around navigation

The following **optional** features are implemented:

- [x] Users can use a shuffle button to randomize the order of the cards
  - Cards remain in their original sequence unless the shuffle button is clicked
  - Clicking the Shuffle button reorders the deck randomly and resets to card 1
- [x] A user's answer may be counted as correct even when it is slightly different from the target answer
  - Answers are case-insensitive and punctuation is ignored before comparing
  - Partial matches are accepted — e.g. "dark knight" matches "The Dark Knight", and alternate titles like "Forest Gump" match "Forrest Gump" via an altAnswers field on each card
- [x] A counter displays the user's current and longest streak of correct responses
  - The current streak counter increments each time the user guesses correctly
  - The current streak resets to 0 when the user guesses incorrectly or gives up
  - A separate longest streak counter updates whenever the current streak exceeds the previous best
- [ ] A user can mark a card that they have mastered and have it removed from the pool of displayed cards

The following **additional** features are implemented:

* [x] Progressive hint system — reveal up to 3 hints per card, but each hint deducts 1 point from the card's value (3 pts to 2 pts to 1 pt minimum)
* [x] Fun fact shown after each card is answered, win or lose
* [x] End-of-game results screen with a per-card breakdown and a rank title based on final score

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='PASTE_YOUR_GIF_LINK_HERE' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with [Kap](https://getkap.co/) for macOS

## Notes

The trickiest part of this extension was handling navigation state correctly. Since GameCard holds its own local state (guess, hints revealed, submitted), navigating away and back would show a stale answered card. The fix was adding key={cardIndex} to the GameCard element in App.jsx — React treats a new key as a completely new component instance, so all local state resets automatically on every card change without needing a useEffect cleanup.

Removing the setTimeout auto-advance from Project 2 also required rethinking the flow. Cards now stay visible after answering so users can read the fun fact, then navigate manually — which feels more natural for a study tool.

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
