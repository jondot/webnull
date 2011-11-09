# web/null

web/null is `/dev/null` for the Web. It silently agrees with and eats up any request
being `VERB`d to it, and keeps statistics of it.  

web/null is great to use as a diagnostics end-socket of any distributed system you
have, that works against another system sitting at an HTTP endpoint.  

Replace any service with it, in order to have a real peek at what
your other services are doing.  

web/null is extremely useful (and being used) for getting stats data during stress
testing a complex system.  

## Quick Start

clone this repository and run

    $ npm install

You should then be able to run

    $ node webnull
    == web/null v0.0.1. I eat your HTTP. ==
    * Listening on port 4000.
    * Flushing to webnull.log every 10 seconds.

And now just experiment. Here is apachebench

    $ ab -n 10000 -c 10 "http://localhost:4000/"

Sample output, human-readable (debug)

    ...
    127.0.0.1 - - [Wed, 09 Nov 2011 13:35:36 GMT] "GET / HTTP/1.1" 200 - "-" "Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.202 Safari/535.1"
    127.0.0.1 - - [Wed, 09 Nov 2011 13:35:36 GMT] "GET /favicon.ico HTTP/1.1" 200 - "-" "Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.202 Safari/535.1"
    1320845743    51 req(total)	0 bytes(total)	51 reqs	0 bytes	5.1 req(s)	0 bytes(avg)

Sample output, CSV (webnull.log)

    ...
    1320845743,51,0,51,0,5.1,0

## Doing more

Here's how help looks like:

    $ node webnull --help
    Usage: webnull [options]

    Options:

      -h, --help                    output usage information
      -V, --version                 output the version number
      -d, --debug                   Show when flush happens.
      -c, --canned-response [file]  Existing file name to read a response from.
      -o, --output [file]           File name to output to.
      -i, --interval [seconds]      Flush interval.
      -p, --port [number]           Port to listen on.

## Contributing

Fork, implement, add tests, pull request, get my everlasting thanks and a respectable place here :).


## Copyright

Copyright (c) 2011 [Dotan Nahum](http://gplus.to/dotan) [@jondot](http://twitter.com/jondot). See MIT-LICENSE for further details.

