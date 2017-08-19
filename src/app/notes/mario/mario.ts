import { Song } from "../song";

import { MarioBass1 } from "./bass1";
import { MarioBass2 } from "./bass2";
import { MarioSynth1 } from "./synth1";
import { MarioSynth2 } from "./synth2";

export let Notes_Mario  = {
	triangle : MarioBass1,
	noise : MarioBass2,
	pulse: MarioSynth1,
	square: MarioSynth2
} as Song;