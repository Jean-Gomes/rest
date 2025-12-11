# REST study

---

## Extensions used
- https://marketplace.visualstudio.com/items?itemName=humao.rest-client
- https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers


---

## Run application


1. execute docker 
`docker compose up`

2. enter inside the container
`docker compose exec app bash`

3. inside the container
`npm run dev`

---

## Use rest client
In the api.http file, you can find REST API calls. You should use the REST Client extension for more convenience.

---

## References

- [Disseratação do REST](https://ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf)
- [Roy Fielding Frustado com REST](https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven)
- [Richardson Maturity Model](https://www.crummy.com/writing/speaking/2008-QCon/act3.html)
- [Livro REST in Practice](https://www.amazon.com/REST-Practice-Hypermedia-Systems-Architecture/dp/0596805829)
- [HTTP 1.1 - RFC 2616](https://datatracker.ietf.org/doc/html/rfc2616)
- [HTTP PATCH - RFC 5789](https://datatracker.ietf.org/doc/html/rfc5789)
- [Hypermedia Controls - RFC 5988](https://datatracker.ietf.org/doc/html/rfc5988)
- [Json+Hal](https://stateless.group/hal_specification.html)
- [Cache Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)