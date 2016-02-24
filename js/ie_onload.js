function init() {
  // quit if this function has already been called
  if (arguments.callee.done) return;

  // flag this function so we don't do the same thing twice
  arguments.callee.done = true;

  // do stuff
   $('#fullpage').css({
    'opacity' : '1'
  });
  $('#preload').css({
    'display' : 'none'
  });
    var one = '#'; 
  if(!window.location.hash.match(one)) {
    window.location.replace(window.location.href + '#one');
  }
    if (window.location.hash == '#foo') {
    window.location.hash = '#one';
  }

};
document.onload = init;
