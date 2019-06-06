/**
@github https://github.com/wusfen/router.js/
@example

router({
    '/home': function(args) {
        
    },
    '/detail/:id': function(args) {
        alert(args.id)
    },
    '/list/p:page': function(args){
        // /list/p3
        // agrs.page => 3
    },
});


*/
(function(exports) {
    function router(map) {
        addEventListener('hashchange', (function f() {
            var path = location.hash.replace(/^#(!)?/, ''); // #!/s|#/s => /s
            for (var rule in map) {
                var args = []
                var reg = rule.replace(/:([^/]+)/g, function($and, $1){
                    args.push($1)
                    return '(?:'+$1+'|([^/]*))'
                })
                var m = path.match(RegExp(reg))
                if(m){
                    for(var i=0; i<args.length; i++){
                      args[i] = args[args[i]] = m[i+1]
                    }
                    map[rule](args)
                }
            }
            return f
        })());
    }

    // export
    exports.router = router;
})(window);
