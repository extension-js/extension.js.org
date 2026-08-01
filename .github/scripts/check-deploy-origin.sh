#!/usr/bin/env bash
set -euo pipefail

ACTUAL_OWNER="${1:-}"
CONFIG="${2:-.github/deploy-origin.json}"

if [[ ! -f "$CONFIG" ]]; then
  echo "ERROR Missing $CONFIG, so the deploy origin cannot be checked." >&2
  exit 2
fi

EXPECTED_OWNER="$(jq -r '.owner' "$CONFIG")"
EXPECTED_DOMAIN="$(jq -r '.domain' "$CONFIG")"

if [[ -z "$ACTUAL_OWNER" ]]; then
  echo "ERROR No origin owner was passed to the deploy origin check." >&2
  exit 2
fi

if [[ "$ACTUAL_OWNER" != "$EXPECTED_OWNER" ]]; then
  echo "ERROR The Extension.js docs would deploy from '$ACTUAL_OWNER', but the sponsor posture requires the framework's own org '$EXPECTED_OWNER'." >&2
  echo "ERROR extension.dev sponsors Extension.js and does not own or deploy it; refusing an origin that would make the framework read as an extension.dev property." >&2
  exit 1
fi

echo "Deploy origin ok: $EXPECTED_OWNER serves $EXPECTED_DOMAIN"