ig.module( 
    'plugins.impact-tween.game' 
)
.requires(
    'impact.game',
    'plugins.impact-tween.tween'
)
.defines(function() {

ig.Game.inject({

    tweens: [],
    namedTweens: {},
    
    loadLevel: function(data) {
        this.parent(data);
        
        this.namedTweens = {};
        if (data.tweens) {
            for (var i = 0; i < data.tweens.length; i++) {

                var objs = [],
                    props = [],
                    dur = data.tweens[i].dur,
                    easing = eval(data.tweens[i].easing),
                    name = data.tweens[i].name;
                    
                for (var j = 0; j < data.tweens[i].entities.length; j++) {
                    var ent = this.getEntityByName(data.tweens[i].entities[j]);
                    if (ent) {
                        objs.push(ent);
                        var p = {},
                            op = p;
                        for (var y = 0; y < data.tweens[i].props.length; y++) {
                            for (var x in data.tweens[i].props[y]) {
                                var pieces = x.split('.');
                                for (var k = 0; k < pieces.length - 1; k++) {
                                    p[pieces[k]] = {};
                                    p = p[pieces[k]];
                                }
                                p[pieces[pieces.length - 1]] = data.tweens[i].props[y][x];
                            }
                        }
                        props.push(op);
                    }
                }
                
                var tween = new ig.Tween(objs, props, dur, {easing: easing});
                if (name) {
                    this.namedTweens[data.tweens[i].name] = tween;
                }
            }
        }
    }
});

});