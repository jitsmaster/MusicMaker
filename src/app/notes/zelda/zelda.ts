import { Song } from "../song";

import { ZeldaBass1 } from "./bass1";
import { ZeldaBass2 } from "./bass2";
import { ZeldaSynth1 } from "./synth1";
import { ZeldaSynth2 } from "./synth2";

export let Notes_Zelda  = {
	triangle : ZeldaBass1,
	noise : ZeldaBass2,
	pulse: ZeldaSynth1,
	square: ZeldaSynth2
} as Song;