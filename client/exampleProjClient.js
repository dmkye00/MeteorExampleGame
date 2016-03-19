// Leaderboard Template
    Template.leaderboard.helpers({
        'player': function(){
            var currentUserId = Meteor.userId();
            return PlayerList.find({}, {sort: {score: -1, name: 1}});
        },
        'selectedClass': function(){
            var playerId = this._id;
            var selectedPlayer = Session.get('selectedPlayer');
            if(playerId == selectedPlayer){
                return "selected";
            }
        },
        'showSelectedPlayer': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            return PlayerList.findOne(selectedPlayer);
        }
    });
    Template.leaderboard.events({
        // Find which player is clicked 
        'click .player': function(){
            var playerId = this._id;
            Session.set('selectedPlayer', playerId);
            var selectedPlayer = Session.get('selectedPlayer');
        },
        // If the increment button is clicked, increment the players points by 10
        'click .increment': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            Meteor.call('modifyPlayerScore', selectedPlayer, 10);
        },
        // If the decrement button is clicked, decrement the players points by 10
        'click .decrement': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            Meteor.call('modifyPlayerScore', selectedPlayer, -10);
        },
        'click .removePlayer': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            Meteor.call('removePlayerData', selectedPlayer);
        }
    });
    
    // AddPlayer Template
    Template.addPlayerForm.events({
        'submit form': function(event){
            event.preventDefault();
            var playerName = event.target.playerName.value.split(',');
            var currentUserId = Meteor.userId();
            Meteor.call('insertPlayerData', playerName);
        }
    }); 
    
    
    Meteor.subscribe('thePlayers');