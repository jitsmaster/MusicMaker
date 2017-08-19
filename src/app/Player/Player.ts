import { Song } from "../notes/song";
import { Notes_Zelda } from "../notes/zelda/zelda";

var Tone = window["Tone"];

export class Player {
	constructor() {


		Tone.Transport.bpm.value = 100;

		var pulseOptions = {
			oscillator: {
				type: "pulse"
			},
			envelope: {
				release: 0.07
			}
		};

		var triangleOptions = {
			oscillator: {
				type: "triangle"
			},
			envelope: {
				release: 0.07
			}
		};

		var squareOptions = {
			oscillator: {
				type: "square"
			},
			envelope: {
				release: 0.07
			}
		};

		this.pulseAnalyser = new Tone.Analyser("waveform", 1024);
		this.squareAnalyser = new Tone.Analyser("waveform", 1024);
		this.triangleAnalyser = new Tone.Analyser("waveform", 1024);
		this.noiseAnalyser = new Tone.Analyser("waveform", 1024);

		this.pulseSynth = new Tone.Synth(pulseOptions).fan(this.pulseAnalyser).toMaster();
		this.squareSynth = new Tone.Synth(squareOptions).fan(this.squareAnalyser).toMaster();
		this.triangleSynth = new Tone.Synth(triangleOptions).fan(this.triangleAnalyser).toMaster();
		this.noiseSynth = new Tone.NoiseSynth().fan(this.noiseAnalyser).toMaster();

		this.pulsePart = new Tone.Part();
		this.squarePart = new Tone.Part();
		this.trianglePart = new Tone.Part();
		this.noisePart = new Tone.Part();
	}

	pulseAnalyser;
	squareAnalyser;
	triangleAnalyser;
	noiseAnalyser;

	pulseSynth;
	squareSynth;
	triangleSynth;
	noiseSynth;

	pulsePart;
	squarePart;
	trianglePart;
	noisePart;

	Tone: any;

	play(song: Song) {

		this.pulsePart.removeAll();
		this.squarePart.removeAll();
		this.trianglePart.removeAll();
		this.noisePart.removeAll();

		if (song.pulse != null) {
			this.pulsePart = new Tone.Part((time, note) => {
				this.pulseSynth.triggerAttackRelease(note.name, note.duration, time, note.velocity);
			}, song.pulse);
		}

		if (song.square != null) {
			this.squarePart = new Tone.Part((time, note) => {
				this.squareSynth.triggerAttackRelease(note.name, note.duration, time, note.velocity);
			}, song.square);
		}

		if (song.triangle != null) {
			this.trianglePart = new Tone.Part((time, note) => {
				this.triangleSynth.triggerAttackRelease(note.name, note.duration, time, note.velocity);
			}, song.triangle);
		}

		if (song.noise != null) {
			this.noisePart = new Tone.Part((time, note) => {
				this.noiseSynth.triggerAttackRelease(note.duration, time, note.velocity);
			}, song.noise);
		}

		Tone.Transport.start('+0.1', 0);

		if (song.pulse)
			this.pulsePart.start(0);
		if (song.square)
			this.squarePart.start(0);
		if (song.triangle)
			this.trianglePart.start(0);
		if (song.noise)
			this.noisePart.start(0);
	}

	stop() {
		Tone.Transport.stop();

		this.pulsePart.stop(0);
		this.squarePart.start(0);
		this.trianglePart.start(0);
		this.noisePart.start(0);
	}
}