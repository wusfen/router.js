# router.js
hash router.js


## USAGE
```
url#/path
```
```javascript

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

```
