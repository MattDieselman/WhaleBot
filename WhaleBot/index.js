/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/
// import the discord.js module
const Discord = require('discord.js');
const fs = require('fs');
const config=require('./config.js');
// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();
var botId= config.botID;
// the token of your bot - https://discordapp.com/developers/applications/me
const token = config.botToken;

//Variables
var	channel = bot.channels.get('142321922913468417'); //General Channel
const streamOptions = { seek: 0, volume: .25 };
var connection;// = channel.connection;
var dispatcher;//= connection.playFile("");
var jsonCommands;
var musicQueue = [];
var isPlaying = false;
// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
  	process.chdir("WhaleBot");
  	//channel = bot.channels.get('187631149277773825'); //Private Channel
  	//channel = bot.channels.get('142321922913468417'); //General Channel
	channel = bot.channels.get('311517911124672523'); //Bottersom Channel


  	jsonCommands = JSON.parse(fs.readFileSync('./commands.json','utf8'));
  	var temp = Object.keys(jsonCommands);
  	for(var i=0;i<jsonCommands.length;i++){
	  	console.log(jsonCommands[temp[i]]);
  	//Load dispatcher
	}

	for(var key in jsonCommands)
		console.log(key);
	console.log('I am ready!');

});
/*
dispatcher.on('end', end=>{
	console.log("HIT DISPATCH END IN READY");
	musicQueue.shift();
	if(musicQueue[0]!=null)
		dispatcher=connection.playFile('./music/'+musicQueue[0]+'.mp3',streamOptions);
	else{
		isPlaying=false;
		channel.leave();
	}});
//*/

// create an event listener for messages
bot.on('message', message => {
	if(message.author.username != "WhaleBot")
		CheckCommands(message);
});


/*bot.on('disconnect',dc =>{
	if(dc.reason=='stream'&&musicQueue[0]!= null){
		connection=>{dispatcher = connection.playFile('./music/'+musicQueue[0]+'.mp3',streamOptions); musicQueue.shift();}
	}
});*/
// log our bot in
bot.login(token);

function CheckCommands(message){
	var command = "";
	/*if(message.content==="!reload"){
	  	jsonCommands = JSON.parse(fs.readFileSync('./commands.json','utf8'));
	  	return;
  	}
  	if(message.content==="!commands"){
  		var coms="";
  		for(var key in jsonCommands)
  			coms+=key+'\n';
  		if(message.author.dmChannel){
			message.author.dmChannel.send(coms);
  		}
  		else{
  			message.author.createDM();
  			message.author.dmChannel.send(coms);
  		}
		return;
	}*/	
	if(message.content.indexOf(" ")==-1)
		command = message.content;
	else{
		command = message.content.substring(0,message.content.indexOf(" "));
	}
	if(jsonCommands[command]){
		var temp = eval(jsonCommands[command]);
		temp(message);
	}
}
/*
var commands = {
	"!ping":function(m){m.channel.sendMessage("pong")},

	"!cuil":function(m){
		if(message.content.indexOf(" ")!=-1)
			var sub = m.content.substring(m.content.indexOf(" ")+1,m.content.length);
		else return;
		m.channel.sendMessage(cuilMessages[sub]);
	},

	"!play":function(m){
		if(m.content.indexOf(" ")!=-1)
			var sub = m.content.substring(m.content.indexOf(" ")+1,m.content.length);
		else 
			m.channel.sendMessage("No song")
		channel.join().then(connection=>{dispatcher = connection.playFile('./music/'+sub+'.mp3',streamOptions);		}).catch(console.error);
		isPlaying = true;
		musicQueue.push(sub);
		bot.user.setGame(sub);
	},
	"!queue":function(m){
		if(m.content.indexOf(" ")!=-1)
			var sub = m.content.substring(m.content.indexOf(" ")+1,m.content.length);
		else 
			m.channel.sendMessage("No song")
		musicQueue.push(sub);
		console.log(musicQueue);

		if(!isPlaying){
			channel.join().then(connection=>{dispatcher = connection.playFile('./music/'+musicQueue[0]+'.mp3',streamOptions);}).catch(console.error);
			isPlaying=true;
		}
		else{
			dispatcher.end();
		}
	},
	"!clearQueue":function(m){
		m.channel.sendMessage("Clearing Queue");
		musicQueue = [];
	},
	"!skip":function(m){
		console.log("skip function");
		if(isPlaying){
			console.log("skipping");
			dispatcher.pause();
			connection=>{
				//dispatcher=connection.playFile('./music/'+musicQueue[0]+'.mp3',streamOptions);
				dispatcher.end();
				musicQueue.shift();
				if(musicQueue[0]!=null)
					dispatcher=connection.playFile('./music/'+musicQueue[0]+'.mp3',streamOptions);
				else{
					isPlaying=false;
					channel.leave();
				}
			}
		}
	},
	"!pause":function(m){
		if(dispatcher)
			dispatcher.pause();
		else
			m.channel.sendMessage("No connection playing");
		isPlaying=false;

	},
	"!resume":function(m){
		if(dispatcher)
			dispatcher.resume();
		else
			m.channel.sendMessage("No connection paused");
		isPlaying=true;

	},
	"!volume":function(m){
		if(m.content.indexOf(" ")!=-1)
			var sub = m.content.substring(m.content.indexOf(" ")+1,m.content.length);
		else 
			m.channel.sendMessage("Please specify variable")
		var vol = parseInt(sub);
		if(vol)
			dispatcher.setVolume(vol/100);
		else m.channel.sendMessage("invalid volume");
	},
	"!stop":function(m){
		channel.leave();
		isPlaying=false;

	},
	"!logout":function(m){m.channel.sendMessage("GoodBye");bot.destroy();}
};
*/
//Gross array for cuils
var cuilMessages = ["","1 Cuil: if you asked me for a hamburger, and I gave you a raccoon.","2 Cuils: If you asked me for a hamburger, but it turns out I don't really exist. Where I was originally standing, a picture of a hamburger rests on the ground.","3 Cuils: You awake as a hamburger. You start screaming only to have special sauce fly from your lips. The world is in sepia.","4 Cuils: Why are we speaking German? A mime cries softly as he cradles a young cow. Your grandfather stares at you as the cow falls apart into patties. You look down only to see me with pickles for eyes, I am singing the song that gives birth to the universe.","5 Cuils: You ask for a hamburger, I give you a hamburger. You raise it to your lips and take a bite. Your eye twitches involuntarily. Across the street a father of three falls down the stairs. You swallow and look down at the hamburger in your hands. I give you a hamburger. You swallow and look down at the hamburger in your hands. You cannot swallow. There are children at the top of the stairs. A pickle shifts uneasily under the bun. I give you a hamburger. You look at my face, and I am pleading with you. The children are crying now. You raise the hamburger to your lips, tears stream down your face as you take a bite. I give you a hamburger. You are on your knees. You plead with me to go across the street. I hear only children's laughter. I give you a hamburger. You are screaming as you fall down the stairs. I am your child. You cannot see anything. You take a bite of the hamburger. The concrete rushes up to meet you. You awake with a start in your own bed. Your eye twitches involuntarily. I give you a hamburger. As you kill me, I do not make a sound. I give you a hamburger.","6 Cuils: You ask me for a hamburger. My attempt to reciprocate is cut brutally short as my body experiences a sudden lack of electrons. Across a variety of hidden dimensions you are dismayed. John Lennon hands me an apple, but it slips through my fingers. I am reborn as an ocelot. You disapprove. A crack echoes through the universe in defiance of conventional physics as cosmological background noise shifts from randomness to a perfect A Flat. Children everywhere stop what they are doing and hum along in perfect pitch with the background radiation. Birds fall from the sky as the sun engulfs the earth. You hesitate momentarily before allowing yourself to assume the locus of all knowledge. Entropy crumbles as you peruse the information contained within the universe. A small library in Phoenix ceases to exist. You stumble under the weight of everythingness, Your mouth opens up to cry out, and collapses around your body before blinking you out of the spatial plane. You exist only within the fourth dimension. The fountainhead of all knowledge rolls along the ground and collides with a small dog. My head tastes sideways as spacetime is reestablished, you blink back into the corporeal world disoriented, only for me to hand you a hamburger as my body collapses under the strain of reconstitution. The universe has reasserted itself. A particular small dog is fed steak for the rest of its natural life. You die in a freak accident moments later, and you soul works at the returns desk for the Phoenix library. You disapprove. Your disapproval sends ripples through the inter-dimensional void between life and death. A small child begins to cry as he walks toward the stairway where his father stands.","7 Cuils: I give you a hamburger. The universe is engulfed within itself. A bus advertising hotdogs drives by a papillon. It disapproves. An unnatural force reverses Earth's gravity. You ask for a hamburger. I reciprocate with a mildly convulsing potato. You disapprove. Your disapproval releases a cosmic shift in the void between birth and life. You ask for a hamburger. A certain small dog feasts on hamburger patties for the rest of its unnatural, eternal endurance. Your constant disapproval sends silence through everything. A contrived beast becomes omnipotent. You ask for a hamburger. I give you a hamburger your body becomes an unsettled blob of nothingness, then divides by three. The papillon barks. The universe realigns itself. You, the papillon, and the hamburger disapprove. This condemnation stops the realignment. Hades freezes over. A pig is launched is launched into the unoccupied existence between space and time with a specific hamburger. You ask for a hamburger. I give you a hamburger. It screams as you lift it to your face. You laugh maniacally as I plead with you. You devour the hamburger as it pleads for mercy. I disapprove and condemn you to an eternity in a certain void where a certain pig and its specific hamburger are located. The Universal Space-time Continuum Committee disapproves of my irrational decision. You are locked away and are fed hamburgers for the rest of your natural existence. A pickle refuses to break down during the process of digestion. You die in a freak accident. A certain pickle lives the rest of its life in a comatose state. Your soul disapproves. Down the street a child cries as a hamburger gets stuck in, and climbs back up, her esophagus. You ask again for a hamburger. I refuse to reciprocate. You demand a lawyer. I remind you harshly that this is the new world order. Lawyers no longer exist. Only papillons. Your name is written on a list of sins. Blasphemy. You ask for a hamburger. The comatose pickle vanquishes your soul from this universe. Realignment occurs. You beg for a hamburger. A certain papillon's name is written on an obelisk in Egypt. Mumble. Peasants worship the obelisk. Your soulless corpse partakes in the festivity. Hamburgers are banned universally. The sun implodes. All planets cease to have ever existed. Mercury. Venus. Earth. Mars. Jupiter. Saturn. Uranus. Neptune. Pluto is the only mass in existence. Conveniently, you are on vacation here. Your need for hamburgers re-establishes space-time. Earth is recreated under your intergalactic rule. Hamburgers are your army. You wake up. Clowns. Clowns everywhere. Your dream rushes to meet you. You are kidnapped. You ask for a hamburger. They hand you a hotdog."]