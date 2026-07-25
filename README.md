# Mandir Finder

A website that helps someone find a nearby BAPS mandir, along with its address and sabha (gathering) times.

## What you are building

A page where a visitor picks a city or state and sees which mandir is closest, its address, and when its sabha happens. Think of it as a simple directory that saves people from having to ask around or search the internet themselves.

## Your MVP (smallest working version)

Get this working first, before anything else:

- A way to pick a city or state (a dropdown works great for this).
- When one is picked, show the mandir's name, its address, and its sabha time.

That's it. If someone can pick a place and see mandir info, your MVP is done.

## Stretch goals

Once your MVP works, try adding:

- A search box so people can type instead of scrolling a dropdown.
- Info cards instead of a plain list — a nicer box for each mandir with its details laid out clearly.

## Challenge goals

For teams who want to go further:

- A map link or embedded map showing where the mandir is.
- Photos of the mandir.

## Team roles

- **Content** — Collects accurate mandir names, addresses, and sabha times for each city or state.
- **Design** — Decides how the mandir info is displayed: the dropdown or search box, the info cards, spacing and colors.
- **Code** — Builds the logic that connects the city/state picker to the right mandir's information.
- **Media** — Finds mandir photos and, for the challenge goal, sets up map links or embeds.

## Getting started

1. Clone this repo to your computer:
   ```
   git clone <this repo's URL>
   ```
2. Open the `index.html` file in your web browser (just double-click it, or drag it into a browser window) to see the starter page.
3. Make your changes to `index.html`, `style.css`, and `script.js`.
4. Save your work with git, using these four commands as you go:
   ```
   git clone <this repo's URL>
   git add .
   git commit -m "describe what you changed here"
   git push
   ```
   (You only need to `clone` once — after that it's `add`, `commit`, and `push` each time you save progress.)

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
