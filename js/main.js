function qs(selector) { return document.querySelector(selector);}

function qsa(selector) {return document.querySelectorAll(selector);}

function initPage(){
	UTILS.ajax("data/config.json", {done: updatePageData});
	formRequiredInputs('.SettingsForm');
    $('.SettingsForm').submit(saveForm);
    for(var i = 0; i < 2; i++){
        $('.report-names-ddl').eq(i).change(selectOptionChange);
    }
    localStorageForPageRefresh();
}

window.onLoad = initPage();
function updateNote(notification){
	var notificationsDiv = document.querySelector('.notifications');
	if (!notification) {
		notificationsDiv.textContent = '';
		notificationsDiv.classList.add('hidden');
	}
	else {
		notificationsDiv.textContent = notification;
		notificationsDiv.classList.remove('hidden');
	}
}
function updateQuickAction(quickActions){
	if(quickActions !== undefined){

		var navSectionsContent = qsa(".nav-section");
		var menuHintContent = qsa(".menu-hint");
		var actionLists = qsa(".action-list");
		for(var i=0; i < quickActions.length; i++){
		    for(var j=0; j < quickActions[i].actions.length; j++){
				actionLists[i].innerHTML += "<li><a href=\"" + quickActions[i].actions[j].url + "\">" + quickActions[i].actions[j].label + "</a></li>"
    		}
			navSectionsContent[i].innerHTML = "<p>" + quickActions[i].label + "</p>" + navSectionsContent[i].innerHTML;
			navSectionsContent[i].style.background = "url(./img/"+ quickActions[i].icon +".png) left 50% top 75px no-repeat black";
	     	menuHintContent[i].innerHTML = "<p>" + quickActions[i].actionsLabel + "</p>" + menuHintContent[i].innerHTML	;		
	
		}
	}
}
function updatePageData(data){
	updateNote(data.notification);
	updateQuickAction(data.quickActions);
}