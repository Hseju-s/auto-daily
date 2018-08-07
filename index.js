const Wait_time = 5; // Time in wait

const Command = require('command')
    
module.exports = function TuturuDaily(dispatch) {

const command = Command(dispatch)

let Elite_Gift_Box = 169660, 
	Elite_Consumable_Box = 180675;

const claimElite = (slot, item) => {
    dispatch.toServer('C_PCBANGINVENTORY_USE_SLOT', 1, {
            slot: slot
    });
    command.message('[Tuturu-Daily] Claimed ' + item);
}
const claimEmporium = () => {
	dispatch.toServer('C_REQUEST_RECV_DAILY_TOKEN', 1, {});
	command.message('[Tuturu-Daily] Claimed Emporium points.');
};

    dispatch.hook('S_SEND_VIP_SYSTEM_INFO', 1, event => {
        if(event.dailyCredits) setTimeout(claimEmporium, Wait_time*1000);
     });

	dispatch.hook('S_PCBANGINVENTORY_DATALIST', 1, event => {
        for(let items of event.inventory){
			if(items.item === Elite_Gift_Box && items.amount === 1) setTimeout(claimElite, Wait_time*1000, items.slot, 'Elite Gift Box.')
			if(items.item === Elite_Consumable_Box && items.amount === 1) setTimeout(claimElite, Wait_time*1000, items.slot, 'Elite Consumable Box.')
        }
    });
}