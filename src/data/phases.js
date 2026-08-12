// The four phases, in order.
//
// Each lives in its own file so a change to one never touches another. The
// order matters and is not a presentation choice: you cannot introduce yourself
// before you know the pieces, and you cannot implement systems before your
// machine knows who you are.

import { phase1 } from "./phases/phase1";
import { phase2 } from "./phases/phase2";
import { phase3 } from "./phases/phase3";
import { phase4 } from "./phases/phase4";

export const phases = [phase1, phase2, phase3, phase4];

export const findPhase = (slug) => phases.find((p) => p.slug === slug);

/** The one before and the one after, for the footer nav. */
export function neighbours(slug) {
    const i = phases.findIndex((p) => p.slug === slug);
    return { prev: i > 0 ? phases[i - 1] : null, next: i < phases.length - 1 ? phases[i + 1] : null };
}
