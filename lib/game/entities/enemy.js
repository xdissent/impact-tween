ig.module(
    'game.entities.enemy'
)
.requires(
    'impact.entity'
)
.defines(function() {

EntityEnemy = ig.Entity.extend({
    
    size: {x: 24, y: 36},
    
    animSheet: new ig.AnimationSheet( 'media/player.png', 24, 36 ),	
    flip: false,
    
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		// Add the animations
		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'fall', 1, [10] );
	},
	
	update: function() {
	    
	    this.parent();
	    
		if ( this.vel.y > 0 ) {
			this.currentAnim = this.anims.fall;
		} else {
		    this.currentAnim = this.anims.idle;
		}
		
		this.currentAnim.flip.x = this.flip;
	}
});

});