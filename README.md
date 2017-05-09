# nginx-replay

This utility allows to replay POST requests in case if you have following log format

```
log_format csvlog
	'"$time_iso8601",'
	'"$remote_addr",'
	'"$uri",'
	'"$args",'
	'-,'
	'"$request_body",'
	'"$request_method",'
	'$request_length,'
	'$bytes_sent,'
	'$request_time,'
	'$status,'
	'"$http_referer",'
	'"$http_user_agent"';
```

## TODO

- [ ] bin

## License

MIT
