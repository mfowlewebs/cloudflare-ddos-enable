# Cloudflare DDoS Enable

This is a set of two tools for updating the 'proxied' setting for CloudFlare DNS records.

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

Then run `./cloudflare-ddos-enable.js > zones.list` to retrieve a list of all zones.

## Proxied

Run `./cloudflare-ddos-enable.js zone-id-1 zone-id-2 zone-id-3` to set `proxied` for all proxiable records on zone-id-1 zone-id-2 and zone-id-3.
