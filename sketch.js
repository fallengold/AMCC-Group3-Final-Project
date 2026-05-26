// AMCC2020 Final Project source/contribution annotation.
// Overall contribution summary for this formal sketch.js:
// Most concept, tuning, integration, and final design decisions are group-authored.
// AI-assisted sections are limited to implementation structure, math/debugging,
// and documentation polish, as marked below.
// "HUMAN-AUTHORED" means Group 3 designed, wrote, tested, and tuned the logic.
// "AI-ASSISTED" means ChatGPT/Codex helped with implementation structure,
// debugging, or math organization between April 30 and May 27, 2026;
// the group reviewed, tested, and modified the output.
// AI also supported formatting, grammar polishing, and wording polish for
// documentation throughout the final-report preparation period.
// "EXTERNAL API/ASSET" means p5.js / p5.sound API usage or imported local media.
// No external tutorial/example code was directly copied into this sketch.

// HUMAN-AUTHORED START (Group 3, April 28-May 27, 2026)
// Contribution note: Primarily group-authored; AI support was limited to minor organization review.
// Global state, scene names, constants, narrative text, color themes, and control
// presets based on our concept and visual tuning.
// Date note: this top-level state block accumulated across the full development period.
let xwing;
let tieFighter;
let saturnPlanet;
let saturnRings;
let saturnSurfaceTexture;
let saturnRingsTexture;
let uranusPlanet;
let uranusRing;
let uranusSurfaceTexture;
let uranusRingTexture;
let neptunePlanet;
let neptuneTexture;
let coverImage;
let introGraphics;
let introTextureReady = false;
let blackShader;
let themeSound;
let battleMusicSound;
let hyperspaceSound;
let tieFlybySound;
let blastSound;
let tieBlasterSound;
let tieExplosionSound;
let playerHitSound;
let themeLoaded = false;
let themeFailed = false;
let battleMusicLoaded = false;
let battleMusicFailed = false;
let hyperspaceLoaded = false;
let hyperspaceFailed = false;
let tieFlybySoundLoaded = false;
let tieFlybySoundFailed = false;
let blastLoaded = false;
let blastFailed = false;
let tieBlasterLoaded = false;
let tieBlasterFailed = false;
let tieExplosionLoaded = false;
let tieExplosionFailed = false;
let playerHitLoaded = false;
let playerHitFailed = false;
let audioUnlocked = false;
let audioStarted = false;
let audioRequested = false;
let currentMusicMode = null;

const stars = [];
const laserShots = [];
const enemyLaserShots = [];
const explosions = [];
const retreatingTies = [];

const SceneState = {
  COVER: 'cover',
  COVER_FADE: 'cover_fade',
  INTRO_CRAWL: 'intro_crawl',
  TRAVEL: 'travel',
  JUMP_CHARGE: 'jump_charge',
  HYPERSPACE: 'hyperspace',
  BATTLE: 'battle'
};

let sceneState = SceneState.COVER;
let jumpDestination = SceneState.BATTLE;
let jumpChargeStart = 0;
let hyperspaceStart = 0;
let coverStart = 0;
let coverFadeStart = 0;
let introStart = 0;
let newSystemLoaded = false;
let tieFlybyActive = false;
let tieFlybyStart = 0;
let tieFlybyPath = null;
let tieFormation = [];
let tieAttackers = [];
let tieAttackStart = 0;
let tieAttackAnchor = null;
let nextTieWaveStart = 0;
let playerHitShakeStart = -9999;
let playerHitShakeSeed = null;
let travelSaturn = null;
let travelUranus = null;
let travelNeptune = null;
let travelGalaxy = null;
let pendingTravelGalaxy = null;
let hyperspaceOriginTheme = null;
let hyperspaceDestinationTheme = null;
let travelArrivalPrepared = false;
let hudOverlay = null;
let journeyBannerOverlay = null;
let controlMap = null;
const discoveredControls = {
  movement: false,
  fire: false,
  jump: false
};
let controlDiscoveryMessage = '';
let controlDiscoveryMessageStart = -9999;

const journeyState = {
  enemiesDestroyedThisBattle: 0,
  lastBattleDestroyedCount: 0,
  lastBattleAdvanced: false,
  lastBattleResultMessage: '',
  lastBattleResultStart: -9999,
  bannerStart: -9999,
  galaxyGeneration: 0
};

const STAR_COUNT = 900;
const STAR_MIN_Z = -22000;
const STAR_MAX_Z = -4500;
const STAR_FIELD_WIDTH = 9000;
const STAR_FIELD_HEIGHT = 5200;
const TRAVEL_SATURN_MIN_Z = -15000;
const TRAVEL_SATURN_MAX_Z = -11500;
const TRAVEL_SATURN_SIDE_MIN = 8200;
const TRAVEL_SATURN_SIDE_MAX = 11200;
const TRAVEL_SATURN_VERTICAL_MIN = 2600;
const TRAVEL_SATURN_VERTICAL_MAX = 4300;
const TRAVEL_URANUS_MIN_Z = -19000;
const TRAVEL_URANUS_MAX_Z = -14500;
const TRAVEL_URANUS_SIDE_MIN = 9600;
const TRAVEL_URANUS_SIDE_MAX = 13500;
const TRAVEL_URANUS_VERTICAL_MIN = 3200;
const TRAVEL_URANUS_VERTICAL_MAX = 5200;
const TRAVEL_NEPTUNE_MIN_Z = -23000;
const TRAVEL_NEPTUNE_MAX_Z = -17500;
const TRAVEL_NEPTUNE_SIDE_MIN = 6000;
const TRAVEL_NEPTUNE_SIDE_MAX = 9800;
const TRAVEL_NEPTUNE_VERTICAL_MIN = 4800;
const TRAVEL_NEPTUNE_VERTICAL_MAX = 6800;
const JUMP_CHARGE_DURATION = 3000;
const COVER_AUTO_START_DELAY = 5000;
const COVER_FADE_DURATION = 3000;
const INTRO_CRAWL_SCROLL_DURATION = 39000;
const INTRO_CRAWL_HOLD_DURATION = 3000;
const INTRO_CRAWL_DURATION = INTRO_CRAWL_SCROLL_DURATION + INTRO_CRAWL_HOLD_DURATION;
const HYPERSPACE_TUNNEL_DURATION = 5000;
const HYPERSPACE_DURATION = 6000;
const HYPERSPACE_FLASH_START = 4700;
const HYPERSPACE_FLASH_DURATION = 1300;
const TIE_FLYBY_DURATION = 6000;
const TIE_FORMATION_DELAY = 260;
const TIE_HEADING_OFFSET = 0;
const LASER_DURATION = 2200;
const LASER_SPEED = 4200;
const TIE_HIT_RADIUS = 620;
const PLAYER_HIT_RADIUS = 270;
const PLAYER_HIT_SHAKE_DURATION = 900;
const PLAYER_HIT_SHAKE_STRENGTH = 78;
const EXPLOSION_DURATION = 3900;
const ENEMY_LASER_DURATION = 4200;
const ENEMY_LASER_SPEED = 3300;
const TIE_ATTACK_DELAY = 1000;
const TIE_ATTACK_ENTRY_DURATION = 2200;
const TIE_ATTACK_FOLLOW_LERP_XY = 0.006;
const TIE_ATTACK_FOLLOW_LERP_Z = 0.055;
const TIE_NEXT_WAVE_DELAY = 5000;
const TIE_RETREAT_DURATION = 3000;
const TIE_RETREAT_BLEND_DURATION = 520;
const LASER_MUZZLE_OFFSETS = [
  { x: -235, y: 55, z: 40 },
  { x: -235, y: -110, z: 40 },
  { x: 235, y: -110, z: 40 },
  { x: 235, y: 55, z: 40 }
];
const INTRO_CRAWL_LINES = [
  'Star Wars: Journey Through the Stars',
  '',
  'is an interactive generative artwork inspired by',
  'the adventurous spirit of the Star Wars universe,',
  'but it is also a metaphor for learning how to',
  'move through life. The viewer begins not as a',
  'distant observer, but as a pilot placed inside',
  'an unfamiliar galaxy.',
  '',
  'The controls are not fully given in advance.',
  'They must be discovered through movement,',
  'mistakes, and response. In this way, the act of',
  'piloting becomes close to growing up: we rarely',
  'receive a complete map before we begin. We learn',
  'by steering while already in motion.',
  '',
  'Open-space travel represents wonder and freedom.',
  'Planets drift at a distance like possible futures,',
  'beautiful but unreachable all at once. A light-speed',
  'jump becomes a threshold: the old star system is',
  'left behind, the screen floods with white, and a',
  'new phase of the journey begins.',
  '',
  'Battle represents the pressures that answer our',
  'freedom: conflict, uncertainty, failure, and fear.',
  'The ship can be hit, shaken, and forced to react,',
  'yet it can still turn, fire, escape, and continue.',
  'The journey is not about perfect control, but about',
  'finding courage while the world is still moving.',
  '',
  'Life is not a voyage we start with a finished map.',
  'It is something we learn to fly through: discovering',
  'our controls, crossing thresholds, carrying the dust',
  'of past battles, and returning again to wonder.',
  '',
  'Authored by ',
  'ZHANG, Tianrui',
  'GUO, Zilin',
  'Group 3'
];
const INTRO_TEXTURE_WIDTH = 1700;
const INTRO_TEXTURE_HEIGHT = 3300;
const INTRO_TITLE_SIZE = 92;
const INTRO_BODY_SIZE = 68;
const INTRO_LINE_HEIGHT = 108;
const INTRO_BLANK_LINE_HEIGHT = 86;
const THEME_VOLUME = 0.45;
const BATTLE_MUSIC_VOLUME = 0.48;

const PLAYER_ACCEL = 1.25;
const PLAYER_DAMPING = 0.92;
const PLAYER_FORWARD_SPEED = 95;
const PLAYER_MAX_SIDE_SPEED = 36;
const CAMERA_FOLLOW_LERP = 0.11;
const CAMERA_TARGET_LERP = 0.16;
const CONTROL_DISCOVERY_MESSAGE_DURATION = 2200;
const JOURNEY_MESSAGE_DURATION = 3600;
const GALAXY_THEMES = [
  {
    name: 'Origin Drift',
    background: [0, 0, 0],
    starPrimary: [255, 255, 255],
    starSecondary: [205, 222, 255],
    starAccent: [255, 233, 184],
    starWeight: 1,
    starAlpha: 1,
    haze: [0, 0, 0],
    hazeAlpha: 0,
    ambient: [24, 24, 30],
    light: [255, 238, 198],
    saturnTint: [255, 242, 218],
    saturnRingTint: [255, 232, 190],
    uranusTint: [210, 246, 255],
    uranusRingTint: [190, 235, 255],
    neptuneTint: [210, 226, 255]
  },
  {
    name: 'Golden Threshold',
    background: [7, 3, 0],
    starPrimary: [255, 248, 220],
    starSecondary: [255, 205, 136],
    starAccent: [170, 220, 255],
    starWeight: 1.08,
    starAlpha: 1.16,
    haze: [120, 64, 10],
    hazeAlpha: 26,
    ambient: [48, 32, 16],
    light: [255, 190, 96],
    saturnTint: [255, 202, 105],
    saturnRingTint: [255, 178, 82],
    uranusTint: [255, 220, 160],
    uranusRingTint: [255, 188, 96],
    neptuneTint: [170, 204, 255]
  },
  {
    name: 'Blue Quiet',
    background: [0, 3, 11],
    starPrimary: [226, 242, 255],
    starSecondary: [150, 196, 255],
    starAccent: [255, 245, 205],
    starWeight: 1.02,
    starAlpha: 1.08,
    haze: [22, 64, 130],
    hazeAlpha: 24,
    ambient: [10, 22, 54],
    light: [126, 190, 255],
    saturnTint: [164, 198, 255],
    saturnRingTint: [126, 172, 255],
    uranusTint: [112, 224, 255],
    uranusRingTint: [92, 190, 255],
    neptuneTint: [98, 150, 255]
  },
  {
    name: 'Rose Current',
    background: [8, 0, 5],
    starPrimary: [255, 236, 232],
    starSecondary: [255, 174, 154],
    starAccent: [190, 220, 255],
    starWeight: 1.04,
    starAlpha: 1.12,
    haze: [110, 26, 64],
    hazeAlpha: 25,
    ambient: [50, 16, 34],
    light: [255, 132, 168],
    saturnTint: [255, 176, 196],
    saturnRingTint: [255, 132, 160],
    uranusTint: [236, 176, 255],
    uranusRingTint: [255, 126, 170],
    neptuneTint: [190, 164, 255]
  },
  {
    name: 'Emerald Wake',
    background: [0, 6, 3],
    starPrimary: [232, 255, 236],
    starSecondary: [160, 235, 194],
    starAccent: [255, 228, 172],
    starWeight: 1.06,
    starAlpha: 1.1,
    haze: [18, 92, 56],
    hazeAlpha: 24,
    ambient: [12, 46, 32],
    light: [130, 255, 176],
    saturnTint: [184, 255, 166],
    saturnRingTint: [132, 232, 126],
    uranusTint: [116, 255, 214],
    uranusRingTint: [96, 224, 184],
    neptuneTint: [126, 224, 220]
  }
];
const CONTROL_PRESETS = [
  {
    label: 'classic',
    up: [87],
    down: [83],
    left: [65],
    right: [68],
    fire: [70],
    jump: [32]
  },
  {
    label: 'pilot-right',
    up: [73],
    down: [75],
    left: [74],
    right: [76],
    fire: [72],
    jump: [16]
  },
  {
    label: 'navigation',
    up: [38],
    down: [40],
    left: [37],
    right: [39],
    fire: [13],
    jump: [32]
  },
  {
    label: 'unknown-sector',
    up: [84],
    down: [71],
    left: [70],
    right: [72],
    fire: [82],
    jump: [16]
  }
];

const player = {
  pos: null,
  vel: null,
  controlVel: null,
  roll: 0,
  pitch: 0,
  yaw: 0
};

const cameraState = {
  pos: null,
  target: null
};
// HUMAN-AUTHORED END

// EXTERNAL API/ASSET START (p5.js WEBGL shader API reference, April 28, 2026)
// Small custom fill shader for imported OBJ models. Written for this project,
// using p5.js shader attribute/uniform conventions.
// Date note: added during the first WEBGL/OBJ visibility test.
const blackVertSrc = `
precision mediump float;
attribute vec3 aPosition;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
void main() {
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}`;

const blackFragSrc = `
precision mediump float;
uniform vec3 uFillColor;
void main() {
  gl_FragColor = vec4(uFillColor, 1.0);
}`;
// EXTERNAL API/ASSET END

// EXTERNAL API/ASSET START (p5.js preload/loadImage/loadModel reference, April 28-May 8, 2026)
// Loads local OBJ, texture, and cover-image assets. Asset choices and paths are
// project-specific; API usage follows p5.js reference behavior.
// Date note: X-wing loading began on April 28; TIE and planet assets were added by May 8.
// Mesh asset source note: imported mesh assets were downloaded from Sketchfab
// and stored locally in the assets folder.
// X-wing mesh source: https://skfb.ly/plHYv
// TIE Fighter mesh source: https://skfb.ly/ovwWN
// Saturn planet source: https://skfb.ly/6yw9I
// Uranus planet source: https://skfb.ly/6THRF
// Neptune planet source: https://skfb.ly/6ABCv
function preload() {
  coverImage = loadImage('assets/pics/starwars.png');
  xwing = loadModel(
    'assets/x-wing_starfighter/rebels_x-wing_starfighter_compressed_basetoolbox (1).obj',
    true
  );
  tieFighter = loadModel('assets/tie_fighter/tie.obj', true);
  saturnPlanet = loadModel('assets/saturn_planet/saturn_body.obj', false);
  saturnRings = loadModel('assets/saturn_planet/saturn_rings.obj', false);
  saturnSurfaceTexture = loadImage('assets/saturn_planet/Material_50.png');
  saturnRingsTexture = loadImage('assets/saturn_planet/Material_63.png');
  uranusPlanet = loadModel('assets/uranus/uranus_body.obj', false);
  uranusRing = loadModel('assets/uranus/uranus_ring.obj', false);
  uranusSurfaceTexture = loadImage('assets/uranus/material.png');
  uranusRingTexture = loadImage('assets/uranus/material_2.png');
  neptunePlanet = loadModel('assets/neptune/source/moon/moon.obj', false);
  neptuneTexture = loadImage('assets/neptune/textures/neptune2k.jpg');
}
// EXTERNAL API/ASSET END

// HUMAN-AUTHORED START (Group 3, April 28-May 6, 2026)
// Contribution note: Group-authored setup; AI support was minimal and organizational.
// Basic p5.js WEBGL setup and initial object/state creation for the final sketch.
// Date note: setup began with the model prototype and expanded as audio/battle assets were added.
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  createHudOverlay();
  createJourneyBannerOverlay();
  introGraphics = createGraphics(INTRO_TEXTURE_WIDTH, INTRO_TEXTURE_HEIGHT);
  perspective(PI / 3, width / height, 1, 30000);

  blackShader = createShader(blackVertSrc, blackFragSrc);
  player.pos = createVector(0, 0, 0);
  player.vel = createVector(0, 0, 0);
  player.controlVel = createVector(0, 0, 0);
  cameraState.pos = createVector(0, -430, 1280);
  cameraState.target = createVector(0, 190, -2450);
  initializeControlMap();
  prepareInitialGalaxy();

  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push(createStar());
  }

  coverStart = millis();
  loadThemeMusic();
  loadBattleMusic();
  loadHyperspaceSound();
  loadTieFlybySound();
  loadBlastSound();
  loadTieBlasterSound();
  loadTieExplosionSound();
  loadPlayerHitSound();
}
// HUMAN-AUTHORED END

// HUMAN-AUTHORED START (Group 3, May 4-May 27, 2026)
// Contribution note: Group-authored scene flow; AI support helped with light organization and polish.
// Main scene loop and narrative entry sequence. The state ordering and visual
// experience are our design; AI helped lightly with organization and polish.
// Date note: the draw loop became state-driven after hyperspace was added on May 4.
function draw() {
  drawSceneBackground();
  if (sceneState === SceneState.COVER) {
    if (millis() - coverStart >= COVER_AUTO_START_DELAY) {
      startCoverFade();
      return;
    }

    drawCover(0);
    return;
  }

  if (sceneState === SceneState.COVER_FADE) {
    const fadeProgress = constrain((millis() - coverFadeStart) / COVER_FADE_DURATION, 0, 1);
    drawCover(fadeProgress);
    if (fadeProgress >= 1) {
      startExperience();
    }
    return;
  }

  if (sceneState === SceneState.INTRO_CRAWL) {
    drawIntroCrawl();
    if (millis() - introStart >= INTRO_CRAWL_DURATION) {
      finishIntroCrawl();
    }
    return;
  }

  updateSceneState();
  updatePlayer();
  updateCamera();
  updateTieFlyby();
  updateTieAttackers();
  updateTieWaveCycle();
  updateRetreatingTies();
  updateLasers();
  updateExplosions();
  updateEnemyLasers();
  updateStars();
  drawStars();
  drawTravelSaturn();
  drawTravelUranus();
  drawTravelNeptune();
  drawXWing();
  drawLasers();
  drawEnemyLasers();
  drawExplosions();
  drawTieFlyby();
  drawTieAttackers();
  drawRetreatingTies();
  drawGalaxyHaze();
  drawHyperspaceFlash();
  drawHud();
}
// HUMAN-AUTHORED END

function drawSceneBackground() {
  const bg = getSceneBackgroundColor();
  background(bg[0], bg[1], bg[2]);
}

function getSceneBackgroundColor() {
  if (isGalaxyColorTransitionActive()) {
    const visualTheme = getVisualGalaxyTheme();
    return visualTheme.background;
  }

  return getCurrentGalaxyTheme().background;
}

// HUMAN-AUTHORED START (Group 3, May 8, 2026)
// Contribution note: Group-authored narrative, pacing, and visual framing.
// Cover screen and Star Wars-style intro crawl. Text, pacing, and metaphor were
// group-authored; p5.js image/graphics/texture APIs were used as references.
// Date note: this narrative framing was added during the May 8 process stage.
function drawCover(fadeProgress = 0) {
  resetMatrix();
  camera();

  push();
  translate(-width / 2, -height / 2);
  imageMode(CORNER);

  if (coverImage) {
    const imageRatio = coverImage.width / coverImage.height;
    const canvasRatio = width / height;
    let drawWidth;
    let drawHeight;

    if (canvasRatio > imageRatio) {
      drawHeight = height;
      drawWidth = height * imageRatio;
    } else {
      drawWidth = width;
      drawHeight = width / imageRatio;
    }

    const drawX = (width - drawWidth) / 2;
    const drawY = (height - drawHeight) / 2;

    noStroke();
    fill(0);
    rect(0, 0, width, height);
    image(coverImage, drawX, drawY, drawWidth, drawHeight);
  }

  noStroke();
  fill(0, 120);
  rect(0, height - 86, width, 86);
  fill(255, 225);
  textFont('monospace');
  textSize(18);
  textAlign(CENTER, CENTER);
  text('Click to begin', width / 2, height - 43);
  textAlign(LEFT, BASELINE);

  if (fadeProgress > 0) {
    noStroke();
    fill(0, 255 * fadeProgress);
    rect(0, 0, width, height);
  }
  pop();
}

function drawIntroCrawl() {
  resetMatrix();
  camera();
  background(0);

  const elapsed = millis() - introStart;
  const progress = constrain(elapsed / INTRO_CRAWL_SCROLL_DURATION, 0, 1);
  renderIntroTexture(progress);
  const fadeIn = constrain(map(progress, 0, 0.06, 0, 1), 0, 1);
  const holdProgress = constrain((elapsed - INTRO_CRAWL_SCROLL_DURATION) / INTRO_CRAWL_HOLD_DURATION, 0, 1);
  const fadeOut = 1 - easeInOutCubic(holdProgress);
  const alpha = 255 * fadeIn * fadeOut;

  push();
  tint(255, alpha);
  texture(introGraphics);
  noStroke();
  translate(0, height * 0.4, -760);
  rotateX(PI / 2.35);
  plane(min(width * 1.52, 1760), min(width * 2.55, 3000));
  noTint();
  pop();

  push();
  translate(-width / 2, -height / 2);
  fill(255, 210, 48, 160 * fadeIn);
  textAlign(CENTER, BOTTOM);
  textFont('Arial');
  textSize(13);
  text('Click or Space to skip', width / 2, height - 18);
  textAlign(LEFT, BASELINE);
  pop();
}

function renderIntroTexture(progress) {
  introGraphics.clear();
  introGraphics.background(0, 0);
  introGraphics.noStroke();
  introGraphics.fill(255, 210, 48);
  introGraphics.textAlign(CENTER, TOP);
  introGraphics.textFont('Arial');

  const group3Y = getIntroLineY('Group 3');
  const startY = INTRO_TEXTURE_HEIGHT * 0.76;
  const holdY = INTRO_TEXTURE_HEIGHT * 0.5;
  const scrollDistance = group3Y + startY - holdY;
  let y = startY - progress * scrollDistance;

  for (let i = 0; i < INTRO_CRAWL_LINES.length; i++) {
    const line = INTRO_CRAWL_LINES[i];
    const isTitle = i === 0;
    introGraphics.textSize(isTitle ? INTRO_TITLE_SIZE : INTRO_BODY_SIZE);
    introGraphics.textStyle(isTitle ? BOLD : NORMAL);
    introGraphics.text(line, INTRO_TEXTURE_WIDTH / 2, y);
    y += getIntroLineHeight(line);
  }

  introGraphics.textStyle(NORMAL);
  introTextureReady = true;
}

function getIntroLineY(targetLine) {
  let y = 0;

  for (const line of INTRO_CRAWL_LINES) {
    if (line === targetLine) return y;
    y += getIntroLineHeight(line);
  }

  return y;
}

function getIntroLineHeight(line) {
  return line === '' ? INTRO_BLANK_LINE_HEIGHT : INTRO_LINE_HEIGHT;
}
// HUMAN-AUTHORED END

function startExperience() {
  if (sceneState !== SceneState.COVER_FADE) return;

  startIntroCrawl();
  startAudio();
}

function startCoverFade() {
  if (sceneState !== SceneState.COVER) return;

  sceneState = SceneState.COVER_FADE;
  coverFadeStart = millis();
  startAudio();
}

function startIntroCrawl() {
  sceneState = SceneState.INTRO_CRAWL;
  introStart = millis();
}

function finishIntroCrawl() {
  if (sceneState !== SceneState.INTRO_CRAWL) return;

  sceneState = SceneState.TRAVEL;
  prepareTravelGalaxy({ forceNew: false, arrivalMessage: false });
}

// HUMAN-AUTHORED START (Group 3, May 2-May 27, 2026)
// Contribution note: Primarily group-authored visual system; AI helped organize reusable helpers.
// Generative starfield, galaxy layouts, and color themes. The visual goal and
// tuning are our own; AI assisted with structure for reusable layout helpers.
// Date note: starfield travel began on May 2; early galaxy layouts were present
// before May 18, and outcome-driven theme variety was completed by May 27.
function createStar() {
  const star = {
    x: player.pos.x + random(-STAR_FIELD_WIDTH, STAR_FIELD_WIDTH),
    y: player.pos.y + random(-STAR_FIELD_HEIGHT, STAR_FIELD_HEIGHT),
    z: player.pos.z + random(STAR_MIN_Z, STAR_MAX_Z),
    size: random(1, 3.2),
    alpha: random(150, 255)
  };

  assignStarColor(star);
  return star;
}

function resetStar(star) {
  star.x = player.pos.x + random(-STAR_FIELD_WIDTH, STAR_FIELD_WIDTH);
  star.y = player.pos.y + random(-STAR_FIELD_HEIGHT, STAR_FIELD_HEIGHT);
  star.z = player.pos.z + STAR_MIN_Z;
  star.size = random(1, 3.2);
  star.alpha = random(150, 255);
  assignStarColor(star);
}

function resetAllStars() {
  for (const star of stars) {
    resetStar(star);
    star.z = player.pos.z + random(STAR_MIN_Z, STAR_MAX_Z);
  }
}

function loadNewSystem() {
  if (jumpDestination === SceneState.TRAVEL && !travelArrivalPrepared) {
    prepareTravelGalaxyFromBattleResult();
  } else {
    resetAllStars();
  }
  newSystemLoaded = true;
}

function prepareInitialGalaxy() {
  travelGalaxy = createTravelGalaxy(0);
}

function createTravelGalaxy(preferredThemeIndex = null) {
  const currentThemeIndex = travelGalaxy ? travelGalaxy.themeIndex : -1;
  let themeIndex = preferredThemeIndex;

  if (themeIndex === null || themeIndex === undefined) {
    themeIndex = floor(random(GALAXY_THEMES.length));
    if (GALAXY_THEMES.length > 1) {
      while (themeIndex === currentThemeIndex) {
        themeIndex = floor(random(GALAXY_THEMES.length));
      }
    }
  }

  return {
    themeIndex,
    theme: GALAXY_THEMES[themeIndex],
    generation: journeyState.galaxyGeneration,
    starSeed: floor(random(1000000)),
    layout: createGalaxyLayout()
  };
}

function createGalaxyLayout() {
  const saturnSide = random() < 0.5 ? -1 : 1;
  const saturnVerticalSide = random() < 0.35 ? 1 : -1;
  const uranusSide = -saturnSide;
  const uranusVerticalSide = random() < 0.5 ? 1 : -1;
  const neptuneSide = random() < 0.5 ? -1 : 1;
  const neptuneVerticalSide = random() < 0.5 ? 1 : -1;

  return {
    saturn: {
      x: saturnSide * random(TRAVEL_SATURN_SIDE_MIN, TRAVEL_SATURN_SIDE_MAX),
      y: saturnVerticalSide * random(TRAVEL_SATURN_VERTICAL_MIN, TRAVEL_SATURN_VERTICAL_MAX),
      z: random(TRAVEL_SATURN_MIN_Z, TRAVEL_SATURN_MAX_Z),
      scale: random(620, 780),
      yaw: random(TWO_PI),
      pitch: random(-0.16, 0.12),
      roll: random(-0.28, 0.28),
      spin: random(0.00005, 0.00012)
    },
    uranus: {
      x: uranusSide * random(TRAVEL_URANUS_SIDE_MIN, TRAVEL_URANUS_SIDE_MAX),
      y: uranusVerticalSide * random(TRAVEL_URANUS_VERTICAL_MIN, TRAVEL_URANUS_VERTICAL_MAX),
      z: random(TRAVEL_URANUS_MIN_Z, TRAVEL_URANUS_MAX_Z),
      scale: random(0.028, 0.04),
      yaw: random(TWO_PI),
      pitch: random(-0.12, 0.14),
      roll: random(-0.2, 0.2),
      spin: random(0.00004, 0.0001)
    },
    neptune: {
      x: neptuneSide * random(TRAVEL_NEPTUNE_SIDE_MIN, TRAVEL_NEPTUNE_SIDE_MAX),
      y: neptuneVerticalSide * random(TRAVEL_NEPTUNE_VERTICAL_MIN, TRAVEL_NEPTUNE_VERTICAL_MAX),
      z: random(TRAVEL_NEPTUNE_MIN_Z, TRAVEL_NEPTUNE_MAX_Z),
      radius: random(1450, 1900),
      yaw: random(TWO_PI),
      pitch: random(-0.08, 0.08),
      roll: random(-0.12, 0.12),
      spin: random(0.00004, 0.00009)
    }
  };
}

function prepareTravelGalaxy(options = {}) {
  const forceNew = options.forceNew ?? false;
  const arrivalMessage = options.arrivalMessage ?? true;

  if (!travelGalaxy || forceNew) {
    if (forceNew) journeyState.galaxyGeneration += 1;
    travelGalaxy = createTravelGalaxy(forceNew ? null : 0);
  }

  resetAllStars();
  applyTravelGalaxyLayout();

  if (arrivalMessage) {
    journeyState.lastBattleResultStart = millis();
  }
}

function prepareTravelGalaxyFromBattleResult() {
  const destroyed = journeyState.enemiesDestroyedThisBattle;
  const advanced = destroyed > 0;

  journeyState.lastBattleDestroyedCount = destroyed;
  journeyState.lastBattleAdvanced = advanced;

  if (advanced) {
    const enemyLabel = destroyed === 1 ? 'TIE' : 'TIEs';
    journeyState.lastBattleResultMessage = `New galaxy reached: ${destroyed} ${enemyLabel} destroyed`;
    if (pendingTravelGalaxy) {
      journeyState.galaxyGeneration += 1;
      travelGalaxy = pendingTravelGalaxy;
      pendingTravelGalaxy = null;
      prepareTravelGalaxy({ forceNew: false, arrivalMessage: true });
    } else {
      prepareTravelGalaxy({ forceNew: true, arrivalMessage: true });
    }
  } else {
    journeyState.lastBattleResultMessage = 'Back to origin: no enemy destroyed';
    prepareTravelGalaxy({ forceNew: false, arrivalMessage: true });
  }

  journeyState.enemiesDestroyedThisBattle = 0;
  travelArrivalPrepared = true;
}

function assignStarColor(star) {
  const theme = getCurrentGalaxyTheme();
  const paletteRoll = random();
  let sourceColor = theme.starPrimary;

  if (paletteRoll > 0.86) {
    sourceColor = theme.starAccent;
  } else if (paletteRoll > 0.48) {
    sourceColor = theme.starSecondary;
  }

  star.r = constrain(sourceColor[0] + random(-18, 18), 0, 255);
  star.g = constrain(sourceColor[1] + random(-18, 18), 0, 255);
  star.b = constrain(sourceColor[2] + random(-18, 18), 0, 255);
}

function getCurrentGalaxyTheme() {
  return travelGalaxy?.theme || GALAXY_THEMES[0];
}

function getDestinationGalaxyTheme() {
  return pendingTravelGalaxy?.theme || getCurrentGalaxyTheme();
}

function applyTravelGalaxyLayout() {
  if (!travelGalaxy) {
    prepareInitialGalaxy();
  }

  const layout = travelGalaxy.layout;
  generateTravelSaturn(layout.saturn);
  generateTravelUranus(layout.uranus);
  generateTravelNeptune(layout.neptune);
}

function generateTravelSaturn(layout) {
  travelSaturn = {
    pos: createVector(
      player.pos.x + layout.x,
      player.pos.y + layout.y,
      player.pos.z + layout.z
    ),
    scale: layout.scale,
    yaw: layout.yaw,
    pitch: layout.pitch,
    roll: layout.roll,
    spin: layout.spin
  };
}

function generateTravelUranus(layout) {
  travelUranus = {
    pos: createVector(
      player.pos.x + layout.x,
      player.pos.y + layout.y,
      player.pos.z + layout.z
    ),
    scale: layout.scale,
    yaw: layout.yaw,
    pitch: layout.pitch,
    roll: layout.roll,
    spin: layout.spin
  };
}

function generateTravelNeptune(layout) {
  travelNeptune = {
    pos: createVector(
      player.pos.x + layout.x,
      player.pos.y + layout.y,
      player.pos.z + layout.z
    ),
    radius: layout.radius,
    yaw: layout.yaw,
    pitch: layout.pitch,
    roll: layout.roll,
    spin: layout.spin
  };
}
// HUMAN-AUTHORED END

// EXTERNAL API/ASSET START (p5.js WEBGL model/texture/lighting reference, May 8, 2026)
// Planet rendering uses imported local planet models/textures. Positions, scale,
// tint, and lighting are project-specific visual choices.
// Date note: Saturn, Uranus, and Neptune were added with the travel-planet stage.
function drawTravelSaturn() {
  const shouldDrawSaturn = shouldDrawTravelCelestials();
  if (!shouldDrawSaturn || !saturnPlanet || !saturnRings || !travelSaturn) return;
  const theme = getCurrentGalaxyTheme();

  const distanceFromPlayer = dist(
    player.pos.x,
    player.pos.y,
    player.pos.z,
    travelSaturn.pos.x,
    travelSaturn.pos.y,
    travelSaturn.pos.z
  );
  const alpha = constrain(map(distanceFromPlayer, 18000, 5200, 35, 225), 35, 225);

  push();
  beginCelestialLighting();
  translate(travelSaturn.pos.x, travelSaturn.pos.y, travelSaturn.pos.z);
  rotateY(travelSaturn.yaw + frameCount * travelSaturn.spin);
  rotateX(travelSaturn.pitch);
  rotateZ(travelSaturn.roll);
  scale(travelSaturn.scale);
  drawTexturedModel(saturnRings, saturnRingsTexture, colorFromTheme(theme.saturnRingTint, 255), 255);
  drawTexturedModel(saturnPlanet, saturnSurfaceTexture, colorFromTheme(theme.saturnTint, 255), 255);
  endCelestialLighting();
  pop();
}

function drawTravelUranus() {
  const shouldDrawUranus = shouldDrawTravelCelestials();
  if (!shouldDrawUranus || !uranusPlanet || !uranusRing || !travelUranus) return;
  const theme = getCurrentGalaxyTheme();

  push();
  beginCelestialLighting();
  translate(travelUranus.pos.x, travelUranus.pos.y, travelUranus.pos.z);
  rotateY(travelUranus.yaw + frameCount * travelUranus.spin);
  rotateX(travelUranus.pitch);
  rotateZ(travelUranus.roll);
  scale(travelUranus.scale);
  drawTexturedModel(uranusRing, uranusRingTexture, colorFromTheme(theme.uranusRingTint, 105), 105);
  drawTexturedModel(uranusPlanet, uranusSurfaceTexture, colorFromTheme(theme.uranusTint, 255), 255);
  endCelestialLighting();
  pop();
}

function drawTravelNeptune() {
  const shouldDrawNeptune = shouldDrawTravelCelestials();
  if (!shouldDrawNeptune || !neptunePlanet || !neptuneTexture || !travelNeptune) return;
  const theme = getCurrentGalaxyTheme();

  push();
  beginCelestialLighting();
  translate(travelNeptune.pos.x, travelNeptune.pos.y, travelNeptune.pos.z);
  rotateY(travelNeptune.yaw + frameCount * travelNeptune.spin);
  rotateX(travelNeptune.pitch);
  rotateZ(travelNeptune.roll);
  scale(travelNeptune.radius);
  translate(-1.000003, -0.830626, -0.9243695);
  drawTexturedModel(neptunePlanet, neptuneTexture, colorFromTheme(theme.neptuneTint, 255), 255);
  endCelestialLighting();
  pop();
}

function shouldDrawTravelCelestials() {
  if (sceneState === SceneState.TRAVEL) return true;
  if (sceneState === SceneState.JUMP_CHARGE && jumpDestination === SceneState.BATTLE) return true;
  if (sceneState === SceneState.HYPERSPACE && jumpDestination === SceneState.BATTLE && !newSystemLoaded) return true;

  return false;
}

function beginCelestialLighting() {
  const theme = getCurrentGalaxyTheme();
  ambientLight(theme.ambient[0], theme.ambient[1], theme.ambient[2]);
  directionalLight(theme.light[0], theme.light[1], theme.light[2], -0.55, -0.28, -0.78);
}

function beginShipLighting() {
  ambientLight(58, 58, 64);
  directionalLight(255, 245, 225, -0.35, -0.42, -0.82);
  directionalLight(70, 95, 130, 0.65, 0.35, 0.5);
}

function endCelestialLighting() {
  noLights();
}
// EXTERNAL API/ASSET END

// AI-ASSISTED START (ChatGPT/Codex, April 30-May 6, 2026)
// Prompt: "Help me organize p5.js WEBGL spaceship movement with
// smooth chase-camera follow, hyperspace timing, and camera shake when the player is hit."
// Contribution note: AI-assisted structure; group tuned movement, camera, timing, and shake behavior.
// Date note: chase camera began on April 30; hyperspace and hit shake were refined by May 6.
function updatePlayer() {
  let ax = 0;
  let ay = 0;

  if (isControlDown('left')) ax -= PLAYER_ACCEL;
  if (isControlDown('right')) ax += PLAYER_ACCEL;
  if (isControlDown('up')) ay -= PLAYER_ACCEL;
  if (isControlDown('down')) ay += PLAYER_ACCEL;

  if ((ax !== 0 || ay !== 0) && !discoveredControls.movement) {
    markControlDiscovered('movement', 'Movement found');
  }

  player.controlVel.x = (player.controlVel.x + ax) * PLAYER_DAMPING;
  player.controlVel.y = (player.controlVel.y + ay) * PLAYER_DAMPING;
  player.controlVel.x = constrain(player.controlVel.x, -PLAYER_MAX_SIDE_SPEED, PLAYER_MAX_SIDE_SPEED);
  player.controlVel.y = constrain(player.controlVel.y, -PLAYER_MAX_SIDE_SPEED, PLAYER_MAX_SIDE_SPEED);

  const targetRoll = constrain(player.controlVel.x * 0.078, -0.68, 0.68);
  const targetPitch = constrain(player.controlVel.y * 0.046, -0.42, 0.42);
  const targetYaw = constrain(player.controlVel.x * -0.029, -0.48, 0.48);
  player.roll = lerp(player.roll, targetRoll, 0.14);
  player.pitch = lerp(player.pitch, targetPitch, 0.14);
  player.yaw = lerp(player.yaw, targetYaw, 0.12);

  const forward = getShipForwardDirection();
  player.vel = multiplyVector(forward, getForwardSpeed());
  player.pos.add(player.vel);
}

function getForwardSpeed() {
  if (sceneState === SceneState.HYPERSPACE) {
    const arrivalProgress = getHyperspaceArrivalProgress();

    if (arrivalProgress > 0) {
      return lerp(420, PLAYER_FORWARD_SPEED * 1.15, easeOutCubic(arrivalProgress));
    }

    return lerp(PLAYER_FORWARD_SPEED, 420, easeInCubic(getHyperspaceTunnelProgress()));
  }

  if (sceneState === SceneState.BATTLE) {
    return PLAYER_FORWARD_SPEED;
  }

  return PLAYER_FORWARD_SPEED;
}

function updateCamera() {
  const tunnelProgress = sceneState === SceneState.HYPERSPACE ? getHyperspaceTunnelProgress() : 0;
  const arrivalProgress = sceneState === SceneState.HYPERSPACE ? getHyperspaceArrivalProgress() : 0;
  const hyperIntensity = arrivalProgress > 0 ? 1 - easeOutCubic(arrivalProgress) : tunnelProgress;
  const shakeAmount = sceneState === SceneState.HYPERSPACE
    ? sin(millis() * 0.08) * 8 * hyperIntensity
    : 0;
  const hitShakeProgress = constrain((millis() - playerHitShakeStart) / PLAYER_HIT_SHAKE_DURATION, 0, 1);
  const hitShakeAmount = hitShakeProgress < 1
    ? PLAYER_HIT_SHAKE_STRENGTH * pow(1 - hitShakeProgress, 1.35)
    : 0;
  const hitShakeTime = millis() - playerHitShakeStart;
  const hitShakeSeed = playerHitShakeSeed || {
    xFreq: 0.2,
    yFreq: 0.24,
    zFreq: 0.32,
    xPhase: 0,
    yPhase: 1.7,
    zPhase: 3.1
  };
  const hitShakeX = hitShakeAmount > 0
    ? sin(hitShakeTime * hitShakeSeed.xFreq + hitShakeSeed.xPhase) * hitShakeAmount
      + sin(hitShakeTime * hitShakeSeed.xFreq * 2.7 + hitShakeSeed.zPhase) * hitShakeAmount * 0.38
      + random(-hitShakeAmount * 0.78, hitShakeAmount * 0.78)
    : 0;
  const hitShakeY = hitShakeAmount > 0
    ? cos(hitShakeTime * hitShakeSeed.yFreq + hitShakeSeed.yPhase) * hitShakeAmount * 0.9
      + sin(hitShakeTime * hitShakeSeed.yFreq * 3.1 + hitShakeSeed.xPhase) * hitShakeAmount * 0.32
      + random(-hitShakeAmount * 0.72, hitShakeAmount * 0.72)
    : 0;
  const hitShakeZ = hitShakeAmount > 0
    ? sin(hitShakeTime * hitShakeSeed.zFreq + hitShakeSeed.zPhase) * hitShakeAmount * 0.42
      + random(-hitShakeAmount * 0.42, hitShakeAmount * 0.42)
    : 0;
  const cameraPush = sceneState === SceneState.HYPERSPACE ? 420 * hyperIntensity : 0;

  const forward = getShipForwardDirection();
  const cameraBack = multiplyVector(forward, -1280 + cameraPush);
  const targetForward = multiplyVector(forward, 2450);

  const cameraX = player.pos.x + cameraBack.x - player.controlVel.x * 4 + shakeAmount;
  const cameraY = player.pos.y + cameraBack.y - 430 - player.controlVel.y * 2.5 + shakeAmount * 0.55;
  const cameraZ = player.pos.z + cameraBack.z;

  const targetX = player.pos.x + targetForward.x + player.controlVel.x * 12;
  const targetY = player.pos.y + targetForward.y + 190 + player.controlVel.y * 5 - cameraPush * 0.08;
  const targetZ = player.pos.z + targetForward.z;

  const desiredCamera = createVector(cameraX, cameraY, cameraZ);
  const desiredTarget = createVector(targetX, targetY, targetZ);

  if (!cameraState.pos) {
    cameraState.pos = desiredCamera.copy();
    cameraState.target = desiredTarget.copy();
  } else {
    const followLerp = sceneState === SceneState.HYPERSPACE ? 0.34 : CAMERA_FOLLOW_LERP;
    const targetLerp = sceneState === SceneState.HYPERSPACE ? 0.42 : CAMERA_TARGET_LERP;

    cameraState.pos = lerpVectorWithoutForwardLag(
      cameraState.pos,
      desiredCamera,
      followLerp,
      forward
    );
    cameraState.target = lerpVectorWithoutForwardLag(
      cameraState.target,
      desiredTarget,
      targetLerp,
      forward
    );
  }

  camera(
    cameraState.pos.x + hitShakeX,
    cameraState.pos.y + hitShakeY,
    cameraState.pos.z + hitShakeZ,
    cameraState.target.x + hitShakeX * 0.35,
    cameraState.target.y + hitShakeY * 0.35,
    cameraState.target.z + hitShakeZ * 0.35,
    0,
    1,
    0
  );
}

function updateSceneState() {
  if (sceneState === SceneState.JUMP_CHARGE) {
    updateThemeFadeOut();

    if (millis() - jumpChargeStart >= JUMP_CHARGE_DURATION) {
      enterHyperspace();
    }
    return;
  }

  if (sceneState !== SceneState.HYPERSPACE) return;

  if (!newSystemLoaded && getHyperspaceFlashProgress() >= 0.5) {
    loadNewSystem();
  }

  if (millis() - hyperspaceStart >= HYPERSPACE_DURATION) {
    sceneState = jumpDestination;
    if (!newSystemLoaded) {
      loadNewSystem();
    }
    if (sceneState === SceneState.BATTLE) {
      journeyState.enemiesDestroyedThisBattle = 0;
      startTieFlyby();
    } else if (sceneState === SceneState.TRAVEL) {
      if (!travelArrivalPrepared) {
        prepareTravelGalaxyFromBattleResult();
      }
      journeyState.bannerStart = millis();
    }
    retreatingTies.length = 0;
    stopHyperspaceSound();
    restartThemeMusic();
    hyperspaceOriginTheme = null;
    hyperspaceDestinationTheme = null;
  }
}
// AI-ASSISTED END

// AI-ASSISTED START (ChatGPT/Codex, May 6, 2026)
// Prompt: "Help structure a TIE Fighter battle loop in p5.js with
// flyby waves, enemy laser timing, retreat animation, and cleanup for old shots/effects."
// Contribution note: AI-assisted battle-loop organization; group tuned wave timing and behavior.
// Date note: this block corresponds to the TIE encounter and battle-loop process stage.
function updateTieFlyby() {
  if (!tieFlybyActive) return;

  for (const tie of tieFormation) {
    if (!tie.alive) continue;

    const elapsed = millis() - tieFlybyStart - tie.delay;
    if (!tie.soundStarted && elapsed >= 0) {
      tie.soundStarted = true;
      playTieFlybySound();
    }
  }

  const formationDuration = TIE_FLYBY_DURATION + max(0, tieFormation.length - 1) * TIE_FORMATION_DELAY;
  if (millis() - tieFlybyStart >= formationDuration) {
    tieFlybyActive = false;
    stopTieFlybySound();
    scheduleTieAttack();
  }
}

function updateTieWaveCycle() {
  if (sceneState !== SceneState.BATTLE) {
    nextTieWaveStart = 0;
    return;
  }

  if (tieFlybyActive || tieAttackStart > 0) {
    nextTieWaveStart = 0;
    return;
  }

  if (hasAliveTieEnemies()) {
    nextTieWaveStart = 0;
    return;
  }

  if (nextTieWaveStart > 0) {
    if (millis() >= nextTieWaveStart) {
      startTieFlyby();
    }
    return;
  }

  if (tieFormation.length === 0 && tieAttackers.length === 0) return;

  if (nextTieWaveStart === 0) {
    tieAttackers = [];
    tieAttackAnchor = null;
    tieAttackStart = 0;
    nextTieWaveStart = millis() + TIE_NEXT_WAVE_DELAY;
  }
}

function scheduleTieAttack() {
  if (sceneState !== SceneState.BATTLE || tieAttackers.length > 0) return;
  if (getSurvivingFormationCount() === 0) {
    tieAttackStart = 0;
    return;
  }

  tieAttackStart = millis() + TIE_ATTACK_DELAY;
}

function updateTieAttackers() {
  if (sceneState !== SceneState.BATTLE) {
    tieAttackers = [];
    tieAttackAnchor = null;
    return;
  }

  if (tieAttackers.length === 0 && tieAttackStart > 0 && millis() >= tieAttackStart) {
    tieAttackAnchor = player.pos.copy();
    const survivingCount = getSurvivingFormationCount();
    tieAttackers = createTieAttackers(survivingCount);
    tieFormation = [];
    tieAttackStart = 0;
  }

  if (tieAttackAnchor) {
    tieAttackAnchor.x = lerp(tieAttackAnchor.x, player.pos.x, TIE_ATTACK_FOLLOW_LERP_XY);
    tieAttackAnchor.y = lerp(tieAttackAnchor.y, player.pos.y, TIE_ATTACK_FOLLOW_LERP_XY);
    tieAttackAnchor.z = lerp(tieAttackAnchor.z, player.pos.z, TIE_ATTACK_FOLLOW_LERP_Z);
  }

  for (const attacker of tieAttackers) {
    if (!attacker.alive) continue;

    const elapsed = millis() - attacker.startTime;
    const entryProgress = constrain(elapsed / TIE_ATTACK_ENTRY_DURATION, 0, 1);
    const entryEase = easeOutCubic(entryProgress);
    const drift = sin(elapsed * 0.0013 + attacker.phase);
    const anchor = tieAttackAnchor || player.pos;
    const targetX = anchor.x + attacker.baseOffset.x + drift * 160;
    const targetY = anchor.y + attacker.baseOffset.y + cos(elapsed * 0.0011 + attacker.phase) * 90;
    const targetZ = anchor.z + attacker.baseOffset.z + sin(elapsed * 0.0008 + attacker.phase) * 260;
    const entryX = anchor.x + attacker.entryOffset.x;
    const entryY = anchor.y + attacker.entryOffset.y;
    const entryZ = anchor.z + attacker.entryOffset.z;
    attacker.pos.x = lerp(entryX, targetX, entryEase);
    attacker.pos.y = lerp(entryY, targetY, entryEase);
    attacker.pos.z = lerp(entryZ, targetZ, entryEase);

    if (entryProgress >= 1 && millis() >= attacker.nextFireTime) {
      fireEnemyLaser(attacker);
      attacker.nextFireTime = millis() + random(600, 1060);
    }
  }
}

function updateLasers() {
  for (let i = laserShots.length - 1; i >= 0; i--) {
    if (checkLaserHits(laserShots[i]) || millis() - laserShots[i].startTime > LASER_DURATION) {
      laserShots.splice(i, 1);
    }
  }
}

function updateRetreatingTies() {
  for (let i = retreatingTies.length - 1; i >= 0; i--) {
    const tie = retreatingTies[i];
    const age = millis() - tie.startTime;

    if (age > TIE_RETREAT_DURATION) {
      retreatingTies.splice(i, 1);
      continue;
    }

    const progress = constrain(age / TIE_RETREAT_DURATION, 0, 1);
    const blendProgress = constrain(age / TIE_RETREAT_BLEND_DURATION, 0, 1);
    const easedProgress = easeInOutCubic(progress) * easeOutCubic(blendProgress);
    tie.pos = getQuadraticBezierPoint(tie.startPos, tie.controlPos, tie.endPos, easedProgress);

    const sampleProgress = constrain(easedProgress + 0.012, 0, 1);
    const samplePos = getQuadraticBezierPoint(tie.startPos, tie.controlPos, tie.endPos, sampleProgress);
    const tangent = normalizeVector(subtractVector(samplePos, tie.pos));
    const targetHeading = atan2(tangent.x, tangent.z);
    const targetPitch = atan2(tangent.y, sqrt(tangent.x * tangent.x + tangent.z * tangent.z));
    const orientationBlend = easeInOutCubic(blendProgress);
    tie.heading = lerpAngle(tie.startHeading, targetHeading, orientationBlend);
    tie.pitch = lerp(tie.startPitch, targetPitch, orientationBlend);
    tie.roll = lerp(tie.startRoll, tie.baseRoll + sin(progress * PI) * tie.side * 0.18, orientationBlend);
  }
}

function updateExplosions() {
  for (let i = explosions.length - 1; i >= 0; i--) {
    if (millis() - explosions[i].startTime > EXPLOSION_DURATION) {
      explosions.splice(i, 1);
    }
  }
}

function updateEnemyLasers() {
  for (let i = enemyLaserShots.length - 1; i >= 0; i--) {
    if (checkPlayerHit(enemyLaserShots[i]) || millis() - enemyLaserShots[i].startTime > ENEMY_LASER_DURATION) {
      enemyLaserShots.splice(i, 1);
    }
  }
}
// AI-ASSISTED END

// HUMAN-AUTHORED START (Group 3, May 2-May 27, 2026)
// Contribution note: Primarily group-authored visual behavior; AI helped organize transition helpers.
// Star drawing, hyperspace streaks, galaxy color transitions, and haze. The
// appearance was directed by the group; AI assisted with transition organization.
// Date note: visual travel began on May 2, hyperspace visuals were layered in on May 4,
// and galaxy-transition polish continued after the May 18 video presentation.
function updateStars() {
  for (const star of stars) {
    const behindCamera = star.z > player.pos.z + 1400;
    const tooFarSideways = abs(star.x - player.pos.x) > STAR_FIELD_WIDTH * 1.25;
    const tooFarVertically = abs(star.y - player.pos.y) > STAR_FIELD_HEIGHT * 1.25;

    if (behindCamera || tooFarSideways || tooFarVertically) {
      resetStar(star);
    }
  }
}

function drawStars() {
  push();
  const theme = getVisualGalaxyTheme();

  for (const star of stars) {
    const relativeZ = star.z - player.pos.z;
    const depthFade = map(relativeZ, STAR_MIN_Z, STAR_MAX_Z, 80, star.alpha * theme.starAlpha);
    const starColor = tintStarColor(star, theme);

    if (sceneState === SceneState.HYPERSPACE && newSystemLoaded) {
      const revealAlpha = map(getHyperspaceFlashProgress(), 0.5, 1, 60, star.alpha * theme.starAlpha);
      stroke(starColor[0], starColor[1], starColor[2], min(star.alpha, revealAlpha));
      strokeWeight(2.4 * theme.starWeight);
      point(star.x, star.y, star.z);
    } else if (sceneState === SceneState.HYPERSPACE) {
      const tunnelProgress = getHyperspaceTunnelProgress();
      const arrivalProgress = getHyperspaceArrivalProgress();
      const tunnelLength = lerp(120, 1900, easeInCubic(tunnelProgress));
      const streakLength = arrivalProgress > 0
        ? lerp(1900, 180, easeOutCubic(arrivalProgress))
        : tunnelLength;
      stroke(starColor[0], starColor[1], starColor[2], min(255, depthFade + 70));
      strokeWeight(lerp(1.4, 3.5, 1 - arrivalProgress) * theme.starWeight);
      line(star.x, star.y, star.z, star.x, star.y, star.z + streakLength);
    } else {
      stroke(starColor[0], starColor[1], starColor[2], depthFade);
      strokeWeight((sceneState === SceneState.BATTLE ? 2.4 : 2) * theme.starWeight);
      point(star.x, star.y, star.z);
    }
  }

  pop();
}

function tintStarColor(star, theme) {
  const tintColor = theme.starSecondary || theme.starPrimary;
  return [
    constrain(star.r * 0.55 + tintColor[0] * 0.45, 0, 255),
    constrain(star.g * 0.55 + tintColor[1] * 0.45, 0, 255),
    constrain(star.b * 0.55 + tintColor[2] * 0.45, 0, 255)
  ];
}

function getVisualGalaxyTheme() {
  if (!isGalaxyColorTransitionActive()) {
    return getCurrentGalaxyTheme();
  }

  const progress = getGalaxyColorTransitionProgress();
  return {
    ...hyperspaceDestinationTheme,
    background: lerpRgb(hyperspaceOriginTheme.background, hyperspaceDestinationTheme.background, progress),
    starPrimary: lerpRgb(hyperspaceOriginTheme.starPrimary, hyperspaceDestinationTheme.starPrimary, progress),
    starSecondary: lerpRgb(hyperspaceOriginTheme.starSecondary, hyperspaceDestinationTheme.starSecondary, progress),
    starAccent: lerpRgb(hyperspaceOriginTheme.starAccent, hyperspaceDestinationTheme.starAccent, progress),
    starAlpha: lerp(hyperspaceOriginTheme.starAlpha, hyperspaceDestinationTheme.starAlpha, progress),
    starWeight: lerp(hyperspaceOriginTheme.starWeight, hyperspaceDestinationTheme.starWeight, progress),
    hazeAlpha: lerp(hyperspaceOriginTheme.hazeAlpha, hyperspaceDestinationTheme.hazeAlpha, progress),
    haze: lerpRgb(hyperspaceOriginTheme.haze, hyperspaceDestinationTheme.haze, progress)
  };
}

function isGalaxyColorTransitionActive() {
  return (sceneState === SceneState.JUMP_CHARGE || sceneState === SceneState.HYPERSPACE)
    && hyperspaceOriginTheme
    && hyperspaceDestinationTheme;
}

function getGalaxyColorTransitionProgress() {
  if (sceneState === SceneState.JUMP_CHARGE) {
    return easeInCubic(getJumpChargeProgress()) * 0.32;
  }

  if (sceneState === SceneState.HYPERSPACE) {
    return easeInOutCubic(getHyperspaceProgress());
  }

  return 0;
}

function drawGalaxyHaze() {
  const theme = getVisualGalaxyTheme();
  if (!theme.hazeAlpha) return;
  if (sceneState === SceneState.COVER || sceneState === SceneState.COVER_FADE || sceneState === SceneState.INTRO_CRAWL) return;

  const alpha = sceneState === SceneState.HYPERSPACE
    ? theme.hazeAlpha * (1 - getHyperspaceFlashPeak(getHyperspaceFlashProgress()))
    : theme.hazeAlpha;

  if (alpha <= 0) return;

  resetMatrix();
  camera();

  push();
  translate(-width / 2, -height / 2);
  noStroke();
  fill(theme.haze[0], theme.haze[1], theme.haze[2], alpha);
  rect(0, 0, width, height);
  pop();
}

function getHyperspaceProgress() {
  if (sceneState !== SceneState.HYPERSPACE) return 0;
  return constrain((millis() - hyperspaceStart) / HYPERSPACE_DURATION, 0, 1);
}

function getJumpChargeProgress() {
  if (sceneState !== SceneState.JUMP_CHARGE) return 0;
  return constrain((millis() - jumpChargeStart) / JUMP_CHARGE_DURATION, 0, 1);
}

function getHyperspaceTunnelProgress() {
  if (sceneState !== SceneState.HYPERSPACE) return 0;
  return constrain((millis() - hyperspaceStart) / HYPERSPACE_TUNNEL_DURATION, 0, 1);
}

function getHyperspaceArrivalProgress() {
  if (sceneState !== SceneState.HYPERSPACE) return 0;
  const arrivalElapsed = millis() - hyperspaceStart - HYPERSPACE_TUNNEL_DURATION;
  return constrain(arrivalElapsed / (HYPERSPACE_DURATION - HYPERSPACE_TUNNEL_DURATION), 0, 1);
}

function easeInCubic(value) {
  return value * value * value;
}

function easeOutCubic(value) {
  return 1 - pow(1 - value, 3);
}

function easeInOutCubic(value) {
  if (value < 0.5) {
    return 4 * value * value * value;
  }

  return 1 - pow(-2 * value + 2, 3) / 2;
}
// HUMAN-AUTHORED END

// AI-ASSISTED START (ChatGPT/Codex, May 4-May 27, 2026)
// Prompt: "Help connect travel, hyperspace, and battle states so
// pressing jump changes scenes, battle enemies retreat, and the next galaxy depends on battle results."
// Contribution note: AI-assisted state-flow organization; group tested and selected the final journey logic.
// Date note: travel/hyperspace states began on May 4; early battle-result direction
// was prototyped before May 18, and final outcome flow was completed by May 27.
function triggerHyperspace() {
  if (sceneState === SceneState.COVER) return;
  if (sceneState === SceneState.JUMP_CHARGE || sceneState === SceneState.HYPERSPACE) return;

  pendingTravelGalaxy = null;
  hyperspaceOriginTheme = getCurrentGalaxyTheme();
  if (sceneState === SceneState.BATTLE) {
    if (journeyState.enemiesDestroyedThisBattle > 0) {
      pendingTravelGalaxy = createTravelGalaxy(null);
    }
    convertAliveTiesToRetreat();
  }
  jumpDestination = sceneState === SceneState.TRAVEL ? SceneState.BATTLE : SceneState.TRAVEL;
  hyperspaceDestinationTheme = jumpDestination === SceneState.TRAVEL
    ? getDestinationGalaxyTheme()
    : hyperspaceOriginTheme;
  travelArrivalPrepared = false;
  sceneState = SceneState.JUMP_CHARGE;
  jumpChargeStart = millis();
  if (themeLoaded && themeSound) {
    themeSound.setVolume(THEME_VOLUME);
  }
  updateThemeFadeOut();
}

function enterHyperspace() {
  if (retreatingTies.length === 0) {
    convertAliveTiesToRetreat();
  }
  sceneState = SceneState.HYPERSPACE;
  hyperspaceStart = millis();
  newSystemLoaded = false;
  tieFlybyActive = false;
  tieFlybyPath = null;
  tieFormation = [];
  tieAttackers = [];
  tieAttackStart = 0;
  nextTieWaveStart = 0;
  enemyLaserShots.length = 0;
  tieAttackAnchor = null;
  stopTieFlybySound();
  pauseThemeMusic();
  playHyperspaceSound();
}

function startTieFlyby() {
  tieFlybyActive = true;
  tieFlybyStart = millis();
  tieFlybyPath = createTieFlybyPath();
  tieFormation = createTieFormation();
  tieAttackers = [];
  tieAttackStart = 0;
  tieAttackAnchor = null;
  nextTieWaveStart = 0;
}

function convertAliveTiesToRetreat() {
  retreatingTies.length = 0;

  if (tieFlybyActive && tieFormation.length > 0) {
    for (const tie of tieFormation) {
      if (!tie.alive) continue;

      const pos = getFormationTieWorldPosition(tie);
      if (pos) {
        const heading = getFormationTieHeading(tie);
        retreatingTies.push(createRetreatingTie(pos, tie.scale, heading, 0.04 + tie.pitch, tie.roll));
      }
    }
  }

  for (const attacker of tieAttackers) {
    if (!attacker.alive) continue;

    const toPlayer = subtractVector(player.pos, attacker.pos);
    const heading = atan2(toPlayer.x, toPlayer.z) + TIE_HEADING_OFFSET;
    const roll = sin(millis() * 0.0014 + attacker.phase) * 0.08;
    retreatingTies.push(createRetreatingTie(attacker.pos.copy(), attacker.scale, heading, 0.02, roll));
  }
}

function createRetreatingTie(pos, scaleValue, startHeading, startPitch, startRoll) {
  const forward = getShipForwardDirection();
  const right = normalizeVector(createVector(forward.z, 0, -forward.x));
  const up = createVector(0, 1, 0);
  const sideAmount = dotVector(subtractVector(pos, player.pos), right);
  const side = sideAmount < 0 ? -1 : 1;
  const playerAhead = addVector(player.pos, multiplyVector(forward, random(1300, 2100)));
  const controlPos = addVector(
    addVector(
      playerAhead,
      multiplyVector(right, side * random(1000, 1650))
    ),
    multiplyVector(up, random(-420, 420))
  );
  const endPos = addVector(
    addVector(
      player.pos,
      multiplyVector(forward, -random(1600, 2800))
    ),
    addVector(
      multiplyVector(right, side * random(3200, 5200)),
      multiplyVector(up, random(-900, 900))
    )
  );
  const startTangent = normalizeVector(subtractVector(controlPos, pos));

  return {
    startPos: pos.copy(),
    controlPos,
    endPos,
    pos: pos.copy(),
    side,
    startHeading: startHeading ?? atan2(startTangent.x, startTangent.z),
    startPitch: startPitch ?? 0,
    startRoll: startRoll ?? 0,
    heading: startHeading ?? atan2(startTangent.x, startTangent.z),
    baseRoll: side * random(0.08, 0.16),
    roll: startRoll ?? side * random(0.08, 0.16),
    pitch: startPitch ?? atan2(startTangent.y, sqrt(startTangent.x * startTangent.x + startTangent.z * startTangent.z)),
    scale: scaleValue || random(2.75, 3.15),
    startTime: millis()
  };
}
// AI-ASSISTED END

// HUMAN-AUTHORED START (Group 3, April 28-May 6, 2026)
// Contribution note: Group-authored composition and visual tuning; AI helped with organization.
// Visible X-wing, lasers, TIE Fighters, and explosion drawing. Composition,
// colors, model scale, and screenshot-ready visual tuning were group decisions.
// Date note: model drawing started on April 28 and battle visuals were integrated by May 6.
function drawXWing() {
  push();
  translate(player.pos.x, player.pos.y, player.pos.z);
  rotateZ(player.roll);
  rotateX(0.18 + player.pitch);
  rotateY(PI + player.yaw);
  scale(3.15);
  drawWireModel(xwing);
  pop();
}

function drawLasers() {
  for (const shot of laserShots) {
    const age = millis() - shot.startTime;
    const progress = constrain(age / LASER_DURATION, 0, 1);
    const travel = LASER_SPEED * (age / 1000);
    const alpha = 255 * (1 - progress);
    const start = addVector(shot.origin, multiplyVector(shot.direction, travel));
    const end = addVector(start, multiplyVector(shot.direction, shot.length));

    push();
    strokeWeight(7);
    stroke(255, 132, 18, alpha);
    line(start.x, start.y, start.z, end.x, end.y, end.z);
    strokeWeight(2.6);
    stroke(255, 218, 128, alpha);
    line(start.x, start.y, start.z, end.x, end.y, end.z);
    pop();
  }
}

function drawEnemyLasers() {
  for (const shot of enemyLaserShots) {
    const age = millis() - shot.startTime;
    const progress = constrain(age / ENEMY_LASER_DURATION, 0, 1);
    const travel = ENEMY_LASER_SPEED * (age / 1000);
    const alpha = 235 * (1 - progress);
    const start = addVector(shot.origin, multiplyVector(shot.direction, travel));
    const end = addVector(start, multiplyVector(shot.direction, shot.length));

    push();
    strokeWeight(11);
    stroke(72, 255, 64, alpha);
    line(start.x, start.y, start.z, end.x, end.y, end.z);
    strokeWeight(4.2);
    stroke(210, 255, 190, alpha);
    line(start.x, start.y, start.z, end.x, end.y, end.z);
    pop();
  }
}

function drawExplosions() {
  for (const explosion of explosions) {
    const age = millis() - explosion.startTime;
    const progress = constrain(age / EXPLOSION_DURATION, 0, 1);
    const flashProgress = constrain(progress / 0.16, 0, 1);
    const flashAlpha = 210 * (1 - easeInCubic(flashProgress));

    push();
    translate(explosion.pos.x, explosion.pos.y, explosion.pos.z);

    if (flashAlpha > 1) {
      noStroke();
      fill(255, 248, 220, flashAlpha);
      sphere(lerp(70, 170, easeOutCubic(flashProgress)), 10, 8);
    }

    for (const cloud of explosion.clouds) {
      const cloudAge = max(0, age - cloud.delay);
      const cloudProgress = constrain(cloudAge / cloud.duration, 0, 1);
      if (cloudAge <= 0 || cloudProgress >= 1) continue;

      const grow = easeOutCubic(cloudProgress);
      const drift = multiplyVector(cloud.vel, cloudAge / 1000);
      const offset = addVector(cloud.offset, drift);
      const alpha = cloud.alpha * (1 - easeInCubic(cloudProgress));
      const pulse = 1 + sin(age * 0.011 + cloud.phase) * 0.08;

      push();
      translate(offset.x, offset.y, offset.z);
      rotateX(cloud.rotX + cloudProgress * cloud.spinX);
      rotateY(cloud.rotY + cloudProgress * cloud.spinY);
      rotateZ(cloud.rotZ + cloudProgress * cloud.spinZ);
      scale(
        cloud.scaleX * lerp(0.68, 1.38, grow) * pulse,
        cloud.scaleY * lerp(0.62, 1.3, grow),
        cloud.scaleZ * lerp(0.72, 1.46, grow)
      );
      noStroke();
      fill(cloud.edgeR, cloud.edgeG, cloud.edgeB, alpha * 0.46);
      sphere(cloud.size * 1.08, 9, 7);
      fill(cloud.coreR, cloud.coreG, cloud.coreB, alpha * 0.82);
      sphere(cloud.size * 0.78, 8, 6);
      fill(cloud.r, cloud.g, cloud.b, alpha);
      sphere(cloud.size * 0.52, 7, 5);
      pop();
    }

    noFill();
    for (const ring of explosion.rings) {
      const ringProgress = constrain((age - ring.delay) / ring.duration, 0, 1);
      if (ringProgress <= 0 || ringProgress >= 1) continue;

      const ringAlpha = ring.alpha * (1 - ringProgress);
      const ringRadius = lerp(ring.startRadius, ring.endRadius, easeOutCubic(ringProgress));
      push();
      rotateX(ring.rotX);
      rotateY(ring.rotY);
      rotateZ(ring.rotZ);
      stroke(255, 168, 42, ringAlpha);
      strokeWeight(ring.weight * (1 - ringProgress) + 1);
      ellipse(0, 0, ringRadius, ringRadius * ring.squeeze);
      pop();
    }

    for (const particle of explosion.particles) {
      const particleAge = max(0, age - particle.delay);
      const particleProgress = constrain(particleAge / particle.duration, 0, 1);
      if (particleAge <= 0 || particleProgress >= 1) continue;

      const time = particleAge / 1000;
      const travel = time * (1 - particle.drag * particleProgress);
      const pos = multiplyVector(particle.vel, travel);
      const alpha = particle.alpha * (1 - particleProgress);

      push();
      translate(pos.x, pos.y, pos.z);

      if (particle.kind === 'smoke') {
        noStroke();
        fill(particle.r, particle.g, particle.b, alpha);
        sphere(lerp(particle.size, particle.size * 2.8, particleProgress), 8, 6);
      } else {
        const tail = multiplyVector(particle.dir, -particle.length * (1 - particleProgress));
        strokeWeight(particle.weight * (1 - particleProgress) + 0.8);
        stroke(particle.r, particle.g, particle.b, alpha);
        line(0, 0, 0, tail.x, tail.y, tail.z);
      }

      pop();
    }
    pop();
  }
}

function drawTieFlyby() {
  if (!tieFlybyActive || !tieFighter || !tieFlybyPath || tieFormation.length === 0) return;

  for (const tie of tieFormation) {
    drawFormationTie(tie);
  }
}

function drawTieAttackers() {
  if (sceneState !== SceneState.BATTLE || tieAttackers.length === 0) return;

  for (const attacker of tieAttackers) {
    if (!attacker.alive) continue;

    const toPlayer = subtractVector(player.pos, attacker.pos);
    const heading = atan2(toPlayer.x, toPlayer.z);

    push();
    translate(attacker.pos.x, attacker.pos.y, attacker.pos.z);
    rotateY(heading + TIE_HEADING_OFFSET);
    rotateX(0.02);
    rotateZ(sin(millis() * 0.0014 + attacker.phase) * 0.08);
    scale(attacker.scale);
    drawWireModel(tieFighter, 2.2, 255);
    pop();
  }
}

function drawRetreatingTies() {
  if (!tieFighter || retreatingTies.length === 0) return;

  for (const tie of retreatingTies) {
    const progress = constrain((millis() - tie.startTime) / TIE_RETREAT_DURATION, 0, 1);
    const alpha = 255 * pow(1 - progress, 1.4);
    if (alpha <= 1) continue;

    push();
    translate(tie.pos.x, tie.pos.y, tie.pos.z);
    rotateY(tie.heading + TIE_HEADING_OFFSET);
    rotateX(tie.pitch);
    rotateZ(tie.roll);
    scale(tie.scale);
    drawWireModel(tieFighter, 2.2, alpha);
    pop();
  }
}

function drawFormationTie(tie) {
  if (!tie.alive) return;

  const elapsed = millis() - tieFlybyStart - tie.delay;
  if (elapsed < 0 || elapsed > TIE_FLYBY_DURATION) return;

  const progress = constrain(elapsed / TIE_FLYBY_DURATION, 0, 1);
  const fadeIn = constrain(map(progress, 0, 0.16, 0, 1), 0, 1);
  const fadeOut = constrain(map(progress, 0.86, 1, 1, 0), 0, 1);
  const fadeAlpha = 255 * min(fadeIn, fadeOut) * tie.alpha;
  const flybyPos = getTieFlybyPosition(progress, tie.offset);
  const sampleProgress = progress < 0.99 ? progress + 0.01 : progress - 0.01;
  const sampleFlybyPos = getTieFlybyPosition(sampleProgress, tie.offset);
  const headingX = progress < 0.99 ? sampleFlybyPos.x - flybyPos.x : flybyPos.x - sampleFlybyPos.x;
  const headingZ = progress < 0.99 ? sampleFlybyPos.z - flybyPos.z : flybyPos.z - sampleFlybyPos.z;
  const flybyHeading = atan2(headingX, headingZ);

  push();
  translate(player.pos.x + flybyPos.x, player.pos.y + flybyPos.y, player.pos.z + flybyPos.z);
  rotateY(flybyHeading + TIE_HEADING_OFFSET);
  rotateX(0.04 + tie.pitch);
  rotateZ(tie.roll + lerp(-0.12, 0.12, progress));
  scale(tie.scale);
  drawWireModel(tieFighter, 2.2, fadeAlpha);
  pop();
}
// HUMAN-AUTHORED END

// AI-ASSISTED START (ChatGPT/Codex, May 6, 2026)
// Prompt: "Help implement TIE Fighter Bezier flyby paths, attack
// formation positions, point-to-segment laser collision, and destroy/explosion logic."
// Contribution note: AI-assisted geometry and collision structure; group selected final timing/radius values.
// Date note: this block was part of the May 6 battle interaction pass.
function getTieFlybyPosition(progress, offset = { x: 0, y: 0, z: 0 }) {
  const easedProgress = easeInOutCubic(progress);
  const path = tieFlybyPath || createTieFlybyPath();
  const oneMinusT = 1 - easedProgress;

  return {
    x: oneMinusT * oneMinusT * oneMinusT * path.start.x
      + 3 * oneMinusT * oneMinusT * easedProgress * path.controlA.x
      + 3 * oneMinusT * easedProgress * easedProgress * path.controlB.x
      + easedProgress * easedProgress * easedProgress * path.end.x
      + offset.x,
    y: oneMinusT * oneMinusT * oneMinusT * path.start.y
      + 3 * oneMinusT * oneMinusT * easedProgress * path.controlA.y
      + 3 * oneMinusT * easedProgress * easedProgress * path.controlB.y
      + easedProgress * easedProgress * easedProgress * path.end.y
      + offset.y,
    z: oneMinusT * oneMinusT * oneMinusT * path.start.z
      + 3 * oneMinusT * oneMinusT * easedProgress * path.controlA.z
      + 3 * oneMinusT * easedProgress * easedProgress * path.controlB.z
      + easedProgress * easedProgress * easedProgress * path.end.z
      + offset.z
  };
}

function getFormationTieHeading(tie) {
  const elapsed = millis() - tieFlybyStart - tie.delay;
  const progress = constrain(elapsed / TIE_FLYBY_DURATION, 0, 1);
  const flybyPos = getTieFlybyPosition(progress, tie.offset);
  const sampleProgress = progress < 0.99 ? progress + 0.01 : progress - 0.01;
  const sampleFlybyPos = getTieFlybyPosition(sampleProgress, tie.offset);
  const headingX = progress < 0.99 ? sampleFlybyPos.x - flybyPos.x : flybyPos.x - sampleFlybyPos.x;
  const headingZ = progress < 0.99 ? sampleFlybyPos.z - flybyPos.z : flybyPos.z - sampleFlybyPos.z;

  return atan2(headingX, headingZ) + TIE_HEADING_OFFSET;
}

function createTieFormation() {
  const count = floor(random(5, 9));
  const formation = [];
  const spacing = random(360, 520);

  for (let i = 0; i < count; i++) {
    const row = floor(i / 2) + 1;
    const side = i % 2 === 0 ? -1 : 1;
    const isLeader = i === 0;

    formation.push({
      delay: isLeader ? 0 : i * TIE_FORMATION_DELAY + random(-80, 90),
      offset: {
        x: isLeader ? 0 : side * spacing * row + random(-70, 70),
        y: isLeader ? 0 : row * 120 + random(-80, 80),
        z: isLeader ? 0 : row * -260 + random(-120, 120)
      },
      roll: random(-0.12, 0.12),
      pitch: random(-0.035, 0.035),
      scale: random(2.65, 3.05),
      alpha: random(0.82, 1),
      alive: true,
      soundStarted: false
    });
  }

  return formation;
}

function createTieFlybyPath() {
  const direction = random() < 0.5 ? 1 : -1;
  const startSideDistance = random(22000, 28000);
  const endSideDistance = random(6800, 9000);
  const controlAX = -direction * random(5200, 7600);
  const controlBX = -direction * random(1200, 2600);

  return {
    start: {
      x: direction * startSideDistance,
      y: random(-1900, -1250),
      z: random(-16000, -12800)
    },
    controlA: {
      x: controlAX,
      y: random(-260, 120),
      z: random(-7600, -5200)
    },
    controlB: {
      x: controlBX,
      y: random(-620, -160),
      z: random(-1600, 600)
    },
    end: {
      x: -direction * endSideDistance,
      y: random(-620, -180),
      z: random(1600, 3200)
    }
  };
}

function createTieAttackers(count = 3) {
  const attackerCount = max(0, count);
  if (attackerCount === 0) return [];

  const spacing = 780;
  const slots = [];
  const centerOffset = (attackerCount - 1) / 2;

  for (let i = 0; i < attackerCount; i++) {
    slots.push((i - centerOffset) * spacing + random(-90, 90));
  }

  return slots.map((slotX, index) => {
    const side = slotX < 0 ? -1 : slotX > 0 ? 1 : random([-1, 1]);
    const baseOffset = createVector(slotX + random(-180, 180), random(-520, -140), random(-6800, -5200));
    const entryOffset = createVector(side * random(6200, 8200), random(-980, -560), random(-9400, -7800));
    const anchor = tieAttackAnchor || player.pos;

    return {
      baseOffset,
      entryOffset,
      pos: addVector(anchor, entryOffset),
      startTime: millis(),
      nextFireTime: millis() + TIE_ATTACK_ENTRY_DURATION + random(400, 1000) + index * 180,
      phase: random(TWO_PI),
      scale: random(2.75, 3.15),
      alive: true
    };
  });
}

function getSurvivingFormationCount() {
  if (tieFormation.length === 0) return 3;

  return tieFormation.filter((tie) => tie.alive).length;
}

function hasAliveTieEnemies() {
  return tieFormation.some((tie) => tie.alive) || tieAttackers.some((attacker) => attacker.alive);
}

function fireEnemyLaser(attacker) {
  const origin = attacker.pos.copy();
  const targetAnchor = tieAttackAnchor || player.pos;
  const target = createVector(
    targetAnchor.x + random(-420, 420),
    targetAnchor.y + random(-260, 260),
    player.pos.z + 160
  );
  const direction = normalizeVector(subtractVector(target, origin));

  enemyLaserShots.push({
    origin,
    direction,
    length: random(320, 500),
    startTime: millis()
  });

  playTieBlasterSound();
}

function checkPlayerHit(shot) {
  if (sceneState !== SceneState.BATTLE) return false;

  const age = millis() - shot.startTime;
  const travel = ENEMY_LASER_SPEED * (age / 1000);
  const segmentStart = addVector(shot.origin, multiplyVector(shot.direction, travel));
  const segmentEnd = addVector(segmentStart, multiplyVector(shot.direction, shot.length));
  const distanceToPlayer = distancePointToSegment(player.pos, segmentStart, segmentEnd);

  if (distanceToPlayer > PLAYER_HIT_RADIUS) return false;

  triggerPlayerHit();
  return true;
}

function triggerPlayerHit() {
  playerHitShakeStart = millis();
  playerHitShakeSeed = {
    xFreq: random(0.16, 0.31),
    yFreq: random(0.19, 0.36),
    zFreq: random(0.24, 0.43),
    xPhase: random(TWO_PI),
    yPhase: random(TWO_PI),
    zPhase: random(TWO_PI)
  };
  playPlayerHitSound();
}

function checkLaserHits(shot) {
  if (sceneState !== SceneState.BATTLE) return false;

  const age = millis() - shot.startTime;
  const travel = LASER_SPEED * (age / 1000);
  const segmentStart = addVector(shot.origin, multiplyVector(shot.direction, travel));
  const segmentEnd = addVector(segmentStart, multiplyVector(shot.direction, shot.length));

  if (tieFlybyActive && tieFormation.length > 0) {
    for (const tie of tieFormation) {
      if (!tie.alive) continue;

      const tiePos = getFormationTieWorldPosition(tie);
      if (!tiePos) continue;

      const distanceToLaser = distancePointToSegment(tiePos, segmentStart, segmentEnd);
      if (distanceToLaser <= TIE_HIT_RADIUS) {
        destroyFormationTie(tie, tiePos);
        return true;
      }
    }
  }

  for (const attacker of tieAttackers) {
    if (!attacker.alive) continue;

    const distanceToLaser = distancePointToSegment(attacker.pos, segmentStart, segmentEnd);
    if (distanceToLaser <= TIE_HIT_RADIUS) {
      destroyTieAttacker(attacker);
      return true;
    }
  }

  return false;
}

function getFormationTieWorldPosition(tie) {
  const elapsed = millis() - tieFlybyStart - tie.delay;
  if (elapsed < 0 || elapsed > TIE_FLYBY_DURATION) return null;

  const progress = constrain(elapsed / TIE_FLYBY_DURATION, 0, 1);
  const flybyPos = getTieFlybyPosition(progress, tie.offset);

  return createVector(
    player.pos.x + flybyPos.x,
    player.pos.y + flybyPos.y,
    player.pos.z + flybyPos.z
  );
}

function destroyFormationTie(tie, pos) {
  tie.alive = false;
  recordTieDestroyed();
  createExplosion(pos);
  playTieExplosionSound();
}

function destroyTieAttacker(attacker) {
  attacker.alive = false;
  recordTieDestroyed();
  createExplosion(attacker.pos);
  playTieExplosionSound();
}

function recordTieDestroyed() {
  if (sceneState === SceneState.BATTLE) {
    journeyState.enemiesDestroyedThisBattle += 1;
  }
}
// AI-ASSISTED END

// AI-ASSISTED START (ChatGPT/Codex, May 6, 2026)
// Prompt: "Help create a layered spaceship explosion in p5.js WEBGL
// using sparks, smoke particles, expanding cloud spheres, and shockwave rings."
// Contribution note: AI-assisted particle-system structure; group tuned colors, counts, and timing.
// Date note: explosion feedback was added with the May 6 battle-impact stage.
function createExplosion(pos) {
  const particles = [];

  for (let i = 0; i < 58; i++) {
    const vel = random3DVector(random(720, 2400));
    const dir = normalizeVector(vel);
    particles.push({
      kind: 'spark',
      vel,
      dir,
      delay: random(0, 120),
      duration: random(560, 1050),
      drag: random(0.08, 0.24),
      length: random(110, 340),
      weight: random(3, 8),
      alpha: random(180, 255),
      r: random(240, 255),
      g: random(130, 230),
      b: random(20, 70)
    });
  }

  for (let i = 0; i < 26; i++) {
    const vel = random3DVector(random(360, 1150));
    const dir = normalizeVector(vel);
    particles.push({
      kind: 'debris',
      vel,
      dir,
      delay: random(80, 210),
      duration: random(820, 1350),
      drag: random(0.04, 0.18),
      length: random(70, 190),
      weight: random(2.5, 5.5),
      alpha: random(150, 235),
      r: random(210, 255),
      g: random(95, 165),
      b: random(20, 60)
    });
  }

  for (let i = 0; i < 18; i++) {
    particles.push({
      kind: 'smoke',
      vel: random3DVector(random(190, 640)),
      delay: random(120, 340),
      duration: random(2400, 3900),
      drag: random(0.26, 0.48),
      size: random(60, 150),
      alpha: random(64, 118),
      r: random(55, 95),
      g: random(42, 58),
      b: random(34, 42)
    });
  }

  explosions.push({
    pos: pos.copy(),
    clouds: createExplosionClouds(),
    particles,
    rings: createExplosionRings(),
    startTime: millis()
  });
}

function createExplosionClouds() {
  const clouds = [];
  const palette = [
    { r: 255, g: 236, b: 218, alpha: 180 },
    { r: 255, g: 196, b: 92, alpha: 160 },
    { r: 255, g: 96, b: 22, alpha: 145 },
    { r: 158, g: 122, b: 108, alpha: 116 },
    { r: 86, g: 70, b: 66, alpha: 84 }
  ];

  for (let i = 0; i < 42; i++) {
    const dir = random3DVector(1);
    const distance = random(40, 460) * (random() < 0.66 ? 1 : 1.35);
    const color = random(palette);
    const warmSide = random() < 0.58;
    const isDust = color.r < 170 || (!warmSide && random() < 0.55);
    const cloudSpeed = isDust ? random(32, 135) : random(70, 260);
    const alphaBoost = isDust ? random(1.18, 1.42) : random(0.68, 1.05);

    clouds.push({
      offset: multiplyVector(dir, distance),
      vel: multiplyVector(dir, cloudSpeed),
      delay: isDust ? random(120, 520) : random(0, 260),
      duration: isDust ? random(2500, 3900) : random(850, 1700),
      size: random(58, warmSide ? 190 : 250),
      scaleX: random(0.65, 1.85),
      scaleY: random(0.55, 1.45),
      scaleZ: random(0.7, 1.9),
      rotX: random(TWO_PI),
      rotY: random(TWO_PI),
      rotZ: random(TWO_PI),
      spinX: random(-0.7, 0.7),
      spinY: random(-0.9, 0.9),
      spinZ: random(-0.8, 0.8),
      phase: random(TWO_PI),
      alpha: min(180, color.alpha * alphaBoost),
      edgeR: min(255, color.r + random(26, 58)),
      edgeG: min(255, color.g + random(28, 64)),
      edgeB: min(255, color.b + random(30, 72)),
      coreR: max(0, color.r - random(16, 34)),
      coreG: max(0, color.g - random(18, 42)),
      coreB: max(0, color.b - random(16, 34)),
      r: color.r + random(-10, 10),
      g: color.g + random(-12, 12),
      b: color.b + random(-10, 10)
    });
  }

  return clouds;
}

function createExplosionRings() {
  const rings = [];

  for (let i = 0; i < 2; i++) {
    rings.push({
      delay: i * 70,
      duration: random(620, 980),
      startRadius: random(140, 240),
      endRadius: random(980, 1650),
      squeeze: random(0.42, 0.74),
      weight: random(4, 8),
      alpha: random(45, 88),
      rotX: random(TWO_PI),
      rotY: random(TWO_PI),
      rotZ: random(TWO_PI)
    });
  }

  return rings;
}
// AI-ASSISTED END

// EXTERNAL API/ASSET START (p5.js WEBGL model(), texture(), shader() references, April 28-May 8, 2026)
// Drawing helpers for imported models and textures. Helper structure is project
// code; API usage follows p5.js WEBGL documentation.
// Date note: helper functions evolved from the first model prototype through the planet pass.
function drawWireModel(modelAsset, wireWeight = 1, wireAlpha = 255) {
  shader(blackShader);
  blackShader.setUniform('uFillColor', getShipFillColor());
  noStroke();
  model(modelAsset);
  resetShader();

  noFill();
  stroke(255, wireAlpha);
  strokeWeight(wireWeight);
  model(modelAsset);
}

function getShipFillColor() {
  const theme = getVisualGalaxyTheme();
  const bg = theme.background || [0, 0, 0];
  const haze = theme.haze || [0, 0, 0];
  const influence = sceneState === SceneState.TRAVEL || sceneState === SceneState.HYPERSPACE ? 0.18 : 0.1;
  const baseLift = 0.006;

  return [
    constrain(baseLift + ((bg[0] * 0.65 + haze[0] * 0.35) / 255) * influence, 0, 0.09),
    constrain(baseLift + ((bg[1] * 0.65 + haze[1] * 0.35) / 255) * influence, 0, 0.09),
    constrain(baseLift + ((bg[2] * 0.65 + haze[2] * 0.35) / 255) * influence, 0, 0.09)
  ];
}

function drawTintedWireModel(modelAsset, fillColor, wireWeight = 1, wireColor = color(255)) {
  noStroke();
  fill(fillColor);
  model(modelAsset);

  noFill();
  stroke(wireColor);
  strokeWeight(wireWeight);
  model(modelAsset);
}

function drawTexturedModel(modelAsset, textureImage, fallbackFillColor, alpha = 255) {
  noStroke();
  if (textureImage) {
    tint(red(fallbackFillColor), green(fallbackFillColor), blue(fallbackFillColor), alpha);
    textureMode(NORMAL);
    texture(textureImage);
  } else {
    fill(fallbackFillColor);
  }
  model(modelAsset);
  noTint();
}

function colorFromTheme(rgb, alpha = 255) {
  return color(rgb[0], rgb[1], rgb[2], alpha);
}
// EXTERNAL API/ASSET END

// AI-ASSISTED START (ChatGPT/Codex, May 4-May 27, 2026)
// Prompt: "Help organize a p5.js DOM HUD and centered journey-result
// banner, plus a hyperspace flash overlay that remains readable above a WEBGL scene."
// Contribution note: AI-assisted HUD/banner structure; group revised wording, timing, and style.
// Date note: hyperspace flash began on May 4; HUD and presentation banners were refined
// after the May 18 video presentation and finalized by May 27.
function createHudOverlay() {
  hudOverlay = createDiv('');
  hudOverlay.id('hud-overlay');
}

function drawHud() {
  if (!hudOverlay) return;

  const lines = [
    { text: 'Explore the controls', className: 'hud-primary' }
  ];

  const discoveryLine = getControlDiscoveryLine();
  if (discoveryLine) lines.push({ text: discoveryLine, className: 'hud-discovery' });
  const journeyLine = getJourneyResultLine();
  if (journeyLine) lines.push({ text: journeyLine, className: 'hud-discovery' });

  if (sceneState === SceneState.TRAVEL) {
    lines.push({ text: `TRAVEL SPACE / ${getCurrentGalaxyTheme().name}`, className: 'hud-state' });
  } else if (sceneState === SceneState.JUMP_CHARGE) {
    const percent = floor(getJumpChargeProgress() * 100);
    const destinationLabel = jumpDestination === SceneState.BATTLE ? 'BATTLE' : 'TRAVEL';
    lines.push({ text: `JUMP TO ${destinationLabel} ${percent}%`, className: 'hud-state' });
  } else if (sceneState === SceneState.HYPERSPACE) {
    if (getHyperspaceArrivalProgress() > 0) {
      lines.push({ text: 'HYPERSPACE ARRIVAL', className: 'hud-state' });
    } else {
      const percent = floor(getHyperspaceTunnelProgress() * 100);
      lines.push({ text: `HYPERSPACE ${percent}%`, className: 'hud-state' });
    }
  } else if (sceneState === SceneState.BATTLE) {
    lines.push({ text: 'BATTLE SPACE', className: 'hud-state' });
  }

  if (!themeLoaded && !themeFailed) {
    lines.push({ text: 'Music: loading sound/Star Wars - Main Theme.mp3', className: 'hud-warning' });
  } else if (themeLoaded && !audioStarted && sceneState !== SceneState.HYPERSPACE) {
    lines.push({ text: 'Press any key or click to start music', className: 'hud-warning' });
  } else if (themeFailed) {
    lines.push({ text: 'Music file missing: sound/Star Wars - Main Theme.mp3', className: 'hud-warning' });
  }

  if (battleMusicFailed) lines.push({ text: 'Battle music missing: sound/Star Wars - Imperial March.mp3', className: 'hud-warning' });
  if (hyperspaceFailed) lines.push({ text: 'Hyperspace sound missing: sound/hyperspace.mp3', className: 'hud-warning' });
  if (tieFlybySoundFailed) lines.push({ text: 'TIE sound missing: sound/TIE Fighter Fly Sound.mp3', className: 'hud-warning' });
  if (blastFailed) lines.push({ text: 'Blast sound missing: sound/blast.mp3', className: 'hud-warning' });
  if (tieBlasterFailed) lines.push({ text: 'TIE blaster missing: sound/LEGO Star Wars Tie Fighter Blaster1.mp3', className: 'hud-warning' });
  if (tieExplosionFailed) lines.push({ text: 'TIE explosion missing: sound/tir-fighter-exploding.mp3', className: 'hud-warning' });
  if (playerHitFailed) lines.push({ text: 'Hit sound missing: sound/it-s-a-hit.mp3', className: 'hud-warning' });

  hudOverlay.html(lines.map(line => `<div class="${line.className}">${line.text}</div>`).join(''));
  hudOverlay.style('display', sceneState === SceneState.COVER || sceneState === SceneState.COVER_FADE ? 'none' : 'block');
  drawJourneyBanner();
}

function getControlDiscoveryLine() {
  const age = millis() - controlDiscoveryMessageStart;
  if (!controlDiscoveryMessage || age > CONTROL_DISCOVERY_MESSAGE_DURATION) return '';

  return controlDiscoveryMessage;
}

function getJourneyResultLine() {
  const age = millis() - journeyState.lastBattleResultStart;
  if (!journeyState.lastBattleResultMessage || age > JOURNEY_MESSAGE_DURATION) return '';

  return journeyState.lastBattleResultMessage;
}

function createJourneyBannerOverlay() {
  journeyBannerOverlay = createDiv('');
  journeyBannerOverlay.id('journey-banner-overlay');
}

function drawJourneyBanner() {
  if (!journeyBannerOverlay) return;

  const age = millis() - journeyState.bannerStart;
  const hiddenByState = sceneState !== SceneState.TRAVEL;
  if (!journeyState.lastBattleResultMessage || age < 0 || age > JOURNEY_MESSAGE_DURATION || hiddenByState) {
    journeyBannerOverlay.style('display', 'none');
    return;
  }

  const progress = constrain(age / JOURNEY_MESSAGE_DURATION, 0, 1);
  const fadeIn = constrain(progress / 0.16, 0, 1);
  const fadeOut = 1 - constrain((progress - 0.72) / 0.28, 0, 1);
  const alpha = easeOutCubic(min(fadeIn, fadeOut));
  const title = journeyState.lastBattleAdvanced ? 'NEW GALAXY REACHED' : 'BACK TO ORIGIN';
  const subtitle = journeyState.lastBattleAdvanced
    ? `${journeyState.lastBattleDestroyedCount} ${journeyState.lastBattleDestroyedCount === 1 ? 'TIE' : 'TIEs'} destroyed`
    : 'No enemy destroyed';

  journeyBannerOverlay.html(`
    <div class="journey-banner-title">${title}</div>
    <div class="journey-banner-subtitle">${subtitle}</div>
  `);
  journeyBannerOverlay.style('display', 'block');
  journeyBannerOverlay.style('opacity', alpha);
  journeyBannerOverlay.style('transform', `translate(-50%, -50%) scale(${lerp(0.94, 1.02, easeOutCubic(progress))})`);
}

function drawHyperspaceFlash() {
  if (sceneState !== SceneState.HYPERSPACE) return;

  const flashProgress = getHyperspaceFlashProgress();
  const flashPeak = getHyperspaceFlashPeak(flashProgress);
  if (flashPeak <= 0) return;

  resetMatrix();
  camera();

  push();
  translate(0, 0);
  noStroke();
  drawLightBlast(flashProgress, flashPeak);
  pop();
}

function drawLightBlast(progress, peak) {
  const maxDiameter = sqrt(width * width + height * height) * 1.25;
  const coreDiameter = lerp(60, maxDiameter, peak);
  const rayLength = lerp(width * 0.25, maxDiameter * 0.75, easeOutCubic(progress));
  const rayWidth = lerp(18, max(width, height) * 0.42, peak);
  const rayAlpha = 120 * peak;

  push();
  rotate(frameCount * 0.015);

  for (let i = 0; i < 10; i++) {
    const angle = (TWO_PI / 10) * i;
    const tipX = cos(angle) * rayLength;
    const tipY = sin(angle) * rayLength;
    const sideAngle = angle + HALF_PI;
    const sideX = cos(sideAngle) * rayWidth;
    const sideY = sin(sideAngle) * rayWidth;

    fill(255, rayAlpha);
    triangle(-sideX, -sideY, sideX, sideY, tipX, tipY);
  }

  pop();

  fill(255, 255 * peak);
  ellipse(0, 0, coreDiameter, coreDiameter);
  fill(255, 180 * peak);
  ellipse(0, 0, coreDiameter * 1.35, coreDiameter * 1.35);
}

function getHyperspaceFlashProgress() {
  if (sceneState !== SceneState.HYPERSPACE) return 0;
  const flashElapsed = millis() - hyperspaceStart - HYPERSPACE_FLASH_START;
  return constrain(flashElapsed / HYPERSPACE_FLASH_DURATION, 0, 1);
}

function getHyperspaceFlashPeak(progress) {
  if (progress <= 0) return 0;

  if (progress <= 0.5) {
    return sin(progress * PI);
  }

  const fadeProgress = (progress - 0.5) / 0.5;
  return pow(1 - fadeProgress, 2.2);
}
// AI-ASSISTED END

// EXTERNAL API/ASSET START (p5.sound reference, May 4-May 6, 2026)
// Sound loading and playback uses p5.sound API. Sound-file choices and scene
// mapping are group decisions; AI assisted with fallback/state organization.
// Date note: travel/hyperspace sound started on May 4 and battle sounds were added on May 6.
// Main Theme source: https://archive.org/details/tvtunes_7011
// Imperial March source: https://archive.org/details/tvtunes_12997
// Hyperspace source: https://www.101soundboards.com/sounds/24246717-entering-hyperspace
// Player blast source: https://www.101soundboards.com/sounds/19477-blast
// TIE blaster source: https://www.101soundboards.com/sounds/24102413-lego-star-wars-tie-fighter-blaster1
// Player hit source: https://www.101soundboards.com/sounds/362943-its-a-hit
// TIE flyby source: https://www.101soundboards.com/sounds/1232907-tie-fighter-flyby
// TIE explosion source: https://www.101soundboards.com/sounds/1487831-tie-fighter-explode
function loadThemeMusic() {
  if (typeof loadSound !== 'function') {
    themeFailed = true;
    hyperspaceFailed = true;
    return;
  }

  themeSound = loadSound(
    'sound/Star Wars - Main Theme.mp3',
    () => {
      themeLoaded = true;
      themeSound.setLoop(true);
      themeSound.setVolume(THEME_VOLUME);
      if (audioRequested && !audioStarted) {
        startAudio();
      }
    },
    () => {
      themeFailed = true;
    }
  );
}

function loadBattleMusic() {
  if (typeof loadSound !== 'function') {
    battleMusicFailed = true;
    return;
  }

  battleMusicSound = loadSound(
    'sound/Star Wars - Imperial March.mp3',
    () => {
      battleMusicLoaded = true;
      battleMusicSound.setLoop(true);
      battleMusicSound.setVolume(BATTLE_MUSIC_VOLUME);
      if (audioRequested && sceneState === SceneState.BATTLE) {
        playSceneMusic(SceneState.BATTLE);
      }
    },
    () => {
      battleMusicFailed = true;
    }
  );
}

function loadHyperspaceSound() {
  if (typeof loadSound !== 'function') {
    hyperspaceFailed = true;
    return;
  }

  hyperspaceSound = loadSound(
    'sound/hyperspace.mp3',
    () => {
      hyperspaceLoaded = true;
      hyperspaceSound.setVolume(0.85);
    },
    () => {
      hyperspaceFailed = true;
    }
  );
}

function loadTieFlybySound() {
  if (typeof loadSound !== 'function') {
    tieFlybySoundFailed = true;
    return;
  }

  tieFlybySound = loadSound(
    'sound/TIE Fighter Fly Sound.mp3',
    () => {
      tieFlybySoundLoaded = true;
      tieFlybySound.setVolume(0.75);
      if (typeof tieFlybySound.playMode === 'function') {
        tieFlybySound.playMode('sustain');
      }
    },
    () => {
      tieFlybySoundFailed = true;
    }
  );
}

function loadBlastSound() {
  if (typeof loadSound !== 'function') {
    blastFailed = true;
    return;
  }

  blastSound = loadSound(
    'sound/blast.mp3',
    () => {
      blastLoaded = true;
      blastSound.setVolume(0.72);
      if (typeof blastSound.playMode === 'function') {
        blastSound.playMode('sustain');
      }
    },
    () => {
      blastFailed = true;
    }
  );
}

function loadTieBlasterSound() {
  if (typeof loadSound !== 'function') {
    tieBlasterFailed = true;
    return;
  }

  tieBlasterSound = loadSound(
    'sound/LEGO Star Wars Tie Fighter Blaster1.mp3',
    () => {
      tieBlasterLoaded = true;
      tieBlasterSound.setVolume(0.68);
      if (typeof tieBlasterSound.playMode === 'function') {
        tieBlasterSound.playMode('sustain');
      }
    },
    () => {
      tieBlasterFailed = true;
    }
  );
}

function loadTieExplosionSound() {
  if (typeof loadSound !== 'function') {
    tieExplosionFailed = true;
    return;
  }

  tieExplosionSound = loadSound(
    'sound/tir-fighter-exploding.mp3',
    () => {
      tieExplosionLoaded = true;
      tieExplosionSound.setVolume(0.82);
      if (typeof tieExplosionSound.playMode === 'function') {
        tieExplosionSound.playMode('sustain');
      }
    },
    () => {
      tieExplosionFailed = true;
    }
  );
}

function loadPlayerHitSound() {
  if (typeof loadSound !== 'function') {
    playerHitFailed = true;
    return;
  }

  playerHitSound = loadSound(
    'sound/it-s-a-hit.mp3',
    () => {
      playerHitLoaded = true;
      playerHitSound.setVolume(1);
      if (typeof playerHitSound.playMode === 'function') {
        playerHitSound.playMode('restart');
      }
    },
    () => {
      playerHitFailed = true;
    }
  );
}

function startAudio() {
  audioRequested = true;

  if (!audioUnlocked && typeof userStartAudio === 'function') {
    userStartAudio();
    audioUnlocked = true;
  }

  if (audioStarted) return;

  playSceneMusic(sceneState);
}

function pauseThemeMusic() {
  stopSceneMusic();
}

function stopSceneMusic() {
  if (themeLoaded && themeSound && themeSound.isPlaying()) {
    themeSound.pause();
  }

  if (battleMusicLoaded && battleMusicSound && battleMusicSound.isPlaying()) {
    battleMusicSound.pause();
  }

  audioStarted = false;
  currentMusicMode = null;
}

function restartThemeMusic() {
  playSceneMusic(sceneState);
}

function playSceneMusic(targetScene) {
  if (!audioUnlocked) return;

  if (targetScene === SceneState.BATTLE) {
    playBattleMusic();
    return;
  }

  if (targetScene === SceneState.HYPERSPACE || targetScene === SceneState.JUMP_CHARGE) return;

  playTravelMusic();
}

function playTravelMusic() {
  if (!themeLoaded || !themeSound) return;

  if (battleMusicLoaded && battleMusicSound && battleMusicSound.isPlaying()) {
    battleMusicSound.stop();
  }

  themeSound.stop();
  themeSound.setVolume(THEME_VOLUME);
  themeSound.loop();
  audioStarted = true;
  currentMusicMode = 'travel';
}

function playBattleMusic() {
  if (!battleMusicLoaded || !battleMusicSound) return;

  if (themeLoaded && themeSound && themeSound.isPlaying()) {
    themeSound.stop();
  }

  battleMusicSound.stop();
  battleMusicSound.setVolume(BATTLE_MUSIC_VOLUME);
  battleMusicSound.loop();
  audioStarted = true;
  currentMusicMode = 'battle';
}

function updateThemeFadeOut() {
  const activeMusic = getActiveMusicSound();
  if (!activeMusic) return;

  const fadeProgress = getJumpChargeProgress();
  const baseVolume = currentMusicMode === 'battle' ? BATTLE_MUSIC_VOLUME : THEME_VOLUME;
  const volume = baseVolume * (1 - fadeProgress * fadeProgress);
  activeMusic.setVolume(volume);
}

function getActiveMusicSound() {
  if (currentMusicMode === 'battle' && battleMusicLoaded && battleMusicSound) return battleMusicSound;
  if (currentMusicMode === 'travel' && themeLoaded && themeSound) return themeSound;

  if (battleMusicLoaded && battleMusicSound && battleMusicSound.isPlaying()) return battleMusicSound;
  if (themeLoaded && themeSound && themeSound.isPlaying()) return themeSound;

  return null;
}

function playHyperspaceSound() {
  if (!audioUnlocked || !hyperspaceLoaded || !hyperspaceSound) return;

  hyperspaceSound.stop();
  hyperspaceSound.play();
}

function stopHyperspaceSound() {
  if (!hyperspaceLoaded || !hyperspaceSound) return;

  hyperspaceSound.stop();
}

function playTieFlybySound() {
  if (!audioUnlocked || !tieFlybySoundLoaded || !tieFlybySound) return;

  tieFlybySound.play();
}

function stopTieFlybySound() {
  if (!tieFlybySoundLoaded || !tieFlybySound) return;

  tieFlybySound.stop();
}
// EXTERNAL API/ASSET END

// AI-ASSISTED START (ChatGPT/Codex, May 6, 2026)
// Prompt: "Help implement p5.js 3D laser spawning from ship muzzle
// offsets, ship-vector rotation, interpolation helpers, Bezier helpers, and collision math."
// Contribution note: AI-assisted vector/collision helpers; group tuned muzzle offsets and gameplay feel.
// Date note: laser and collision helpers were added with the May 6 battle implementation.
function fireLaser() {
  if (sceneState === SceneState.COVER) return;
  if (sceneState === SceneState.JUMP_CHARGE || sceneState === SceneState.HYPERSPACE) return;

  const shipRotation = getShipRotation();
  const direction = getShipForwardDirection();

  for (const offset of LASER_MUZZLE_OFFSETS) {
    const worldOffset = rotateShipVector(createVector(offset.x, offset.y, offset.z), shipRotation);
    laserShots.push({
      origin: addVector(player.pos, worldOffset),
      direction,
      length: random(360, 560),
      startTime: millis()
    });
  }

  playBlastSound();
}

function getShipRotation() {
  return {
    roll: -player.roll,
    pitch: -(0.18 + player.pitch),
    yaw: PI + player.yaw
  };
}

function getShipForwardDirection() {
  return normalizeVector(rotateShipVector(createVector(0, 0, 1), getShipRotation()));
}

function rotateShipVector(source, rotation) {
  const afterRoll = createVector(
    source.x * cos(rotation.roll) - source.y * sin(rotation.roll),
    source.x * sin(rotation.roll) + source.y * cos(rotation.roll),
    source.z
  );
  const afterPitch = createVector(
    afterRoll.x,
    afterRoll.y * cos(rotation.pitch) - afterRoll.z * sin(rotation.pitch),
    afterRoll.y * sin(rotation.pitch) + afterRoll.z * cos(rotation.pitch)
  );

  return createVector(
    afterPitch.x * cos(rotation.yaw) + afterPitch.z * sin(rotation.yaw),
    afterPitch.y,
    -afterPitch.x * sin(rotation.yaw) + afterPitch.z * cos(rotation.yaw)
  );
}

function addVector(a, b) {
  return createVector(a.x + b.x, a.y + b.y, a.z + b.z);
}

function subtractVector(a, b) {
  return createVector(a.x - b.x, a.y - b.y, a.z - b.z);
}

function multiplyVector(source, amount) {
  return createVector(source.x * amount, source.y * amount, source.z * amount);
}

function lerpRgb(start, end, amount) {
  return [
    lerp(start[0], end[0], amount),
    lerp(start[1], end[1], amount),
    lerp(start[2], end[2], amount)
  ];
}

function lerpVector(start, end, amount) {
  return createVector(
    lerp(start.x, end.x, amount),
    lerp(start.y, end.y, amount),
    lerp(start.z, end.z, amount)
  );
}

function lerpAngle(start, end, amount) {
  let delta = (end - start + PI) % TWO_PI - PI;
  if (delta < -PI) delta += TWO_PI;

  return start + delta * amount;
}

function lerpVectorWithoutForwardLag(start, end, amount, forward) {
  const result = lerpVector(start, end, amount);
  const offset = subtractVector(result, end);
  const forwardLag = dotVector(offset, forward);

  return subtractVector(result, multiplyVector(forward, forwardLag));
}

function getQuadraticBezierPoint(start, control, end, progress) {
  const oneMinusT = 1 - progress;

  return createVector(
    oneMinusT * oneMinusT * start.x + 2 * oneMinusT * progress * control.x + progress * progress * end.x,
    oneMinusT * oneMinusT * start.y + 2 * oneMinusT * progress * control.y + progress * progress * end.y,
    oneMinusT * oneMinusT * start.z + 2 * oneMinusT * progress * control.z + progress * progress * end.z
  );
}

function normalizeVector(source) {
  const magnitude = sqrt(source.x * source.x + source.y * source.y + source.z * source.z);
  if (magnitude <= 0.0001) return createVector(0, 0, -1);

  return createVector(source.x / magnitude, source.y / magnitude, source.z / magnitude);
}

function distancePointToSegment(point, segmentStart, segmentEnd) {
  const segment = subtractVector(segmentEnd, segmentStart);
  const pointOffset = subtractVector(point, segmentStart);
  const segmentLengthSquared = dotVector(segment, segment);
  const amount = segmentLengthSquared <= 0.0001
    ? 0
    : constrain(dotVector(pointOffset, segment) / segmentLengthSquared, 0, 1);
  const closest = addVector(segmentStart, multiplyVector(segment, amount));

  return dist(point.x, point.y, point.z, closest.x, closest.y, closest.z);
}

function dotVector(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function random3DVector(magnitude) {
  const theta = random(TWO_PI);
  const z = random(-1, 1);
  const radius = sqrt(1 - z * z);

  return createVector(
    cos(theta) * radius * magnitude,
    sin(theta) * radius * magnitude,
    z * magnitude
  );
}
// AI-ASSISTED END

// HUMAN-AUTHORED START (Group 3, May 4-May 27, 2026)
// Contribution note: Primarily group-authored input behavior; AI helped with guard clauses and organization.
// Sound effect wrappers, randomized control discovery, keyboard/mouse input, and
// responsive resize behavior. AI assisted with guard clauses and organization.
// Date note: sound controls began on May 4, hidden control discovery was added May 11,
// and post-presentation input/HUD polish was completed after May 18 by May 27.
function playBlastSound() {
  if (!audioUnlocked || !blastLoaded || !blastSound) return;

  blastSound.play();
}

function playTieBlasterSound() {
  if (!audioUnlocked || !tieBlasterLoaded || !tieBlasterSound) return;

  tieBlasterSound.play();
}

function playTieExplosionSound() {
  if (!audioUnlocked || !tieExplosionLoaded || !tieExplosionSound) return;

  tieExplosionSound.play();
}

function playPlayerHitSound() {
  if (!audioUnlocked || !playerHitLoaded || !playerHitSound) return;

  playerHitSound.stop();
  playerHitSound.setVolume(1);
  playerHitSound.play(0, 1, 1, 0, 2);
}

function initializeControlMap() {
  controlMap = random(CONTROL_PRESETS);
}

function isControlDown(action) {
  if (!controlMap || !controlMap[action]) return false;

  return controlMap[action].some(code => keyIsDown(code));
}

function isCurrentKeyForAction(action) {
  if (!controlMap || !controlMap[action]) return false;

  return controlMap[action].includes(keyCode);
}

function isMappedControlKey() {
  if (!controlMap) return false;

  const actions = ['up', 'down', 'left', 'right', 'fire', 'jump'];
  return actions.some(action => isCurrentKeyForAction(action));
}

function markControlDiscovered(type, message) {
  if (discoveredControls[type]) return;

  discoveredControls[type] = true;
  controlDiscoveryMessage = message;
  controlDiscoveryMessageStart = millis();
}

function keyPressed() {
  startAudio();

  if (sceneState === SceneState.INTRO_CRAWL) {
    finishIntroCrawl();
    return false;
  }

  if (isCurrentKeyForAction('jump')) {
    markControlDiscovered('jump', 'Jump found');
    if (!canUseJump()) {
      showControlMessage(getJumpLockedMessage());
      return false;
    }
    triggerHyperspace();
    return false;
  } else if (isCurrentKeyForAction('fire')) {
    markControlDiscovered('fire', 'Weapon found');
    fireLaser();
    return false;
  }

  if (isMappedControlKey()) {
    return false;
  }
}

function canUseJump() {
  return discoveredControls.movement && discoveredControls.fire;
}

function getJumpLockedMessage() {
  if (!discoveredControls.movement && !discoveredControls.fire) {
    return 'Find movement and weapon first';
  }

  if (!discoveredControls.movement) {
    return 'Find movement first';
  }

  return 'Find weapon first';
}

function showControlMessage(message) {
  controlDiscoveryMessage = message;
  controlDiscoveryMessageStart = millis();
}

function mousePressed() {
  startAudio();
  if (sceneState === SceneState.COVER) {
    startCoverFade();
    return;
  }

  if (sceneState === SceneState.INTRO_CRAWL) {
    finishIntroCrawl();
    return;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  perspective(PI / 3, width / height, 1, 30000);
}
// HUMAN-AUTHORED END
