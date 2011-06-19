ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity'
)
.defines(function() {

EntityPlayer = ig.Entity.extend({

	size: {x: 24, y:36},
	maxVel: {x: 100, y: 200},
	friction: {x: 600, y: 0},

	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,

	animSheet: new ig.AnimationSheet( 'media/player.png', 24, 36 ),	

	flip: false,
	accelGround: 400,
	accelAir: 200,
	jump: 200,
	health: 10,
	flip: false,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		// Add the animations
		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'run', 0.07, [0,1,2,3,4,5,6] );
		this.addAnim( 'jump', 1, [7] );
		this.addAnim( 'fall', 1, [10] );
	},


	update: function() {

		// move left or right
		var accel = this.standing ? this.accelGround : this.accelAir;
		
		// Don't allow input changes if there's a tween running
		var checkInput = true;
        for (var i = 0; i < this.tweens.length; i++) {
            var tween = this.tweens[i];
            if (tween.started && !tween.complete) {
                checkInput = false;
            }
        }
		
		if (checkInput) {
    		if( ig.input.state('left') ) {
    			this.accel.x = -accel;
    			this.flip = true;
    		}
    		else if( ig.input.state('right') ) {
    			this.accel.x = accel;
    			this.flip = false;
    		}
    		else {
    			this.accel.x = 0;
    		}
    		
    		// jump
    		if( this.standing && ig.input.pressed('jump') ) {
    			this.vel.y = -this.jump;
    		}
        }

		// set the current animation, based on the player's speed
		if( this.vel.y < 0 ) {
			this.currentAnim = this.anims.jump;
		}
		else if( this.vel.y > 0 ) {
			this.currentAnim = this.anims.fall;
		}
		else if( this.vel.x != 0 ) {
			this.currentAnim = this.anims.run;
		}
		else {
			this.currentAnim = this.anims.idle;
		}

		this.currentAnim.flip.x = this.flip;

		// move!
		this.parent();
	}
});

});
