/*

rounter({
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
    function rounter(map) {
        addEventListener('hashchange', (function() {

            var path = location.hash.replace(/^#(!)?/, ''); // #!/s|#/s => /s
            for (var rule in map) {
                var argReg = /:(\w*)/g; // /detail/:id => :id
                var namesM = rule.match(argReg) || []; // [':id', ..]
                var reg = RegExp('^' + rule.replace(argReg, '(.*)') + '$'); // ^/detail/(.*)$
                var argsM = path.match(reg); // /detail/99 => ['..', 99]
                var args = {}
                if (argsM) { // match
                    // console.log(path, rule, reg, argsM);
                    for (var i = 0; i < namesM.length; i++) {
                        var name = namesM[i].substr(1); // :id => id
                        args[name] = argsM[i + 1]; // ['..', 99] => 99
                    }
                    // handle
                    map[rule](args);
                }
            }

            return arguments.callee;
        })());
    }

    // export
    exports.rounter = rounter;
})(window);
