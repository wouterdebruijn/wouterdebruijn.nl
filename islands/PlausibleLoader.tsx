import plausible from "../utils/plausible.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function PlausibleLoader() {
  if (!IS_BROWSER) return null;
  plausible();

  return null;
}
