#!/usr/bin/env bash
# Oracle Cloud Monitoring alarms for the server (Mojtaba 2026-10-31), run once in Oracle's Cloud Shell:
#   bash alarms.sh you@example.com
# Makes a notification topic «teoripro-alerts» with an email subscription (Oracle sends a confirmation email first:
# open its link) and three alarms on the instance «ampere-lab»: memory above 90%, CPU above 90%, and no data from it
# (the server stopped or unreachable), each for 5 minutes. All within the Always Free limits.
set -euo pipefail
EMAIL="${1:?usage: bash alarms.sh your-email}"
C="${OCI_TENANCY:?run it in Oracle Cloud Shell}"
INST=$(oci compute instance list --compartment-id "$C" --display-name ampere-lab --lifecycle-state RUNNING --query 'data[0].id' --raw-output)
[ -n "$INST" ] || { echo "instance ampere-lab not found"; exit 1; }

TOPIC=$(oci ons topic list --compartment-id "$C" --name teoripro-alerts --query 'data[0]."topic-id"' --raw-output 2>/dev/null || true)
if [ -z "$TOPIC" ] || [ "$TOPIC" = "null" ]; then
  TOPIC=$(oci ons topic create --compartment-id "$C" --name teoripro-alerts --description "Teoripro server alerts" --query 'data."topic-id"' --raw-output)
  oci ons subscription create --compartment-id "$C" --topic-id "$TOPIC" --protocol EMAIL --subscription-endpoint "$EMAIL" >/dev/null
  echo "Topic made; open the confirmation email Oracle sends to $EMAIL."
fi

alarm() {  # name, query, severity, text
  if [ "$(oci monitoring alarm list --compartment-id "$C" --display-name "$1" --query 'length(data)' --raw-output)" != "0" ]; then echo "= $1 is there already"; return; fi
  oci monitoring alarm create --compartment-id "$C" --metric-compartment-id "$C" --display-name "$1" \
    --namespace oci_computeagent --query-text "$2" --severity "$3" --body "$4" \
    --destinations "[\"$TOPIC\"]" --is-enabled true --pending-duration PT5M --repeat-notification-duration PT2H >/dev/null
  echo "+ $1"
}
alarm teoripro-memory "MemoryUtilization[1m]{resourceId = \"$INST\"}.mean() > 90" CRITICAL "The Teoripro server's memory is above 90%."
alarm teoripro-cpu "CpuUtilization[1m]{resourceId = \"$INST\"}.mean() > 90" WARNING "The Teoripro server's CPU is above 90% for 5 minutes."
alarm teoripro-down "CpuUtilization[1m]{resourceId = \"$INST\"}.absent()" CRITICAL "No data from the Teoripro server for 5 minutes: it may be stopped or unreachable."
echo "Done."
