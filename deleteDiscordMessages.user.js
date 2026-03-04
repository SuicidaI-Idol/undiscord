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
#undiscord .tbar .preScanStatus {
  display: none;
  margin: 0 0 4px;
  font-size: 12px;
  line-height: 16px;
  color: var(--u-muted);
  text-align: center;
  width: 100%;
  align-self: center;
}
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
  /* Compact deleted-log global scale (date, text, avatar, etc.) */
  --u-compact-scale: 1.05;

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
#undiscord .tbar > .row:first-child{
  position: relative;
  padding-right: 112px;
  min-height: 38px;
}
#undiscord #stop{
  position: absolute;
  right: 0;
  top: 0;
  z-index: 4;
}
#undiscord .tbar.footer{
  border-top: 1px solid var(--u-border) !important;
  border-bottom: none !important;
}

/* Conversation badge */
#undiscord .channelBadge,
#undiscord .convBadge{
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 10px;
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
#undiscord .channelBadge{
  max-width: 220px;
}
#undiscord .convBadge img{
  width: 28px;
  height: 28px;
  border-radius: 999px;
  flex: 0 0 auto;
  box-shadow: 0 0 0 1px rgba(255,255,255,.18);
}
#undiscord .channelBadge .channelHash{
  font-size: 14px;
  font-weight: 700;
  color: var(--u-muted) !important;
}
#undiscord .channelBadge .channelName,
#undiscord .convBadge .convName{
  font-size: 14px;
  font-weight: 600;
  color: var(--u-text) !important;
  padding-right: 2px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
#undiscord .allChannelsToggle{
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-right: 8px;
  margin-bottom: 4px;
  padding: 0 10px;
  height: 38px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(255,255,255,.04);
  color: var(--u-muted);
  font-size: 12px;
  text-transform: none;
  white-space: nowrap;
}
#undiscord .allChannelsToggle input{
  margin: 0;
}
#undiscord.verbose .convBadge{
  display: none !important;
}
#undiscord.verbose .channelBadge{
  display: none !important;
}
#undiscord.verbose .allChannelsToggle{
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
  grid-template-columns: calc(88px * var(--u-compact-scale)) minmax(0, 1fr) auto;
  column-gap: calc(10px * var(--u-compact-scale));
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
  grid-template-columns: calc(88px * var(--u-compact-scale)) calc(27px * var(--u-compact-scale)) minmax(0, 1fr) auto;
  gap: calc(8px * var(--u-compact-scale));
  padding: calc(8px * var(--u-compact-scale)) calc(12px * var(--u-compact-scale));
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
  min-width: calc(88px * var(--u-compact-scale));
  white-space: nowrap;
  padding: calc(4px * var(--u-compact-scale)) calc(6px * var(--u-compact-scale));
  border-radius: 6px;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.08);
}
#undiscord:not(.verbose) .log-del img{
  width: calc(27px * var(--u-compact-scale));
  height: calc(27px * var(--u-compact-scale));
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
#undiscord:not(.verbose) .log-del .lineChannel{
  display: inline-flex;
  align-items: center;
  max-width: 220px;
  padding: 1px 8px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(255,255,255,.05);
  color: rgba(255,255,255,.78);
  font-size: calc(11.5px * var(--u-compact-scale));
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
#undiscord:not(.verbose) .log-del .date{
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 0;
  background: none;
  border: none;
  font-size: calc(11.75px * var(--u-compact-scale));
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
  font-size: calc(13.75px * var(--u-compact-scale));
  color: rgba(255,255,255,.92);
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
#undiscord:not(.verbose) .log-del .meta{
  font-size: calc(11.75px * var(--u-compact-scale));
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
  font-size: calc(13px * var(--u-compact-scale));
  line-height: 1.35;
  color: rgba(255,255,255,.92);
}
#undiscord:not(.verbose) .log-del .content .msgText{
  font-size: calc(13px * var(--u-compact-scale));
}
#undiscord:not(.verbose) .log-del .txt{
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
  min-width: 0;
}
#undiscord:not(.verbose) .log-del .attachments{
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}
#undiscord:not(.verbose) .log-del .attachments img{
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,.12);
  margin-top: 0;
  box-shadow: none;
}
#undiscord:not(.verbose) .log-del .attachments video{
  width: 220px;
  max-width: 100%;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,.12);
  background: #000;
}
#undiscord:not(.verbose) .log-del .attachments audio{
  width: 220px;
  max-width: 100%;
}
#undiscord:not(.verbose) .log-del .attachments .file{
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(255,255,255,.04);
  color: var(--u-link);
  text-decoration: none;
  max-width: 260px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
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
                    <div class="sectionDescription">
                        <label class="row"><input id="previewMode" type="checkbox"> Preview mode (no delete)</label>
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
              <div id="channelBadge" class="channelBadge" style="display:none;">
                  <span class="channelHash">#</span>
                  <span id="channelName" class="channelName"></span>
              </div>
              <label class="allChannelsToggle" style="display:none;">
                <input id="deleteAllChannels" type="checkbox"> Delete from all channels
              </label>
              <button id="start" class="sizeMedium danger" style="width: 150px;" title="Start the deletion process">▶︎ Delete</button>
              <button id="stop" class="sizeMedium" title="Stop the deletion process" disabled>🛑 Stop</button>
              <button id="clear" class="sizeMedium">Clear log</button>
            </div>

            <div id="preScanStatus" class="preScanStatus"></div>
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
      previewMode: false, // Simulate deletions without calling DELETE
	    maxAttempt: 2, // Attempts to delete a single message if it fails
	    askForConfirmation: true,
      retryOnNetworkError: true,
      maxNetworkRetries: 8,
      networkRetryBaseDelay: 1000,
      batchExpectedTotal: 0,
      batchPreviewLines: null,
      batchChannelPlan: null,
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
      _rawDiscoveredCount: 0,
      _forcedChannelFilterActive: false,
      _historyScanActive: false,
      _historyBeforeId: null,
      _historyExhausted: false,
      _historyFetchedPages: 0,
      _batchActive: false,
      _batchDelCount: 0,
      _batchFailCount: 0,
      _batchGrandTotal: 0,

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
    _channelMetaCache = new Map();
    _guildChannelMapCache = new Map();
    _activeRequestController = null;
    _pendingWait = null;

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
        _rawDiscoveredCount: 0,
        _forcedChannelFilterActive: false,
        _historyScanActive: false,
        _historyBeforeId: null,
        _historyExhausted: false,
        _historyFetchedPages: 0,
        _batchActive: false,
        _batchDelCount: 0,
        _batchFailCount: 0,
        _batchGrandTotal: 0,
	    };

	    this.options.askForConfirmation = true;
      this._channelMetaCache = new Map();
      this._guildChannelMapCache = new Map();
      this._activeRequestController = null;
      this._pendingWait = null;
	  }

    cancelInFlightRequest() {
      try {
        this._activeRequestController?.abort();
      } catch {}
      this._activeRequestController = null;
    }

    beginAbortableRequest() {
      this.cancelInFlightRequest();
      const controller = new AbortController();
      this._activeRequestController = controller;
      return controller;
    }

    endAbortableRequest(controller) {
      if (this._activeRequestController === controller) {
        this._activeRequestController = null;
      }
    }

    cancelPendingWait() {
      if (!this._pendingWait) return;
      const { timer, resolve } = this._pendingWait;
      this._pendingWait = null;
      try {
        clearTimeout(timer);
      } catch {}
      this.stats.pendingWaitUntilTs = 0;
      try {
        resolve();
      } catch {}
    }

    messageMatchesLocalHistoryFilters(message) {
      if (!message) return false;
      if (this.options.authorId && String(message?.author?.id || '') !== String(this.options.authorId)) return false;

      if (this.options.minId) {
        const minSnow = String(toSnowflake(this.options.minId));
        if (BigInt(message.id) <= BigInt(minSnow)) return false;
      }
      if (this.options.maxId) {
        const maxSnow = String(toSnowflake(this.options.maxId));
        if (BigInt(message.id) >= BigInt(maxSnow)) return false;
      }

      const content = String(message.content || '');
      if (this.options.content && !content.toLowerCase().includes(String(this.options.content).toLowerCase())) return false;

      if (this.options.hasFile && !(Array.isArray(message.attachments) && message.attachments.length > 0)) return false;
      if (this.options.hasLink) {
        const hasLink = /(https?:\/\/[^\s]+)/i.test(content);
        if (!hasLink) return false;
      }
      return true;
    }

    async searchByHistoryScan() {
      const channelId = String(this.options.channelId || '').trim();
      if (!channelId) {
        this.state._seachResponse = {
          messages: [],
          total_results: 0,
          doing_deep_historical_index: false,
        };
        return this.state._seachResponse;
      }

      const params = [['limit', '100']];
      if (this.state._historyBeforeId) params.push(['before', this.state._historyBeforeId]);
      const url = `https://discord.com/api/v9/channels/${channelId}/messages?${queryString(params)}`;

      let resp;
      let networkAttempt = 0;
      while (true) {
        try {
          const reqCtl = this.beginAbortableRequest();
          this.beforeRequest();
          resp = await fetch(url, {
            headers: {
              Authorization: this.options.authToken,
            },
            signal: reqCtl.signal,
          });
          this.endAbortableRequest(reqCtl);
          this.afterRequest();
          break;
        } catch (err) {
          if (err?.name === 'AbortError' && !this.state.running) throw err;
          const msg = String(err && (err.message || err));

          if (!this.state.running) {
            log.error('History scan aborted (not running).', err);
            throw err;
          }

          if (!this.options.retryOnNetworkError) {
            this.state.endReason = 'ERROR';
            this.state.running = false;
            log.error('History scan request threw an error:', err);
            throw err;
          }

          networkAttempt++;
          const max = this.options.maxNetworkRetries ?? 8;
          if (networkAttempt > max) {
            this.state.endReason = 'ERROR';
            this.state.running = false;
            log.error(`History scan failed after ${max} network retries.`, err);
            throw err;
          }

          const base = this.options.networkRetryBaseDelay ?? 1000;
          const delay = Math.min(30000, base * Math.pow(1.6, networkAttempt - 1)) + Math.floor(Math.random() * 250);
          log.warn(`NetworkError on history scan (attempt ${networkAttempt}/${max}). Retrying in ${Math.round(delay)}ms...`, msg);
          await this.waitWithTracking(delay);
        }
      }

      if (!resp.ok) {
        if (resp.status === 429) {
          let w = (await resp.json()).retry_after * 1000;
          w = w || this.options.searchDelay;
          this.stats.throttledCount++;
          this.stats.throttledTotalTime += w;
          log.warn(`History scan rate-limited for ${w}ms. Retrying...`);
          await this.waitWithTracking(w);
          return await this.searchByHistoryScan();
        }
        this.state.running = false;
        log.error(`History scan failed with status ${resp.status}`, await resp.text());
        throw resp;
      }

      const batch = await resp.json();
      const list = Array.isArray(batch) ? batch : [];
      this.state._historyFetchedPages = (this.state._historyFetchedPages || 0) + 1;
      if (list.length > 0) {
        this.state._historyBeforeId = String(list[list.length - 1].id);
      } else {
        this.state._historyExhausted = true;
      }

      const matched = list.filter((m) => this.messageMatchesLocalHistoryFilters(m));
      const groups = matched.map((m) => [{ ...m, hit: true }]);

      // Keep displayed totals exact; do not add a synthetic +1 "sentinel".
      const pseudoTotal = this.state.grandTotal + matched.length;
      const data = {
        analytics_id: 'history_scan',
        messages: groups,
        doing_deep_historical_index: false,
        total_results: pseudoTotal,
        __undiscord_history_scan: true,
      };
      this.state._seachResponse = data;
      log.verb(
        `history:scan fetched=${list.length} matched=${matched.length}`,
        `before=${this.state._historyBeforeId || '<none>'}`,
        `exhausted=${this.state._historyExhausted ? 'yes' : 'no'}`
      );
      return data;
    }

    async getGuildChannelMap(guildId) {
      const gid = String(guildId || '').trim();
      if (!gid || gid === '@me') return null;
      if (this._guildChannelMapCache.has(gid)) return this._guildChannelMapCache.get(gid);

      let map = null;
      if (!this.options.authToken) {
        this._guildChannelMapCache.set(gid, map);
        return map;
      }

      try {
        const resp = await fetch(`https://discord.com/api/v9/guilds/${gid}/channels`, {
          headers: { Authorization: this.options.authToken }
        });
        if (!resp.ok) {
          this._guildChannelMapCache.set(gid, map);
          return map;
        }
        const channels = await resp.json();
        if (!Array.isArray(channels)) {
          this._guildChannelMapCache.set(gid, map);
          return map;
        }

        map = new Map();
        for (const ch of channels) {
          if (!ch?.id) continue;
          map.set(String(ch.id), {
            id: String(ch.id),
            parent_id: ch.parent_id ? String(ch.parent_id) : '',
            type: Number(ch.type),
            guild_id: ch.guild_id ? String(ch.guild_id) : gid,
            name: String(ch.name || ''),
          });
        }
        this._guildChannelMapCache.set(gid, map);
        return map;
      } catch {
        this._guildChannelMapCache.set(gid, map);
        return map;
      }
    }

    async getChannelMeta(channelId) {
      const id = String(channelId || '').trim();
      if (!id) return null;
      if (this._channelMetaCache.has(id)) return this._channelMetaCache.get(id);

      const empty = null;
      if (!this.options.authToken) {
        this._channelMetaCache.set(id, empty);
        return empty;
      }

      try {
        const resp = await fetch(`https://discord.com/api/v9/channels/${id}`, {
          headers: { Authorization: this.options.authToken }
        });
        if (!resp.ok) {
          this._channelMetaCache.set(id, empty);
          return empty;
        }
        const data = await resp.json();
        const meta = data && data.id ? {
          id: String(data.id),
          parent_id: data.parent_id ? String(data.parent_id) : '',
          type: Number(data.type),
          guild_id: data.guild_id ? String(data.guild_id) : '',
          name: String(data.name || ''),
        } : empty;
        this._channelMetaCache.set(id, meta);
        return meta;
      } catch {
        this._channelMetaCache.set(id, empty);
        return empty;
      }
    }

    async channelInScope(channelId, targetChannelId) {
      const cid = String(channelId || '').trim();
      const target = String(targetChannelId || '').trim();
      if (!cid || !target) return false;
      if (cid === target) return true;

      const guildMap = await this.getGuildChannelMap(this.options.guildId);
      if (guildMap instanceof Map && guildMap.size) {
        let current = cid;
        const seen = new Set();
        for (let depth = 0; depth < 10; depth++) {
          if (!current || seen.has(current)) break;
          seen.add(current);
          const meta = guildMap.get(current);
          const parent = String(meta?.parent_id || '').trim();
          if (!parent) break;
          if (parent === target) return true;
          current = parent;
        }
      }

      // Walk parent chain to support:
      // - forum/media parent channel -> thread messages
      // - category parent -> child text channels/threads
      let current = cid;
      const seen = new Set();
      for (let depth = 0; depth < 6; depth++) {
        if (!current || seen.has(current)) break;
        seen.add(current);
        const meta = await this.getChannelMeta(current);
        const parent = String(meta?.parent_id || '').trim();
        if (!parent) break;
        if (parent === target) return true;
        current = parent;
      }
      return false;
    }

    async waitWithTracking(ms) {
      const waitMs = Math.max(0, Number(ms) || 0);
      if (waitMs <= 0) return;
      if (!this.state.running) return;
      this.stats.pendingWaitUntilTs = Date.now() + waitMs;
      try {
        await new Promise((resolve) => {
          const timer = setTimeout(() => {
            if (this._pendingWait?.timer === timer) this._pendingWait = null;
            resolve();
          }, waitMs);
          this._pendingWait = { timer, resolve };
        });
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
        const processed = this.state.delCount + this.state.failCount + (this.state._skippedUniqueCount || 0);
        const target = this.state.grandTotal || 0;

        // Quick-check can return an empty page while index is still lagging.
        // Never end early if we still know there should be items to process.
        if (total === 0 || !hasMore) {
          if (target > 0 && processed < target) {
            log.warn(`Quick check looked empty but only processed ${processed}/${target}. Continuing normal loop.`);
            return false;
          }
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
      this.state.running = true;
      this.state._batchActive = true;
      this.state._batchDelCount = 0;
      this.state._batchFailCount = 0;
      this.state._batchGrandTotal = Math.max(0, Number(this.options.batchExpectedTotal || 0));
      this.state.grandTotal = this.state._batchGrandTotal;
      this.state.delCount = 0;
      this.state.failCount = 0;
      this.state._skippedUniqueCount = 0;
      this.stats.startTime = new Date();
      this.stats.etr = 0;
      this.stats.pendingWaitUntilTs = 0;
      this.stats._etrLastUpdateTs = Date.now();
      if (this.onStart) this.onStart(this.state, this.stats);
	    for (let i = 0; i < queue.length; i++) {
	      const job = queue[i];
        const ch = String(job?.channelId || '');
        const plan = this.options.batchChannelPlan && ch ? this.options.batchChannelPlan[ch] : null;
        const expectedForChannel = Math.max(0, Number(plan?.count || 0));
        // Use per-channel expected total for channel-local loop guards
        // (prevents long "processed x/y" waits using global batch total).
        // If no plan is available, reset to 0 so this job starts clean.
        this.state.grandTotal = expectedForChannel;
	      log.info(
          'Starting job...',
          `(${i + 1}/${queue.length})`,
          `channel=${ch || '<none>'}`,
          plan ? `expected=${expectedForChannel} type=${plan.type ?? 'unknown'} source=${plan.source || 'unknown'}` : 'expected=<unknown>'
        );

	      // set options
	      this.options = {
	        ...this.options, // keep current options
	        ...job, // override with options for that job
	      };

        try {
	        await this.run(true);
        } catch (err) {
          // Keep batch going even if one channel fails.
          log.error(`Job failed for channel ${ch || '<none>'}. Continuing with next channel...`, err);
          this.state.endReason = this.state.endReason === 'STOPPED' ? 'STOPPED' : 'ERROR';
        }
	      if (!this.state.running) break;
        const effective = Math.max(0, this.state.grandTotal - (this.state._skippedUniqueCount || 0));
        log.info(
          `Job summary (${i + 1}/${queue.length}):`,
          `channel=${ch || '<none>'}`,
          `deleted=${this.state.delCount}`,
          `failed=${this.state.failCount}`,
          `total=${effective}`
        );

	      log.info('Job ended.', `(${i + 1}/${queue.length})`);
        const batchSnapshot = {
          active: this.state._batchActive,
          delCount: this.state._batchDelCount,
          failCount: this.state._batchFailCount,
          grandTotal: this.state._batchGrandTotal,
        };
	      this.resetState();
        this.state._batchActive = batchSnapshot.active;
        this.state._batchDelCount = batchSnapshot.delCount;
        this.state._batchFailCount = batchSnapshot.failCount;
        this.state._batchGrandTotal = batchSnapshot.grandTotal;
	      this.options.askForConfirmation = false;
	      this.state.running = true; // continue running
	    }

      const batchTotal = Math.max(
        this.state._batchGrandTotal,
        this.state._batchDelCount + this.state._batchFailCount
      );
	    log.info(
        'Batch finished.',
        `deleted=${this.state._batchDelCount}`,
        `failed=${this.state._batchFailCount}`,
        `total=${batchTotal}`
      );
      this.state.delCount = this.state._batchDelCount;
      this.state.failCount = this.state._batchFailCount;
      this.state.grandTotal = batchTotal;
      this.state._skippedUniqueCount = 0;
      this.state.endReason = this.state.endReason || 'DONE';
      this.state._batchActive = false;
	    this.state.running = false;
      this.stats.endTime = new Date();
      if (this.onStop) this.onStop(this.state, this.stats);
	  }

	  /** Start the deletion process */
	  async run(isJob = false) {
	    if (this.state.running && !isJob) return log.error('Already running!');

	    this.state.running = true;
      if (!isJob) {
	      this.stats.startTime = new Date();
        this.stats.etr = 0;
        this.stats.pendingWaitUntilTs = 0;
        this.stats._etrLastUpdateTs = Date.now();
      }

	    log.success(`Started at ${this.stats.startTime.toLocaleString()}`);
      log.debug(
        `authorId = "${this.options.authorId || ''}"`,
        `guildId = "${this.options.guildId || ''}"`,
        `channelId = "${this.options.channelId || ''}"`,
	      `minId = "${this.options.minId || ''}"`,
	      `maxId = "${this.options.maxId || ''}"`,
	    );

	    if (!isJob && this.onStart) this.onStart(this.state, this.stats);
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

          // After real deletions, perform an immediate re-check to finish without
          // waiting for the next full search cycle/searchDelay.
          if (!this.options.previewMode) {
            const doneNow = await this.quickCheckIfDone();
            if (doneNow) {
              if (isJob) break;
              this.state.running = false;
              break;
            }
          }

          if (this.options.previewMode) {
            // In preview mode nothing is removed server-side, so we must move offset forward.
            this.state.offset += this.state._messagesToDelete.length + this.state._skippedMessages.length;
          }
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
          // In guild fallback mode (without channel_id), this page may contain only
          // results from other channels. Advance offset to keep scanning.
          const rawCount = Number(this.state._rawDiscoveredCount || 0);
          const pageCount = Number(this.state._seachResponse?.messages?.length || 0);
          if (this.state._historyScanActive && this.state._historyExhausted && rawCount === 0 && pageCount === 0) {
            const processed = this.state.delCount + this.state.failCount + (this.state._skippedUniqueCount || 0);
            const target = this.state.grandTotal || 0;
            if (target > processed) {
              log.warn(
                `History scan exhausted for this channel (${processed}/${target} processed).`,
                'Ending this job now to avoid repeated empty-page waits.'
              );
            } else {
              log.verb('History scan exhausted for this channel. Ending this job.');
            }
            this.state.endReason = 'DONE';
            if (isJob) break;
            this.state.running = false;
            continue;
          }

          if (this.state._forcedChannelFilterActive && rawCount > 0 && pageCount > 0) {
            const oldOffset = this.state.offset;
            this.state.offset += pageCount;
            log.verb(`No hits for target channel in this guild page; scanning next page... (offset ${oldOffset} -> ${this.state.offset})`);
            skipWaitOnce = true;
            continue;
          }

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

	    if (!isJob && this.onStop) this.onStop(this.state, this.stats);
	  }

    stop() {
      this.state.endReason = 'STOPPED';
      this.state.running = false;
      this.cancelPendingWait();
      this.cancelInFlightRequest();
      if (!this.state._batchActive && this.onStop) this.onStop(this.state, this.stats);
    }


	  /** Calculate the estimated time remaining based on the current stats */
	  calcEtr() {
      const now = Date.now();
      const dtMs = Math.max(16, now - (this.stats._etrLastUpdateTs || now));
      this.stats._etrLastUpdateTs = now;

      const usingBatch = !!this.state._batchActive;
      const processed = usingBatch
        ? (this.state._batchDelCount + this.state._batchFailCount)
        : (this.state.delCount + this.state.failCount);
      const effectiveTotal = usingBatch
        ? Math.max(0, this.state._batchGrandTotal)
        : Math.max(0, this.state.grandTotal - (this.state._skippedUniqueCount || 0));
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
      const batchPreviewLines = this.state._batchActive && Array.isArray(this.options.batchPreviewLines)
        ? this.options.batchPreviewLines
        : null;
	    const preview = batchPreviewLines?.length
        ? batchPreviewLines.join('\n')
        : this.state._messagesToDelete
          .map(m => `${m.author.username}#${m.author.discriminator}: ${m.attachments.length ? '[ATTACHMENTS]' : m.content}`)
          .join('\n');

      const confirmTotal = this.state._batchActive
        ? (
          this.state._batchGrandTotal > 0
            ? Math.max(
              this.state._batchGrandTotal,
              this.state._batchDelCount + this.state._batchFailCount
            )
            : this.state.grandTotal
        )
        : this.state.grandTotal;
	    const answer = await ask(
	      `Do you want to delete ~${confirmTotal} messages? (Estimated time: ${msToHMS(this.stats.etr)})` +
        (this.options.previewMode ? '\n[Preview mode ON: no message will actually be deleted.]' : '') +
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
      if (this.state._historyScanActive) {
        return await this.searchByHistoryScan();
      }

	    // Prefer channel scope whenever we have a channel id.
	    // This is more reliable in servers (threads/forum posts/etc).
      const hasChannelScope = !!this.options.channelId;
      const canFallbackToGuildScope = hasChannelScope && this.options.guildId !== '@me';
      let scope = hasChannelScope ? 'channel' : 'guild';
      let allowGuildChannelFilter = true;
      let triedGuildAfterEmptyChannel = false;
      let triedGuildWithoutChannelFilterAfterZero = false;

	    let resp;
      // Retry on network errors (no HTTP response)
      let networkAttempt = 0;

      while (true) {
        try {
          const useGuildScope = scope === 'guild';
          const API_SEARCH_URL = useGuildScope
            ? `https://discord.com/api/v9/guilds/${this.options.guildId}/messages/`
            : `https://discord.com/api/v9/channels/${this.options.channelId}/messages/`;
          const queryChannelId = (useGuildScope && allowGuildChannelFilter)
            ? this.options.channelId
            : undefined;
          const endpointLabel = useGuildScope
            ? `guild:${this.options.guildId}`
            : `channel:${this.options.channelId}`;
          const channelFilterLabel = queryChannelId ? `channel_id=${queryChannelId}` : 'channel_id=<none>';
          log.verb(
            `search:req scope=${scope} endpoint=${endpointLabel} offset=${this.state.offset}`,
            `author=${this.options.authorId || '<any>'}`,
            channelFilterLabel
          );
          const reqCtl = this.beginAbortableRequest();
          this.beforeRequest();
          resp = await fetch(API_SEARCH_URL + 'search?' + queryString([
            ['author_id', this.options.authorId || undefined],
            ['channel_id', queryChannelId],
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
            },
            signal: reqCtl.signal,
          });
          this.endAbortableRequest(reqCtl);
          this.afterRequest();
          log.verb(`search:resp status=${resp.status} scope=${scope} offset=${this.state.offset} ping=${this.stats.lastPing}ms`);

          // Some channel types reject channel-scoped search (code 50024).
          // Retry immediately using guild-scoped search + channel_id filter.
          if (resp.status === 400 && canFallbackToGuildScope && scope === 'channel') {
            const body = await resp.clone().json().catch(() => null);
            if (body?.code === 50024) {
              log.warn('Channel-scoped search not allowed for this channel type. Switching to direct channel history scan...');
              this.state._historyScanActive = true;
              return await this.searchByHistoryScan();
            }
          }

          // Some channel types also reject guild search when channel_id is passed.
          if (resp.status === 400 && canFallbackToGuildScope && scope === 'guild' && allowGuildChannelFilter) {
            const body = await resp.clone().json().catch(() => null);
            if (body?.code === 50024) {
              log.warn('Guild-scoped search rejected channel filter for this channel type. Retrying without channel filter (local filter ON)...');
              allowGuildChannelFilter = false;
              continue;
            }
          }

          // Channel endpoint may return 0 even when messages exist; probe guild scope once.
          if (resp.ok && canFallbackToGuildScope && scope === 'channel' && !triedGuildAfterEmptyChannel) {
            const body = await resp.clone().json().catch(() => null);
            const total = Number(body?.total_results ?? -1);
            if (total === 0) {
              triedGuildAfterEmptyChannel = true;
              scope = 'guild';
              allowGuildChannelFilter = true;
              log.warn('Channel-scoped search returned 0 results. Probing guild-scoped search for this channel...');
              continue;
            }
          }

          // Some channel types return 200 + 0 with guild+channel_id even though data exists.
          // Probe once without channel_id and apply local channel filter afterwards.
          if (resp.ok && canFallbackToGuildScope && scope === 'guild' && allowGuildChannelFilter && !triedGuildWithoutChannelFilterAfterZero) {
            const body = await resp.clone().json().catch(() => null);
            const total = Number(body?.total_results ?? -1);
            if (total === 0) {
              triedGuildWithoutChannelFilterAfterZero = true;
              allowGuildChannelFilter = false;
              log.warn('Guild-scoped search with channel filter returned 0. Probing without channel filter (local channel filter ON)...');
              continue;
            }
          }

          break; // ✅ fetch OK -> exit retry loop
        } catch (err) {
          if (err?.name === 'AbortError' && !this.state.running) throw err;
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
	      w = w || this.options.searchDelay; // Fix retry_after 0
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
	        w = w || this.options.searchDelay; // Fix retry_after 0

	        this.stats.throttledCount++;
	        this.stats.throttledTotalTime += w;
	        this.options.searchDelay += w; // increase delay
	        w = this.options.searchDelay;
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
      if (scope === 'guild' && !allowGuildChannelFilter && this.options.channelId) {
        data.__undiscord_forceChannelId = String(this.options.channelId);
      }
      const pageCount = Array.isArray(data?.messages) ? data.messages.length : 0;
      log.verb(
        `search:ok total_results=${Number(data?.total_results ?? 0)} page_groups=${pageCount}`,
        `forced_local_channel_filter=${data.__undiscord_forceChannelId ? 'yes' : 'no'}`
      );
	    this.state._seachResponse = data;
	    log.debug('search', data);
	    return data;
	  }

	  async filterResponse() {
	    const data = this.state._seachResponse;

	    // search returns messages near the the actual message, only get the messages we searched for.
	    const discoveredMessagesRaw = (Array.isArray(data.messages) ? data.messages : [])
        .map(convo => Array.isArray(convo) ? convo.find(message => message.hit === true) : null)
        .filter(Boolean);
      this.state._rawDiscoveredCount = discoveredMessagesRaw.length;

      // the search total will decrease as we delete stuff
	    const total = data.total_results;

      // If we had to query guild scope without channel_id (API limitation), enforce channel filter locally.
      const forceChannelId = String(data?.__undiscord_forceChannelId || '').trim();
      this.state._forcedChannelFilterActive = !!forceChannelId;
      if (!forceChannelId && total > this.state.grandTotal) this.state.grandTotal = total;

      let discoveredMessages = discoveredMessagesRaw;
      if (forceChannelId) {
        const scoped = [];
        let matchedDirect = 0;
        let matchedParent = 0;
        for (const msg of discoveredMessagesRaw) {
          const cid = String(msg?.channel_id || '');
          if (!cid) continue;
          if (cid === forceChannelId) {
            matchedDirect++;
            scoped.push(msg);
            continue;
          }
          const inScope = await this.channelInScope(cid, forceChannelId);
          if (inScope) {
            matchedParent++;
            scoped.push(msg);
          }
        }
        discoveredMessages = scoped;
        log.verb(
          `filter:scope_match direct=${matchedDirect} parent=${matchedParent}`,
          `target=${forceChannelId}`
        );
      }

      const rawByChannel = discoveredMessagesRaw.reduce((acc, m) => {
        const cid = String(m?.channel_id || 'unknown');
        acc[cid] = (acc[cid] || 0) + 1;
        return acc;
      }, {});
      const scopedByChannel = discoveredMessages.reduce((acc, m) => {
        const cid = String(m?.channel_id || 'unknown');
        acc[cid] = (acc[cid] || 0) + 1;
        return acc;
      }, {});

      log.verb(
        `filter:page raw_hits=${discoveredMessagesRaw.length} scoped_hits=${discoveredMessages.length}`,
        `force_channel_id=${forceChannelId || '<none>'}`
      );
      if (forceChannelId) {
        const targetMeta = await this.getChannelMeta(forceChannelId);
        const guildMap = await this.getGuildChannelMap(this.options.guildId);
        const targetFromGuildMap = guildMap instanceof Map ? guildMap.get(forceChannelId) : null;
        const meta = targetMeta || targetFromGuildMap || null;
        log.verb(
          `filter:target_meta id=${forceChannelId}`,
          `type=${meta?.type ?? 'unknown'}`,
          `parent=${meta?.parent_id || '<none>'}`,
          `name=${meta?.name || '<unknown>'}`
        );
      }
      if (Object.keys(rawByChannel).length) {
        const rawTop = Object.entries(rawByChannel)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([cid, count]) => `${cid}:${count}`)
          .join(', ');
        log.verb(`filter:raw_channel_distribution ${rawTop}`);
      }
      if (forceChannelId && Object.keys(scopedByChannel).length) {
        const scopedTop = Object.entries(scopedByChannel)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([cid, count]) => `${cid}:${count}`)
          .join(', ');
        log.verb(`filter:scoped_channel_distribution ${scopedTop}`);
      }

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

        log.debug('DEBUG types', {
          total_results: data.total_results,
          page_messages: data.messages?.length,
          discovered_raw: discoveredMessagesRaw.length,
          discovered: dm.length,
          force_channel_id: forceChannelId || null,
          byType,
          examples_non0: non0,
        });
      } catch (e) {
        log.warn('DEBUG types failed', e);
      }

	    // we can only delete some types of messages, system messages are not deletable.
      const isDeletableType = (msg) => !!msg && (msg.type === 0 || (msg.type >= 6 && msg.type <= 21));
      const afterType = discoveredMessages.filter(isDeletableType);
      const afterPinned = afterType.filter(msg => msg.pinned ? this.options.includePinned : true); // delete pinned messages
	    let messagesToDelete = afterPinned;

	    // custom filter of messages
      let regexFilteredOut = 0;
	    try {
	      const regex = new RegExp(this.options.pattern, 'i');
	      messagesToDelete = afterPinned.filter(msg => regex.test(msg.content));
        regexFilteredOut = afterPinned.length - messagesToDelete.length;
	    } catch (e) {
	      log.warn('Ignoring RegExp because pattern is malformed!', e);
	    }

      const typeFilteredOut = discoveredMessages.length - afterType.length;
      const pinnedFilteredOut = afterType.length - afterPinned.length;
      log.verb(
        `filter:kept=${messagesToDelete.length}/${discoveredMessages.length}`,
        `filtered(type=${typeFilteredOut}, pinned=${pinnedFilteredOut}, regex=${regexFilteredOut})`
      );
      if (discoveredMessages.length > 0 && messagesToDelete.length === 0) {
        const sample = discoveredMessages.slice(0, 3).map(msg => ({
          id: msg?.id,
          channel_id: msg?.channel_id,
          type: msg?.type,
          pinned: !!msg?.pinned,
          content: String(msg?.content || '').slice(0, 60),
        }));
        log.debug('filter:no-deletable-sample', sample);
      }

	    // create an array containing everything we skipped. (used to calculate offset for next searches)
      const keptIds = new Set(messagesToDelete.map(m => m.id));
	    const skippedMessages = discoveredMessages.filter(msg => !keptIds.has(msg.id));

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

	    log.debug('filterResponse', {
        grandTotal: this.state.grandTotal,
        forcedChannelFilter: this.state._forcedChannelFilterActive,
        rawDiscovered: this.state._rawDiscoveredCount,
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

        const usingBatch = !!this.state._batchActive;
        const doneCount = usingBatch
          ? this.state._batchDelCount + this.state._batchFailCount
          : this.state.delCount + this.state.failCount;
        const totalCount = usingBatch
          ? this.state._batchGrandTotal
          : this.state.grandTotal;
        const idx = doneCount + 1;
        const max = Math.max(totalCount, idx);

        const meta = `[${idx}/${max}]`;
        const content = (message.content || '').replace(/\n/g, ' ↵ ').trim();
        const messageChannelId = String(message.channel_id || '').trim();
        const showChannel = usingBatch && !!this.options.batchChannelPlan;
        let channelName = '';
        if (showChannel && messageChannelId) {
          channelName = String(this.options.batchChannelPlan?.[messageChannelId]?.name || '').trim();
          if (!channelName) {
            const meta = await this.getChannelMeta(messageChannelId);
            channelName = String(meta?.name || '').trim();
          }
        }

        log.del({
          author: message.author,
          meta,
          content,
          timestamp: message.timestamp,
          channelId: messageChannelId,
          channelName,
          showChannel,
          attachments: Array.isArray(message.attachments) ? message.attachments : [],
          embeds: Array.isArray(message.embeds) ? message.embeds : [],
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
      if (this.options.previewMode) {
        this.state.delCount++;
        if (this.state._batchActive) this.state._batchDelCount++;
        return 'OK';
      }

	    const API_DELETE_URL = `https://discord.com/api/v9/channels/${message.channel_id}/messages/${message.id}`;
	    let resp;
	    try {
        const reqCtl = this.beginAbortableRequest();
	      this.beforeRequest();
	      resp = await fetch(API_DELETE_URL, {
	        method: 'DELETE',
	        headers: {
	          'Authorization': this.options.authToken,
	        },
          signal: reqCtl.signal,
	      });
        this.endAbortableRequest(reqCtl);
	      this.afterRequest();
	    } catch (err) {
        if (err?.name === 'AbortError' && !this.state.running) {
          return 'FAILED';
        }
	      // no response error (e.g. network error)
	      log.error('Delete request throwed an error:', err);
	      log.verb('Related object:', redact(JSON.stringify(message)));
	      this.state.failCount++;
        if (this.state._batchActive) this.state._batchFailCount++;
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
              if (this.state._batchActive) this.state._batchFailCount++;
	            return 'FAIL_SKIP'; // Failed but we will skip it next time
	          }

	          log.error(`Error deleting message, API responded with status ${resp.status}!`, r);
	          log.verb('Related object:', redact(JSON.stringify(message)));
	          this.state.failCount++;
            if (this.state._batchActive) this.state._batchFailCount++;
	          return 'FAILED';
	        } catch (e) {
	          log.error(`Fail to parse JSON. API responded with status ${resp.status}!`, body);
            this.state.failCount++;
            if (this.state._batchActive) this.state._batchFailCount++;
            return 'FAILED';
	        }
	      }
	    }

	    this.state.delCount++;
      if (this.state._batchActive) this.state._batchDelCount++;
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

  function normalizeTokenCandidate(raw) {
    if (typeof raw !== 'string') return '';
    const s = raw.trim();
    if (!s) return '';
    try {
      const parsed = JSON.parse(s);
      return typeof parsed === 'string' ? parsed : '';
    } catch {
      // In some builds/storage states token can already be plain text.
      return s.replace(/^"|"$/g, '');
    }
  }

	function getTokenFromPageContext() {
	  return new Promise((resolve, reject) => {
	    const reqId = `undiscord_token_${Date.now()}_${Math.random().toString(36).slice(2)}`;
	    const timeoutMs = 10000;
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
      script.onerror = () => {
        cleanup();
        reject(new Error('page-context script injection blocked or failed'));
      };
	    (document.head || document.documentElement).appendChild(script);
	    script.remove();

	    setTimeout(() => {
	      cleanup();
	      reject(new Error('token request timeout'));
	    }, timeoutMs);
	  });
	}

	function getTokenFromClassicWebpackPush() {
	  const chunk = window.webpackChunkdiscord_app;
	  if (!Array.isArray(chunk) || typeof chunk.push !== 'function') {
	    throw new Error('webpackChunkdiscord_app is not available');
	  }

	  let modules = [];
	  chunk.push([['__undiscord__classic__'], {}, (e) => {
	    modules = [];
	    for (const c in e.c) modules.push(e.c[c]);
	  }]);

	  const mod = modules.find(m =>
	    m?.exports?.default?.getToken !== void 0 ||
	    m?.exports?.getToken !== void 0
	  );
	  if (!mod) throw new Error('classic webpack push: getToken module not found');

	  if (mod?.exports?.default?.getToken) return mod.exports.default.getToken();
	  if (mod?.exports?.getToken) return mod.exports.getToken();
	  throw new Error('classic webpack push: getToken export not callable');
	}

	async function getToken() {
	  window.dispatchEvent(new Event('beforeunload'));
	  const LS = document.body.appendChild(document.createElement('iframe')).contentWindow.localStorage;

    const storageToken = normalizeTokenCandidate(LS.token);
    if (storageToken) return storageToken;

    log.info('Could not automatically detect Authorization Token in local storage!');
    log.info('Attempting to grab token using webpack');

    const attempts = [];

    try {
      const t = getTokenFromWebpack(window);
      if (t) return t;
      attempts.push('getTokenFromWebpack: empty token');
    } catch (err) {
      attempts.push(`getTokenFromWebpack: ${String(err?.message || err)}`);
      log.warn('Generic webpack token extraction failed, trying classic webpack push...', err);
    }

    try {
      const t = getTokenFromClassicWebpackPush();
      if (t) return t;
      attempts.push('getTokenFromClassicWebpackPush: empty token');
    } catch (errClassic) {
      attempts.push(`getTokenFromClassicWebpackPush: ${String(errClassic?.message || errClassic)}`);
      log.warn('Classic webpack push token extraction failed in content world, trying page context...', errClassic);
    }

    try {
      const t = await getTokenFromPageContext();
      if (t) return t;
      attempts.push('getTokenFromPageContext: empty token');
    } catch (err2) {
      attempts.push(`getTokenFromPageContext: ${String(err2?.message || err2)}`);
      log.warn('Page-context token extraction failed.', err2);
    }

    const chunkKeys = Object.keys(window).filter(k => k.startsWith('webpackChunk'));
    log.debug('Token extraction attempts:', attempts);
    log.debug('webpackChunk keys detected:', chunkKeys);
    throw new Error('token auto-detection failed');
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

  function extractDiscordId(value) {
    const raw = String(value || '').trim();
    if (!raw) return '';
    const m = raw.match(/\d{17,21}/);
    return m ? m[0] : '';
  }

  function parseChannelIdsInput(value) {
    const tokens = String(value || '')
      .split(/[\s,;]+/)
      .map(x => x.trim())
      .filter(Boolean);
    const ids = [];
    const seen = new Set();
    for (const token of tokens) {
      const id = extractDiscordId(token);
      if (!id || seen.has(id)) continue;
      seen.add(id);
      ids.push(id);
    }
    return ids;
  }

  function getServerChannelIdsFromDom(guildId) {
    const gid = String(guildId || '').trim();
    if (!gid || gid === '@me') return [];

    const rows = Array.from(document.querySelectorAll(
      `#app-mount a[data-list-item-id^="channels___"][href^="/channels/${gid}/"]`
    ));
    const ids = new Set();

    for (const row of rows) {
      const href = String(row.getAttribute('href') || '');
      const m = href.match(new RegExp(`^/channels/${gid}/(\\d+)`));
      if (m) ids.add(m[1]);
    }
    return Array.from(ids);
  }

  async function getServerMessageChannels(guildId, authToken) {
    const gid = String(guildId || '').trim();
    if (!gid || gid === '@me') return [];

    if (!authToken) {
      return getServerChannelIdsFromDom(gid).map((id) => ({ id: String(id), type: null, name: '', source: 'dom' }));
    }

    try {
      const resp = await fetch(`https://discord.com/api/v9/guilds/${gid}/channels`, {
        headers: { Authorization: authToken }
      });
      if (!resp.ok) throw new Error(`GET /guilds/${gid}/channels failed with ${resp.status}`);
      const channels = await resp.json();
      if (!Array.isArray(channels)) {
        return getServerChannelIdsFromDom(gid).map((id) => ({ id: String(id), type: null, name: '', source: 'dom' }));
      }

      // Message-bearing / searchable channel types:
      // 0 text, 5 announcement, 10/11/12/13 threads, 15 forum, 16 media
      const messageType = new Set([0, 5, 10, 11, 12, 13, 15, 16]);
      const out = new Map();
      for (const ch of channels) {
        if (!ch || String(ch.guild_id) !== gid) continue;
        const type = Number(ch.type);
        if (!messageType.has(type)) continue;
        const id = String(ch.id || '');
        if (!id) continue;
        out.set(id, { id, type, name: String(ch.name || ''), source: 'guild_channels' });
      }

      // Active threads are not always present in /guilds/{id}/channels on all builds.
      try {
        const tResp = await fetch(`https://discord.com/api/v9/guilds/${gid}/threads/active`, {
          headers: { Authorization: authToken }
        });
        if (tResp.ok) {
          const tData = await tResp.json();
          const threads = Array.isArray(tData?.threads) ? tData.threads : [];
          for (const th of threads) {
            const thId = String(th?.id || '');
            if (!thId) continue;
            const type = Number(th?.type);
            out.set(thId, {
              id: thId,
              type: Number.isFinite(type) ? type : 11,
              name: String(th?.name || ''),
              source: 'threads_active'
            });
          }
        }
      } catch {}

      // Archived threads are a common blind spot of guild-wide search.
      // Probe one page per parent to improve coverage with minimal overhead.
      // Include private thread archives as well when allowed by permissions.
      const archiveParents = channels
        .filter(ch => ch && String(ch.guild_id) === gid && [0, 5, 15, 16].includes(Number(ch.type)))
        .map(ch => String(ch.id || ''))
        .filter(Boolean);
      for (const parentId of archiveParents) {
        const archiveEndpoints = [
          { path: 'threads/archived/public', source: 'threads_archived_public' },
          { path: 'users/@me/threads/archived/private', source: 'threads_archived_private_me' },
          { path: 'threads/archived/private', source: 'threads_archived_private' },
        ];
        for (const endpoint of archiveEndpoints) {
          try {
            const aResp = await fetch(
              `https://discord.com/api/v9/channels/${parentId}/${endpoint.path}?limit=100`,
              { headers: { Authorization: authToken } }
            );
            if (!aResp.ok) continue;
            const aData = await aResp.json();
            const threads = Array.isArray(aData?.threads) ? aData.threads : [];
            for (const th of threads) {
              const thId = String(th?.id || '');
              if (!thId) continue;
              const type = Number(th?.type);
              out.set(thId, {
                id: thId,
                type: Number.isFinite(type) ? type : 11,
                name: String(th?.name || ''),
                source: endpoint.source
              });
            }
          } catch {}
        }
      }

      const resolved = Array.from(out.values());
      if (resolved.length) return resolved;

      return getServerChannelIdsFromDom(gid).map((id) => ({ id: String(id), type: null, name: '', source: 'dom' }));
    } catch (err) {
      log.warn('Could not fetch all guild channels from API, falling back to sidebar DOM.', err);
      return getServerChannelIdsFromDom(gid).map((id) => ({ id: String(id), type: null, name: '', source: 'dom' }));
    }
  }

  function messageMatchesDeleteFiltersLocal(message, opts, regex) {
    if (!message) return false;
    const authorId = String(opts?.authorId || '').trim();
    if (authorId && String(message?.author?.id || '') !== authorId) return false;

    const messageId = String(message?.id || '');
    if (!messageId) return false;

    if (opts?.minId) {
      const minSnow = String(toSnowflake(opts.minId));
      if (BigInt(messageId) <= BigInt(minSnow)) return false;
    }
    if (opts?.maxId) {
      const maxSnow = String(toSnowflake(opts.maxId));
      if (BigInt(messageId) >= BigInt(maxSnow)) return false;
    }

    const content = String(message?.content || '');
    if (opts?.content && !content.toLowerCase().includes(String(opts.content).toLowerCase())) return false;

    if (opts?.hasFile && !(Array.isArray(message?.attachments) && message.attachments.length > 0)) return false;
    if (opts?.hasLink && !/(https?:\/\/[^\s]+)/i.test(content)) return false;

    // Same deletable-type filter used later by core.
    const type = Number(message?.type);
    const isDeletableType = (type === 0 || (type >= 6 && type <= 21));
    if (!isDeletableType) return false;

    if (!opts?.includePinned && !!message?.pinned) return false;
    if (regex && !regex.test(content)) return false;

    return true;
  }

  async function estimateChannelMessageCount({ authToken, guildId, channelId, filters }) {
    const ch = String(channelId || '').trim();
    if (!ch) return { channelId: ch, count: 0, method: 'invalid' };

    const searchQuery = () => queryString([
      ['author_id', filters.authorId || undefined],
      ['channel_id', undefined],
      ['min_id', filters.minId ? toSnowflake(filters.minId) : undefined],
      ['max_id', filters.maxId ? toSnowflake(filters.maxId) : undefined],
      ['sort_by', 'timestamp'],
      ['sort_order', 'desc'],
      ['offset', 0],
      ['has', filters.hasLink ? 'link' : undefined],
      ['has', filters.hasFile ? 'file' : undefined],
      ['content', filters.content || undefined],
      ['include_nsfw', filters.includeNsfw ? true : undefined],
    ]);

    // Fast path: channel search total_results.
    try {
      const resp = await fetch(`https://discord.com/api/v9/channels/${ch}/messages/search?${searchQuery()}`, {
        headers: { Authorization: authToken }
      });

      if (resp.ok) {
        const data = await resp.json();
        return { channelId: ch, count: Math.max(0, Number(data?.total_results || 0)), method: 'search_total' };
      }

      if (resp.status === 202) {
        const body = await resp.json().catch(() => ({}));
        const waitMs = Math.max(500, Math.round((Number(body?.retry_after) || 1) * 1000));
        await wait(waitMs);
        const retry = await fetch(`https://discord.com/api/v9/channels/${ch}/messages/search?${searchQuery()}`, {
          headers: { Authorization: authToken }
        });
        if (retry.ok) {
          const data = await retry.json();
          return { channelId: ch, count: Math.max(0, Number(data?.total_results || 0)), method: 'search_total_after_index' };
        }
      }

      const body = await resp.clone().json().catch(() => null);
      if (!(resp.status === 400 && body?.code === 50024)) {
        return { channelId: ch, count: 0, method: `search_error_${resp.status}` };
      }
    } catch {
      // fallback to history scan below
    }

    // Fallback path: channel history scan count (slower but robust).
    let regex = null;
    try {
      regex = new RegExp(filters.pattern, 'i');
    } catch {
      regex = null;
    }

    let before = null;
    let matched = 0;
    for (let page = 0; page < 5000; page++) {
      const qs = queryString([
        ['limit', 100],
        ['before', before || undefined],
      ]);
      const resp = await fetch(`https://discord.com/api/v9/channels/${ch}/messages?${qs}`, {
        headers: { Authorization: authToken }
      });
      if (!resp.ok) {
        if (resp.status === 429) {
          const body = await resp.json().catch(() => ({}));
          const retryAfterMs = Math.max(500, Math.round((Number(body?.retry_after) || 1) * 1000));
          await wait(retryAfterMs);
          continue;
        }
        return { channelId: ch, count: matched, method: `history_partial_${resp.status}` };
      }
      const list = await resp.json();
      const batch = Array.isArray(list) ? list : [];
      if (!batch.length) break;

      for (const msg of batch) {
        if (messageMatchesDeleteFiltersLocal(msg, filters, regex)) matched++;
      }
      before = String(batch[batch.length - 1]?.id || '');
      if (!before) break;
      await wait(120);
    }
    return { channelId: ch, count: matched, method: 'history_scan_count' };
  }

  async function collectChannelPreviewLines({ authToken, channelId, filters, maxLines = 100 }) {
    const ch = String(channelId || '').trim();
    if (!ch || maxLines <= 0) return { lines: [], truncated: false, method: 'invalid' };

    const lines = [];
    let truncated = false;
    let regex = null;
    try {
      regex = new RegExp(filters.pattern, 'i');
    } catch {
      regex = null;
    }

    const toLine = (m) => {
      const author = m?.author
        ? `${m.author.username || 'Unknown'}#${m.author.discriminator || '0'}`
        : 'Unknown#0000';
      const text = String(m?.content || '').replace(/\s+/g, ' ').trim();
      const hasAtt = Array.isArray(m?.attachments) && m.attachments.length > 0;
      return `${author}: ${text || (hasAtt ? '[ATTACHMENTS]' : '[NO TEXT]')}`;
    };

    const searchQuery = (offset = 0) => queryString([
      ['author_id', filters.authorId || undefined],
      ['channel_id', undefined],
      ['min_id', filters.minId ? toSnowflake(filters.minId) : undefined],
      ['max_id', filters.maxId ? toSnowflake(filters.maxId) : undefined],
      ['sort_by', 'timestamp'],
      ['sort_order', 'desc'],
      ['offset', offset],
      ['has', filters.hasLink ? 'link' : undefined],
      ['has', filters.hasFile ? 'file' : undefined],
      ['content', filters.content || undefined],
      ['include_nsfw', filters.includeNsfw ? true : undefined],
    ]);

    // Fast path: search pages
    try {
      for (let offset = 0; offset < 5000 && lines.length < maxLines; offset += 25) {
        const resp = await fetch(`https://discord.com/api/v9/channels/${ch}/messages/search?${searchQuery(offset)}`, {
          headers: { Authorization: authToken }
        });

        if (resp.status === 202) {
          const body = await resp.json().catch(() => ({}));
          const waitMs = Math.max(500, Math.round((Number(body?.retry_after) || 1) * 1000));
          await wait(waitMs);
          offset -= 25;
          continue;
        }
        if (resp.status === 429) {
          const body = await resp.json().catch(() => ({}));
          const waitMs = Math.max(500, Math.round((Number(body?.retry_after) || 1) * 1000));
          await wait(waitMs);
          offset -= 25;
          continue;
        }

        if (!resp.ok) {
          const body = await resp.clone().json().catch(() => null);
          if (resp.status === 400 && body?.code === 50024) break; // fallback below
          return { lines, truncated, method: `search_error_${resp.status}` };
        }

        const data = await resp.json();
        const groups = Array.isArray(data?.messages) ? data.messages : [];
        if (!groups.length) break;

        const pageMessages = groups
          .map(g => Array.isArray(g) ? g.find((m) => m?.hit === true) : null)
          .filter(Boolean)
          .filter((m) => messageMatchesDeleteFiltersLocal(m, filters, regex));

        for (const msg of pageMessages) {
          lines.push(toLine(msg));
          if (lines.length >= maxLines) {
            truncated = true;
            break;
          }
        }

        if (Number(data?.total_results || 0) <= offset + groups.length) break;
      }

      if (lines.length) return { lines, truncated, method: 'search_pages' };
    } catch {
      // fallback below
    }

    // Fallback: history scan
    let before = null;
    for (let page = 0; page < 5000 && lines.length < maxLines; page++) {
      const qs = queryString([
        ['limit', 100],
        ['before', before || undefined],
      ]);
      const resp = await fetch(`https://discord.com/api/v9/channels/${ch}/messages?${qs}`, {
        headers: { Authorization: authToken }
      });
      if (!resp.ok) {
        if (resp.status === 429) {
          const body = await resp.json().catch(() => ({}));
          const retryAfterMs = Math.max(500, Math.round((Number(body?.retry_after) || 1) * 1000));
          await wait(retryAfterMs);
          continue;
        }
        return { lines, truncated, method: `history_error_${resp.status}` };
      }
      const list = await resp.json();
      const batch = Array.isArray(list) ? list : [];
      if (!batch.length) break;

      for (const msg of batch) {
        if (!messageMatchesDeleteFiltersLocal(msg, filters, regex)) continue;
        lines.push(toLine(msg));
        if (lines.length >= maxLines) {
          truncated = true;
          break;
        }
      }

      before = String(batch[batch.length - 1]?.id || '');
      if (!before) break;
      await wait(120);
    }

    return { lines, truncated, method: 'history_scan' };
  }

  async function debugCurrentChannelDiscovery(guildId, authToken, discoveredChannels) {
    const gid = String(guildId || '').trim();
    const currentChannelId = String(getChannelId({ silent: true }) || '').trim();
    if (!gid || gid === '@me') return;
    if (!currentChannelId) {
      log.warn('debug:current-channel: could not resolve current channel id from URL.');
      return;
    }

    const discoveredSet = new Set((Array.isArray(discoveredChannels) ? discoveredChannels : [])
      .map((x) => String(x?.id || ''))
      .filter(Boolean));
    const isInDiscovered = discoveredSet.has(currentChannelId);
    log.verb(`debug:current-channel id=${currentChannelId} in_discovered=${isInDiscovered ? 'yes' : 'no'}`);
    if (isInDiscovered) {
      const found = discoveredChannels.find((x) => String(x?.id || '') === currentChannelId);
      log.verb('debug:current-channel discovered entry:', found || null);
      return;
    }

    if (!authToken) {
      log.warn('debug:current-channel: missing auth token, cannot run API diagnostics.');
      return;
    }

    let channelMeta = null;
    try {
      const cResp = await fetch(`https://discord.com/api/v9/channels/${currentChannelId}`, {
        headers: { Authorization: authToken }
      });
      if (!cResp.ok) {
        log.warn(`debug:current-channel GET /channels/${currentChannelId} failed with ${cResp.status}`);
      } else {
        const cData = await cResp.json();
        channelMeta = {
          id: String(cData?.id || ''),
          guild_id: String(cData?.guild_id || ''),
          type: Number(cData?.type),
          parent_id: String(cData?.parent_id || ''),
          name: String(cData?.name || ''),
          thread_metadata: cData?.thread_metadata || null,
        };
        log.verb('debug:current-channel meta:', channelMeta);
      }
    } catch (err) {
      log.warn('debug:current-channel meta fetch failed:', err);
    }

    if (channelMeta?.guild_id && channelMeta.guild_id !== gid) {
      log.warn(`debug:current-channel guild mismatch: current=${channelMeta.guild_id} expected=${gid}`);
    }

    const allowedTypes = new Set([0, 5, 10, 11, 12, 13, 15, 16]);
    if (channelMeta && !allowedTypes.has(channelMeta.type)) {
      log.warn(`debug:current-channel filtered by type. type=${channelMeta.type} is not in [0,5,10,11,12,13,15,16].`);
    }

    let guildChannels = [];
    try {
      const gResp = await fetch(`https://discord.com/api/v9/guilds/${gid}/channels`, {
        headers: { Authorization: authToken }
      });
      if (!gResp.ok) {
        log.warn(`debug:current-channel GET /guilds/${gid}/channels failed with ${gResp.status}`);
      } else {
        const data = await gResp.json();
        guildChannels = Array.isArray(data) ? data : [];
      }
    } catch (err) {
      log.warn('debug:current-channel guild channels fetch failed:', err);
    }
    if (guildChannels.length) {
      const inGuildChannels = guildChannels.some((ch) => String(ch?.id || '') === currentChannelId);
      log.verb(`debug:current-channel in guild/channels list: ${inGuildChannels ? 'yes' : 'no'}`);
    }

    try {
      const tResp = await fetch(`https://discord.com/api/v9/guilds/${gid}/threads/active`, {
        headers: { Authorization: authToken }
      });
      if (tResp.ok) {
        const tData = await tResp.json();
        const threads = Array.isArray(tData?.threads) ? tData.threads : [];
        const inActiveThreads = threads.some((th) => String(th?.id || '') === currentChannelId);
        log.verb(`debug:current-channel in guild/threads/active: ${inActiveThreads ? 'yes' : 'no'}`);
      } else {
        log.warn(`debug:current-channel GET /guilds/${gid}/threads/active failed with ${tResp.status}`);
      }
    } catch (err) {
      log.warn('debug:current-channel active threads fetch failed:', err);
    }

    const parentId = String(channelMeta?.parent_id || '');
    if (parentId) {
      const archiveEndpoints = [
        'threads/archived/public',
        'users/@me/threads/archived/private',
        'threads/archived/private',
      ];
      for (const endpoint of archiveEndpoints) {
        try {
          const aResp = await fetch(
            `https://discord.com/api/v9/channels/${parentId}/${endpoint}?limit=100`,
            { headers: { Authorization: authToken } }
          );
          if (!aResp.ok) {
            log.verb(`debug:current-channel parent archive endpoint ${endpoint} status=${aResp.status}`);
            continue;
          }
          const aData = await aResp.json();
          const threads = Array.isArray(aData?.threads) ? aData.threads : [];
          const present = threads.some((th) => String(th?.id || '') === currentChannelId);
          log.verb(`debug:current-channel in ${endpoint}: ${present ? 'yes' : 'no'} (parent=${parentId}, page_size=${threads.length})`);
        } catch (err) {
          log.verb(`debug:current-channel archive endpoint failed (${endpoint}):`, err);
        }
      }
    } else {
      log.verb('debug:current-channel has no parent_id; archive-thread probes skipped.');
    }

    const domIds = getServerChannelIdsFromDom(gid);
    const inDom = domIds.includes(currentChannelId);
    log.verb(`debug:current-channel in DOM sidebar list: ${inDom ? 'yes' : 'no'}`);
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
    previewMode: null,
    hideAuthorText: null,
    hideMessageText: null,
    redact: null,
    channelBadge: null,
    channelName: null,
    convBadge: null,
    convName: null,
    convAvatar: null,
    deleteAllChannels: null,
    preScanStatus: null,
	};
  let hardStopRequested = false;
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
      updateDeleteAllToggleVisibility();
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

      updateDeleteAllToggleVisibility();
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

    function hashToHue(input) {
      const s = String(input || '');
      let h = 0;
      for (let i = 0; i < s.length; i++) {
        h = ((h << 5) - h + s.charCodeAt(i)) | 0;
      }
      return Math.abs(h) % 360;
    }

    function makeInitials(label) {
      const text = normalizeConvName(label).replace(/\s+/g, ' ');
      if (!text) return '?';
      // Preserve Discord acronym as-is when available (e.g. "Sdc").
      if (!text.includes(' ') && /^[A-Za-z0-9]{2,4}$/.test(text)) return text;
      const words = text.split(' ').filter(Boolean);
      if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
      const compact = words[0].replace(/[^A-Za-z0-9]/g, '');
      if (!compact) return '?';
      return compact.slice(0, 2).toUpperCase();
    }

    function makeGuildFallbackAvatarDataUrl(label) {
      const initials = makeInitials(label);
      const hue = hashToHue(label || initials);
      const bg1 = `hsl(${hue}, 68%, 40%)`;
      const bg2 = `hsl(${(hue + 28) % 360}, 65%, 30%)`;
      const svg =
        `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">` +
        `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
        `<stop offset="0%" stop-color="${bg1}"/><stop offset="100%" stop-color="${bg2}"/></linearGradient></defs>` +
        `<rect width="64" height="64" rx="32" fill="url(#g)"/>` +
        `<text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-family="system-ui,Segoe UI,Arial" font-size="24" font-weight="700" fill="white">${escapeHTML(initials)}</text>` +
        `</svg>`;
      return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    }

    function parseGuildIdFromListItemId(listItemId) {
      const m = String(listItemId || '').match(/^guildsnav___(\d+)$/);
      return m ? m[1] : '';
    }

    function getGuildInfoFromNavItem(item) {
      if (!item) return { guildId: '', name: '', avatar: '' };

      const guildId = parseGuildIdFromListItemId(item.getAttribute('data-list-item-id'));
      if (!guildId) return { guildId: '', name: '', avatar: '' };

      const hidden = item.querySelector('.hiddenVisually_b18fe2');
      const dnd = item.closest('[data-dnd-name]')?.getAttribute('data-dnd-name') || '';
      const name = normalizeConvName(hidden?.textContent || dnd || '');
      const acronym = normalizeConvName(
        item.querySelector('[class*="acronym"]')?.textContent || ''
      );

      const img = item.querySelector('img.icon__6e9f8, img[aria-hidden="true"]');
      const avatar = img?.src && isValidDiscordAvatarUrl(img.src)
        ? img.src
        // Prefer Discord's displayed acronym (e.g. "Sdc") when no icon exists.
        : makeGuildFallbackAvatarDataUrl(acronym || name || guildId);

      return { guildId, name: isGenericConversationLabel(name) ? '' : name, avatar };
    }

    function getSelectedGuildInfoFromNav() {
      const selected = Array.from(document.querySelectorAll(
        '#app-mount [data-list-item-id^="guildsnav___"][aria-selected="true"]'
      )).find((el) => !!parseGuildIdFromListItemId(el.getAttribute('data-list-item-id')));

      return getGuildInfoFromNavItem(selected);
    }

    function getGuildInfoFromNavById(guildId) {
      const gid = String(guildId || '').trim();
      if (!gid || gid === '@me') return { guildId: '', name: '', avatar: '' };

      const item = document.querySelector(
        `#app-mount [data-list-item-id="guildsnav___${gid}"]`
      );
      return getGuildInfoFromNavItem(item);
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

      // For guilds, use server icon as avatar but keep channel name as title.
      if (guildId && guildId !== '@me') {
        const byId = getGuildInfoFromNavById(guildId);
        if (byId.avatar) avatar = byId.avatar;

        // Fallback: selected guild entry if direct lookup misses temporarily.
        if (!avatar) {
          const selected = getSelectedGuildInfoFromNav();
          if (selected.guildId === String(guildId)) {
            if (!avatar && selected.avatar) avatar = selected.avatar;
          }
        }
      }

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

    function getChannelNameFromSidebarById(channelId, guildId) {
      const cid = String(channelId || '').trim();
      if (!cid) return '';
      const gid = String(guildId || '').trim();
      const selectors = [
        `#app-mount a[data-list-item-id="channels___${cid}"]`,
        gid ? `#app-mount a[href="/channels/${gid}/${cid}"]` : '',
      ].filter(Boolean);
      for (const selector of selectors) {
        const anchor = document.querySelector(selector);
        if (!anchor) continue;
        const nameNode = anchor.querySelector('[class*="name__2ea32"], [class*="name__"]');
        const name = normalizeConvName(nameNode?.textContent || '');
        if (name && !isGenericConversationLabel(name)) return name;
      }
      return '';
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
      if (!ui.channelBadge || !ui.channelName || !ui.convBadge || !ui.convName || !ui.convAvatar) return;

      const inputChannelId = $('input#channelId')?.value?.trim() || getChannelId({ silent: true }) || '';
      const runningChannelId = undiscordCore?.state?.running
        ? String(undiscordCore?.options?.channelId || '').trim()
        : '';
      const activeChannelId = runningChannelId || inputChannelId;
      const guildId = $('input#guildId')?.value?.trim() || getGuildId({ silent: true }) || '';
      const isDm = guildId === '@me';
      const deleteAllChannels = !isDm && !!ui.deleteAllChannels?.checked;

      if (!activeChannelId && !guildId) {
        ui.channelBadge.style.display = 'none';
        ui.convBadge.style.display = 'none';
        return;
      }

      if (!isDm) {
        const guildInfo = getGuildInfoFromNavById(guildId) || { name: '', avatar: '' };
        const guildName = normalizeConvName(guildInfo?.name || '');
        const serverName = guildName || `Server ${guildId}`;
        const serverAvatar = guildInfo?.avatar || makeGuildFallbackAvatarDataUrl(serverName || guildId || 'Server');

        ui.convBadge.style.display = '';
        ui.convName.textContent = serverName;
        ui.convAvatar.src = serverAvatar;
        ui.convAvatar.style.display = '';

        if (deleteAllChannels) {
          ui.channelBadge.style.display = 'none';
        } else {
          const channelNameFromSidebar = getChannelNameFromSidebarById(activeChannelId, guildId);
          const channelNameFromDom = getConversationInfoFromDom(activeChannelId, guildId)?.name || '';
          const channelName = channelNameFromSidebar || channelNameFromDom || (activeChannelId ? `Channel ${activeChannelId}` : 'Current channel');
          if (channelName) {
            ui.channelBadge.style.display = '';
            ui.channelName.textContent = channelName;
          } else {
            ui.channelBadge.style.display = 'none';
          }
        }
        return;
      }

      ui.channelBadge.style.display = 'none';
      const dmDom = getConversationInfoFromDom(activeChannelId, guildId);
      const dmName = dmDom?.name || convStable.name || 'DM';
      const dmAvatar = dmDom?.avatar || convStable.avatar || '';

      ui.convBadge.style.display = '';
      ui.convName.textContent = dmName;
      if (dmAvatar) {
        ui.convAvatar.src = dmAvatar;
        ui.convAvatar.style.display = '';
      } else {
        ui.convAvatar.style.display = 'none';
      }
      if (dmName) convStable.name = dmName;
      if (dmAvatar) convStable.avatar = dmAvatar;

      const token = getAuthTokenForConv();
      if (!token) {
        const now = Date.now();
        if (now - lastBadgeWarnNoTokenAt > 15000) {
          lastBadgeWarnNoTokenAt = now;
          log.warn('conv:badge:no-token');
        }
        return;
      }
      fetchConversationInfoFromApi(activeChannelId).then((info) => {
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
    ui.previewMode = $('#previewMode');
    ui.hideAuthorText = $('#hideAuthorText');
    ui.hideMessageText = $('#hideMessageText');
    ui.redact = $('#redact');
    ui.channelBadge = $('#channelBadge');
    ui.channelName = $('#channelName');
    ui.convBadge = $('#convBadge');
    ui.convName = $('#convName');
    ui.convAvatar = $('#convAvatar');
    ui.deleteAllChannels = $('#deleteAllChannels');
    ui.preScanStatus = $('#preScanStatus');

    function updateDeleteAllToggleVisibility() {
      const guildId = $('input#guildId')?.value?.trim() || getGuildId({ silent: true }) || '';
      const isServer = !!guildId && guildId !== '@me';
      const wrap = ui.deleteAllChannels?.closest('.allChannelsToggle');
      if (!wrap) return;
      wrap.style.display = isServer ? '' : 'none';
      if (!isServer && ui.deleteAllChannels?.checked) {
        ui.deleteAllChannels.checked = false;
      }
    }

    ui.deleteAllChannels?.addEventListener('change', () => {
      scheduleConversationBadgeUpdate();
    });
    updateDeleteAllToggleVisibility();

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
    setInterval(() => {
      if (ui.undiscordWindow?.style?.display !== 'none' && undiscordCore?.state?.running) {
        scheduleConversationBadgeUpdate();
      }
    }, 500);



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
        updateDeleteAllToggleVisibility();
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
      updateDeleteAllToggleVisibility();
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
    const showChannel = !!payload.showChannel;
    const channelLabel = String(payload.channelName || payload.channelId || '').trim();
    const channelHtml = showChannel && channelLabel
      ? `<span class="lineChannel">#${escapeHTML(channelLabel)}</span>`
      : '';
    const content = payload.content || '';
    const attachments = Array.isArray(payload.attachments) ? payload.attachments : [];
    const embeds = Array.isArray(payload.embeds) ? payload.embeds : [];

    const mediaCandidates = [];
    const seen = new Set();
    const addCandidate = (urlRaw, contentType = '', filename = 'file') => {
      const url = String(urlRaw || '').trim();
      if (!url) return;
      if (seen.has(url)) return;
      seen.add(url);
      mediaCandidates.push({ url, contentType: String(contentType || '').toLowerCase(), filename: String(filename || 'file') });
    };

    for (const a of attachments) {
      addCandidate(a?.proxy_url || a?.url, a?.content_type, a?.filename || 'file');
    }

    for (const e of embeds) {
      addCandidate(e?.video?.url || e?.image?.url || e?.thumbnail?.url || e?.url, e?.type || '', e?.title || e?.provider?.name || 'embed');
    }

    const urlRegex = /(https?:\/\/[^\s<>"']+)/gi;
    const contentUrls = String(content).match(urlRegex) || [];
    for (const u of contentUrls) {
      addCandidate(u, '', 'link');
    }

    const mediaHtml = mediaCandidates.map((m) => {
      const srcRaw = m.url;
      const src = escapeHTML(srcRaw);
      const ct = m.contentType;
      const name = escapeHTML(m.filename);
      const rawName = String(m.filename || '').toLowerCase();
      const lowerUrl = srcRaw.toLowerCase();

      const isImage = ct.startsWith('image/') || /\.(png|jpe?g|gif|webp|bmp|svg)(\?|$)/.test(lowerUrl);
      const isVideo = ct.startsWith('video/') || ct === 'gifv' || /\.(mp4|webm|mov|m4v|avi|mkv)(\?|$)/.test(lowerUrl);
      const isAudio = ct.startsWith('audio/') || /\.(mp3|wav|ogg|m4a|flac|aac)(\?|$)/.test(lowerUrl);
      const isGifLikeVideo = isVideo && (
        ct === 'gifv' ||
        /\.gifv?(\?|$)/.test(lowerUrl) ||
        rawName.includes('gif') ||
        /(?:^|\/\/)(?:media\.)?tenor\.com\//.test(lowerUrl)
      );

      if (isImage) return `<img src="${src}" alt="${name}">`;
      if (isGifLikeVideo) return `<video autoplay loop muted playsinline preload="metadata" src="${src}"></video>`;
      if (isVideo) return `<video controls preload="metadata" src="${src}"></video>`;
      if (isAudio) return `<audio controls preload="metadata" src="${src}"></audio>`;
      return '';
    }).filter(Boolean).join('');

    const visibleText = content.trim();
    const hasOnlyUrls = visibleText.length > 0 && visibleText.replace(urlRegex, '').trim() === '';
    const hideUrlTextBecauseMediaIsRendered = !!mediaHtml && hasOnlyUrls;
    const textHtml = hideUrlTextBecauseMediaIsRendered
      ? ''
      : (visibleText ? escapeHTML(visibleText) : (mediaHtml ? '' : '[no text]'));
    const attachmentsHtml = mediaHtml ? `<div class="attachments">${mediaHtml}</div>` : '';
    // NOTE: logArea is a <pre>; avoid whitespace/newlines which render as extra gaps.
    ui.logArea.insertAdjacentHTML(
      'beforeend',
      `<div class="log log-del"><div class="stamp"><div class="date"><span class="d">${escapeHTML(date)}</span><span class="t">${escapeHTML(time)}</span></div></div><img class="authorAvatar" src="${avatarUrl}" alt=""><div class="txt"><div class="head"><div class="author"><span class="authorText">${escapeHTML(tag)}</span><span class="authorHidden">[hidden]</span></div>${channelHtml}</div><div class="content"><span class="msgText">${textHtml}</span><span class="msgHidden">[hidden]</span>${attachmentsHtml}</div></div><div class="meta">${escapeHTML(meta)}</div></div>`
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

  function appendCompactTextLog(entry) {
    const time = entry.time.toLocaleTimeString([], { hour12: false });
    const type = String(entry.type || 'info');
    const msg = ui.redact?.checked
      ? redactSensitiveInText(formatArgs(entry.args))
      : renderWithAuthorIdSpans(formatArgs(entry.args));
    ui.logArea.insertAdjacentHTML(
      'beforeend',
      `<div class="log log-${escapeHTML(type)}">[${escapeHTML(time)}] ${msg}</div>`
    );
  }

  function appendCompactEntry(entry) {
    if (entry.type === 'del') appendCompactLog(entry);
    else appendCompactTextLog(entry);
  }

    function renderLogsForMode(mode) {
    ui.logArea.innerHTML = '';
    const entries = logStore[mode] || [];
    for (const entry of entries) {
      if (mode === 'verbose') appendVerboseLog(entry);
      else if (entry.type === 'del') appendCompactEntry(entry);
    }
  }

  function printLog(type = '', args) {
    const entry = { type, args: Array.from(args), time: new Date() };
    logStore.verbose.push(entry);
    logStore.compact.push(entry);

    const isVerbose = !!ui.verboseMode?.checked;
    if (isVerbose) {
      appendVerboseLog(entry);
    } else {
      // Compact mode shows only deletion cards.
      if (type === 'del') {
        appendCompactEntry(entry);
      }
    }

    if (ui.autoScroll.checked) scrollLogToBottom();
    if (type === 'error') console.error(PREFIX, ...Array.from(args));
  }


function setupUndiscordCore() {
    let progressTicker = null;
    let displayedRemainingMs = 0;
    let lastRemainingUiUpdateTs = 0;

    function setPreScanStatus(text = '') {
      if (!ui.preScanStatus) return;
      const value = String(text || '');
      ui.preScanStatus.style.display = value ? 'block' : 'none';
      ui.preScanStatus.textContent = value;
    }

    function setMainProgressVisibility(show) {
      const display = show ? 'block' : 'none';
      ui.progressMain.style.display = display;
      ui.progressBarPercent.style.display = display;
      ui.percent.style.display = display;
    }

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
      const usingBatch = !!state._batchActive;
      const value = usingBatch
        ? (state._batchDelCount + state._batchFailCount)
        : (state.delCount + state.failCount);
      let max = usingBatch
        ? Math.max(0, state._batchGrandTotal)
        : Math.max(0, state.grandTotal - (state._skippedUniqueCount || 0));
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
      setPreScanStatus('');

	    log.debug('onStart', state, stats);
	    $('#start').disabled = true;
	    $('#stop').disabled = false;

	    ui.undiscordBtn.classList.add('running');
      setMainProgressVisibility(true);
	    ui.progressBarPercent.textContent = '0%';

      if (undiscordCore.options.previewMode) {
        log.warn('Preview mode enabled: messages are not deleted.');
      }
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
      log.debug('onStop', state, stats);
      setPreScanStatus('');
      if (progressTicker) {
        clearInterval(progressTicker);
        progressTicker = null;
      }
      displayedRemainingMs = 0;
      lastRemainingUiUpdateTs = 0;

      $('#start').disabled = false;
      $('#stop').disabled = true;
      ui.undiscordBtn.classList.remove('running');
      setMainProgressVisibility(false);

      // ✅ Normal completion: green bar + success message
      if (state.endReason === 'DONE') {
        const total = state.delCount + state.failCount;
        const skipped = state._skippedUniqueCount || 0;
        const effectiveMax = Math.max(0, state.grandTotal - skipped);
        const max = Math.max(effectiveMax, total);
        const isPreview = !!undiscordCore.options.previewMode;

        // If this happens, Discord search/index likely returned an empty page too early.
        if (effectiveMax > 0 && total < effectiveMax) {
          ui.undiscordWindow.classList.remove('finished');
          const msg = `WARNING: finished early? ${state.delCount} deleted, ${state.failCount} failed. (${total}/${max}) Try increasing Search delay and run again.`;
          $('#doneBanner').textContent = msg;
          log.warn(msg);
        } else {
          ui.undiscordWindow.classList.add('finished');
          const msg = isPreview
            ? `Preview completed: ${state.delCount} simulated deletions, ${state.failCount} failed. (${total}/${max})`
            : `✅ Completed: ${state.delCount} deleted, ${state.failCount} failed. (${total}/${max})`;
          $('#doneBanner').textContent = msg;
          if (isPreview) log.info(msg);
          else log.success(msg);
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
	  log.debug('startAction');
    hardStopRequested = false;
    $('#start').disabled = true;
    $('#stop').disabled = false;
    let preScanProgressActive = false;
    const setPreScanStatus = (text = '') => {
      if (!ui.preScanStatus) return;
      const value = String(text || '');
      ui.preScanStatus.style.display = value ? 'block' : 'none';
      ui.preScanStatus.textContent = value;
    };
    const setMainProgressVisibility = (show) => {
      const display = show ? 'block' : 'none';
      ui.progressMain.style.display = display;
      ui.progressBarPercent.style.display = display;
      ui.percent.style.display = display;
    };
    const throwIfHardStop = () => {
      if (!hardStopRequested) return;
      const err = new Error('STOP_REQUESTED');
      err.code = 'STOP_REQUESTED';
      throw err;
    };
    const showPreScanProgress = (label, value = null, max = null) => {
      preScanProgressActive = true;
      ui.undiscordWindow.classList.remove('finished');
      $('#doneBanner').textContent = '';
      setPreScanStatus(label || 'Preparing all-channels scan...');
      ui.undiscordBtn.classList.add('running');
      setMainProgressVisibility(true);

      const hasMax = Number.isFinite(max) && Number(max) > 0;
      if (hasMax) {
        const safeMax = Math.max(1, Math.floor(Number(max)));
        const safeValue = Math.max(0, Math.min(safeMax, Math.floor(Number(value) || 0)));
        ui.progressMain.setAttribute('max', safeMax);
        ui.progressMain.value = safeValue;
        const pct = Math.round((safeValue / safeMax) * 100);
        ui.progressBarPercent.textContent = `${pct}%`;
      } else {
        ui.progressMain.removeAttribute('max');
        ui.progressMain.removeAttribute('value');
        ui.progressBarPercent.textContent = '...';
      }

      ui.percent.textContent = '';
    };
    const clearPreScanProgress = () => {
      if (!preScanProgressActive) return;
      preScanProgressActive = false;
      setPreScanStatus('');
      if (undiscordCore.state.running) return;
      ui.undiscordBtn.classList.remove('running');
      setMainProgressVisibility(false);
    };

    try {

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
	  const authorId = extractDiscordId(authorInput.value) || authorInput.value.trim();
	  const guildId = extractDiscordId(guildInput.value) || guildInput.value.trim() || (getGuildId({ silent: true }) || '');
    const deleteAllChannels = $('input#deleteAllChannels')?.checked && guildId !== '@me';
    let allChannelInfos = [];
    let fallbackChannelIds = [];
    let preCountGrandTotal = 0;
    let batchPreviewLines = [];
    let batchPreviewTruncated = false;
    let perChannelCounts = [];
	  const channelValue = channelInput.value.trim() || (getChannelId({ silent: true }) || '');
	  let channelIds = deleteAllChannels ? [] : parseChannelIdsInput(channelValue);
    if (guildId && !guildInput.value.trim()) guildInput.value = guildId;
    if (channelValue && !channelInput.value.trim()) channelInput.value = channelValue;
	  const includeNsfw = $('input#includeNsfw').checked;
	  // filter
	  const content = $('input#search').value.trim();
	  const hasLink = $('input#hasLink').checked;
	  const hasFile = $('input#hasFile').checked;
	  const includePinned = $('input#includePinned').checked;
	  const pattern = $('input#pattern').value;
    const previewMode = $('input#previewMode').checked;
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
    throwIfHardStop();
    if (authToken && !$('input#token').value.trim()) {
      $('input#token').value = authToken;
    }
	  if (!authToken) return; // get token already logs an error.

	  // clear logArea early so discovery diagnostics remain visible
	  ui.logArea.innerHTML = '';

    if (deleteAllChannels) {
      showPreScanProgress('Discovering channels across this server...');
      throwIfHardStop();
      allChannelInfos = await getServerMessageChannels(guildId, authToken);
      throwIfHardStop();
      channelIds = allChannelInfos.map((x) => String(x?.id || '')).filter(Boolean);
      if (!channelIds.length) {
        alert('Could not resolve server text channels for "Delete from all channels".');
        return log.error('Delete from all channels is ON but no text channel IDs were found.');
      }
      log.info(`Delete from all channels enabled: ${channelIds.length} message channels selected.`);
      const byType = allChannelInfos.reduce((acc, x) => {
        const k = String(Number(x?.type));
        acc[k] = (acc[k] || 0) + 1;
        return acc;
      }, {});
      const bySource = allChannelInfos.reduce((acc, x) => {
        const k = String(x?.source || 'unknown');
        acc[k] = (acc[k] || 0) + 1;
        return acc;
      }, {});
      log.verb('All-channels discovery breakdown (by type):', byType);
      log.verb('All-channels discovery breakdown (by source):', bySource);
      const allIds = allChannelInfos.map((x) => String(x?.id || '')).filter(Boolean);
      log.verb(`All-channels IDs (${allIds.length}):`, allIds.join(', '));
      const allIdsDetailed = allChannelInfos
        .map((x) => `${String(x?.id || '')}[type=${Number(x?.type)},source=${String(x?.source || 'unknown')}]`)
        .filter((x) => !x.startsWith('[type='));
      log.verb('All-channels IDs detailed:', allIdsDetailed.join(', '));
      await debugCurrentChannelDiscovery(guildId, authToken, allChannelInfos);
      throwIfHardStop();
      const preCountFilters = {
        authorId,
        minId: minId || minDate,
        maxId: maxId || maxDate,
        content,
        hasLink,
        hasFile,
        includeNsfw,
        includePinned,
        pattern,
      };
      log.info(`All-channels pre-count: scanning ${channelIds.length} channels to estimate totals...`);
      const previewLimitTotal = 300;
      showPreScanProgress(`Scanning all channels: 0/${channelIds.length}`, 0, channelIds.length);
      for (let i = 0; i < channelIds.length; i++) {
        throwIfHardStop();
        const ch = channelIds[i];
        const chMeta = allChannelInfos.find((x) => String(x?.id || '') === ch) || null;
        const chName = String(chMeta?.name || '').trim();
        showPreScanProgress(
          chName
            ? `Scanning all channels: ${i + 1}/${channelIds.length} (#${chName})`
            : `Scanning all channels: ${i + 1}/${channelIds.length}`,
          i + 1,
          channelIds.length
        );
        const estimate = await estimateChannelMessageCount({
          authToken,
          guildId,
          channelId: ch,
          filters: preCountFilters,
        });
        throwIfHardStop();
        const count = Math.max(0, Number(estimate?.count || 0));
        preCountGrandTotal += count;
        perChannelCounts.push({
          id: ch,
          count,
          method: String(estimate?.method || 'unknown'),
        });
        const remainingPreview = previewLimitTotal - batchPreviewLines.length;
        if (remainingPreview > 0) {
          const preview = await collectChannelPreviewLines({
            authToken,
            channelId: ch,
            filters: preCountFilters,
            maxLines: remainingPreview,
          });
          throwIfHardStop();
          if (Array.isArray(preview?.lines) && preview.lines.length) {
            batchPreviewLines.push(...preview.lines);
          }
          if (preview?.truncated) batchPreviewTruncated = true;
        } else {
          batchPreviewTruncated = true;
        }
        log.info(`All-channels pre-count [${i + 1}/${channelIds.length}] channel=${ch} count=${count} via=${estimate?.method || 'unknown'}`);
      }
      if (batchPreviewTruncated) {
        batchPreviewLines.push('[... preview truncated ...]');
      }
      showPreScanProgress('All-channels scan complete. Preparing deletion...', channelIds.length, channelIds.length);
      log.info(`All-channels pre-count total: ${preCountGrandTotal} messages across ${channelIds.length} channels.`);
      const perChannelSummary = perChannelCounts.map((x) => `${x.id}:${x.count}`).join(', ');
      log.verb('All-channels pre-count per-channel:', perChannelSummary);
      log.info('Deletion plan (per channel):');
      for (let i = 0; i < perChannelCounts.length; i++) {
        const x = perChannelCounts[i];
        const meta = allChannelInfos.find((m) => String(m?.id || '') === x.id) || {};
        log.info(
          `plan [${i + 1}/${perChannelCounts.length}]`,
          `channel=${x.id}`,
          `count=${x.count}`,
          `type=${Number(meta?.type)}`,
          `source=${String(meta?.source || 'unknown')}`
        );
      }
      // Guild-wide search may miss some channel families (threads/forum/media).
      fallbackChannelIds = allChannelInfos
        .filter((x) => [10, 11, 12, 13, 15, 16].includes(Number(x?.type)))
        .map((x) => String(x?.id || ''))
        .filter(Boolean);
      if (fallbackChannelIds.length) {
        log.verb(`All-channels fallback candidates: ${fallbackChannelIds.length} (threads/forum/media).`);
      }
    }

	  // validate input
	  if (!guildId) {
      alert('Could not find the Server ID. Open a server/DM and click "current", then retry.');
      return log.error('You must fill the "Server ID" field!');
    }
    if (!deleteAllChannels && !channelIds.length) {
      alert('Could not find the Channel ID. Open a channel/DM and click "current", then retry.');
      return log.error('You must fill the "Channel ID" field!');
    }

	  undiscordCore.resetState();
	  undiscordCore.options = {
	    ...undiscordCore.options,
	    authToken,
	    authorId,
	    guildId,
	    channelId: deleteAllChannels ? undefined : (channelIds.length === 1 ? channelIds[0] : undefined), // all channels => guild-wide search
	    minId: minId || minDate,
	    maxId: maxId || maxDate,
	    content,
	    hasLink,
	    hasFile,
	    includeNsfw,
	    includePinned,
	    pattern,
      previewMode,
	    searchDelay,
	    deleteDelay,
      batchExpectedTotal: deleteAllChannels ? preCountGrandTotal : 0,
      batchPreviewLines: deleteAllChannels ? batchPreviewLines : null,
      batchChannelPlan: deleteAllChannels
        ? Object.fromEntries(perChannelCounts.map((x) => {
          const meta = allChannelInfos.find((m) => String(m?.id || '') === x.id) || {};
          return [x.id, {
            count: x.count,
            method: x.method,
            type: Number(meta?.type),
            name: String(meta?.name || ''),
            source: String(meta?.source || 'unknown'),
          }];
        }))
        : null,
	    // maxAttempt: 2,
	  };
    throwIfHardStop();
	  if (!deleteAllChannels && channelIds.length > 1) {
	    const jobs = channelIds.map(ch => ({
	      guildId: guildId,
	      channelId: ch,
	    }));

	    try {
          throwIfHardStop();
	      await undiscordCore.runBatch(jobs);
	    } catch (err) {
	      log.error('CoreException', err);
	    }
	  }
	  // single channel OR all channels (guild-wide aggregate)
	  else {
	    try {
          throwIfHardStop();
        if (deleteAllChannels) {
          const allJobs = Array.from(new Set(channelIds)).map((ch) => ({
            guildId: guildId,
            channelId: ch,
          }));
          log.info(`Delete from all channels: running strict per-channel batch (${allJobs.length} channels).`);
          throwIfHardStop();
          await undiscordCore.runBatch(allJobs);
          return;
        }
          throwIfHardStop();
	      await undiscordCore.run();

        // Phase 2 fallback: channel-scoped pass for channel families that guild-wide
        // index/search can under-report (threads/forum/media).
        if (deleteAllChannels && fallbackChannelIds.length) {
          const uniqueFallbackIds = Array.from(new Set(fallbackChannelIds));
          const jobs = uniqueFallbackIds.map((ch) => ({
            guildId: guildId,
            channelId: ch,
          }));

          log.info(
            `Delete from all channels: running targeted fallback on ${jobs.length} thread/forum/media channels...`
          );

          undiscordCore.resetState();
          undiscordCore.options = {
            ...undiscordCore.options,
            authToken,
            authorId,
            guildId,
            channelId: undefined,
            minId: minId || minDate,
            maxId: maxId || maxDate,
            content,
            hasLink,
            hasFile,
            includeNsfw,
            includePinned,
            pattern,
            previewMode,
            searchDelay,
            deleteDelay,
            askForConfirmation: false,
          };
          throwIfHardStop();
          await undiscordCore.runBatch(jobs);
        }
	    } catch (err) {
	      log.error('CoreException', err);
	      undiscordCore.stop();
	    }
	  }
    } catch (err) {
      if (err?.code === 'STOP_REQUESTED') {
        log.warn('Stop requested: immediate interruption.');
      } else {
        log.error('startAction failed:', err);
        undiscordCore.stop();
      }
    } finally {
      clearPreScanProgress();
      if (!undiscordCore.state.running) {
        $('#start').disabled = false;
        $('#stop').disabled = true;
      }
    }
	}

	function stopAction() {
	  log.debug('stopAction');
    hardStopRequested = true;
	  undiscordCore.stop();
    if (!undiscordCore.state.running) {
      $('#start').disabled = false;
      $('#stop').disabled = true;
    }
	}

	// ---- END Undiscord ----

initUI();

})();
