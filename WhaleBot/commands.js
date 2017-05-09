exports.commands = {
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
	channel.join().then(connection=>{dispatcher = connection.playFile('./music/'+sub+'.mp3',streamOptions);}).catch(console.error);
},
"!pause":function(m){
	if(dispatcher)
		dispatcher.pause();
	else
		m.channel.sendMessage("No connection playing");
},
"!resume":function(m){
	if(dispatcher)
		dispatcher.resume();
	else
		m.channel.sendMessage("No connection paused");
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

},
"!test":function(m){
	m.channel.sendMessage("test");
},
"!logout":function(m){m.channel.sendMessage("GoodBye");bot.destroy();}
//"!add":function(m){AddCommand(m);}
};