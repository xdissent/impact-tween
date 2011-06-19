ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.entities.player',
	'game.entities.enemy',
	'game.levels.main',
	'plugins.impact-tween.entities.object-proxy',
	'plugins.impact-tween.entities.tween-trigger',
	'plugins.impact-tween.game',
	'plugins.impact-tween.tween'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	gravity: 300,
	
	init: function() {

		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.X, 'jump' );
		
		this.loadLevel(LevelMain);

        setTimeout(function() {
            ig.game.namedTweens.screenTween.start();
        }, 10);
	},
	
	update: function() {
	    
        // Update screen position manually (was removed in Impact)
        var len = this.backgroundMaps.length;
        for(var i = 0; i < len; i++) {
            this.backgroundMaps[i].setScreenPos(this.screen.x, this.screen.y);
        }
        
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
		
		this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );
		
		this.font.draw('X: ' + this.screen.x.round() + ' Y: ' + this.screen.y.round(), 0, 0);
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

});
