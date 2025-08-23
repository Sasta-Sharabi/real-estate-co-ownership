// src/lib/icpHelpers.js
import { Principal } from "@dfinity/principal";

/** Convert JS number/string to BigInt expected by canister (nat/nat64/nat128) */
export const toNat = (n) => {
  return BigInt(n);
};

/** Convert a stored principal text to Principal object */
export const toPrincipal = (p) => {
  if (!p) throw new Error("No principal provided");
  return Principal.fromText(p);
};

/** Convert Date to timestamp (ms). If you prefer seconds, divide by 1000. */
export const nowMillis = () => BigInt(Date.now());
