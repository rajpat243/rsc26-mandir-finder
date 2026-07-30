# Mandir Guesser

> **Heads up:** the project idea for this repo has changed since you first cloned it. It used to be a mandir finder/directory — it is now a picture guessing game. Please re-read this whole README, even if you already looked at it before.

A picture guessing game for the gala dinner.

## What you are building

A game that shows a photo of a BAPS mandir or a murti and asks the player to pick which one it is from four options. It's meant to be fast-paced and fun for other delegates to play at the gala dinner, testing how well they know BAPS mandirs and murtis.

## Your MVP (smallest version that actually works)

Get this working first, before anything else:

- Show an image (a mandir or murti photo).
- Show four answer choices.
- When the player picks one, tell them right away if it's right or wrong.
- Keep a running score.

That's it. If a player can see a photo, guess, and get a score, your MVP is done.

## Stretch goals

Once your MVP works, try adding:

- A streak counter for consecutive correct answers.
- A short fact about the mandir or murti shown after each answer.
- Separate difficulty levels — famous mandirs versus lesser-known ones.

## Challenge goals

For teams who want to go further, pick one:

- A timer that adds pressure to each guess.
- **OR** zoomed-in detail shots that only reveal the full photo after the player has guessed.

## Important: how to handle images

- Store all images in an `images` folder inside this repo — don't scatter them around.
- Keep image files small (resize/compress them) so the page loads fast, especially on a phone at the gala.
- File names are **case sensitive** once this is published online — `Photo.jpg` and `photo.jpg` are treated as two completely different files, so match your file names and your code exactly, including capitalization.
- Only use official BAPS photos or photos your team took yourselves. Do not use copyrighted images pulled from random websites.

## Team roles

- **Content** — Picks which mandirs and murtis to include, writes the four answer choices for each, and (for the stretch goal) writes the facts shown after each answer.
- **Design** — Decides how the photo, answer choices, and score are laid out and styled.
- **Code** — Builds the logic that shows a photo, checks the picked answer, and keeps score.
- **Media** — Sources or takes the mandir/murti photos, resizes them, and organizes them in the `images` folder (see note above).

## Getting started

1. Pull the latest changes so you're starting from the newest version of the project:
   ```
   git pull
   ```
2. Open the `index.html` file in your web browser (double-click it, or drag it into a browser window) to see the current page.
3. Make your changes to `index.html`, `style.css`, and `script.js`.
4. Save your work with git as you go, using these four commands:
   ```
   git add .
   git commit -m "describe what you changed here"
   git push
   git pull
   ```
   Run all four every time you save progress — `pull` again at the end so you're never behind if a teammate pushed while you were working.

## Working as a Team: Branches

Once more than one person is working in the same repo, everyone pushing straight to `main` gets messy fast. Branches let each person work on their own copy of the project without stepping on anyone else's changes. Here's the flow, left to right:

1. **Branch off** — create your own branch to work in:
   ```
   git checkout -b akshar
   ```
2. **Do your work** — make your changes, then save them:
   ```
   git add .
   git commit -m "describe what you changed here"
   ```
3. **Get the latest** — before you push, pull down the newest changes from `main` so you're building on top of everyone else's work, not around it:
   ```
   git pull origin main
   ```
4. **Push & merge** — push your branch up to GitHub, then merge it into `main`:
   ```
   git push origin akshar
   ```

### `git fetch` vs. `git pull`

- `git fetch` — look, don't touch. It checks GitHub for new changes and downloads them, but doesn't change any of the files you're working on.
- `git pull` — fetch **and** merge. It downloads new changes and immediately merges them into the branch you're currently on.

### The golden rule

**Always `pull` before you `push`.** If someone else has changed the project since you last checked, pulling first means you find out (and sort out any conflicts) on your own machine — not in the middle of the group.

## A note on tools

This project uses **only plain HTML, CSS, and JavaScript** — no frameworks (like React or Vue) and no build step. If you ask an AI tool for help, **tell it that** explicitly, or it will hand you React code that won't run in this project.
