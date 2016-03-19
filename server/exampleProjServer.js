Meteor.publish('thePlayers', function(){
        var currentUserId = this.userId;
        return PlayerList.find({createdBy: currentUserId});
    });
    
    Meteor.methods({
        'sendLogMessage': function(){
            
        },
        'insertPlayerData': function(playerName){
            var currentUserId = Meteor.userId();
            var playerNameLength = playerName.length;
            for(var i = 0; i < playerNameLength; i++){
                PlayerList.insert({
                name: playerName[i],
                score: 0,
                createdBy: currentUserId
                });   
            }
        },
        'removePlayerData': function(selectedPlayer){
            var currentUserId = Meteor.userId();
            PlayerList.remove({_id: selectedPlayer, createdBy: currentUserId});
        },
        'modifyPlayerScore': function(selectedPlayer, scoreValue){
            var currentUserId = Meteor.userId();
            PlayerList.update({_id: selectedPlayer, createdBy: currentUserId},
                              {$inc: {score: scoreValue}});
        }
    });