// ==UserScript==
// @name            Undiscord
// @description     Delete all messages in a Discord channel or DM (Bulk deletion)
// @version         5.2.6
// @author          victornpb, SuicidaI-Idol
// @homepageURL     https://github.com/victornpb/undiscord
// @supportURL      https://github.com/victornpb/undiscord/discussions
// @match           https://*.discord.com/app
// @match           https://*.discord.com/channels/*
// @match           https://*.discord.com/login
// @license         MIT
// @namespace       https://github.com/victornpb/deleteDiscordMessages
// @icon            https://victornpb.github.io/undiscord/images/icon128.png
// @contributionURL https://www.buymeacoffee.com/vitim
// @grant           none
// @attribution     Original project (https://github.com/victornpb/undiscord)
// @downloadURL https://update.greasyfork.org/scripts/406540/Undiscord.user.js
// @updateURL https://update.greasyfork.org/scripts/406540/Undiscord.meta.js
// ==/UserScript==
(function () {
	'use strict';

	/* rollup-plugin-baked-env */
	const VERSION = "5.2.6";

	var themeCss = (`
/* undiscord window */
#undiscord.browser { box-shadow: var(--shadow-border), var(--shadow-high); border: 1px solid var(--border-subtle); overflow: hidden; }
#undiscord.container,
#undiscord .container { background-color: var(--background-surface-high); border-radius: 8px; box-sizing: border-box; cursor: default; flex-direction: column; }
#undiscord .header { background-color: var(--background-tertiary); height: 48px; align-items: center; min-height: 48px; padding: 0 16px; display: flex; color: var(--header-secondary); cursor: grab; }
#undiscord .header .icon { color: var(--interactive-normal); margin-right: 8px; flex-shrink: 0; width: 24; height: 24; }
#undiscord .header .icon:hover { color: var(--interactive-hover); }
#undiscord .header h3 { font-size: 16px; line-height: 20px; font-weight: 500; font-family: var(--font-display); color: var(--header-primary); flex-shrink: 0; margin-right: 16px; }
#undiscord .spacer { flex-grow: 1; }
#undiscord .header .vert-divider { width: 1px; height: 24px; background-color: var(--background-modifier-accent); margin-right: 16px; flex-shrink: 0; }
#undiscord legend,
#undiscord label { color: var(--header-secondary); font-size: 12px; line-height: 16px; font-weight: 500; text-transform: uppercase; cursor: default; font-family: var(--font-display); margin-bottom: 8px; }
#undiscord .multiInput { display: flex; align-items: center; font-size: 16px; box-sizing: border-box; width: 100%; border-radius: 3px; color: var(--text-default); background-color: var(--input-background); border: none; transition: border-color 0.2s ease-in-out 0s; }
#undiscord .multiInput :first-child { flex-grow: 1; }
#undiscord .multiInput button:last-child { margin-right: 4px; }
#undiscord .input { font-size: 16px; width: 100%; transition: border-color 0.2s ease-in-out 0s; padding: 10px; height: 44px; background-color: var(--input-background); border: 1px solid var(--input-border); border-radius: 8px; box-sizing: border-box; color: var(--text-default); }
#undiscord fieldset { margin-top: 16px; }
#undiscord .input-wrapper { display: flex; align-items: center; font-size: 16px; box-sizing: border-box; width: 100%; border-radius: 3px; color: var(--text-default); background-color: var(--input-background); border: none; transition: border-color 0.2s ease-in-out 0s; }
#undiscord input[type="text"],
#undiscord input[type="search"],
#undiscord input[type="password"],
#undiscord input[type="datetime-local"],
#undiscord input[type="number"],
#undiscord input[type="range"] { background-color: var(--input-background); border: 1px solid var(--input-border); border-radius: 8px; box-sizing: border-box; color: var(--text-default); font-size: 16px; height: 44px; padding: 12px 10px; transition: border-color .2s ease-in-out; width: 100%; }
#undiscord .divider,
#undiscord hr { border: none; margin-bottom: 24px; padding-bottom: 4px; border-bottom: 1px solid var(--background-modifier-accent); }
#undiscord .sectionDescription { margin-bottom: 16px; color: var(--header-secondary); font-size: 14px; line-height: 20px; font-weight: 400; }
#undiscord a { color: var(--text-link); text-decoration: none; }
#undiscord .btn,
#undiscord button { position: relative; display: flex; -webkit-box-pack: center; justify-content: center; -webkit-box-align: center; align-items: center; box-sizing: border-box; background: none; border: none; border-radius: 3px; font-size: 14px; font-weight: 500; line-height: 16px; padding: 2px 16px; user-select: none; /* sizeSmall */     width: 60px; height: 32px; min-width: 60px; min-height: 32px; /* lookFilled colorPrimary */     color: rgb(255, 255, 255); background-color: var(--button-secondary-background); }
#undiscord .sizeMedium { width: 96px; height: 38px; min-width: 96px; min-height: 38px; }
#undiscord .sizeMedium.icon { width: 38px; min-width: 38px; }
#undiscord sup { vertical-align: top; }
/* lookFilled colorPrimary */
#undiscord .accent { background-color: var(--brand-experiment); }
#undiscord .danger { background-color: var(--button-danger-background); }
#undiscord .positive { background-color: var(--button-positive-background); }
#undiscord .info { font-size: 12px; line-height: 16px; padding: 8px 10px; color: var(--text-muted); }
/* Scrollbar */
#undiscord .scroll::-webkit-scrollbar { width: 8px; height: 8px; }
#undiscord .scroll::-webkit-scrollbar-corner { background-color: transparent; }
#undiscord .scroll::-webkit-scrollbar-thumb { background-clip: padding-box; border: 2px solid transparent; border-radius: 4px; background-color: var(--scrollbar-thin-thumb); min-height: 40px; }
#undiscord .scroll::-webkit-scrollbar-track { border-color: var(--scrollbar-thin-track); background-color: var(--scrollbar-thin-track); border: 2px solid var(--scrollbar-thin-track); }
/* fade scrollbar */
#undiscord .scroll::-webkit-scrollbar-thumb,
#undiscord .scroll::-webkit-scrollbar-track { visibility: hidden; }
#undiscord .scroll:hover::-webkit-scrollbar-thumb,
#undiscord .scroll:hover::-webkit-scrollbar-track { visibility: visible; }
/**** functional classes ****/
#undiscord.redact .priv { display: none !important; }
#undiscord.redact x:not(:active) { color: transparent !important; background-color: var(--primary-700) !important; cursor: default; user-select: none; }
#undiscord.redact x:hover { position: relative; }
#undiscord.redact x:hover::after { content: "Redacted information (Streamer mode: ON)"; position: absolute; display: inline-block; top: -32px; left: -20px; padding: 4px; width: 150px; font-size: 8pt; text-align: center; white-space: pre-wrap; background-color: var(--background-floating); -webkit-box-shadow: var(--elevation-high); box-shadow: var(--elevation-high); color: var(--text-default); border-radius: 5px; pointer-events: none; }
#undiscord.redact [priv] { -webkit-text-security: disc !important; }
#undiscord :disabled { opacity: 0.6; cursor: not-allowed; }
/**** layout and utility classes ****/
#undiscord,
#undiscord * { box-sizing: border-box; }
#undiscord .col { display: flex; flex-direction: column; }
#undiscord .row { display: flex; flex-direction: row; align-items: center; }
#undiscord .mb1 { margin-bottom: 8px; }
#undiscord .log { margin-bottom: 0.25em; }
#undiscord .log-debug { color: inherit; }
#undiscord .log-info { color: #00b0f4; }
#undiscord .log-verb { color: #72767d; }
#undiscord .log-warn { color: #faa61a; }
#undiscord .log-error { color: #f04747; }
#undiscord .log-success { color: #43b581; }
`);

	var mainCss = (`
/**** Undiscord Button ****/
#undicord-btn { position: relative; width: auto; height: 24px; margin: 0 8px; cursor: pointer; color: var(--interactive-normal); flex: 0 0 auto; }
#undicord-btn progress { position: absolute; top: 23px; left: -4px; width: 32px; height: 12px; display: none; }
#undicord-btn.running { color: var(--button-danger-background) !important; }
#undicord-btn.running progress { display: block; }
/**** Undiscord Interface ****/
#undiscord { position: fixed; z-index: 100; top: 58px; right: 10px; display: flex; flex-direction: column; width: 940px; height: 80vh; min-width: 720px; max-width: 100vw; min-height: 448px; max-height: 100vh; color: var(--text-normal); border-radius: 4px; background-color: var(--background-secondary); box-shadow: var(--elevation-stroke), var(--elevation-high); will-change: top, left, width, height; }
#undiscord .header .icon { cursor: pointer; }
#undiscord .window-body { height: calc(100% - 48px); }
#undiscord .sidebar { overflow: hidden scroll; overflow-y: auto; width: 270px; min-width: 250px; height: 100%; max-height: 100%; padding: 8px; background: var(--bg-overlay-4, var(--background-base-lowest)); }
#undiscord .sidebar legend,
#undiscord .sidebar label { display: block; width: 100%; }
#undiscord .main { display: flex; max-width: calc(100% - 250px); background-color: var(--bg-overlay-chat, var(--background-base-lower)); flex-grow: 1; }
#undiscord.hide-sidebar .sidebar { display: none; }
#undiscord.hide-sidebar .main { max-width: 100%; }
#undiscord #logArea { font-family: Consolas, Liberation Mono, Menlo, Courier, monospace; font-size: 0.75rem; overflow: auto; padding: 10px; user-select: text; flex-grow: 1; flex-grow: 1; cursor: auto; }
#undiscord .tbar { padding: 8px; background-color: var(--bg-overlay-2, var(--__header-bar-background)); }
#undiscord .tbar button { margin-right: 4px; margin-bottom: 4px; }
#undiscord .tbar .progressRow { gap: 8px; align-items: center; justify-content: flex-start; padding: 2px 0 0; width: 100%; }
#undiscord .tbar .progressRow #progressBar { flex: 1 1 auto; width: auto; min-width: 0; margin-top: 0; }
#undiscord #progressBarPercent {
  width: 56px;
  min-width: 56px;
  flex: 0 0 auto;
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  text-align: center;
  color: var(--u-text);
}
#undiscord .footer { cursor: se-resize; padding-right: 30px; }
#undiscord .footer #progressPercent { padding: 0 1em; font-size: small; color: var(--interactive-muted); flex-grow: 1; }
.resize-handle { position: absolute; bottom: -15px; right: -15px; width: 30px; height: 30px; transform: rotate(-45deg); background: repeating-linear-gradient(0, var(--background-modifier-accent), var(--background-modifier-accent) 1px, transparent 2px, transparent 4px); cursor: nwse-resize; }
/**** Elements ****/
#undiscord summary { font-size: 16px; font-weight: 500; line-height: 20px; position: relative; overflow: hidden; margin-bottom: 2px; padding: 6px 10px; cursor: pointer; white-space: nowrap; text-overflow: ellipsis; color: var(--interactive-normal); border-radius: 4px; flex-shrink: 0; }
#undiscord fieldset { padding-left: 8px; }
#undiscord legend a { float: right; text-transform: initial; }
#undiscord progress { height: 8px; margin-top: 4px; flex-grow: 1; }
#undiscord .importJson { display: flex; flex-direction: row; }
#undiscord .importJson button { margin-left: 5px; width: fit-content; }
`);
var contrastFixCss = (`
/* ---- Undiscord contrast fix (Discord themes/updates) ---- */
#undiscord { color: var(--text-normal) !important; background: var(--background-secondary) !important; }

#undiscord .header {
  background: var(--background-tertiary) !important;
  color: var(--header-primary) !important;
}

#undiscord .sidebar {
  background: var(--background-secondary) !important;
}

#undiscord summary { color: var(--header-primary) !important; }

#undiscord legend,
#undiscord label,
#undiscord .sectionDescription {
  color: var(--text-normal) !important;
}

#undiscord .info { color: var(--text-muted) !important; }

#undiscord #logArea { color: var(--text-normal) !important; }

#undiscord a { color: var(--text-link) !important; }

#undiscord input,
#undiscord .input,
#undiscord input[type="text"],
#undiscord input[type="search"],
#undiscord input[type="password"],
#undiscord input[type="datetime-local"],
#undiscord input[type="number"] {
  color: var(--text-normal) !important;
  background: var(--background-primary) !important;
  border-color: var(--background-modifier-accent) !important;
}

#undiscord .main {
  background: var(--background-primary) !important;
}
`);
var undiscordUiCss = (`
/* ===== Undiscord: UI palette stable (does not depend on Discord theme) ===== */
#undiscord{
  --u-bg: #0f1115;
  --u-panel: #151822;
  --u-panel2: #10131a;
  --u-border: rgba(255,255,255,.10);
  --u-text: rgba(255,255,255,.92);
  --u-muted: rgba(255,255,255,.65);
  --u-link: #7ab7ff;
  --u-btn: #2b3245;
  --u-btn-hover: #3a4460;
  --u-danger: #b83b3b;
  --u-danger-hover: #d04b4b;
  --u-input: #0c0f15;
  --u-focus: rgba(122,183,255,.35);

  background: var(--u-bg) !important;
  color: var(--u-text) !important;
  border: 1px solid var(--u-border) !important;
  border-radius: 10px !important;
  box-shadow: 0 16px 60px rgba(0,0,0,.55) !important;
}

/* Header */
#undiscord .header{
  background: var(--u-panel) !important;
  color: var(--u-text) !important;
  border-bottom: 1px solid var(--u-border) !important;
}
#undiscord .header h3{ color: var(--u-text) !important; }
#undiscord .header span{ color: var(--u-muted) !important; }
#undiscord .header .vert-divider{ background: var(--u-border) !important; }
#undiscord .header .icon{ color: var(--u-muted) !important; }
#undiscord .header .icon:hover{ color: var(--u-text) !important; }

/* Layout */
#undiscord .sidebar{
  background: linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.01)) , var(--u-panel2) !important;
  border-right: 1px solid var(--u-border) !important;
  padding: 12px 10px !important;
}
#undiscord .sidebar details{
  background: rgba(255,255,255,.02);
  border: 1px solid rgba(255,255,255,.06);
  border-radius: 10px;
  padding: 6px 6px 4px;
  margin-bottom: 10px;
}
#undiscord .sidebar summary{
  color: var(--u-text) !important;
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.06);
  border-radius: 8px;
  padding: 6px 10px;
}
#undiscord .sidebar summary:hover{
  background: rgba(255,255,255,.05);
}
#undiscord .sidebar fieldset{
  padding-left: 6px;
  margin-top: 10px;
}
#undiscord .sidebar hr{
  margin: 10px 0;
  border-bottom: 1px solid rgba(255,255,255,.08);
}
#undiscord .sidebar .sectionDescription{
  font-size: 12px;
  line-height: 16px;
}
#undiscord .sidebar .input,
#undiscord .sidebar input[type="text"],
#undiscord .sidebar input[type="search"],
#undiscord .sidebar input[type="password"],
#undiscord .sidebar input[type="datetime-local"],
#undiscord .sidebar input[type="number"]{
  height: 38px !important;
  font-size: 14px !important;
  padding: 8px 10px !important;
}
#undiscord .sidebar input[type="checkbox"]{
  height: auto !important;
  width: auto !important;
  margin-right: 8px;
  padding: 0 !important;
}
#undiscord .main{
  background: var(--u-bg) !important;
}

/* Texts */
#undiscord summary{ color: var(--u-text) !important; }
#undiscord legend,
#undiscord label{ color: var(--u-muted) !important; }
#undiscord .sectionDescription{ color: var(--u-muted) !important; }
#undiscord .info{ color: var(--u-muted) !important; }
#undiscord a{ color: var(--u-link) !important; }

/* Inputs */
#undiscord input,
#undiscord .input,
#undiscord input[type="text"],
#undiscord input[type="search"],
#undiscord input[type="password"],
#undiscord input[type="datetime-local"],
#undiscord input[type="number"]{
  background: var(--u-input) !important;
  color: var(--u-text) !important;
  border: 1px solid var(--u-border) !important;
  border-radius: 10px !important;
}
#undiscord input:focus{
  outline: none !important;
  box-shadow: 0 0 0 3px var(--u-focus) !important;
  border-color: rgba(122,183,255,.6) !important;
}

/* Buttons */
#undiscord button{
  background: var(--u-btn) !important;
  color: var(--u-text) !important;
  border: 1px solid var(--u-border) !important;
  border-radius: 10px !important;
}
#undiscord button:hover{
  background: var(--u-btn-hover) !important;
}
#undiscord button.danger{
  background: var(--u-danger) !important;
  border-color: rgba(255,255,255,.12) !important;
}
#undiscord button.danger:hover{
  background: var(--u-danger-hover) !important;
}

/* Toolbars */
#undiscord .tbar{
  background: var(--u-panel) !important;
  border-bottom: 1px solid var(--u-border) !important;
}
#undiscord .tbar.footer{
  border-top: 1px solid var(--u-border) !important;
  border-bottom: none !important;
}

/* Conversation badge */
#undiscord .convBadge{
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 10px 0 3px;
  margin-right: 6px;
  margin-bottom: 4px;
  border-radius: 999px;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.12);
  height: 38px;
  box-sizing: border-box;
  max-width: 280px;
  overflow: hidden;
}
#undiscord .convBadge img{
  width: 28px;
  height: 28px;
  border-radius: 999px;
  flex: 0 0 auto;
  box-shadow: 0 0 0 1px rgba(255,255,255,.18);
}
#undiscord .convBadge .convName{
  font-size: 14px;
  font-weight: 600;
  color: var(--u-text) !important;
  padding-right: 2px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
#undiscord.verbose .convBadge{
  display: none !important;
}

/* Log */
#undiscord #logArea{
  background: transparent !important;
  color: var(--u-text) !important;
}
#undiscord .log-warn{ color: #ffcc66 !important; }
#undiscord .log-error{ color: #ff6b6b !important; }
#undiscord .log-success{ color: #6bff95 !important; }
#undiscord .log-info{ color: #78d6ff !important; }
#undiscord .log-verb{ color: rgba(255,255,255,.55) !important; }

/* Progress */
#undiscord progress{
  appearance: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  background: rgba(255,255,255,.08) !important;
  border: 1px solid rgba(255,255,255,.12) !important;
  border-radius: 999px !important;
  overflow: hidden !important;
  height: 10px !important;
}
#undiscord progress::-webkit-progress-bar{
  background: rgba(255,255,255,.08) !important;
  border-radius: 999px !important;
}
#undiscord progress::-webkit-progress-value{
  background: linear-gradient(90deg, #4c9aff, #66b4ff) !important;
  border-radius: 999px !important;
}
#undiscord #progressBarPercent{
  color: rgba(255,255,255,.92) !important;
  background: none !important;
  border: none !important;
}
/* Hide authorID */
#undiscord.hide-author #authorId,
#undiscord.hide-author #authorId.priv {
  -webkit-text-security: disc !important;
  text-security: disc !important;
}

/* Hide message text (compact + verbose log UIs) */
#undiscord .msgHidden { display: none; color: var(--u-muted) !important; font-style: italic; }
#undiscord.hide-text .msgText { display: none; }
#undiscord.hide-text .msgHidden { display: inline; }

/* Hide author identity in logs (compact: avatar + display name; verbose: author id) */
#undiscord .authorHidden { display: none; color: var(--u-muted) !important; font-style: italic; }
#undiscord.hide-author .authorText { display: none; }
#undiscord.hide-author .authorHidden { display: inline; }
#undiscord.hide-author img.authorAvatar { display: none !important; }

/* Compact-mode polish when hiding */
#undiscord.hide-author:not(.verbose) .log-del{
  grid-template-columns: 88px minmax(0, 1fr) auto;
  column-gap: 10px;
}
#undiscord.hide-author:not(.verbose) .log-del img.authorAvatar{ display: none !important; }
#undiscord.hide-author:not(.verbose) .log-del .head{ display: none; }
#undiscord.hide-author:not(.verbose) .log-del .txt{ min-width: 0; }
#undiscord.hide-author:not(.verbose) .log-del .content{ margin-top: 2px; }
#undiscord.hide-text:not(.verbose) .log-del .msgHidden{
  display: inline-block;
  padding: 1px 8px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.10);
  background: rgba(255,255,255,.04);
  white-space: nowrap;
  word-break: normal;
  overflow-wrap: normal;
}
/* ===== FINISHED STATE ===== */
#undiscord.finished #progressBar::-webkit-progress-value { background: #2ecc71 !important; }
#undiscord.finished #progressBar { border-radius: 999px !important; }

#undiscord.finished #undicord-btn progress::-webkit-progress-value { background: #2ecc71 !important; }

/* Firefox */
#undiscord.finished #progressBar::-moz-progress-bar { background: #2ecc71 !important; }
#undiscord.finished #undicord-btn progress::-moz-progress-bar { background: #2ecc71 !important; }

/* Success message */
#undiscord .doneBanner{
  display:none;
  margin-top: 6px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid rgba(46, 204, 113, .35);
  background: rgba(46, 204, 113, .10);
  color: rgba(255,255,255,.9);
  font-size: 13px;
}
#undiscord.finished .doneBanner{ display:block; }

/* Hide Author ID redaction (independent from Streamer mode) */
#undiscord.hide-author x.priv-author:not(:active) {
  color: transparent !important;
  background-color: var(--primary-700) !important;
  cursor: default;
  user-select: none;
}
#undiscord.hide-author x.priv-author:hover {
  position: relative;
}
#undiscord.hide-author x.priv-author:hover::after {
  content: "Redacted Author ID (Hide Author ID/Text: ON)";
  position: absolute;
  display: inline-block;
  top: -32px;
  left: -20px;
  padding: 4px;
  width: 150px;
  font-size: 8pt;
  text-align: center;
  white-space: pre-wrap;
  background-color: var(--background-floating);
  box-shadow: var(--elevation-high);
  color: var(--text-default);
  border-radius: 5px;
  pointer-events: none;
}

/* ===== VERBOSE LOG MODE ===== */
#undiscord.verbose{
  --v-bg: #0b0f17;
  --v-panel: #0f1522;
  --v-panel-2: #121a2b;
  --v-border: rgba(122,183,255,.25);
  --v-text: rgba(232,240,255,.95);
  --v-muted: rgba(170,190,220,.75);
  --v-accent: #7ab7ff;
  --v-accent-2: #7ee7c6;
  background: radial-gradient(1200px 600px at 80% -10%, rgba(122,183,255,.18), transparent 60%), var(--v-bg) !important;
  border-color: var(--v-border) !important;
  color: var(--v-text) !important;
  box-shadow: 0 20px 70px rgba(0,0,0,.6) !important;
}
#undiscord.verbose .header{
  background: linear-gradient(135deg, rgba(122,183,255,.18), rgba(126,231,198,.12)) !important;
  border-bottom: 1px solid var(--v-border) !important;
}
#undiscord.verbose .header h3,
#undiscord.verbose .header,
#undiscord.verbose .header .icon{
  color: var(--v-text) !important;
}
#undiscord.verbose.hide-sidebar .main{
  max-width: 100% !important;
}
#undiscord.verbose .main{
  background: var(--v-panel) !important;
}
#undiscord.verbose .tbar{
  background: var(--v-panel-2) !important;
  border-bottom: 1px solid var(--v-border) !important;
}
#undiscord.verbose #logArea{
  padding: 8px !important;
  background: #0a0f18 !important;
  border-top: 1px solid var(--v-border) !important;
  font-size: 11.5px !important;
  line-height: 1.3 !important;
  font-family: "JetBrains Mono", "IBM Plex Mono", "Fira Code", Menlo, Consolas, "Liberation Mono", monospace !important;
}
#undiscord.verbose .log{
  margin-bottom: 0 !important;
}
#undiscord.verbose .log-vrow{
  display: grid;
  grid-template-columns: max-content max-content 1fr;
  gap: 2px;
  align-items: center;
  padding: 1px 6px;
  margin: 0 0 1px;
  border-radius: 3px;
  background: rgba(255,255,255,.02);
  border: 1px solid rgba(255,255,255,.06);
}
#undiscord.verbose .log-vrow .vtime{
  grid-column: 1;
  white-space: nowrap;
  color: var(--v-muted);
  font-size: 10px;
  line-height: 1.2;
}
#undiscord.verbose .log-vrow .vbadge{
  grid-column: 2;
  justify-self: center;
  margin: 0 4px;
  text-transform: uppercase;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: .04em;
  padding: 1px 5px;
  border-radius: 999px;
  background: rgba(122,183,255,.12);
  color: var(--v-accent);
  border: 1px solid rgba(122,183,255,.25);
  line-height: 1.2;
}
#undiscord.verbose .log-vrow.log-info .vbadge{ color: #7ab7ff; border-color: rgba(122,183,255,.35); }
#undiscord.verbose .log-vrow.log-warn .vbadge{ color: #ffb454; border-color: rgba(255,180,84,.35); background: rgba(255,180,84,.12); }
#undiscord.verbose .log-vrow.log-error .vbadge{ color: #ff6b6b; border-color: rgba(255,107,107,.35); background: rgba(255,107,107,.12); }
#undiscord.verbose .log-vrow.log-success .vbadge{ color: #7ee7c6; border-color: rgba(126,231,198,.35); background: rgba(126,231,198,.12); }
#undiscord.verbose .log-vrow.log-verb .vbadge{ color: #b4c6e7; border-color: rgba(180,198,231,.35); background: rgba(180,198,231,.12); }
#undiscord.verbose .log-vrow .vmsg{
  grid-column: 3;
  color: var(--v-text);
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  word-break: break-word;
  line-height: 1.3;
}

#undiscord:not(.verbose) .log-del{
  display: grid;
  grid-template-columns: 88px 24px minmax(0, 1fr) auto;
  gap: 8px;
  padding: 8px 12px;
  margin: 0 0 2px;
  border-radius: 8px;
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.08);
  align-items: flex-start;
}
#undiscord:not(.verbose) .log-del:last-child{ margin-bottom: 0; }
#undiscord:not(.verbose) .log-del .stamp{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0px;
  min-width: 88px;
  white-space: nowrap;
  padding: 4px 6px;
  border-radius: 6px;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.08);
}
#undiscord:not(.verbose) .log-del img{
  width: 22px;
  height: 22px;
  border-radius: 999px;
  flex: 0 0 auto;
  box-shadow: 0 0 0 1px rgba(255,255,255,.18);
  margin-top: 2px;
}
#undiscord:not(.verbose) .log-del .head{
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}
#undiscord:not(.verbose) .log-del .date{
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 0;
  background: none;
  border: none;
  font-size: 10.5px;
  color: rgba(255,255,255,.82);
  letter-spacing: .02em;
}
#undiscord:not(.verbose) .log-del .date .d{
  text-transform: uppercase;
  opacity: .9;
}
#undiscord:not(.verbose) .log-del .date .t{
  opacity: .7;
}
#undiscord:not(.verbose) .log-del .author{
  font-size: 12px;
  color: rgba(255,255,255,.92);
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
#undiscord:not(.verbose) .log-del .meta{
  font-size: 10.5px;
  color: rgba(255,255,255,.62);
  letter-spacing: .02em;
  white-space: nowrap;
  padding: 4px 8px;
  border-radius: 6px;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.08);
  align-self: center;
  text-align: right;
}
#undiscord:not(.verbose) .log-del .content{
  font-size: 13px;
  color: rgba(255,255,255,.92);
}
#undiscord:not(.verbose) .log-del .txt{
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
  min-width: 0;
}

`);

	var dragCss = (`
[name^="grab-"] { position: absolute; --size: 6px; --corner-size: 16px; --offset: -1px; z-index: 9; }
[name^="grab-"]:hover{ background: rgba(128,128,128,0.1); }
[name="grab-t"] { top: 0px; left: var(--corner-size); right: var(--corner-size); height: var(--size); margin-top: var(--offset); cursor: ns-resize; }
[name="grab-r"] { top: var(--corner-size); bottom: var(--corner-size); right: 0px; width: var(--size); margin-right: var(--offset);
  cursor: ew-resize; }
[name="grab-b"] { bottom: 0px; left: var(--corner-size); right: var(--corner-size); height: var(--size); margin-bottom: var(--offset); cursor: ns-resize; }
[name="grab-l"] { top: var(--corner-size); bottom: var(--corner-size); left: 0px; width: var(--size); margin-left: var(--offset); cursor: ew-resize; }
[name="grab-tl"] { top: 0px; left: 0px; width: var(--corner-size); height: var(--corner-size); margin-top: var(--offset); margin-left: var(--offset); cursor: nwse-resize; }
[name="grab-tr"] { top: 0px; right: 0px; width: var(--corner-size); height: var(--corner-size); margin-top: var(--offset); margin-right: var(--offset); cursor: nesw-resize; }
[name="grab-br"] { bottom: 0px; right: 0px; width: var(--corner-size); height: var(--corner-size); margin-bottom: var(--offset); margin-right: var(--offset); cursor: nwse-resize; }
[name="grab-bl"] { bottom: 0px; left: 0px; width: var(--corner-size); height: var(--corner-size); margin-bottom: var(--offset); margin-left: var(--offset); cursor: nesw-resize; }
`);

	var buttonHtml = (`
<div id="undicord-btn" tabindex="0" role="button" aria-label="Delete Messages" title="Delete Messages with Undiscord">
    <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"></path>
        <path fill="currentColor" d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z"></path>
    </svg>
    <progress></progress>
</div>
`);

	var undiscordTemplate = (`
<div id="undiscord" class="browser container hide-sidebar" style="display:none;">

    <div class="header">
        <svg class="icon" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"></path>
            <path fill="currentColor"
                d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z">
            </path>
        </svg>
        <h3>Undiscord</h3>
        <div class="vert-divider"></div>
        <span> Bulk delete messages</span>
        <div class="spacer"></div>
        <div id="hide" class="icon" aria-label="Close" role="button" tabindex="0">
            <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor"
                    d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z">
                </path>
            </svg>
        </div>
    </div>
    <div class="window-body" style="display: flex; flex-direction: row;">
        <div class="sidebar scroll">
            <details>
                <summary>General</summary>
                <fieldset>
                    <legend>
                        Author ID
                        <a href="{{WIKI}}/authorId" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="multiInput">
                        <div class="input-wrapper">
                            <input class="input" id="authorId" type="text" priv>
                        </div>
                        <button id="getAuthor">me</button>
                    </div>
                </fieldset>
                <hr>
                <fieldset>
                    <legend>
                        Server ID
                        <a href="{{WIKI}}/guildId" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="multiInput">
                        <div class="input-wrapper">
                            <input class="input" id="guildId" type="text" priv>
                        </div>
                        <button id="getGuild">current</button>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        Channel ID
                        <a href="{{WIKI}}/channelId" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="multiInput mb1">
                        <div class="input-wrapper">
                            <input class="input" id="channelId" type="text" priv>
                        </div>
                        <button id="getChannel">current</button>
                    </div>
                    <div class="sectionDescription">
                        <label class="row"><input id="includeNsfw" type="checkbox">This is a NSFW channel</label>
                    </div>
                </fieldset>
            </details>
            <details>
                <summary>Wipe Archive</summary>
                <fieldset>
                    <legend>
                        Import index.json
                        <a href="{{WIKI}}/importJson" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input type="file" id="importJsonInput" accept="application/json,.json" style="width:100%";>
                    </div>
                    <div class="sectionDescription">
                        <br>
                        After requesting your data from discord, you can import it here.<br>
                        Select the "messages/index.json" file from the discord archive.
                    </div>
                </fieldset>
            </details>
            <hr>
            <details>
                <summary>Filter</summary>
                <fieldset>
                    <legend>
                        Search
                        <a href="{{WIKI}}/filters" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input id="search" type="text" placeholder="Containing text" priv>
                    </div>
                    <div class="sectionDescription">
                        Only delete messages that contain the text
                    </div>
                    <div class="sectionDescription">
                        <label><input id="hasLink" type="checkbox">has: link</label>
                    </div>
                    <div class="sectionDescription">
                        <label><input id="hasFile" type="checkbox">has: file</label>
                    </div>
                    <div class="sectionDescription">
                        <label><input id="includePinned" type="checkbox" checked>Include pinned</label>
                    </div>
                </fieldset>
                <hr>
                <fieldset>
                    <legend>
                        Pattern
                        <a href="{{WIKI}}/pattern" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="sectionDescription">
                        Delete messages that match the regular expression
                    </div>
                    <div class="input-wrapper">
                        <span class="info">/</span>
                        <input id="pattern" type="text" placeholder="regular expression" priv>
                        <span class="info">/</span>
                    </div>
                </fieldset>
            </details>
            <details>
                <summary>Messages interval</summary>
                <fieldset>
                    <legend>
                        Interval of messages
                        <a href="{{WIKI}}/messageId" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="multiInput mb1">
                        <div class="input-wrapper">
                            <input id="minId" type="text" placeholder="After a message" priv>
                        </div>
                        <button id="pickMessageAfter">Pick</button>
                    </div>
                    <div class="multiInput">
                        <div class="input-wrapper">
                            <input id="maxId" type="text" placeholder="Before a message" priv>
                        </div>
                        <button id="pickMessageBefore">Pick</button>
                    </div>
                    <div class="sectionDescription">
                        Specify an interval to delete messages.
                    </div>
                </fieldset>
            </details>
            <details>
                <summary>Date interval</summary>
                <fieldset>
                    <legend>
                        After date
                        <a href="{{WIKI}}/dateRange" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper mb1">
                        <input id="minDate" type="datetime-local" title="Messages posted AFTER this date">
                    </div>
                    <legend>
                        Before date
                        <a href="{{WIKI}}/dateRange" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input id="maxDate" type="datetime-local" title="Messages posted BEFORE this date">
                    </div>
                    <div class="sectionDescription">
                        Delete messages that were posted between the two dates.
                    </div>
                    <div class="sectionDescription">
                        * Filtering by date doesn't work if you use the "Messages interval".
                    </div>
                </fieldset>
            </details>
            <hr>
            <details>
                <summary>Advanced settings</summary>
                <fieldset>
                    <legend>
                        Search delay
                        <a href="{{WIKI}}/delay" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input id="searchDelay" type="range" value="30000" step="100" min="100" max="60000">
                        <div id="searchDelayValue"></div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        Delete delay
                        <a href="{{WIKI}}/delay" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input id="deleteDelay" type="range" value="1000" step="50" min="50" max="10000">
                        <div id="deleteDelayValue"></div>
                    </div>
                    <br>
                    <div class="sectionDescription">
                        This will affect the speed in which the messages are deleted.
                        Use the help link for more information.
                    </div>
                </fieldset>
                <hr>
                <fieldset>
                    <legend>
                        Authorization Token
                        <a href="{{WIKI}}/authToken" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="multiInput">
                        <div class="input-wrapper">
                            <input class="input" id="token" type="text" autocomplete="dont" priv>
                        </div>
                        <button id="getToken">fill</button>
                    </div>
                </fieldset>
            </details>
            <hr>
            <details>
                <summary>Display options</summary>
                <fieldset>
                    <div class="sectionDescription">
                        <label class="row"><input id="redact" type="checkbox"> Streamer mode</label>
                    </div>
                    <div class="sectionDescription">
                        <label class="row"><input id="hideAuthorText" type="checkbox"> Hide Author ID/Text</label>
                    </div>
                    <div class="sectionDescription">
                        <label class="row"><input id="hideMessageText" type="checkbox"> Hide message text</label>
                    </div>
                    <div class="sectionDescription">
                        <label class="row"><input id="verboseMode" type="checkbox"> Verbose console</label>
                    </div>
                </fieldset>
            </details>
            <hr>
            <div></div>
            <div class="info">
                Undiscord {{VERSION}}
                <br> victornpb
            </div>
        </div>
        <div class="main col">
          <div class="tbar col">
            <div class="row">
              <button id="toggleSidebar" class="sizeMedium icon">☰</button>
              <div id="convBadge" class="convBadge" style="display:none;">
                  <img id="convAvatar" class="convAvatar" alt="">
                  <span id="convName" class="convName"></span>
              </div>
              <button id="start" class="sizeMedium danger" style="width: 150px;" title="Start the deletion process">▶︎ Delete</button>
              <button id="stop" class="sizeMedium" title="Stop the deletion process" disabled>🛑 Stop</button>
              <button id="clear" class="sizeMedium">Clear log</button>
            </div>

            <div class="row progressRow">
              <progress id="progressBar" style="display:none;"></progress>
              <span id="progressBarPercent" style="display:none;">0%</span>
            </div>

            <div class="doneBanner" id="doneBanner">Done: deletion completed successfully.</div>
          </div>

            <pre id="logArea" class="logarea scroll">
              <div class="log log-static" style="background: var(--background-mentioned); padding: .5em;">
                Notice: Undiscord may be working slower than usual and<wbr>require multiple attempts due to a recent Discord update.<br>
                We're working on a fix, and we thank you for your patience.
              </div>
              <center class="log log-static">
                <div>Star <a href="{{HOME}}" target="_blank" rel="noopener noreferrer">this project</a> on GitHub!</div>
                <div><a href="{{HOME}}/discussions" target="_blank" rel="noopener noreferrer">Issues or help</a></div>
              </center>
            </pre>

            <div class="tbar footer row">
                <div id="progressPercent"></div>
                <span class="spacer"></span>
                <label>
                    <input id="autoScroll" type="checkbox" checked> Auto scroll
                </label>
                <div class="resize-handle"></div>
            </div>
        </div>
    </div>
</div>

`);

  const log = {
    debug() { return logFn ? logFn('debug', arguments) : console.debug.apply(console, arguments); },
    info() { return logFn ? logFn('info', arguments) : console.info.apply(console, arguments); },
    verb() { return logFn ? logFn('verb', arguments) : console.log.apply(console, arguments); },
    warn() { return logFn ? logFn('warn', arguments) : console.warn.apply(console, arguments); },
    error() { return logFn ? logFn('error', arguments) : console.error.apply(console, arguments); },
    success() { return logFn ? logFn('success', arguments) : console.info.apply(console, arguments); },

    // ✅ dedicated delete line for compact mode
    del() { return logFn ? logFn('del', arguments) : console.log.apply(console, arguments); },
  };


	var logFn; // custom console.log function
	const setLogFn = (fn) => logFn = fn;
  const logStore = {
    compact: [],
    verbose: [],
  };

	// Helpers
	const wait = async ms => new Promise(done => setTimeout(done, ms));
	const msToHMS = s => `${s / 3.6e6 | 0}h ${(s % 3.6e6) / 6e4 | 0}m ${(s % 6e4) / 1000 | 0}s`;
  const escapeHTML = html => String(html).replace(/[&<"']/g, m => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '\'': '&#039;' })[m]);
  const redact = str => `<x>${escapeHTML(str)}</x>`;
  const redactAuthor = str => `<x class="priv-author">${escapeHTML(str)}</x>`;
	const queryString = params => params.filter(p => p[1] !== undefined).map(p => p[0] + '=' + encodeURIComponent(p[1])).join('&');
	const ask = async msg => new Promise(resolve => setTimeout(() => resolve(window.confirm(msg)), 10));
	const toSnowflake = (date) => /:/.test(date) ? ((new Date(date).getTime() - 1420070400000) * Math.pow(2, 22)) : date;
	const replaceInterpolations = (str, obj, removeMissing = false) => str.replace(/\{\{([\w_]+)\}\}/g, (m, key) => obj[key] || (removeMissing ? '' : m));

	const PREFIX$1 = '[UNDISCORD]';

	/**
	 * Delete all messages in a Discord channel or DM
	 * @author Victornpb <https://www.github.com/victornpb>
	 * @see https://github.com/victornpb/undiscord
	 */
	class UndiscordCore {

	  options = {
	    authToken: null, // Your authorization token
	    authorId: null, // Author of the messages you want to delete
	    guildId: null, // Server were the messages are located
	    channelId: null, // Channel were the messages are located
	    minId: null, // Only delete messages after this, leave blank do delete all
	    maxId: null, // Only delete messages before this, leave blank do delete all
	    content: null, // Filter messages that contains this text content
	    hasLink: null, // Filter messages that contains link
	    hasFile: null, // Filter messages that contains file
	    includeNsfw: null, // Search in NSFW channels
	    includePinned: true, // Delete messages that are pinned
	    pattern: null, // Only delete messages that match the regex (insensitive)
	    searchDelay: null, // Delay each time we fetch for more messages
	    deleteDelay: null, // Delay between each delete operation
	    maxAttempt: 2, // Attempts to delete a single message if it fails
	    askForConfirmation: true,
      retryOnNetworkError: true,
      maxNetworkRetries: 8,
      networkRetryBaseDelay: 1000,
	  };

	  state = {
	    running: false,
	    delCount: 0,
	    failCount: 0,
	    grandTotal: 0,
	    offset: 0,
	    iterations: 0,
      endReason: null, // 'DONE' | 'STOPPED' | 'ERROR'
      _emptyPageStreak: 0,
	    _seachResponse: null,
	    _messagesToDelete: [],
	    _skippedMessages: [],
      _skippedIds: new Set(),
      _skippedUniqueCount: 0,
      _avgDeletePerPage: 25,
      _deletePageSamples: 0,

	  };

	  stats = {
	    startTime: new Date(), // start time
	    throttledCount: 0, // how many times you have been throttled
	    throttledTotalTime: 0, // the total amount of time you spent being throttled
	    lastPing: null, // the most recent ping
	    avgPing: null, // average ping used to calculate the estimated remaining time
	    etr: 0,
      pendingWaitUntilTs: 0,
      _etrLastUpdateTs: 0,
	  };

	  // events
	  onStart = undefined;
	  onProgress = undefined;
	  onStop = undefined;

	  resetState() {
	    this.state = {
	      running: false,
	      delCount: 0,
	      failCount: 0,
	      grandTotal: 0,
	      offset: 0,
	      iterations: 0,
        endReason: null,
        _emptyPageStreak: 0,

	      _seachResponse: null,
	      _messagesToDelete: [],
	      _skippedMessages: [],
        _skippedIds: new Set(),
        _skippedUniqueCount: 0,
        _avgDeletePerPage: 25,
        _deletePageSamples: 0,
	    };

	    this.options.askForConfirmation = true;
	  }

    async waitWithTracking(ms) {
      const waitMs = Math.max(0, Number(ms) || 0);
      if (waitMs <= 0) return;
      this.stats.pendingWaitUntilTs = Date.now() + waitMs;
      try {
        await wait(waitMs);
      } finally {
        this.stats.pendingWaitUntilTs = 0;
      }
    }

    /** Re-check immediately after deletion to detect completion without waiting searchDelay */
    async quickCheckIfDone() {
      const oldOffset = this.state.offset;

      try {
        // ✅ Important: always re-check from the beginning
        this.state.offset = 0;

        await this.search();
        await this.filterResponse();

        const total = this.state._seachResponse?.total_results ?? 0;
        const hasMore = (this.state._messagesToDelete.length > 0) || (this.state._skippedMessages.length > 0);

        // DONE only if Discord reports no results at all
        if (total === 0 || !hasMore) {
          log.verb('Quick check: no more messages returned. Ending now.');
          this.state.endReason = 'DONE';
          this.state.running = false;
          return true;
        }

        // Not done, keep going
        return false;
      } catch (e) {
        // Restore offset and continue normally if quick check fails
        this.state.offset = oldOffset;
        log.warn('Quick check failed, continuing normally...', e);
        return false;
      } finally {
        // Restore offset to avoid side effects on the normal loop
        this.state.offset = oldOffset;
      }
    }


	  /** Automate the deletion process of multiple channels */
	  async runBatch(queue) {
	    if (this.state.running) return log.error('Already running!');

	    log.info(`Runnning batch with queue of ${queue.length} jobs`);
	    for (let i = 0; i < queue.length; i++) {
	      const job = queue[i];
	      log.info('Starting job...', `(${i + 1}/${queue.length})`);

	      // set options
	      this.options = {
	        ...this.options, // keep current options
	        ...job, // override with options for that job
	      };

	      await this.run(true);
	      if (!this.state.running) break;

	      log.info('Job ended.', `(${i + 1}/${queue.length})`);
	      this.resetState();
	      this.options.askForConfirmation = false;
	      this.state.running = true; // continue running
	    }

	    log.info('Batch finished.');
	    this.state.running = false;
	  }

	  /** Start the deletion process */
	  async run(isJob = false) {
	    if (this.state.running && !isJob) return log.error('Already running!');

	    this.state.running = true;
	    this.stats.startTime = new Date();
      this.stats.etr = 0;
      this.stats.pendingWaitUntilTs = 0;
      this.stats._etrLastUpdateTs = Date.now();

	    log.success(`Started at ${this.stats.startTime.toLocaleString()}`);
      log.debug(
        `authorId = "${this.options.authorId || ''}"`,
        `guildId = "${this.options.guildId || ''}"`,
        `channelId = "${this.options.channelId || ''}"`,
	      `minId = "${this.options.minId || ''}"`,
	      `maxId = "${this.options.maxId || ''}"`,
	    );

	    if (this.onStart) this.onStart(this.state, this.stats);
      let skipWaitOnce = false;
	    do {
	      this.state.iterations++;

	      log.verb('Fetching messages...');
	      // Search messages
	      await this.search();

	      // Process results and find which messages should be deleted
	      await this.filterResponse();
        if (this.state._messagesToDelete.length > 0 || this.state._skippedMessages.length > 0) {
          this.state._emptyPageStreak = 0;
        }

	      log.verb(
	        `Grand total: ${this.state.grandTotal}`,
	        `(Messages in current page: ${this.state._seachResponse.messages.length}`,
	        `To be deleted: ${this.state._messagesToDelete.length}`,
	        `Skipped: ${this.state._skippedMessages.length})`,
	        `offset: ${this.state.offset}`
	      );
	      this.printStats();

	      // Calculate estimated time
	      this.calcEtr();
	      log.verb(`Estimated time remaining: ${msToHMS(this.stats.etr)}`);

	      // if there are messages to delete, delete them
	      if (this.state._messagesToDelete.length > 0) {

	        if (await this.confirm() === false) {
	          this.state.running = false; // break out of a job
	          break; // immmediately stop this iteration
	        }

	        await this.deleteMessagesFromList();
          // Discord search index can lag; wait searchDelay so next search isn't empty/stale.
          skipWaitOnce = false;
	      }
	      else if (this.state._skippedMessages.length > 0) {
	        // There are stuff, but nothing to delete (example a page full of system messages)
	        // check next page until we see a page with nothing in it (end of results).
	        const oldOffset = this.state.offset;
	        this.state.offset += this.state._skippedMessages.length;
	        log.verb('There\'s nothing we can delete on this page, checking next page...');
	        log.verb(`Skipped ${this.state._skippedMessages.length} out of ${this.state._seachResponse.messages.length} in this page.`, `(Offset was ${oldOffset}, ajusted to ${this.state.offset})`);
	        skipWaitOnce = true;
          continue;
        }
        else {
          // Discord search may temporarily return an empty page right after deletions (index lag).
          const processed = this.state.delCount + this.state.failCount + (this.state._skippedUniqueCount || 0);
          const target = this.state.grandTotal || 0;
          this.state._emptyPageStreak = (this.state._emptyPageStreak || 0) + 1;

          if (target > 0 && processed < target && this.state._emptyPageStreak <= 5) {
            const waitMs = Math.max(250, Number(this.options.searchDelay) || 0);
            log.warn(`Search returned an empty page but only processed ${processed}/${target}. Waiting ${Math.round(waitMs)}ms and retrying...`);
            await this.waitWithTracking(waitMs);
            continue;
          }

          log.verb('Ended because API returned an empty page.');
          log.verb('[End state]', this.state);
          this.state.endReason = 'DONE';
          if (isJob) break;
          this.state.running = false;
        }


	      // wait before next page (fix search page not updating fast enough)
        if (this.state.running) {
          if (skipWaitOnce) {
            skipWaitOnce = false;
            log.verb('Skipping wait (page had only skipped / non-deletable messages).');
          } else {
            log.verb(`Waiting ${(this.options.searchDelay / 1000).toFixed(2)}s before next page...`);
            await this.waitWithTracking(this.options.searchDelay);
          }
        }

	    } while (this.state.running);

	    this.stats.endTime = new Date();
	    log.success(`Ended at ${this.stats.endTime.toLocaleString()}! Total time: ${msToHMS(this.stats.endTime.getTime() - this.stats.startTime.getTime())}`);
	    this.printStats();
	    log.debug(`Deleted ${this.state.delCount} messages, ${this.state.failCount} failed.\n`);

	    if (this.onStop) this.onStop(this.state, this.stats);
	  }

    stop() {
      this.state.endReason = 'STOPPED';
      this.state.running = false;
      if (this.onStop) this.onStop(this.state, this.stats);
    }


	  /** Calculate the estimated time remaining based on the current stats */
	  calcEtr() {
      const now = Date.now();
      const dtMs = Math.max(16, now - (this.stats._etrLastUpdateTs || now));
      this.stats._etrLastUpdateTs = now;

      const processed = this.state.delCount + this.state.failCount;
      const effectiveTotal = Math.max(0, this.state.grandTotal - (this.state._skippedUniqueCount || 0));
      const remainingMessages = Math.max(0, effectiveTotal - processed);

      const deleteDelay = Math.max(0, Number(this.options.deleteDelay) || 0);
      const searchDelay = Math.max(0, Number(this.options.searchDelay) || 0);
      const avgPing = Math.max(0, Number(this.stats.avgPing) || 0);
      const elapsedMs = Math.max(0, Date.now() - this.stats.startTime.getTime());
      const pendingWaitMs = Math.max(0, Number(this.stats.pendingWaitUntilTs || 0) - Date.now());

      // Model-based ETA: account for algorithm-imposed waits.
      const deletePhaseMs = remainingMessages * (deleteDelay + avgPing);
      const avgDeletePerPage = Math.max(1, Math.min(25, Number(this.state._avgDeletePerPage) || 25));
      const remainingSearchPages = remainingMessages > 0 ? Math.ceil(remainingMessages / avgDeletePerPage) : 0;
      const searchPhaseMs = remainingSearchPages * searchDelay;
      const throttledRatio = elapsedMs > 0
        ? Math.max(0, Math.min(0.8, this.stats.throttledTotalTime / elapsedMs))
        : 0;
      const modeledMs = (deletePhaseMs + searchPhaseMs) * (1 + throttledRatio);

      // Observed ETA: uses real throughput so pauses/rate-limits are naturally reflected.
      let observedMs = modeledMs;
      if (processed > 0 && elapsedMs > 0) {
        const observedMsPerMsg = elapsedMs / processed;
        observedMs = observedMsPerMsg * remainingMessages;
      }

      // Hybrid ETA:
      // - early run: trust model (not enough data)
      // - later run: trust observed throughput more
      const confidenceObserved = Math.max(0, Math.min(1, processed / 50));
      const hybridMs = (modeledMs * (1 - confidenceObserved)) + (observedMs * confidenceObserved);

      // Inertial ETA:
      // 1) target floor by known pending wait
      // 2) cap how fast ETA can move (up/down) per second
      // 3) EWMA smoothing with ~3s time constant
      let targetMs = Math.max(0, Math.max(pendingWaitMs, hybridMs));
      const currentMs = Math.max(0, Number(this.stats.etr) || 0);

      if (currentMs > 0) {
        const dtSec = dtMs / 1000;
        const maxRise = Math.max(1200 * dtSec, currentMs * 0.30 * dtSec); // +30%/s max
        const maxDrop = Math.max(900 * dtSec, currentMs * 0.18 * dtSec);  // -18%/s max
        if (targetMs > currentMs) {
          targetMs = Math.min(targetMs, currentMs + maxRise);
        } else {
          targetMs = Math.max(targetMs, currentMs - maxDrop);
        }
      }

      if (currentMs > 0) {
        const alpha = 1 - Math.exp(-(dtMs / 3000)); // more inertia
        this.stats.etr = currentMs + ((targetMs - currentMs) * alpha);
      } else {
        this.stats.etr = targetMs;
      }
	  }

	  /** As for confirmation in the beggining process */
	  async confirm() {
	    if (!this.options.askForConfirmation) return true;

	    log.verb('Waiting for your confirmation...');
	    const preview = this.state._messagesToDelete.map(m => `${m.author.username}#${m.author.discriminator}: ${m.attachments.length ? '[ATTACHMENTS]' : m.content}`).join('\n');

	    const answer = await ask(
	      `Do you want to delete ~${this.state.grandTotal} messages? (Estimated time: ${msToHMS(this.stats.etr)})` +
	      '(The actual number of messages may be less, depending if you\'re using filters to skip some messages)' +
	      '\n\n---- Preview ----\n' +
	      preview
	    );

	    if (!answer) {
	      return false;
	    }
	    else {
	      log.verb('OK');
	      this.options.askForConfirmation = false; // do not ask for confirmation again on the next request
	      return true;
	    }
	  }

	  async search() {
	    let API_SEARCH_URL;
	    if (this.options.guildId === '@me') API_SEARCH_URL = `https://discord.com/api/v9/channels/${this.options.channelId}/messages/`; // DMs
	    else API_SEARCH_URL = `https://discord.com/api/v9/guilds/${this.options.guildId}/messages/`; // Server

	    let resp;
      // Retry on network errors (no HTTP response)
      let networkAttempt = 0;

      while (true) {
        try {
          this.beforeRequest();
          resp = await fetch(API_SEARCH_URL + 'search?' + queryString([
            ['author_id', this.options.authorId || undefined],
            ['channel_id', (this.options.guildId !== '@me' ? this.options.channelId : undefined) || undefined],
            ['min_id', this.options.minId ? toSnowflake(this.options.minId) : undefined],
            ['max_id', this.options.maxId ? toSnowflake(this.options.maxId) : undefined],
            ['sort_by', 'timestamp'],
            ['sort_order', 'desc'],
            ['offset', this.state.offset],
            ['has', this.options.hasLink ? 'link' : undefined],
            ['has', this.options.hasFile ? 'file' : undefined],
            ['content', this.options.content || undefined],
            ['include_nsfw', this.options.includeNsfw ? true : undefined],
          ]), {
            headers: {
              'Authorization': this.options.authToken,
            }
          });
          this.afterRequest();
          break; // ✅ fetch OK -> exit retry loop
        } catch (err) {
          const msg = String(err && (err.message || err));

          // If no longer running, exit cleanly
          if (!this.state.running) {
            log.error('Search aborted (not running).', err);
            throw err;
          }

          // Retry only if enabled
          if (!this.options.retryOnNetworkError) {
            this.state.endReason = 'ERROR';
            this.state.running = false;
            log.error('Search request threw an error:', err);
            throw err;
          }

          networkAttempt++;
          const max = this.options.maxNetworkRetries ?? 8;

          if (networkAttempt > max) {
            this.state.running = false;
            log.error(`Search failed after ${max} network retries.`, err);
            throw err;
          }

          // Progressive backoff + small jitter
          const base = this.options.networkRetryBaseDelay ?? 1000;
          const delay = Math.min(30000, base * Math.pow(1.6, networkAttempt - 1)) + Math.floor(Math.random() * 250);

          log.warn(`NetworkError on search (attempt ${networkAttempt}/${max}). Retrying in ${Math.round(delay)}ms...`, msg);
          await this.waitWithTracking(delay);
          continue;
        }
      }


	    // not indexed yet
	    if (resp.status === 202) {
	      let w = (await resp.json()).retry_after * 1000;
	      w = w || this.stats.searchDelay; // Fix retry_after 0
	      this.stats.throttledCount++;
	      this.stats.throttledTotalTime += w;
	      log.warn(`This channel isn't indexed yet. Waiting ${w}ms for discord to index it...`);
	      await this.waitWithTracking(w);
	      return await this.search();
	    }

	    if (!resp.ok) {
	      // searching messages too fast
	      if (resp.status === 429) {
	        let w = (await resp.json()).retry_after * 1000;
	        w = w || this.stats.searchDelay; // Fix retry_after 0

	        this.stats.throttledCount++;
	        this.stats.throttledTotalTime += w;
	        this.stats.searchDelay += w; // increase delay
	        w = this.stats.searchDelay;
	        log.warn(`Being rate limited by the API for ${w}ms! Increasing search delay...`);
	        this.printStats();
	        log.verb(`Cooling down for ${w * 2}ms before retrying...`);

	        await this.waitWithTracking(w * 2);
	        return await this.search();
	      }
	      else {
	        this.state.running = false;
	        log.error(`Error searching messages, API responded with status ${resp.status}!\n`, await resp.json());
	        throw resp;
	      }
	    }
	    const data = await resp.json();
	    this.state._seachResponse = data;
	    console.log(PREFIX$1, 'search', data);
	    return data;
	  }

	  async filterResponse() {
	    const data = this.state._seachResponse;

	    // the search total will decrease as we delete stuff
	    const total = data.total_results;
	    if (total > this.state.grandTotal) this.state.grandTotal = total;

	    // search returns messages near the the actual message, only get the messages we searched for.
	    const discoveredMessages = data.messages.map(convo => convo.find(message => message.hit === true));

      // ===== DEBUG message types (what Discord returns) =====
      try {
        const dm = discoveredMessages.filter(Boolean);

        // Count by type
        const byType = dm.reduce((acc, m) => {
          const t = m?.type ?? 'null';
          acc[t] = (acc[t] || 0) + 1;
          return acc;
        }, {});

        // Take a few examples for non-0 types
        const non0 = dm.filter(m => m && m.type !== 0).slice(0, 10).map(m => ({
          id: m.id,
          type: m.type,
          flags: m.flags,
          pinned: m.pinned,
          system_content: m.system_content,
          content: (m.content || '').slice(0, 80),
          author: m.author ? `${m.author.username}#${m.author.discriminator}` : null,
          timestamp: m.timestamp,
        }));

        console.log(PREFIX$1, 'DEBUG types', {
          total_results: data.total_results,
          page_messages: data.messages?.length,
          discovered: dm.length,
          byType,
          examples_non0: non0,
        });
      } catch (e) {
        console.warn(PREFIX$1, 'DEBUG types failed', e);
      }

	    // we can only delete some types of messages, system messages are not deletable.
	    let messagesToDelete = discoveredMessages;
	    messagesToDelete = messagesToDelete.filter(msg => msg.type === 0 || (msg.type >= 6 && msg.type <= 21));
	    messagesToDelete = messagesToDelete.filter(msg => msg.pinned ? this.options.includePinned : true); //delete pinned messages

	    // custom filter of messages
	    try {
	      const regex = new RegExp(this.options.pattern, 'i');
	      messagesToDelete = messagesToDelete.filter(msg => regex.test(msg.content));
	    } catch (e) {
	      log.warn('Ignoring RegExp because pattern is malformed!', e);
	    }

	    // create an array containing everything we skipped. (used to calculate offset for next searches)
	    const skippedMessages = discoveredMessages.filter(msg => !messagesToDelete.find(m => m.id === msg.id));

      for (const msg of skippedMessages) {
        if (!msg?.id) continue;
        if (!this.state._skippedIds.has(msg.id)) {
          this.state._skippedIds.add(msg.id);
          this.state._skippedUniqueCount++;
        }
      }

	    this.state._messagesToDelete = messagesToDelete;
	    this.state._skippedMessages = skippedMessages;
      if (Array.isArray(discoveredMessages) && discoveredMessages.length > 0) {
        this.state._deletePageSamples = (this.state._deletePageSamples || 0) + 1;
        const prev = Number(this.state._avgDeletePerPage) || 25;
        const sample = Math.max(0, Math.min(25, messagesToDelete.length));
        const alpha = 0.2; // keep a stable trend, react quickly enough to filter changes
        this.state._avgDeletePerPage = prev + ((sample - prev) * alpha);
      }

	    console.log(PREFIX$1, 'filterResponse', {
        grandTotal: this.state.grandTotal,
        skippedUnique: this.state._skippedUniqueCount,
        effectiveTotal: Math.max(0, this.state.grandTotal - this.state._skippedUniqueCount),
        avgDeletePerPage: Number(this.state._avgDeletePerPage || 0).toFixed(2),
        pageMessages: data?.messages?.length ?? 0,
        toDelete: this.state._messagesToDelete.length,
        skippedPage: this.state._skippedMessages.length,
      });

	  }

	  async deleteMessagesFromList() {
	    for (let i = 0; i < this.state._messagesToDelete.length; i++) {
	      const message = this.state._messagesToDelete[i];
	      if (!this.state.running) return;

        const idx = this.state.delCount + this.state.failCount + 1;
        const max = Math.max(this.state.grandTotal, idx);

        const meta = `[${idx}/${max}]`;
        const content = (message.content || '').replace(/\n/g, ' ↵ ').trim() || '[no text]';

        log.del({
          author: message.author,
          meta,
          content,
          timestamp: message.timestamp
        });


	      // Delete a single message (with retry)
	      let attempt = 0;
	      while (attempt < this.options.maxAttempt) {
	        const result = await this.deleteMessage(message);

	        if (result === 'RETRY') {
	          attempt++;
	          log.verb(`Retrying in ${this.options.deleteDelay}ms... (${attempt}/${this.options.maxAttempt})`);
	          await this.waitWithTracking(this.options.deleteDelay);
	        }
	        else break;
	      }

	      this.calcEtr();
	      if (this.onProgress) this.onProgress(this.state, this.stats);

	      await this.waitWithTracking(this.options.deleteDelay);
	    }
	  }

	  async deleteMessage(message) {
	    const API_DELETE_URL = `https://discord.com/api/v9/channels/${message.channel_id}/messages/${message.id}`;
	    let resp;
	    try {
	      this.beforeRequest();
	      resp = await fetch(API_DELETE_URL, {
	        method: 'DELETE',
	        headers: {
	          'Authorization': this.options.authToken,
	        },
	      });
	      this.afterRequest();
	    } catch (err) {
	      // no response error (e.g. network error)
	      log.error('Delete request throwed an error:', err);
	      log.verb('Related object:', redact(JSON.stringify(message)));
	      this.state.failCount++;
	      return 'FAILED';
	    }

	    if (!resp.ok) {
	      if (resp.status === 429) {
	        // deleting messages too fast
	        const w = (await resp.json()).retry_after * 1000;
	        this.stats.throttledCount++;
	        this.stats.throttledTotalTime += w;
	        this.options.deleteDelay = w; // increase delay
	        log.warn(`Being rate limited by the API for ${w}ms! Adjusted delete delay to ${this.options.deleteDelay}ms.`);
	        this.printStats();
	        log.verb(`Cooling down for ${w * 2}ms before retrying...`);
	        await this.waitWithTracking(w * 2);
	        return 'RETRY';
	      } else {
	        const body = await resp.text();

	        try {
	          const r = JSON.parse(body);

	          if (resp.status === 400 && r.code === 50083) {
	            // 400 can happen if the thread is archived (code=50083)
	            // in this case we need to "skip" this message from the next search
	            // otherwise it will come up again in the next page (and fail to delete again)
	            log.warn('Error deleting message (Thread is archived). Will increment offset so we don\'t search this in the next page...');
	            this.state.offset++;
	            this.state.failCount++;
	            return 'FAIL_SKIP'; // Failed but we will skip it next time
	          }

	          log.error(`Error deleting message, API responded with status ${resp.status}!`, r);
	          log.verb('Related object:', redact(JSON.stringify(message)));
	          this.state.failCount++;
	          return 'FAILED';
	        } catch (e) {
	          log.error(`Fail to parse JSON. API responded with status ${resp.status}!`, body);
	        }
	      }
	    }

	    this.state.delCount++;
	    return 'OK';
	  }

	  #beforeTs = 0; // used to calculate latency
	  beforeRequest() {
	    this.#beforeTs = Date.now();
	  }
	  afterRequest() {
	    this.stats.lastPing = (Date.now() - this.#beforeTs);
	    this.stats.avgPing = this.stats.avgPing > 0 ? (this.stats.avgPing * 0.9) + (this.stats.lastPing * 0.1) : this.stats.lastPing;
	  }

	  printStats() {
	    log.verb(
	      `Delete delay: ${this.options.deleteDelay}ms, Search delay: ${this.options.searchDelay}ms`,
	      `Last Ping: ${this.stats.lastPing}ms, Average Ping: ${this.stats.avgPing | 0}ms`,
	    );
	    log.verb(
	      `Rate Limited: ${this.stats.throttledCount} times.`,
	      `Total time throttled: ${msToHMS(this.stats.throttledTotalTime)}.`
	    );
	  }
	}

	const MOVE = 0;
	const RESIZE_T = 1;
	const RESIZE_B = 2;
	const RESIZE_L = 4;
	const RESIZE_R = 8;
	const RESIZE_TL = RESIZE_T + RESIZE_L;
	const RESIZE_TR = RESIZE_T + RESIZE_R;
	const RESIZE_BL = RESIZE_B + RESIZE_L;
	const RESIZE_BR = RESIZE_B + RESIZE_R;

	/**
	 * Make an element draggable/resizable
	 * @author Victor N. wwww.vitim.us
	 */
	class DragResize {
	  constructor({ elm, moveHandle, options }) {
	    this.options = defaultArgs({
	      enabledDrag: true,
	      enabledResize: true,
	      minWidth: 200,
	      maxWidth: Infinity,
	      minHeight: 100,
	      maxHeight: Infinity,
	      dragAllowX: true,
	      dragAllowY: true,
	      resizeAllowX: true,
	      resizeAllowY: true,
	      draggingClass: 'drag',
	      useMouseEvents: true,
	      useTouchEvents: true,
	      createHandlers: true,
	    }, options);
	    Object.assign(this, options);
	    options = undefined;

	    elm.style.position = 'fixed';

	    this.drag_m = new Draggable(elm, moveHandle, MOVE, this.options);

	    if (this.options.createHandlers) {
	      this.el_t = createElement('div', { name: 'grab-t' }, elm);
	      this.drag_t = new Draggable(elm, this.el_t, RESIZE_T, this.options);
	      this.el_r = createElement('div', { name: 'grab-r' }, elm);
	      this.drag_r = new Draggable(elm, this.el_r, RESIZE_R, this.options);
	      this.el_b = createElement('div', { name: 'grab-b' }, elm);
	      this.drag_b = new Draggable(elm, this.el_b, RESIZE_B, this.options);
	      this.el_l = createElement('div', { name: 'grab-l' }, elm);
	      this.drag_l = new Draggable(elm, this.el_l, RESIZE_L, this.options);
	      this.el_tl = createElement('div', { name: 'grab-tl' }, elm);
	      this.drag_tl = new Draggable(elm, this.el_tl, RESIZE_TL, this.options);
	      this.el_tr = createElement('div', { name: 'grab-tr' }, elm);
	      this.drag_tr = new Draggable(elm, this.el_tr, RESIZE_TR, this.options);
	      this.el_br = createElement('div', { name: 'grab-br' }, elm);
	      this.drag_br = new Draggable(elm, this.el_br, RESIZE_BR, this.options);
	      this.el_bl = createElement('div', { name: 'grab-bl' }, elm);
	      this.drag_bl = new Draggable(elm, this.el_bl, RESIZE_BL, this.options);
	    }
	  }
	}

	class Draggable {
	  constructor(targetElm, handleElm, op, options) {
	    Object.assign(this, options);
	    options = undefined;

	    this._targetElm = targetElm;
	    this._handleElm = handleElm;

	    let vw = window.innerWidth;
	    let vh = window.innerHeight;
	    let initialX, initialY, initialT, initialL, initialW, initialH;

	    const clamp = (value, min, max) => value < min ? min : value > max ? max : value;

	    const moveOp = (x, y) => {
	      const deltaX = (x - initialX);
	      const deltaY = (y - initialY);
	      const t = clamp(initialT + deltaY, 0, vh - initialH);
	      const l = clamp(initialL + deltaX, 0, vw - initialW);
	      this._targetElm.style.top = t + 'px';
	      this._targetElm.style.left = l + 'px';
	    };

	    const resizeOp = (x, y) => {
	      x = clamp(x, 0, vw);
	      y = clamp(y, 0, vh);
	      const deltaX = (x - initialX);
	      const deltaY = (y - initialY);
	      const resizeDirX = (op & RESIZE_L) ? -1 : 1;
	      const resizeDirY = (op & RESIZE_T) ? -1 : 1;
	      const deltaXMax = (this.maxWidth - initialW);
	      const deltaXMin = (this.minWidth - initialW);
	      const deltaYMax = (this.maxHeight - initialH);
	      const deltaYMin = (this.minHeight - initialH);
	      const t = initialT + clamp(deltaY * resizeDirY, deltaYMin, deltaYMax) * resizeDirY;
	      const l = initialL + clamp(deltaX * resizeDirX, deltaXMin, deltaXMax) * resizeDirX;
	      const w = initialW + clamp(deltaX * resizeDirX, deltaXMin, deltaXMax);
	      const h = initialH + clamp(deltaY * resizeDirY, deltaYMin, deltaYMax);
	      if (op & RESIZE_T) { // resize ↑
	        this._targetElm.style.top = t + 'px';
	        this._targetElm.style.height = h + 'px';
	      }
	      if (op & RESIZE_B) { // resize ↓
	        this._targetElm.style.height = h + 'px';
	      }
	      if (op & RESIZE_L) { // resize ←
	        this._targetElm.style.left = l + 'px';
	        this._targetElm.style.width = w + 'px';
	      }
	      if (op & RESIZE_R) { // resize →
	        this._targetElm.style.width = w + 'px';
	      }
	    };

	    let operation = op === MOVE ? moveOp : resizeOp;

	    function dragStartHandler(e) {
	      const touch = e.type === 'touchstart';
	      if ((e.buttons === 1 || e.which === 1) || touch) {
	        e.preventDefault();
	        const x = touch ? e.touches[0].clientX : e.clientX;
	        const y = touch ? e.touches[0].clientY : e.clientY;
	        initialX = x;
	        initialY = y;
	        vw = window.innerWidth;
	        vh = window.innerHeight;
	        initialT = this._targetElm.offsetTop;
	        initialL = this._targetElm.offsetLeft;
	        initialW = this._targetElm.clientWidth;
	        initialH = this._targetElm.clientHeight;
	        if (this.useMouseEvents) {
	          document.addEventListener('mousemove', this._dragMoveHandler);
	          document.addEventListener('mouseup', this._dragEndHandler);
	        }
	        if (this.useTouchEvents) {
	          document.addEventListener('touchmove', this._dragMoveHandler, { passive: false });
	          document.addEventListener('touchend', this._dragEndHandler);
	        }
	        this._targetElm.classList.add(this.draggingClass);
	      }
	    }

	    function dragMoveHandler(e) {
	      e.preventDefault();
	      let x, y;
	      const touch = e.type === 'touchmove';
	      if (touch) {
	        const t = e.touches[0];
	        x = t.clientX;
	        y = t.clientY;
	      } else { //mouse
	        // If the button is not down, dispatch a "fake" mouse up event, to stop listening to mousemove
	        // This happens when the mouseup is not captured (outside the browser)
	        if ((e.buttons || e.which) !== 1) {
	          this._dragEndHandler();
	          return;
	        }
	        x = e.clientX;
	        y = e.clientY;
	      }
	      // perform drag / resize operation
	      operation(x, y);
	    }

	    function dragEndHandler(e) {
	      if (this.useMouseEvents) {
	        document.removeEventListener('mousemove', this._dragMoveHandler);
	        document.removeEventListener('mouseup', this._dragEndHandler);
	      }
	      if (this.useTouchEvents) {
	        document.removeEventListener('touchmove', this._dragMoveHandler);
	        document.removeEventListener('touchend', this._dragEndHandler);
	      }
	      this._targetElm.classList.remove(this.draggingClass);
	    }

	    // We need to bind the handlers to this instance
	    this._dragStartHandler = dragStartHandler.bind(this);
	    this._dragMoveHandler = dragMoveHandler.bind(this);
	    this._dragEndHandler = dragEndHandler.bind(this);

	    this.enable();
	  }

	  /** Turn on the drag and drop of the instance */
	  enable() {
	    this.destroy(); // prevent events from getting binded twice
	    if (this.useMouseEvents) this._handleElm.addEventListener('mousedown', this._dragStartHandler);
	    if (this.useTouchEvents) this._handleElm.addEventListener('touchstart', this._dragStartHandler, { passive: false });
	  }

	  /** Teardown all events bound to the document and elements. You can resurrect this instance by calling enable() */
	  destroy() {
	    this._targetElm.classList.remove(this.draggingClass);
	    if (this.useMouseEvents) {
	      this._handleElm.removeEventListener('mousedown', this._dragStartHandler);
	      document.removeEventListener('mousemove', this._dragMoveHandler);
	      document.removeEventListener('mouseup', this._dragEndHandler);
	    }
	    if (this.useTouchEvents) {
	      this._handleElm.removeEventListener('touchstart', this._dragStartHandler);
	      document.removeEventListener('touchmove', this._dragMoveHandler);
	      document.removeEventListener('touchend', this._dragEndHandler);
	    }
	  }
	}

	function createElement(tag='div', attrs, parent) {
	  const elm = document.createElement(tag);
	  if (attrs) Object.entries(attrs).forEach(([k, v]) => elm.setAttribute(k, v));
	  if (parent) parent.appendChild(elm);
	  return elm;
	}

	function defaultArgs(defaults, options) {
	  function isObj(x) { return x !== null && typeof x === 'object'; }
	  function hasOwn(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
	  if (isObj(options)) for (let prop in defaults) {
	    if (hasOwn(defaults, prop) && hasOwn(options, prop) && options[prop] !== undefined) {
	      if (isObj(defaults[prop])) defaultArgs(defaults[prop], options[prop]);
	      else defaults[prop] = options[prop];
	    }
	  }
	  return defaults;
	}

	function createElm(html) {
	  const temp = document.createElement('div');
	  temp.innerHTML = html;
	  return temp.removeChild(temp.firstElementChild);
	}

	function insertCss(css) {
	  const style = document.createElement('style');
	  style.appendChild(document.createTextNode(css));
	  document.head.appendChild(style);
	  return style;
	}

	const messagePickerCss = `
body.undiscord-pick-message [data-list-id="chat-messages"] {
  background-color: var(--background-secondary-alt);
  box-shadow: inset 0 0 0px 2px var(--button-outline-brand-border);
}

body.undiscord-pick-message [id^="message-content-"]:hover {
  cursor: pointer;
  cursor: cell;
  background: var(--background-message-automod-hover);
}
body.undiscord-pick-message [id^="message-content-"]:hover::after {
  position: absolute;
  top: calc(50% - 11px);
  left: 4px;
  z-index: 1;
  width: 65px;
  height: 22px;
  line-height: 22px;
  font-family: var(--font-display);
  background-color: var(--button-secondary-background);
  color: var(--header-secondary);
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
  border-radius: 3px;
  content: 'This 👉';
}
body.undiscord-pick-message.before [id^="message-content-"]:hover::after {
  content: 'Before 👆';
}
body.undiscord-pick-message.after [id^="message-content-"]:hover::after {
  content: 'After 👇';
}
`;

	const messagePicker = {
	  init() {
	    insertCss(messagePickerCss);
	  },
	  grab(auxiliary) {
	    return new Promise((resolve, reject) => {
	      document.body.classList.add('undiscord-pick-message');
	      if (auxiliary) document.body.classList.add(auxiliary);
	      function clickHandler(e) {
	        const message = e.target.closest('[id^="message-content-"]');
	        if (message) {
	          e.preventDefault();
	          e.stopPropagation();
	          e.stopImmediatePropagation();
	          if (auxiliary) document.body.classList.remove(auxiliary);
	          document.body.classList.remove('undiscord-pick-message');
	          document.removeEventListener('click', clickHandler);
	          try {
	            resolve(message.id.match(/message-content-(\d+)/)[1]);
	          } catch (e) {
	            resolve(null);
	          }
	        }
	      }
	      document.addEventListener('click', clickHandler);
	    });
	  }
	};
	window.messagePicker = messagePicker;

	function getTokenFromWebpack(globalObj) {
	  const chunkKeys = Object.keys(globalObj).filter(
	    k => k.startsWith('webpackChunk') && Array.isArray(globalObj[k])
	  );

	  let req = null;
	  let foundKey = null;
	  for (const key of chunkKeys) {
	    const chunk = globalObj[key];
	    if (!chunk || typeof chunk.push !== 'function') continue;
	    try {
	      const tokenId = `__undiscord__${Date.now()}`;
	      chunk.push([[tokenId], {}, r => { req = r; }]);
	      if (req?.c) {
	        foundKey = key;
	        break;
	      }
	    } catch {}
	  }

	  if (!req && typeof globalObj.__webpack_require__ === 'function' && globalObj.__webpack_require__.c) {
	    req = globalObj.__webpack_require__;
	    foundKey = '__webpack_require__';
	  }

	  if (!req?.c) throw new Error('webpack require not found');

	  const modules = Object.values(req.c);
	  const mod = modules.find(m =>
	    m?.exports?.default?.getToken ||
	    m?.exports?.getToken
	  );

	  if (!mod) {
	    throw new Error(`getToken module not found (chunk=${foundKey || 'unknown'})`);
	  }

	  if (mod?.exports?.default?.getToken) return mod.exports.default.getToken();
	  if (mod?.exports?.getToken) return mod.exports.getToken();
	  throw new Error('getToken export not callable');
	}

	function getTokenFromPageContext() {
	  return new Promise((resolve, reject) => {
	    const reqId = `undiscord_token_${Date.now()}_${Math.random().toString(36).slice(2)}`;
	    const timeoutMs = 3000;
	    let done = false;

	    function cleanup() {
	      if (done) return;
	      done = true;
	      window.removeEventListener('message', onMessage);
	    }

	    function onMessage(event) {
	      if (event.source !== window) return;
	      const data = event.data;
	      if (!data || data.source !== 'undiscord' || data.id !== reqId) return;
	      cleanup();
	      if (data.error) {
	        reject(new Error(data.error));
	      } else {
	        resolve(data.token || '');
	      }
	    }

	    window.addEventListener('message', onMessage);

	    const script = document.createElement('script');
	    script.textContent = `(function(){try{
  var globalObj = window;
  var chunkKeys = Object.keys(globalObj).filter(function(k){return k.indexOf('webpackChunk')===0 && Array.isArray(globalObj[k]);});
  var req = null;
  var foundKey = null;
  for (var i=0;i<chunkKeys.length;i++){
    var key = chunkKeys[i];
    var chunk = globalObj[key];
    if (!chunk || typeof chunk.push !== 'function') continue;
    try {
      var tokenId = '__undiscord__' + Date.now();
      chunk.push([[tokenId], {}, function(r){ req = r; }]);
      if (req && req.c){ foundKey = key; break; }
    } catch(e){}
  }
  if (!req && typeof globalObj.__webpack_require__ === 'function' && globalObj.__webpack_require__.c){
    req = globalObj.__webpack_require__;
    foundKey = '__webpack_require__';
  }
  if (!req || !req.c) throw new Error('webpack require not found');
  var modules = Object.values(req.c);
  var mod = modules.find(function(m){ return (m && m.exports && m.exports.default && m.exports.default.getToken) || (m && m.exports && m.exports.getToken); });
  if (!mod) throw new Error('getToken module not found (chunk=' + (foundKey || 'unknown') + ')');
  var token = null;
  if (mod.exports && mod.exports.default && mod.exports.default.getToken) token = mod.exports.default.getToken();
  else if (mod.exports && mod.exports.getToken) token = mod.exports.getToken();
  else throw new Error('getToken export not callable');
  window.postMessage({source:'undiscord', id:'${reqId}', token: token}, '*');
}catch(e){
  window.postMessage({source:'undiscord', id:'${reqId}', error: String(e && (e.message || e))}, '*');
}})();`;
	    (document.head || document.documentElement).appendChild(script);
	    script.remove();

	    setTimeout(() => {
	      cleanup();
	      reject(new Error('token request timeout'));
	    }, timeoutMs);
	  });
	}

	async function getToken() {
	  window.dispatchEvent(new Event('beforeunload'));
	  const LS = document.body.appendChild(document.createElement('iframe')).contentWindow.localStorage;
	  try {
	    return JSON.parse(LS.token);
	  } catch {
	    log.info('Could not automatically detect Authorization Token in local storage!');
	    log.info('Attempting to grab token using webpack');
	    try {
	      return getTokenFromWebpack(window);
	    } catch (err) {
	      log.warn('Webpack token extraction failed in content world, trying page context...', err);
	      try {
	        return await getTokenFromPageContext();
	      } catch (err2) {
	        log.warn('Page-context token extraction failed.', err2);
	        throw err2;
	      }
	    }
	  }
	}

	function getAuthorId() {
	  const LS = document.body.appendChild(document.createElement('iframe')).contentWindow.localStorage;
	  return JSON.parse(LS.user_id_cache);
	}

  function getGuildId({ silent = false } = {}) {
    const m = location.href.match(/channels\/([\w@]+)\/(\d+)/);
    if (m) return m[1];
    if (!silent) alert('Could not find the Guild ID!\nPlease make sure you are on a Server or DM.');
    return null;
  }

  function getChannelId({ silent = false } = {}) {
    const m = location.href.match(/channels\/([\w@]+)\/(\d+)/);
    if (m) return m[2];
    if (!silent) alert('Could not find the Channel ID!\nPlease make sure you are on a Channel or DM.');
    return null;
  }


	async function fillToken() {
	  try {
	    return await getToken();
	  } catch (err) {
	    // Discord changes frequently; auto token extraction is brittle and may stop working.
	    log.warn('Could not automatically detect Authorization Token (Discord likely changed how it stores/exposes it).');
	    log.info('Please enter the token manually in the "Advanced settings" section.');
	    log.debug('Auto-detection failure details:', err);
	  }
	  return '';
	}

	const PREFIX = '[UNDISCORD]';

	// -------------------------- User interface ------------------------------- //

	// links
	const HOME = 'https://github.com/victornpb/undiscord';
	const WIKI = 'https://github.com/victornpb/undiscord/wiki';

	const undiscordCore = new UndiscordCore();
	messagePicker.init();

	const ui = {
	  undiscordWindow: null,
	  undiscordBtn: null,
	  logArea: null,
	  autoScroll: null,

	  // progress handler
	  progressMain: null,
	  progressIcon: null,
	  progressBarPercent: null,
	  percent: null,

    verboseMode: null,
    hideAuthorText: null,
    hideMessageText: null,
    redact: null,
    convBadge: null,
    convName: null,
    convAvatar: null,
	};
	const $ = s => ui.undiscordWindow.querySelector(s);

	function initUI() {

	  insertCss(themeCss);
	  insertCss(mainCss);
	  insertCss(dragCss);
    insertCss(undiscordUiCss);

	  // create undiscord window
	  const undiscordUI = replaceInterpolations(undiscordTemplate, {
	    VERSION,
	    HOME,
	    WIKI,
	  });
	  ui.undiscordWindow = createElm(undiscordUI);
	  document.body.appendChild(ui.undiscordWindow);

    // ---------- Auto update IDs on conversation change ----------
    function isUndiscordOpen() {
      return ui.undiscordWindow && ui.undiscordWindow.style.display !== 'none';
    }

    let lastRoute = location.pathname;
    let requestButtonRemount = () => {};

    function onConversationChange() {
      const route = location.pathname;
      if (route !== lastRoute) {
        lastRoute = route;
        if (isUndiscordOpen() && !undiscordCore.state.running) {
          safeAutofillFields();
        }
      }
      scheduleConversationBadgeUpdate();
    }


    // Hook navigation SPA Discord
    (function hookDiscordNavigation() {
      const push = history.pushState;
      const replace = history.replaceState;

      history.pushState = function () {
        const r = push.apply(this, arguments);
        queueMicrotask(() => {
          onConversationChange();
          requestButtonRemount();
        });
        return r;
      };

      history.replaceState = function () {
        const r = replace.apply(this, arguments);
        queueMicrotask(onConversationChange);
        return r;
      };

      window.addEventListener('popstate', onConversationChange);
    })();
    const chatObserver = new MutationObserver(() => {
      onConversationChange();
    });

    const appMount = document.querySelector('#app-mount');
    if (appMount) {
      chatObserver.observe(appMount, {
        childList: true,
        subtree: false
      });
    }

	  // enable drag and resize on undiscord window
	  new DragResize({ elm: ui.undiscordWindow, moveHandle: $('.header') });

	  // create undiscord Trash icon
	  ui.undiscordBtn = createElm(buttonHtml);
	  ui.undiscordBtn.onclick = toggleWindow;

    // ====== ROBUST MOUNT (language-free, without patch history) ======
    (function mountUndiscordButtonRobust(btn, onRouteMaybeChanged) {
      const ROOT_SEL = '#app-mount';
      const BTN_ID = 'undicord-btn';

      // Ensure a stable id (useful to avoid duplicates)
      if (!btn.id) btn.id = BTN_ID;

      function isVisible(el) {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && r.bottom > 0 && r.right > 0;
      }

      function findTopCombobox() {
        // Discord often has multiple comboboxes. Pick the highest visible one.
        const all = Array.from(document.querySelectorAll(
          `${ROOT_SEL} [role="combobox"][contenteditable="true"]`
        ));
        const visible = all.filter(isVisible);
        if (!visible.length) return null;
        visible.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
        return visible[0];
      }

      function findToolbarFrom(el) {
        // Walk up to a "top" container that contains many buttons
        let p = el;
        for (let i = 0; i < 40 && p; i++) {
          if (p.nodeType === 1) {
            const top = p.getBoundingClientRect().top;
            if (top <= 180) {
              const buttons = p.querySelectorAll?.('[role="button"]').length || 0;
              const hasCombo = !!p.querySelector?.('[role="combobox"][contenteditable="true"]');
              // "toolbar" heuristic
              if (buttons >= 3 && hasCombo) return p;
            }
          }
          p = p.parentElement;
        }
        return null;
      }

      function findSearchBlock(combobox, toolbar) {
        // Find a block that contains the combobox + at least 1 svg (search/clear)
        let p = combobox;
        for (let i = 0; i < 18 && p && p !== toolbar; i++) {
          if (toolbar.contains(p)) {
            const hasSvg = !!p.querySelector?.('svg');
            const hasCombo = !!p.querySelector?.('[role="combobox"][contenteditable="true"]');
            if (hasSvg && hasCombo) return p;
          }
          p = p.parentElement;
        }
        return null;
      }

      function ensureMounted() {
        const root = document.querySelector(ROOT_SEL);
        if (!root) return false;

        const combobox = findTopCombobox();
        if (!combobox) return false;

        const toolbar = findToolbarFrom(combobox);
        if (!toolbar) return false;

        // If already in this toolbar, just ensure styling
        if (toolbar.contains(btn)) {
          btn.style.order = '9999';
          btn.style.marginLeft = '8px';
          btn.style.flex = '0 0 auto';
          return true;
        }

        const searchBlock = findSearchBlock(combobox, toolbar);

        // Insert after the most "top-level" search block under the toolbar
        if (searchBlock) {
          let top = searchBlock;
          while (top.parentElement && top.parentElement !== toolbar) top = top.parentElement;
          top.insertAdjacentElement('afterend', btn);
        } else {
          toolbar.appendChild(btn);
        }

        btn.style.order = '9999';
        btn.style.marginLeft = '8px';
        btn.style.flex = '0 0 auto';
        return true;
      }

      // Anti-spam scheduler
      let scheduled = false;
      const schedule = () => {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(() => {
          scheduled = false;

          const ok = ensureMounted();
          // Optional: auto-refresh fields when Discord changes view
          if (ok && typeof onRouteMaybeChanged === 'function') onRouteMaybeChanged();
        });
      };
      requestButtonRemount = schedule;

      // Observe DOM (Discord = SPA, everything shows up in the DOM)
      const root = document.querySelector(ROOT_SEL);
      if (!root) return;

      // Broad observer, throttled by schedule()
      const obs = new MutationObserver(schedule);
      obs.observe(root, { childList: true, subtree: true });

      // Initial mount
      schedule();
    })(ui.undiscordBtn, onConversationChange);


    function safeAutofillFields() {
      if (undiscordCore?.state?.running) return;

      try {
        const v = getAuthorId();
        if (v) $('input#authorId').value = v;
      } catch {}

      try {
        const v = getGuildId({ silent: true });
        if (v) $('input#guildId').value = v;
      } catch {}

      try {
        const v = getChannelId({ silent: true });
        if (v) $('input#channelId').value = v;
      } catch {}
    }

    function isVisible(el) {
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && r.bottom > 0 && r.right > 0;
    }

    function isValidDiscordAvatarUrl(url) {
      if (!url || typeof url !== 'string') return false;
      return /https:\/\/(cdn|media)\.discord(app)?\.com\/(avatars|embed\/avatars|icons|guilds|users)\//.test(url);
    }

    function normalizeConvName(text) {
      return String(text || '')
        .trim();
    }

    function isGenericConversationLabel(text) {
      const t = normalizeConvName(text);
      return !t || /^[#@]?$/.test(t) || /^\d+$/.test(t);
    }

    function extractNameFromContainer(container) {
      if (!container) return '';
      const nameHost = container.querySelector('[class*="name__"] [class*="overflowTooltip"]')
        || container.querySelector('[class*="overflowTooltip"]')
        || container.querySelector('[data-text-variant]')
        || container;
      if (!nameHost) return '';

      const clone = nameHost.cloneNode(true);
      clone.querySelectorAll(
        '[class*="chiplet"], [class*="clanTag"], [class*="tagText"], [class*="badge"], [class*="hiddenVisually"], img, svg'
      ).forEach(n => n.remove());

      const name = normalizeConvName(clone.textContent || '');
      return isGenericConversationLabel(name) ? '' : name;
    }

    function getConversationInfoFromDom(channelId, guildId) {
      let name = '';
      let avatar = '';

      const header = Array.from(document.querySelectorAll('#app-mount header')).find(isVisible) || null;
      if (header) {
        // Prefer DM header content first to avoid generic header fallback while scrolling.
        const dmTitle = header.querySelector('.children__9293f .titleWrapper__9293f h1 span:not([class*="hiddenVisually"])')
          || header.querySelector('[class*="children__"] [class*="titleWrapper__"] h1 span:not([class*="hiddenVisually"])');
        if (dmTitle) {
          const dmName = normalizeConvName(dmTitle.textContent || '');
          if (!isGenericConversationLabel(dmName)) name = dmName;
        }
        const dmAvatar = header.querySelector('.children__9293f [class*="avatarStack"] img')
          || header.querySelector('[class*="children__"] [class*="avatarStack"] img');
        if (dmAvatar?.src && isValidDiscordAvatarUrl(dmAvatar.src)) avatar = dmAvatar.src;

        const heading = header.querySelector('h1, h2, [role="heading"]');
        if (!name) name = extractNameFromContainer(heading || header);
      }

      // Try exact conversation row from sidebar (works without token in many layouts)
      if ((!name || !avatar) && channelId) {
        const hrefPart = `/channels/${guildId || '@me'}/${channelId}`;
        const row = Array.from(document.querySelectorAll(`#app-mount a[href*="${hrefPart}"]`)).find(isVisible) || null;
        if (row) {
          name = name || extractNameFromContainer(row);
          const rowImg = Array.from(row.querySelectorAll('img')).find(i => isValidDiscordAvatarUrl(i.src));
          if (rowImg?.src) avatar = avatar || rowImg.src;
        }
      }

      if (!name) {
        const selected = Array.from(document.querySelectorAll('#app-mount [aria-selected="true"]')).find(isVisible) || null;
        if (selected) {
          name = extractNameFromContainer(selected);

          const img = Array.from(selected.querySelectorAll('img')).find(i => isValidDiscordAvatarUrl(i.src));
          if (img?.src) avatar = img.src;
        }
      }

      if (!avatar) {
        const header = Array.from(document.querySelectorAll('#app-mount header')).find(isVisible) || null;
        const img = header ? Array.from(header.querySelectorAll('img')).find(i => isValidDiscordAvatarUrl(i.src)) : null;
        if (img?.src) avatar = img.src;
      }

      return { name, avatar };
    }

    function getAuthTokenForConv() {
      try {
        const v = $('input#token')?.value?.trim();
        if (v) return v;
      } catch {}
      try {
        const v = undiscordCore?.options?.authToken;
        if (typeof v === 'string' && v.trim()) return v.trim();
      } catch {}
      return '';
    }

    async function fetchSelfUserId(token) {
      const r = await fetch('https://discord.com/api/v9/users/@me', {
        headers: { Authorization: token }
      });
      if (!r.ok) throw new Error('GET /users/@me failed: ' + r.status);
      const me = await r.json();
      return me?.id || '';
    }

    function cdnDefaultAvatarUrl(userId, discriminator, size = 32) {
      try {
        const disc = String(discriminator ?? '0');
        if (disc === '0') {
          const mod = Number(BigInt(userId) >> 22n) % 6;
          return `https://cdn.discordapp.com/embed/avatars/${mod}.png?size=${size}`;
        }
        const idx = parseInt(disc, 10) % 5;
        return `https://cdn.discordapp.com/embed/avatars/${idx}.png?size=${size}`;
      } catch {
        return `https://cdn.discordapp.com/embed/avatars/0.png?size=${size}`;
      }
    }

    const convCache = new Map();
    let convFetchPromise = null;
    async function fetchConversationInfoFromApi(channelId) {
      const token = getAuthTokenForConv();
      if (!token || !channelId) return null;
      const key = `ch:${channelId}`;
      if (convCache.has(key)) return convCache.get(key);
      if (convFetchPromise) return convFetchPromise;

      convFetchPromise = (async () => {
        try {
          const [chResp, selfId] = await Promise.all([
            fetch(`https://discord.com/api/v9/channels/${channelId}`, { headers: { Authorization: token } }),
            fetchSelfUserId(token)
          ]);
          if (!chResp.ok) return null;
          const data = await chResp.json();
          const recips = Array.isArray(data?.recipients) ? data.recipients : [];
          let other = null;
          if (selfId) other = recips.find(r => r?.id && r.id !== selfId) || null;
          if (!other && recips.length) other = recips[0];

          const name = normalizeConvName(other?.global_name || other?.username || data?.name || '');
          let avatar = '';
          if (other?.id) {
            if (other?.avatar) {
              const ext = String(other.avatar).startsWith('a_') ? 'gif' : 'png';
              avatar = `https://cdn.discordapp.com/avatars/${other.id}/${other.avatar}.${ext}?size=32`;
            } else {
              avatar = cdnDefaultAvatarUrl(other.id, other?.discriminator ?? '0', 32);
            }
          }
          const info = { name, avatar };
          convCache.set(key, info);
          return info;
        } catch {
          return null;
        } finally {
          convFetchPromise = null;
        }
      })();

      return convFetchPromise;
    }

    const convStable = { name: '', avatar: '' };
    let badgeTimer = null;
    let lastBadgeRunAt = 0;
    const BADGE_MIN_INTERVAL_MS = 250;
    let lastBadgeWarnNoTokenAt = 0;
    function scheduleConversationBadgeUpdate(delayMs = 0) {
      clearTimeout(badgeTimer);
      badgeTimer = setTimeout(() => {
        const elapsed = Date.now() - lastBadgeRunAt;
        if (elapsed < BADGE_MIN_INTERVAL_MS) {
          return scheduleConversationBadgeUpdate(BADGE_MIN_INTERVAL_MS - elapsed);
        }
        lastBadgeRunAt = Date.now();
        updateConversationBadgeNow();
      }, Math.max(0, delayMs));
    }

    function updateConversationBadgeNow() {
      if (!ui.convBadge || !ui.convName || !ui.convAvatar) return;
      const c = $('input#channelId')?.value?.trim() || getChannelId({ silent: true }) || '';
      const g = $('input#guildId')?.value?.trim() || getGuildId({ silent: true }) || '';
      const isDm = g === '@me';

      if (!c) {
        ui.convBadge.style.display = 'none';
        return;
      }

      const dom = getConversationInfoFromDom(c, g);
      const name = dom.name || convStable.name || (isDm ? 'DM' : `Channel ${c}`);
      const avatar = dom.avatar || convStable.avatar || '';

      ui.convBadge.style.display = '';
      ui.convName.textContent = name || 'Conversation';
      if (avatar) {
        ui.convAvatar.src = avatar;
        ui.convAvatar.style.display = '';
      } else {
        ui.convAvatar.style.display = 'none';
      }
      if (name) convStable.name = name;
      if (avatar) convStable.avatar = avatar;

      if (!isDm) return;
      const token = getAuthTokenForConv();
      if (!token) {
        const now = Date.now();
        if (now - lastBadgeWarnNoTokenAt > 15000) {
          lastBadgeWarnNoTokenAt = now;
          log.warn('conv:badge:no-token');
        }
        return;
      }
      fetchConversationInfoFromApi(c).then((info) => {
        if (!info) return;
        const nextName = info.name || ui.convName.textContent || 'DM';
        ui.convName.textContent = nextName;
        if (info.avatar) {
          ui.convAvatar.src = info.avatar;
          ui.convAvatar.style.display = '';
        }
        convStable.name = nextName;
        if (info.avatar) convStable.avatar = info.avatar;
      });
    }


    function toggleWindow() {
      const isOpen = ui.undiscordWindow.style.display !== 'none';

      if (isOpen) {
        ui.undiscordWindow.style.display = 'none';
        ui.undiscordBtn.style.color = 'var(--interactive-normal)';
      } else {
        ui.undiscordWindow.style.display = '';
        ui.undiscordBtn.style.color = 'var(--interactive-active)';

        // Auto-fill only on open, and only if not running
        safeAutofillFields();
        scheduleConversationBadgeUpdate();
      }
    }


	  // cached elements
	  ui.logArea = $('#logArea');
	  ui.autoScroll = $('#autoScroll');
	  ui.progressMain = $('#progressBar');
	  ui.progressIcon = ui.undiscordBtn.querySelector('progress');
	  ui.progressBarPercent = $('#progressBarPercent');
	  ui.percent = $('#progressPercent');
    ui.verboseMode = $('#verboseMode');
    ui.hideAuthorText = $('#hideAuthorText');
    ui.hideMessageText = $('#hideMessageText');
    ui.redact = $('#redact');
    ui.convBadge = $('#convBadge');
    ui.convName = $('#convName');
    ui.convAvatar = $('#convAvatar');
    function applyVerboseUI() {
      const on = !!ui.verboseMode.checked;
      ui.undiscordWindow.classList.toggle('verbose', on);
      renderLogsForMode(on ? 'verbose' : 'compact');
      if (ui.autoScroll?.checked) {
        // Wait for render + style recalculation, then snap to bottom reliably.
        requestAnimationFrame(() => requestAnimationFrame(() => scrollLogToBottom({ smooth: true })));
      }
    }

    ui.verboseMode.onchange = applyVerboseUI;
    applyVerboseUI();
    scheduleConversationBadgeUpdate();



	  // register event listeners
	  $('#hide').onclick = toggleWindow;
	  $('#toggleSidebar').onclick = ()=> ui.undiscordWindow.classList.toggle('hide-sidebar');
	  $('button#start').onclick = startAction;
	  $('button#stop').onclick = stopAction;
	  $('button#clear').onclick = () => {
      ui.logArea.innerHTML = '';
      logStore.compact = [];
      logStore.verbose = [];
    };
	  $('button#getAuthor').onclick = () => $('input#authorId').value = getAuthorId();
    $('button#getGuild').onclick = () => {
      const guildInput = $('input#guildId');
      const channelInput = $('input#channelId');

      const g = getGuildId(); // already shows alert if not found
      if (g) {
        guildInput.value = g;
        if (g === '@me') {
          const c = getChannelId(); // already shows alert if not found
          if (c) channelInput.value = c;
        }
        scheduleConversationBadgeUpdate();
      }
    };

    $('button#getChannel').onclick = () => {
      const guildInput = $('input#guildId');
      const channelInput = $('input#channelId');

      const c = getChannelId(); // already shows alert if not found
      if (c) channelInput.value = c;

      const g = getGuildId(); // already shows alert if not found
      if (g) guildInput.value = g;
      scheduleConversationBadgeUpdate();
    };

    let savedHideAuthor = false;
    let savedHideMessage = false;
    function applyRedactInputs(on) {
      const ids = ['authorId', 'guildId', 'channelId'];
      for (const id of ids) {
        const input = $(`input#${id}`);
        if (!input) continue;
        if (on) {
          input.dataset.udPrevType = input.dataset.udPrevType || input.type || 'text';
          input.type = 'password';
        } else if (input.dataset.udPrevType) {
          input.type = input.dataset.udPrevType;
        }
      }
    }
    function applyRedactUI() {
      const on = !!ui.redact?.checked;
      ui.undiscordWindow.classList.toggle('redact', on);

      if (on) {
        savedHideAuthor = !!ui.hideAuthorText?.checked;
        savedHideMessage = !!ui.hideMessageText?.checked;
        if (ui.hideAuthorText) {
          ui.hideAuthorText.checked = true;
          ui.hideAuthorText.disabled = true;
        }
        if (ui.hideMessageText) {
          ui.hideMessageText.checked = true;
          ui.hideMessageText.disabled = true;
        }
      } else {
        if (ui.hideAuthorText) {
          ui.hideAuthorText.disabled = false;
          ui.hideAuthorText.checked = savedHideAuthor;
        }
        if (ui.hideMessageText) {
          ui.hideMessageText.disabled = false;
          ui.hideMessageText.checked = savedHideMessage;
        }
      }

      applyRedactInputs(on);
      applyPrivacyUI();

      // Re-render logs so verbose lines get redacted immediately.
      const mode = ui.verboseMode?.checked ? 'verbose' : 'compact';
      renderLogsForMode(mode);
      if (ui.autoScroll?.checked) {
        requestAnimationFrame(() => scrollLogToBottom({ smooth: true }));
      }
    }
	  ui.redact.onchange = () => {
	    if (!ui.redact.checked) {
        alert('Streamer mode is OFF. Sensitive information may be visible.\nPlease double check before sharing your screen.');
      }
      applyRedactUI();
	  };
    function applyPrivacyUI() {
      const hideAuthorText = !!ui.hideAuthorText?.checked;
      const hideMessageText = !!ui.hideMessageText?.checked;
      ui.undiscordWindow.classList.toggle('hide-author', hideAuthorText);
      ui.undiscordWindow.classList.toggle('hide-text', hideMessageText);

      // Chrome does not consistently support -webkit-text-security on inputs;
      // switching the input type is reliable across browsers.
      try {
        const authorInput = $('input#authorId');
        if (authorInput) {
          if (hideAuthorText) {
            authorInput.dataset.udAuthorType = authorInput.dataset.udAuthorType || authorInput.type || 'text';
            authorInput.type = 'password';
          } else {
            authorInput.type = authorInput.dataset.udAuthorType || 'text';
          }
        }
      } catch {}
    }

    ui.hideAuthorText?.addEventListener('change', applyPrivacyUI);
    ui.hideMessageText?.addEventListener('change', applyPrivacyUI);
    applyPrivacyUI();
    applyRedactUI();

	  $('#pickMessageAfter').onclick = async () => {
	    alert('Select a message on the chat.\nThe message below it will be deleted.');
	    toggleWindow();
	    const id = await messagePicker.grab('after');
	    if (id) $('input#minId').value = id;
	    toggleWindow();
	  };
	  $('#pickMessageBefore').onclick = async () => {
	    alert('Select a message on the chat.\nThe message above it will be deleted.');
	    toggleWindow();
	    const id = await messagePicker.grab('before');
	    if (id) $('input#maxId').value = id;
	    toggleWindow();
	  };
	  $('button#getToken').onclick = async () => {
	    $('input#token').value = await fillToken();
      scheduleConversationBadgeUpdate();
	  };

	  // sync delays
	  $('input#searchDelay').onchange = (e) => {
	    const v = parseInt(e.target.value);
	    if (v) undiscordCore.options.searchDelay = v;
	  };
	  $('input#deleteDelay').onchange = (e) => {
	    const v = parseInt(e.target.value);
	    if (v) undiscordCore.options.deleteDelay = v;
	  };

	  $('input#searchDelay').addEventListener('input', (event) => {
	    $('div#searchDelayValue').textContent = event.target.value + 'ms';
	  });
	  $('input#deleteDelay').addEventListener('input', (event) => {
	    $('div#deleteDelayValue').textContent = event.target.value + 'ms';
	  });

	  // import json
	  const fileSelection = $('input#importJsonInput');
	  fileSelection.onchange = async () => {
	    const files = fileSelection.files;

	    // No files added
	    if (files.length === 0) return log.warn('No file selected.');

	    // Get channel id field to set it later
	    const channelIdField = $('input#channelId');

	    // Force the guild id to be ourself (@me)
	    const guildIdField = $('input#guildId');
	    guildIdField.value = '@me';

	    // Set author id in case its not set already
	    $('input#authorId').value = getAuthorId();
	    try {
	      const file = files[0];
	      const text = await file.text();
	      const json = JSON.parse(text);
	      const channelIds = Object.keys(json);
	      channelIdField.value = channelIds.join(',');
	      log.info(`Loaded ${channelIds.length} channels.`);
	    } catch(err) {
	      log.error('Error parsing file!', err);
	    }
	  };

	  // redirect console logs to inside the window after setting up the UI
	  setLogFn(printLog);

	  setupUndiscordCore();
	}

  function getAvatarURL(author) {
    try {
      const id = author?.id;
      const avatar = author?.avatar;
      const disc = parseInt(author?.discriminator || '0', 10);

      if (id && avatar) {
        // png is OK; you can use .webp too
        return `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=32`;
      }
      // fallback Discord default avatar
      return `https://cdn.discordapp.com/embed/avatars/${(disc % 5)}.png`;
    } catch {
      return `https://cdn.discordapp.com/embed/avatars/0.png`;
    }
  }

  function formatArgs(args) {
    return Array.from(args).map(o =>
      typeof o === 'object'
        ? JSON.stringify(o, o instanceof Error && Object.getOwnPropertyNames(o))
        : String(o)
    ).join('\t');
  }

  function getCurrentAuthorId() {
    try {
      const v = $('input#authorId')?.value?.trim();
      if (v) return v;
    } catch {}
    try {
      const v = undiscordCore?.options?.authorId;
      if (typeof v === 'string' && v.trim()) return v.trim();
    } catch {}
    return '';
  }

  function getCurrentGuildId() {
    try {
      const v = $('input#guildId')?.value?.trim();
      if (v) return v;
    } catch {}
    try {
      const v = undiscordCore?.options?.guildId;
      if (typeof v === 'string' && v.trim()) return v.trim();
    } catch {}
    return '';
  }

  function getCurrentChannelId() {
    try {
      const v = $('input#channelId')?.value?.trim();
      if (v) return v;
    } catch {}
    try {
      const v = undiscordCore?.options?.channelId;
      if (typeof v === 'string' && v.trim()) return v.trim();
    } catch {}
    return '';
  }

  function redactSensitiveInText(text) {
    let result = escapeHTML(text || '');
    const ids = [getCurrentAuthorId(), getCurrentGuildId(), getCurrentChannelId()].filter(Boolean);
    for (const id of ids) {
      const safe = escapeHTML(id);
      if (safe) result = result.split(safe).join('[hidden]');
    }
    return result;
  }

  function renderWithAuthorIdSpans(text) {
    const id = getCurrentAuthorId();
    if (!id) return escapeHTML(text || '');
    const raw = String(text || '');
    const parts = raw.split(id);
    if (parts.length === 1) return escapeHTML(raw);
    const redaction = `<span class="authorText authorId">${escapeHTML(id)}</span><span class="authorHidden authorId">[hidden]</span>`;
    return parts.map(p => escapeHTML(p)).join(redaction);
  }

  function scrollLogToBottom({ smooth = false } = {}) {
    if (!ui?.logArea) return;
    const top = ui.logArea.scrollHeight;
    if (smooth && typeof ui.logArea.scrollTo === 'function') {
      ui.logArea.scrollTo({ top, behavior: 'smooth' });
    } else {
      ui.logArea.scrollTop = top;
    }
  }

  function appendCompactLog(entry) {
    const payload = entry.args[0] || {};
    const avatarUrl = getAvatarURL(payload.author);
    const ts = payload.timestamp ? new Date(payload.timestamp) : entry.time;
    const time = ts.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const date = ts.toLocaleDateString();
    const tag = payload.author ? (payload.author.global_name || payload.author.username || 'Unknown') : 'Unknown';
    const meta = payload.meta || '';
    const content = payload.content || '';
    // NOTE: logArea is a <pre>; avoid whitespace/newlines which render as extra gaps.
    ui.logArea.insertAdjacentHTML(
      'beforeend',
      `<div class="log log-del"><div class="stamp"><div class="date"><span class="d">${escapeHTML(date)}</span><span class="t">${escapeHTML(time)}</span></div></div><img class="authorAvatar" src="${avatarUrl}" alt=""><div class="txt"><div class="head"><div class="author"><span class="authorText">${escapeHTML(tag)}</span><span class="authorHidden">[hidden]</span></div></div><div class="content"><span class="msgText">${escapeHTML(content)}</span><span class="msgHidden">[hidden]</span></div></div><div class="meta">${escapeHTML(meta)}</div></div>`
    );
  }

  function appendVerboseLog(entry) {
    const time = entry.time.toLocaleTimeString([], { hour12: false });
    const badge = entry.type || 'log';
    const authorId = entry.args[0]?.author?.id || '';
    const authorIdHtml = authorId
      ? ` <span class="authorText authorId">(${escapeHTML(authorId)})</span><span class="authorHidden authorId">(hidden)</span>`
      : '';
    const msgHtml = entry.type === 'del'
      ? `<span class="vmeta">${escapeHTML(entry.args[0]?.meta || 'Deleted')}</span>${authorIdHtml} — <span class="msgText">${escapeHTML(entry.args[0]?.content || '')}</span><span class="msgHidden">[hidden]</span>`
      : (ui.redact?.checked ? redactSensitiveInText(formatArgs(entry.args)) : renderWithAuthorIdSpans(formatArgs(entry.args)));

    // NOTE: logArea is a <pre>; avoid whitespace/newlines which render as extra gaps.
    ui.logArea.insertAdjacentHTML(
      'beforeend',
      `<div class="log log-vrow log-${escapeHTML(entry.type)}"><div class="vtime">${escapeHTML(time)}</div><div class="vbadge">${escapeHTML(badge)}</div><div class="vmsg">${msgHtml}</div></div>`
    );
  }

  function renderLogsForMode(mode) {
    ui.logArea.innerHTML = '';
    const entries = logStore[mode] || [];
    for (const entry of entries) {
      if (mode === 'verbose') appendVerboseLog(entry);
      else appendCompactLog(entry);
    }
  }

  function printLog(type = '', args) {
    const entry = { type, args: Array.from(args), time: new Date() };
    logStore.verbose.push(entry);
    if (type === 'del') logStore.compact.push(entry);

    const isVerbose = !!ui.verboseMode?.checked;
    if (isVerbose) {
      appendVerboseLog(entry);
    } else if (type === 'del') {
      appendCompactLog(entry);
    } else {
      return;
    }

    if (ui.autoScroll.checked) scrollLogToBottom();
    if (type === 'error') console.error(PREFIX, ...Array.from(args));
  }


function setupUndiscordCore() {
    let progressTicker = null;
    let displayedRemainingMs = 0;
    let lastRemainingUiUpdateTs = 0;

    function getUiStableRemaining(rawRemainingMs) {
      const now = Date.now();
      const raw = Math.max(0, Number(rawRemainingMs) || 0);

      if (!displayedRemainingMs) {
        displayedRemainingMs = raw;
        lastRemainingUiUpdateTs = now;
      }

      const elapsedSinceUiUpdate = now - lastRemainingUiUpdateTs;
      const minUiIntervalMs = 1800; // avoid visual jitter
      const significantDelta = Math.max(5000, displayedRemainingMs * 0.10);
      const shouldUpdate =
        elapsedSinceUiUpdate >= minUiIntervalMs ||
        Math.abs(raw - displayedRemainingMs) >= significantDelta;

      if (shouldUpdate) {
        const alpha = raw > displayedRemainingMs ? 0.22 : 0.35;
        displayedRemainingMs = displayedRemainingMs + ((raw - displayedRemainingMs) * alpha);

        const step =
          displayedRemainingMs >= 3600000 ? 60000 :
          displayedRemainingMs >= 600000 ? 30000 :
          displayedRemainingMs >= 120000 ? 10000 : 5000;

        displayedRemainingMs = Math.max(0, Math.round(displayedRemainingMs / step) * step);
        lastRemainingUiUpdateTs = now;
      }

      return displayedRemainingMs;
    }

    function renderProgress(state, stats) {
      const value = state.delCount + state.failCount;
      let max = Math.max(0, state.grandTotal - (state._skippedUniqueCount || 0));
      max = Math.max(max, value, 0);

      const percent = value >= 0 && max ? Math.round(value / max * 100) + '%' : '';
      const elapsedMs = stats?.startTime ? (Date.now() - stats.startTime.getTime()) : 0;
      const elapsed = msToHMS(Math.max(0, elapsedMs));
      const remaining = msToHMS(getUiStableRemaining(stats?.etr));

      ui.percent.innerHTML = `${percent} (${value}/${max}) Elapsed: ${elapsed} Remaining: ${remaining}`;
      ui.progressBarPercent.textContent = percent || '...';

      ui.progressIcon.value = value;
      ui.progressMain.value = value;

      if (max) {
        ui.progressIcon.setAttribute('max', max);
        ui.progressMain.setAttribute('max', max);
      } else {
        ui.progressIcon.removeAttribute('value');
        ui.progressMain.removeAttribute('value');
        ui.percent.innerHTML = '...';
      }

      const searchDelayInput = $('input#searchDelay');
      searchDelayInput.value = undiscordCore.options.searchDelay;
      $('div#searchDelayValue').textContent = undiscordCore.options.searchDelay + 'ms';

      const deleteDelayInput = $('input#deleteDelay');
      deleteDelayInput.value = undiscordCore.options.deleteDelay;
      $('div#deleteDelayValue').textContent = undiscordCore.options.deleteDelay + 'ms';
    }

	  undiscordCore.onStart = (state, stats) => {
      ui.undiscordWindow.classList.remove('finished');
      $('#doneBanner').textContent = '';

	    console.log(PREFIX, 'onStart', state, stats);
	    $('#start').disabled = true;
	    $('#stop').disabled = false;

	    ui.undiscordBtn.classList.add('running');
	    ui.progressMain.style.display = 'block';
	    ui.progressBarPercent.style.display = 'block';
	    ui.progressBarPercent.textContent = '0%';
	    ui.percent.style.display = 'block';
      displayedRemainingMs = 0;
      lastRemainingUiUpdateTs = 0;

      if (progressTicker) clearInterval(progressTicker);
      progressTicker = setInterval(() => {
        if (!undiscordCore.state.running) return;
        undiscordCore.calcEtr();
        renderProgress(undiscordCore.state, undiscordCore.stats);
      }, 500);
	  };

	  undiscordCore.onProgress = (state, stats) => {
      renderProgress(state, stats);
	  };

    undiscordCore.onStop = (state, stats) => {
      console.log(PREFIX, 'onStop', state, stats);
      if (progressTicker) {
        clearInterval(progressTicker);
        progressTicker = null;
      }
      displayedRemainingMs = 0;
      lastRemainingUiUpdateTs = 0;

      $('#start').disabled = false;
      $('#stop').disabled = true;
      ui.undiscordBtn.classList.remove('running');
      ui.progressMain.style.display = 'none';
      ui.progressBarPercent.style.display = 'none';
      ui.percent.style.display = 'none';

      // ✅ Normal completion: green bar + success message
      if (state.endReason === 'DONE') {
        const total = state.delCount + state.failCount;
        const skipped = state._skippedUniqueCount || 0;
        const effectiveMax = Math.max(0, state.grandTotal - skipped);
        const max = Math.max(effectiveMax, total);

        // If this happens, Discord search/index likely returned an empty page too early.
        if (effectiveMax > 0 && total < effectiveMax) {
          ui.undiscordWindow.classList.remove('finished');
          const msg = `WARNING: finished early? ${state.delCount} deleted, ${state.failCount} failed. (${total}/${max}) Try increasing Search delay and run again.`;
          $('#doneBanner').textContent = msg;
          log.warn(msg);
        } else {
          ui.undiscordWindow.classList.add('finished');
          const msg = `✅ Completed: ${state.delCount} deleted, ${state.failCount} failed. (${total}/${max})`;
          $('#doneBanner').textContent = msg;
          log.success(msg);
        }
      } else {
        // Otherwise, remove "finished" state
        ui.undiscordWindow.classList.remove('finished');

        if (state.endReason === 'STOPPED') {
          log.warn('Stopped by user.');
        } else if (state.endReason === 'ERROR') {
          log.error('Stopped due to an error.');
        }
      }
    };

	}

	async function startAction() {
	  console.log(PREFIX, 'startAction');

    // Ensure IDs are refreshed right before validation/start.
    // NOTE: this function runs outside initUI scope, so we can't call safeAutofillFields() here.
    const authorInput = $('input#authorId');
    const guildInput = $('input#guildId');
    const channelInput = $('input#channelId');
    if (!authorInput.value.trim()) {
      try {
        const v = getAuthorId();
        if (v) authorInput.value = v;
      } catch {}
    }
    if (!guildInput.value.trim()) {
      const v = getGuildId({ silent: true });
      if (v) guildInput.value = v;
    }
    if (!channelInput.value.trim()) {
      const v = getChannelId({ silent: true });
      if (v) channelInput.value = v;
    }

	  // general
	  const authorId = authorInput.value.trim();
	  const guildId = guildInput.value.trim() || (getGuildId({ silent: true }) || '');
	  const channelValue = channelInput.value.trim() || (getChannelId({ silent: true }) || '');
	  const channelIds = channelValue.split(/\s*,\s*/).filter(Boolean);
    if (guildId && !guildInput.value.trim()) guildInput.value = guildId;
    if (channelValue && !channelInput.value.trim()) channelInput.value = channelValue;
	  const includeNsfw = $('input#includeNsfw').checked;
	  // filter
	  const content = $('input#search').value.trim();
	  const hasLink = $('input#hasLink').checked;
	  const hasFile = $('input#hasFile').checked;
	  const includePinned = $('input#includePinned').checked;
	  const pattern = $('input#pattern').value;
	  // message interval
	  const minId = $('input#minId').value.trim();
	  const maxId = $('input#maxId').value.trim();
	  // date range
	  const minDate = $('input#minDate').value.trim();
	  const maxDate = $('input#maxDate').value.trim();
	  //advanced
	  const searchDelay = parseInt($('input#searchDelay').value.trim());
	  const deleteDelay = parseInt($('input#deleteDelay').value.trim());

	  // token
	  const authToken = $('input#token').value.trim() || await fillToken();
    if (authToken && !$('input#token').value.trim()) {
      $('input#token').value = authToken;
    }
	  if (!authToken) return; // get token already logs an error.

	  // validate input
	  if (!guildId) {
      alert('Could not find the Server ID. Open a server/DM and click "current", then retry.');
      return log.error('You must fill the "Server ID" field!');
    }
    if (!channelIds.length) {
      alert('Could not find the Channel ID. Open a channel/DM and click "current", then retry.');
      return log.error('You must fill the "Channel ID" field!');
    }

	  // clear logArea
	  ui.logArea.innerHTML = '';

	  undiscordCore.resetState();
	  undiscordCore.options = {
	    ...undiscordCore.options,
	    authToken,
	    authorId,
	    guildId,
	    channelId: channelIds.length === 1 ? channelIds[0] : undefined, // single or multiple channel
	    minId: minId || minDate,
	    maxId: maxId || maxDate,
	    content,
	    hasLink,
	    hasFile,
	    includeNsfw,
	    includePinned,
	    pattern,
	    searchDelay,
	    deleteDelay,
	    // maxAttempt: 2,
	  };
	  if (channelIds.length > 1) {
	    const jobs = channelIds.map(ch => ({
	      guildId: guildId,
	      channelId: ch,
	    }));

	    try {
	      await undiscordCore.runBatch(jobs);
	    } catch (err) {
	      log.error('CoreException', err);
	    }
	  }
	  // single channel
	  else {
	    try {
	      await undiscordCore.run();
	    } catch (err) {
	      log.error('CoreException', err);
	      undiscordCore.stop();
	    }
	  }
	}

	function stopAction() {
	  console.log(PREFIX, 'stopAction');
	  undiscordCore.stop();
	}

	// ---- END Undiscord ----

initUI();

})();
