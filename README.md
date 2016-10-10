# Cloudflare DDoS Enable

This is a set of two tools for updating the 'proxied' setting for CloudFlare DNS records.

# Bugs

At present, programs do not self-terminate on completion. They will hang indefinitely after work completes. Apologies.

# Use

## Credentials

Create a creds.json file as so:

```
{
	email: 'myemail@yoyodyne.net'
	key: 'xyzzzzzzzzzzz'
}
```

## Zone list

Generate a file with the (newline delimited JSON) data dump of all zones:

```
./bin/list-zones.js > zones.json
```

## Records list

From the `zones.json` file, we'll generate a new list of records.

```
cat zones.json | ./bin/list-records.js > records.json
```

## Proxied

1. Filter down the list of zones you want to change the setting for
2. Update proxied status on those zones

```
jq 'select(.proxiable and .proxied == false)' records.json | ./bin/update-proxied.js
```

== Plan

1. Find a plan id.
  #. This is a per-zone call, but it *appears,* atm, that each zone uses the same set of plans. 
2. Set the plan id for all zones. There is at present no way to detect what zones have what plan id.

```
head -n1 zones.json | ./bin/list-plans.js
cat zones.json | ./bin/update-plans.js my-plan-id-goes-here
```
