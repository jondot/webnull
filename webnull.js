(function() {
  var canned_response, connect, data, fd, flush, fs, null_resp, program, s, sys, total_data, version, write;
  connect = require('connect');
  fs = require('fs');
  sys = require('sys');
  program = require('commander');
  version = '0.0.1';
  program.version(version).option('-d, --debug', 'Show when flush happens.', false).option('-c, --canned-response [file]', 'Existing file name to read a response from.').option('-o, --output [file]', 'File name to output to.', 'webnull.log').option('-i, --interval [seconds]', 'Flush interval.', 10).option('-p, --port [number]', 'Flush interval.', 4000).parse(process.argv);
  console.log("== web/null v" + version + ". I eat your HTTP. ==");
  if (program.debug != null) {
    console.log("* Running in debug mode.");
  }
  console.log("* Listening on port " + program.port + ".");
  console.log("* Flushing to " + program.output + " every " + program.interval + " seconds.");
  canned_response = '';
  if (program.cannedResponse != null) {
    canned_response = fs.readFileSync(program.cannedResponse, 'utf-8');
    console.log("* Response will be " + canned_response.length + " bytes read from " + program.cannedResponse + ".");
  }
  fd = fs.openSync(program.output, 'a', 0644);
  process.addListener("exit", function() {
    return fs.close(fd);
  });
  s = program.debug ? connect.createServer(connect.logger()) : connect.createServer();
  s.listen(program.port);
  data = {
    hits: 0,
    size: 0
  };
  total_data = {
    hits: 0,
    size: 0
  };
  write = function(time, t_req_count, t_data_size, req_count, data_size, req_sec, data_avg) {
    if (program.debug != null) {
      console.log("" + time + "\t" + t_req_count + " req(total)\t" + t_data_size + " bytes(total)\t" + req_count + " reqs\t" + data_size + " bytes\t" + req_sec + " req(s)\t" + data_avg + " bytes(avg)");
    }
    return fs.writeSync(fd, "" + time + "," + t_req_count + "," + t_data_size + "," + req_count + "," + data_size + "," + req_sec + "," + data_avg + "\n", null, "utf-8");
  };
  flush = function() {
    var data_avg, req_sec;
    req_sec = data.hits / program.interval;
    data_avg = data.hits === 0 ? 0 : data.size / data.hits;
    total_data.hits += data.hits;
    total_data.size += data.size;
    write(Math.round(new Date().getTime() / 1000.0), total_data.hits, total_data.size, data.hits, data.size, req_sec, data_avg);
    return data = {
      hits: 0,
      size: 0
    };
  };
  null_resp = function(req, res) {
    data.hits += 1;
    req.on('data', function(chunk) {
      return data.size += chunk.length;
    });
    return req.on('end', function() {
      return res.end(canned_response);
    });
  };
  s.use('/', null_resp);
  setInterval(flush, program.interval * 1000);
}).call(this);
