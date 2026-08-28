# 06. Text Animation

Use SplitText when text needs to be animated by lines, words, or characters. In current GSAP releases, SplitText and ScrambleText are free, but they still require explicit import and registration.

```js
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);
const split = new SplitText(".headline", { type: "words,chars" });
gsap.from(split.chars, { yPercent: 110, stagger: 0.02, duration: 0.45 });
```

SplitText provides accessible defaults for simple text. Do not split text manually with `split("")`: it breaks Unicode graphemes and can make screen readers announce each character. Nested interactive markup needs the documented screen-reader-only duplicate pattern. Revert a split when it is no longer needed.

For scrambling, use `scrambleText`, not the `text` property:

```js
gsap.to(".status", { scrambleText: { text: "Complete", chars: "01" }, duration: 0.5 });
```

## Checkpoint

Create a word reveal, test it with a screen reader, then call `split.revert()` during cleanup.
