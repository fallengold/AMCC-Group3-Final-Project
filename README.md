# Star Wars: Journey Through the Stars

An interactive p5.js WEBGL artwork that uses space travel as a metaphor for life. At first, the viewer does not receive a complete map of the controls. They must explore, make mistakes, and gradually learn how to move, fire, and jump while already flying through an unfamiliar galaxy.

The work is built around three emotional states: travel represents wonder and open possibility, hyperspace represents transition and life choices, and battle represents pressure, risk, and courage. The goal is not simply to win a space battle, but to learn how to keep moving without fully knowing the rules. If the viewer faces battle and destroys at least one enemy, they return to a new galaxy; if they escape without fighting back, they go back to origin.

## Requirements

- A modern desktop browser, such as Chrome, Edge, or Firefox.
- A local web server. Do not open `index.html` directly with `file://`, because the project loads local models, images, and audio files.
- Python 3 is recommended for the included local server command.
- No npm install is required. `p5.js` and `p5.sound.min.js` are included in the repository.

## Run Locally

**Most recommended option: use VS Code Live Server / Go Live.**

1. Open the project folder in VS Code.
2. Install the **Live Server** extension if it is not installed.
3. Click **Go Live** in the VS Code status bar.
4. Open the local URL shown by Live Server.

The command-line option below is only a fallback. It may have noticeably higher loading latency for this project.

```bash
python3 -m http.server 5500 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:5500/
```

To use a different port:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

On Windows, if `python3` is not available, use `python` instead:

```powershell
python -m http.server 5500 --bind 127.0.0.1
```

You can also use VS Code Live Server / Go Live if preferred.

## How To Experience It

1. The work starts with a cover image. Click to begin, or wait for the automatic start.
2. Watch or skip the opening crawl.
3. In travel mode, explore the controls. The controls are selected from a small random preset each session, so the artwork does not give a complete map at the beginning.
4. You must discover movement and weapon controls before hyperspace jump becomes available.
5. Trigger hyperspace to enter battle mode.
6. In battle mode, dodge TIE fighters and green enemy lasers. Fire orange lasers from the X-wing to destroy enemies.
7. Jump back from battle to travel:
   - If you destroyed at least one TIE fighter, the ship reaches a new galaxy.
   - If you destroyed none, the ship returns back to origin.

## Controls

The exact keys can change between sessions. Try nearby key groups and watch the HUD feedback:

- Movement must be discovered first.
- Weapon/fire must be discovered before jumping.
- Jump becomes usable only after movement and weapon are found.

The HUD will show short messages such as `Movement found`, `Weapon found`, and `Jump found`.

## Notes

- Browser audio starts only after a click or key press, which follows browser autoplay rules.
- If a sound or model file is missing, the HUD may show a warning.
- If port `5500` is already occupied, run the command with another port, for example `8000`.
