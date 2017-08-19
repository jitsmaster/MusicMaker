import { Song } from "../song";

import { bass1 } from "./bass1";
import { bass2 } from "./bass2";
import { synth1 } from "./synth1";
import { synth2 } from "./synth2";

export let Notes_FF  = {
	triangle : bass1,
	noise : bass2,
	pulse: synth1,
	square: synth2
} as Song;