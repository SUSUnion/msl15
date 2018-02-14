$(document).ready(function()
{
	//console.log('welcome to su_language_lightbox!');
	//if (($('.language_english').length) && ($('.language_welsh').length)){
		var lang = getLanguageCookie();
		$('header .col-sm-1').append('<a href="javascript:void(0)" onclick="switchLanguageAndCookieAndContentTo(\'cy\');">' + 
										'<img src="/stylesheet/msl15/cymraeg_on.png" class="lang_image" id="welsh_flag" />' + 
									'</a>' + 
									'<a href="javascript:void(0)" onclick="switchLanguageAndCookieAndContentTo(\'english\');">' + 
										'<img src="/stylesheet/msl15/cymraeg_off.png" class="lang_image" id="english_flag" />' + 
                                        '</a>');
		//line below *should* cover everything, including non-existent cookies, corrupt cookies, edited cookies, etc.
		if ((lang != "english") && (lang != "cy"))
		{
			//no cookie detected, using navigator.languages
			switchLanguageAndCookieTo(navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage));
			//switchLanguageAndCookieTo('english');
		}
		else
		{
			//console.log('language cookie detected, value = ' + lang);
			switchLanguageAndCookieTo(lang);
			if (lang == 'cy'){
				////console.log('welsh language in use, translating standing page elements');
				switchStandingContentTo(lang);
			}
		}
	//}
});

function switchLanguageAndCookieAndContentTo(lang){
	switchLanguageAndCookieTo(lang);
	switchStandingContentTo(lang);
}

function switchLanguageAndCookieTo(lang){
	var date = new Date();
	date.setTime(date.getTime() + (60*60*24*1000*30)); //cookie lasts a month
	if (lang == 'cy')
	{
		////console.log('showing welsh text, showing british flag');
		$('.language_english').hide();
		$('.language_welsh').show();
		$('#welsh_flag').hide();
		$('#english_flag').show();
	}
	else
	{
		lang = 'english';
		////console.log('showing english text, showing welsh flag');
		$('.language_welsh').hide();
		$('.language_english').show();
		$('#welsh_flag').show();
		$('#english_flag').hide();
	}
	document.cookie = "language=" + lang + "; path=/; expires=" + date.toGMTString() + ";";
}

function getLanguageCookie(){
	var cookieArray = document.cookie.split(';');
	for (var i = 0; i < cookieArray.length; i++)
	{
		var cookieParts = cookieArray[i].trim().split("=");
		////console.log('cookie #' + i + 1);
		////console.log('cookieParts[0]: "' + cookieParts[0] + '"');
		////console.log('cookieParts[1]: "' + cookieParts[1] +'"');
		if (cookieParts[0] == 'language')
		{
			return cookieParts[1];
		}
	}
	return "";
}

function switchStandingContentTo(lang){
	//ENGLISH GOES FIRST IN toggleStandingContent ARGUMENTS, VERY IMPORTANT
	//account bar
	var loginBarPath = '#admin-tools .navbar-nav > li > a > span';
	toggleStandingContent(lang, 'Login', 'Mewngofnodi', 	loginBarPath);
	toggleStandingContent(lang, 'Log out', 'Logout in Welsh', 	loginBarPath);
	toggleStandingContent(lang, 'Account', 'Cyfrif', 		loginBarPath);
	toggleStandingContent(lang, 'Basket', 'Basged', 		loginBarPath);
     toggleStandingContent(lang, 'Memberships', 'Aelodaeth', 		loginBarPath);
     toggleStandingContent(lang, 'Checkout', 'Ddesg Dalu', 		loginBarPath);
     toggleStandingContent(lang, 'Messages', 'Negeseuon', 		loginBarPath);
     
     
	//big bar, right menu; base level elements
	var navBarBasePath = '#navigation ul li a span.nav-text';
	toggleStandingContent(lang, 'Events', 'Digwyddiadau', 						navBarBasePath);
	toggleStandingContent(lang, 'Student Voice', 'Llais Myfyrwyr',				navBarBasePath);
	toggleStandingContent(lang, 'Eat, Drink & Shop', 'Siopiau', 				navBarBasePath);
	toggleStandingContent(lang, 'Support', 'Cefnogaeth', 						navBarBasePath);
	toggleStandingContent(lang, 'Activities & Opportunities', 'Gweithgareddau a Chyfleoedd', 	navBarBasePath);
	toggleStandingContent(lang, 'About Us', 'Amdanom ni', 						navBarBasePath);

	toggleStandingButtonContent(lang, 'Swansea University Students\' Union', 'Undeb Myfyrwyr Prifysgol Abertawe', 'div.teaser-text');
	
	/*
	 * START OF NON-MENU FRONTPAGE CONTENT
	 */
	 
	//News block header
	cOHTML = '<h2 class="container-header" id="news-block-header">News // <a href="/news/">More</a></h2>'; //complex Origin HTML
	cDHTML = '<h2 class="container-header" id="news-block-header">Newyddion // <a href="/news/">Mwy</a></h2>'; //complex Destination HTML
	var jQPath = 'div.news-and-eventlist-container div.wrapper div.wrapper_new_news h2.container-header#news-block-header';
	toggleComplexStandingContent(lang, 'News', cOHTML, 'Newyddion', cDHTML, jQPath);
			
	//Eventlist header
	cOHTML = '<h2 class="container-header" id="eventlist-block-header">Upcoming Events // <a href="/news/">More</a></h2>';
	cDHTML = '<h2 class="container-header" id="eventlist-block-header">Digwyddiadau i ddod // <a href="/news/">Mwy</a></h2>';
	jQPath = 'div.news-and-eventlist-container div.wrapper div.wrapper_eventlist h2.container-header#eventlist-block-header';
	toggleComplexStandingContent(lang, 'Upcoming Events', cOHTML, 'Digwyddiadau i ddod', cDHTML, jQPath);
	
	//Eventlist content, months
	var eventlistPath = 'div.news-and-eventlist-container div.wrapper div.wrapper_eventlist div#eventlist_container div.msl_eventlist';
	toggleDateAndTimeComponents(lang, eventlistPath + ' h3');
	
	//Eventlist content, day names
	toggleDateAndTimeComponents(lang, eventlistPath + ' div.eventlist_day h4');
	
	//My Union category sliders
	cOHTML = '<h2 class="container-header" id="union-block-header">My Union // <a href="/news/">More</a></h2>';
	cDHTML = '<h2 class="container-header" id="union-block-header">Fy Undeb // <a href="/news/">Mwy</a></h2>';
	jQPath = 'div.wrapper div.union-container div.wrapper h2.container-header#union-block-header';
	toggleComplexStandingContent(lang, 'My Union', cOHTML, 'Fy Undeb', cDHTML, jQPath);
	
	var myUnionCategoryPath = 'div#unionCategorySlider.union-slider-group div#su-unionCat.sliderUnion div.slider div.slide-inner a.su-union-category div.unionCatName';
	//var myUnionCategoryPath = 'div#unionCategorySlider.union-slider-group div#unionListSlider.union-slider-group h2';
	toggleStandingContent(lang, 'Full Time Officers', 'Swyddogion Llawn amser', myUnionCategoryPath);
	toggleStandingContent(lang, 'Part Time Officers', 'Swyddogion Rhan amser', 	myUnionCategoryPath);
	toggleStandingContent(lang, 'Support and Services', 'Cefnogaeth', 			myUnionCategoryPath);
	toggleStandingContent(lang, 'Shops', 'Siopiau', 							myUnionCategoryPath);
	toggleStandingContent(lang, 'Democracy', 'Democratiaeth', 					myUnionCategoryPath);
	toggleStandingContent(lang, 'Venues', 'lleoliadau', 						myUnionCategoryPath);
	//toggleStandingContent(lang, 'Ents', 'Ents', 								myUnionCategoryPath);
	toggleStandingContent(lang, 'Administration', 'Gweinyddu', 					myUnionCategoryPath);
	
	//My Union content sliders
	//Full Time Officers
	var myUnionContentHeaderPath = 'div.union-container div.wrapper div#unionListSlider.union-slider-group h2.title#su-unionListHeader';
	toggleStandingContent(lang, 'My Union - Full Time Officers', 'Fy Undeb - Swyddogion Llawn amser', 		myUnionContentHeaderPath);
	
	var myUnionContentSlidersPath = 'div#unionListSlider.union-slider-group div#su-unionList.sliderUnion div.slider div.slide a div.unionItemName';
	toggleStandingContent(lang, 'Education Officer', 'Swyddog addysg', 										myUnionContentSlidersPath);
	toggleStandingContent(lang, 'President', 'Llywydd', 													myUnionContentSlidersPath);
	toggleStandingContent(lang, 'Societies and Services Officer', 'Swyddog cymdeithasau a gweithgareddau', 	myUnionContentSlidersPath);
	toggleStandingContent(lang, 'Sports Officer', 'Swyddog Chwaraeon', 										myUnionContentSlidersPath);
	toggleStandingContent(lang, 'Welfare Officer', 'Swyddog Lles', 											myUnionContentSlidersPath);
	
	//Part Time Officers
	toggleStandingContent(lang, 'Other - Part Time Officers', 'Arrar - Swyddogion Rhan amser', 		myUnionContentHeaderPath);
	toggleStandingContent(lang, 'Black, Minority, and Ethnic Students Officer', 'Swyddog myfyrwyr Du', 		myUnionContentSlidersPath);
	toggleStandingContent(lang, 'Environment Officer', 'Swyddog yn Amgylchedd', 							myUnionContentSlidersPath);
	toggleStandingContent(lang, 'Ethics Officer', 'Swyddog Moeseg', 										myUnionContentSlidersPath);
	toggleStandingContent(lang, 'General Secretary for Officers', 'Ysgrifennydd Cyffredinol y Swyddogion', 	myUnionContentSlidersPath);
	toggleStandingContent(lang, 'International Students\' Officer', 'Swyddog Myfyrwyr Rhyngwladol yn', 		myUnionContentSlidersPath);
	toggleStandingContent(lang, 'LGBT+ Officer', 'LGBT+ Swyddog', 											myUnionContentSlidersPath);
	toggleStandingContent(lang, 'Mature Students Part Time Officer', 'Swyddog Myfyrwyr Hyn Rhan-amser', 	myUnionContentSlidersPath);
	toggleStandingContent(lang, 'Part Time Students Officer', 'Swyddog myfyrwyr Rhan-amser', 				myUnionContentSlidersPath);
	toggleStandingContent(lang, 'Students with Disabilities Officer', 'Swyddog myfyrwyr ag Anabledd', 		myUnionContentSlidersPath);
	toggleStandingContent(lang, 'Welsh Language Officer', 'Swyddog yr Iaith Gymraeg', 						myUnionContentSlidersPath);
	
	//Support and Services
	toggleStandingContent(lang, 'Other - Support and Services', 'Ararr - Cefnogaeth',	myUnionContentHeaderPath);
	toggleStandingContent(lang, 'Nursery', 'Meithrinfa', 								myUnionContentSlidersPath);
	toggleStandingContent(lang, 'Advice Centre', 'Canolfan Gyngor', 					myUnionContentSlidersPath);
	
	//Shops
	toggleStandingContent(lang, 'Other - Shops', 'Ararr - Siopiau',	myUnionContentHeaderPath);
	//19:20
	//Fulton Outfitters
	//myCostcutter
	toggleStandingContent(lang, 'Travel Shop', 'Siopiau Teithio', 		myUnionContentSlidersPath);
	toggleStandingContent(lang, 'Union Collective', 'Cyfweithfa Undeb', myUnionContentSlidersPath);
	
	//Democracy
	toggleStandingContent(lang, 'Other - Democracy', 'Ararr - Democratiaeth',			myUnionContentHeaderPath);
	toggleStandingContent(lang, 'Elections', 'Etholiadau', 								myUnionContentSlidersPath);
	toggleStandingContent(lang, 'Forums', 'Fforymau', 									myUnionContentSlidersPath);
	toggleStandingContent(lang, 'Student Representation', 'Myfyriwr Cynrychiolaeth', 	myUnionContentSlidersPath);
	
	//Venues
	toggleStandingContent(lang, 'Other - Venues', 'Ararr - Lleoliadau',	myUnionContentHeaderPath);
	//Sin City
	//SSB
	//Wonky
	//Campus
	//Divas
	//JC's
	//Ospreys
	
	//Ents
	toggleStandingContent(lang, 'Other - Ents', 'Ararr - Ents',					myUnionContentHeaderPath);
	toggleStandingContent(lang, 'Ents Management', 'Rheolaeth Ents', 			myUnionContentSlidersPath);
	toggleStandingContent(lang, 'Resident Network', 'Rhwydwaith Preswylwyr', 	myUnionContentSlidersPath);
	toggleStandingContent(lang, 'Student Reps', 'Cyn Myfyrwyr', 				myUnionContentSlidersPath);
	
	//Administration
	toggleStandingContent(lang, 'Other - Administration', 'Ararr - Gweinyddu',	myUnionContentHeaderPath);
	toggleStandingContent(lang, 'Finance', 'Swyddfa o Gyllid',					myUnionContentSlidersPath);
	toggleStandingContent(lang, 'Trustees', 'Ymddiriedolwyr', 					myUnionContentSlidersPath);
	toggleStandingContent(lang, 'Union Management', 'Rheolaeth Undeb', 			myUnionContentSlidersPath);
	
	cOHTML = '<h2 class="container-header" id="blogs-block-header">Blogs // <a href="/news/">More</a></h2>';
	cDHTML = '<h2 class="container-header" id="blogs-block-header">Blogiau // <a href="/news/">Mwy</a></h2>';
	jQPath = 'div.blog-container  div.wrapper h2.container-header#blogs-block-header';
	toggleComplexStandingContent(lang, 'Blogs', cOHTML, 'Blogiau', cDHTML, jQPath);
	
	cOHTML = '<h2 class="container-header" id="events-block-header">Events // <a href="/news/">More</a></h2>';
	cDHTML = '<h2 class="container-header" id="events-block-header">Digwyddiadau // <a href="/news/">Mwy</a></h2>';
	jQPath = 'div.events-container  div.wrapper div#events h2.container-header#events-block-header';
	toggleComplexStandingContent(lang, 'Events', cOHTML, 'Digwyddiadau', cDHTML, jQPath);
	
	var eventsButtonStripPath = 'div.events-container div.wrapper div.events div#su-eventsPortraitFilter';
	toggleStandingContent(lang, 'All', 'Bob', eventsButtonStripPath +  ' div.m-btn-strip div.all');
	toggleStandingContent(lang, 'Club Nights', 'Clwb Nosweithiau', eventsButtonStripPath +  ' div.m-btn-group div.m-btn');
	toggleStandingContent(lang, 'Live Music', 'Cerddoriaeth Fyw', eventsButtonStripPath +  ' div.m-btn-group div.m-btn');
	//Divas
	//Sin City
	
	toggleStandingContent(lang, 'Check back soon', 'Dewch yn ÃƒÂ´l yn fuan', 'div.events-container div#su-eventsPortrait.sliderPortrait div.slider div.slide div.slide-inner a event-title');
	toggleDateAndTimeComponents(lang, 'div.events-container div#su-eventsPortrait.sliderPortrait div.slider div.slide div.slide-inner a div.event-date');
	
	toggleStandingContent(lang, 'Social Media', 'Cyfryngau Cymdeithasol', 'div.media-container div.wrapper h2');
	toggleStandingContent(lang, 'Posted', 'Postiwyd', 'div.media-container div.wrapper div#su-media-frontpage div.dcsns-content ul.stream.isotope li div.inner span.section-intro a');
	//Tweeted
	//toggleDateAndTimeComponents(lang, 'div.media-container div.wrapper div#su-media-frontpage div.dcsns-content ul.stream.isotope li div.inner span.section-intro a span a');
	
	//top of activities pages breadcrumbs
	//Society page stuff.msl_notification span.msl_info');
	//in order through the Union menu
	var committeePath = '.org-box.orgcommittee .mslwidget .msl-groupedmemberlist h3';
	toggleStandingContent(lang, 'Arts Director', 'Cyfarwyddwr Celfyddydau', committeePath);
	toggleStandingContent(lang, 'Booking Agent', 'Archebu Asiant', committeePath);
	toggleStandingContent(lang, 'Buddy Scheme Co-ordinator', 'Cynllun Buddy Cydlynydd', committeePath);
	toggleStandingContent(lang, 'Campaigns Manager', 'Rheolwr Ymgyrchoedd', committeePath);
	toggleStandingContent(lang, 'Chief Advisor', 'Prif Gynghorydd', committeePath);
	toggleStandingContent(lang, 'Choreographer', 'Coreograffydd', committeePath);
	toggleStandingContent(lang, 'Church Advocate', 'Eiriolwr Eglwys', committeePath);
	toggleStandingContent(lang, 'Communication Officer', 'Swyddog Cyfathrebu', committeePath);
	toggleStandingContent(lang, 'Co-Musical Director', 'Cyd-Gyfarwyddwr Cerddorol', committeePath);
	toggleStandingContent(lang, 'Corporate Liaison Officer', 'Swyddog Cyswllt Corfforaethol', committeePath);
	toggleStandingContent(lang, 'Dawah Officer', 'Swyddog Dawah', committeePath);
	toggleStandingContent(lang, 'Deputy President', 'Dirprwy Lywydd', committeePath);
	toggleStandingContent(lang, 'Deputy Public Relations Officer', 'Dirprwy Swyddog Cysylltiadau Cyhoeddus', committeePath);
	toggleStandingContent(lang, 'Deputy Station Manager', 'Dirprwy Rheolwr Gorsaf', committeePath);
	toggleStandingContent(lang, 'Duties Officer', 'Swyddog Dyletswyddau', committeePath);
	toggleStandingContent(lang, 'Equipment Manager', 'Rheolwr Offer', committeePath);
	toggleStandingContent(lang, 'Event Officer', 'Swyddog Digwyddiad', committeePath);
	toggleStandingContent(lang, 'Events and Publicity Manager', 'Digwyddiadau a Rheolwr Cyhoeddusrwydd', committeePath);
	toggleStandingContent(lang, 'Events Manager', 'Rheolwr Digwyddiadau', committeePath);
	toggleStandingContent(lang, 'Events Officer', 'Swyddog Digwyddiadau', committeePath);
	toggleStandingContent(lang, 'Executive Member', 'Aelod Gweithredol', committeePath);
	toggleStandingContent(lang, 'Female President', 'Llywydd benywaidd', committeePath);
	toggleStandingContent(lang, 'Fundraiser', 'Fundraiser', committeePath);
	toggleStandingContent(lang, 'Fundraising Officer', 'Swyddog Codi Arian', committeePath);
	toggleStandingContent(lang, 'Head of Engineering', 'Pennaeth Peirianneg', committeePath);
	toggleStandingContent(lang, 'Head of Music', 'Pennaeth Cerddoriaeth', committeePath);
	toggleStandingContent(lang, 'Head of Sport', 'Pennaeth Chwaraeon', committeePath);
	toggleStandingContent(lang, 'Human Rights Review Editor', 'Golygydd Adolygiad Hawliau Dynol', committeePath);
	toggleStandingContent(lang, 'International Secretary', 'Ysgrifennydd Rhyngwladol', committeePath);
	toggleStandingContent(lang, 'IV Officer', 'Swyddog IV', committeePath);
	toggleStandingContent(lang, 'Keeper of the Cows', 'Ceidwad y Buchod', committeePath);
	toggleStandingContent(lang, 'Liaison and Social Officer', 'Cyswllt a Swyddog Cymdeithasol', committeePath);
	toggleStandingContent(lang, 'Liaison Officer', 'Swyddog Cyswllt', committeePath);
	toggleStandingContent(lang, 'Male Evangelism Officer', 'Swyddog Efengylu Gwryw', committeePath);
	toggleStandingContent(lang, 'Media & PR', 'Cyfryngau a Chysylltiadau Cyhoeddus', committeePath);
	toggleStandingContent(lang, 'Media Technician', 'Technegydd y Cyfryngau', committeePath);
	toggleStandingContent(lang, 'Mens Fashion', 'Mens Ffasiwn', committeePath);
	toggleStandingContent(lang, 'Module Project Co-ordinator', 'Prosiect y Modiwl Cydlynydd', committeePath);
	toggleStandingContent(lang, 'Mooting Secretary', 'Ysgrifennydd Dadlau', committeePath);
	toggleStandingContent(lang, 'Music Co-ordinator', 'Cerddoriaeth Cydlynydd', committeePath);
	toggleStandingContent(lang, 'Musical Director', 'Cyfarwyddwr Cerdd', committeePath);
	toggleStandingContent(lang, 'Name', 'Enw', committeePath);
	toggleStandingContent(lang, 'Non-Portfolio Officer', 'Swyddog Di-Bortffolio', committeePath);
	toggleStandingContent(lang, 'Not categorised', 'Heb ei gategoreiddio', committeePath);
	toggleStandingContent(lang, 'PR Officer', 'Swyddog Cysylltiadau Cyhoeddus', committeePath);
	toggleStandingContent(lang, 'Prayer Secretary', 'Ysgrifennydd Gweddi', committeePath);
	toggleStandingContent(lang, 'President', 'Llywydd', committeePath);
	toggleStandingContent(lang, 'Promotions and Events', 'Hyrwyddiadau a Digwyddiadau', committeePath);
	toggleStandingContent(lang, 'Public Relations & Vice President', 'Cysylltiadau Cyhoeddus a Is-Lywydd', committeePath);
	toggleStandingContent(lang, 'Publicist', 'Cyhoeddusrwydd', committeePath);
	toggleStandingContent(lang, 'Publicity and Design', 'Cyhoeddusrwydd a Dylunio', committeePath);
	toggleStandingContent(lang, 'Publicity and events', 'Cyhoeddusrwydd a digwyddiadau', committeePath);
	toggleStandingContent(lang, 'Publicity Officer', 'Swyddog Cyhoeddusrwydd', committeePath);
	toggleStandingContent(lang, 'Publicity Secretary', 'Ysgrifennydd Cyhoeddusrwydd', committeePath);
	toggleStandingContent(lang, 'Rep for March 10 Nurses', 'Cynrychiolydd ar gyfer 10 Mawrth Nyrsys', committeePath);
	toggleStandingContent(lang, 'Secretary', 'Ysgrifennydd', committeePath);
	toggleStandingContent(lang, 'Senior Midshipman', 'Uwch midshipman', committeePath);
	toggleStandingContent(lang, 'Social Secretary', 'Ysgrifennydd Cymdeithasol', committeePath);
	toggleStandingContent(lang, 'Sport Secretary', 'Ysgrifennydd Chwaraeon', committeePath);
	toggleStandingContent(lang, 'Station Manager', 'Rheolwr yr Orsaf', committeePath);
	toggleStandingContent(lang, 'Support and Publicist', 'Cefnogaeth a Swyddog Cyhoeddusrwydd', committeePath);
	toggleStandingContent(lang, 'Technical Director', 'Cyfarwyddwr Technegol', committeePath);
	toggleStandingContent(lang, 'Third Year Rep', 'Blwyddyn Cynrychiolydd Trydydd', committeePath);
	toggleStandingContent(lang, 'Tournament Manager', 'Rheolwr Twrnamaint', committeePath);
	toggleStandingContent(lang, 'Training Officer', 'Swyddog Hyfforddi', committeePath);
	toggleStandingContent(lang, 'Treasurer', 'Trysorydd', committeePath);
	toggleStandingContent(lang, 'Trips Organiser', 'Teithiau Trefnydd', committeePath);
	toggleStandingContent(lang, 'Vice President', 'Is-lywydd', committeePath);
	toggleStandingContent(lang, 'Vice-President', 'Is-Lywydd', committeePath);
	toggleStandingContent(lang, 'Welfare Officer', 'Swyddog Lles', committeePath);
	toggleStandingContent(lang, 'Women\'s Officer', 'Swyddog y Menywod', committeePath);
	
	toggleStandingContent(lang, 'Events', 'Digwyddiadau', '#su_page_content div#organisation div#article article h2');
	toggleStandingContent(lang, 'No Events Available', 'Dim digwyddiadau ar Gae', '#suorgeventlist a div.orgText');
	toggleStandingContent(lang, 'Check back soon', 'Dewch yn ÃƒÂ´l yn fuan', '#suorgeventlist a div.event-title');
	toggleDateAndTimeComponents(lang, '#suorgeventlist a div.event-date');
	
	//toggleStandingContent(lang, 'Membership', 'Aelodaeth', '#page-org-join .mslwidget');
	toggleStandingContent(lang, 'Sorry, there are no memberships available to purchase.', 'Mae\'n ddrwg gennym, nid oes unrhyw aelodaeth sydd ar gael i\'w prynu', '#page-org-join .mslwidget .msl_notification span');
	toggleStandingContent(lang, 'Basket', 'Basged', '#msl-basket #basket h3');
	toggleStandingContent(lang, 'Remove', 'Tynnu', '#msl-basket #basket dl dd a');
	toggleStandingContent(lang, 'Review Basket', 'Adolygiad basged', '#msl-basket #basket a');
	toggleStandingContent(lang, 'Proceed to Checkout', 'Ymlaen i desg dalu', '#msl-basket #basket a');
	toggleStandingContent(lang, 'Email the committee', 'E-bostiwch y pwyllgor', '#page-org-info .mslwidget.orgEmailIcon a.msl_email');
	toggleStandingContent(lang, 'This item is already in your basket.', 'Mae\'r eitem hon yn eisoes yn eich basged.', '#page-org-join .mslwidget .msl_notification span.msl_warning');
	oGS = 		'Membership <div class="msl_notification"><span id="ctl00_Main_organisationjoin_nfStatus_NotificationLabel" class="msl_info">Please log in to join';
	cOHTML = 	'Membership <div class="msl_notification"><span id="ctl00_Main_organisationjoin_nfStatus_NotificationLabel" class="msl_info">Please log in to join this organisation.</span></div>';
	dGS = 		'Aelodaeth <div class="msl_notification"><span id="ctl00_Main_organisationjoin_nfStatus_NotificationLabel" class="msl_info">Os gwelwch yn dda mewngofnodwch';
	cDHTML = 	'Aelodaeth <div class="msl_notification"><span id="ctl00_Main_organisationjoin_nfStatus_NotificationLabel" class="msl_info">Os gwelwch yn dda mewngofnodwch i ymuno ÃƒÂ¢ sefydliad hwn</span></div>';
	toggleComplexStandingContent(lang, oGS, cOHTML, dGS, cDHTML, '#page-org-join .mslwidget');
	
	toggleStandingContent(lang, 'Exec Committee', 'Pwyllgor Gweithredol', 'li.nav-header');
	toggleStandingContent(lang, 'Societies & Services Coordinator', 'Cydlynydd Cymdeithasau a Gwasanaethau', '.person-title');
	toggleStandingContent(lang, 'Societies & Services Officer', 'Swyddog Cymdeithasau a Gweithgareddau', '.person-title');
	
	toggleStandingContent(lang, 'Sports Officer', 'Swyddog Chwaraeon', '.person-title');
	toggleStandingContent(lang, 'Sports Manager', 'Rheolwr Chwaraeon', '.person-title');
	
	toggleStandingContent(lang, 'Society Categories', 'CategorÃƒÂ¯au Cymdeithas', '#activitiesCategorySlider h2.title');
	toggleStandingContent(lang, 'Academic', 'Academaidd', '.activitiesCatName.society');
	toggleStandingContent(lang, 'Charitable', 'Elusennol', '.activitiesCatName.society');
	toggleStandingContent(lang, 'Faith & Cultural', 'Ffydd a Diwylliannol', '.activitiesCatName.society');
	toggleStandingContent(lang, 'Hobbies & Interests', 'HobÃƒÂ¯au a Diddordebau', '.activitiesCatName.society');
	toggleStandingContent(lang, 'Media', 'Cyfryngau', '.activitiesCatName.society');
	toggleStandingContent(lang, 'Not categorised', 'Heb ei gategoreiddio', '.activitiesCatName.society');
	toggleStandingContent(lang, 'Performing Arts', 'Y Celfyddydau Perfformio', '.activitiesCatName.society');
	toggleStandingContent(lang, 'Political & Campaigning', 'Gwleidyddol a Ymgyrchu', '.activitiesCatName.society');
	
	toggleStandingContent(lang, 'Societies - Academic', 'Cymdeithas - Academaidd', '#su-activitiesListHeader');
	toggleStandingContent(lang, 'Societies - Charitable', 'Cymdeithas - Elusennol', '#su-activitiesListHeader');
	toggleStandingContent(lang, 'Societies - Faith & Cultural', 'Cymdeithas - Ffydd a Diwylliannol', '#su-activitiesListHeader');
	toggleStandingContent(lang, 'Societies - Hobbies & Interests', 'Cymdeithas - HobÃƒÂ¯au a Diddordebau', '#su-activitiesListHeader');
	toggleStandingContent(lang, 'Societies - Media', 'Cymdeithas - Cyfryngau', '#su-activitiesListHeader');
	toggleStandingContent(lang, 'Societies - Not categorised', 'Cymdeithas - Heb ei gategoreiddio', '#su-activitiesListHeader');
	toggleStandingContent(lang, 'Societies - Performing Arts', 'Cymdeithas - Y Celfyddydau Perfformio', '#su-activitiesListHeader');
	toggleStandingContent(lang, 'Societies - Political & Campaigning', 'Cymdeithas - Gwleidyddol a Ymgyrchu', '#su-activitiesListHeader');

	
	var breadcrumbPath = ['.breadcrumb li a', '.banner-title', 'h2#org-page-title']; //covers "div.breadcrumb ul li a" (side bar) and "ul.breadcrumb li a (slug); covers PageTitle widget"
	
	//Elections
	toggleStandingContent(lang, 'Voting & Elections', 'Pleidleisio ac Etholiadau',	breadcrumbPath);
	
	//My Union
	toggleStandingContent(lang, 'Your Union', 'Eich Undeb',  			breadcrumbPath);
	toggleStandingContent(lang, 'My Union', 'Fy Undeb',  			breadcrumbPath);
	toggleStandingContent(lang, 'Advice', 'Cyngor',  			breadcrumbPath);
	
	toggleStandingContent(lang, 'Student Forums', 'Fforymau Myfyrwyr',  breadcrumbPath);
	toggleStandingContent(lang, 'Student Forums 2012-13', 'Fforymau Myfyrwyr 2012-13',  breadcrumbPath);
	toggleStandingContent(lang, 'Student Forums 2013-14', 'Fforymau Myfyrwyr 2013-14',  breadcrumbPath);
	toggleStandingContent(lang, 'Student Forums 2014-15', 'Fforymau Myfyrwyr 2014-15',  breadcrumbPath);
	
	toggleStandingContent(lang, 'LGBT+', 'LHDT+',  breadcrumbPath);
	toggleStandingContent(lang, 'LGBT Plus', 'LHDT Plws',  breadcrumbPath);
	
	toggleStandingContent(lang, 'Governance', 'Trefn Llywodraethol',  breadcrumbPath);
	toggleStandingContent(lang, 'Affiliations', 'Gysylltiadau', breadcrumbPath);
	toggleStandingContent(lang, 'Approved Audited Accounts', 'Cyfrifon Archwiliedig Cymeradwy', breadcrumbPath);
	toggleStandingContent(lang, 'Code of Practice', 'Cod Ymarfer', breadcrumbPath);
	toggleStandingContent(lang, 'Green Impact', 'Effaith gwyrdd', breadcrumbPath);
	toggleStandingContent(lang, 'Union Policies', 'PolisÃƒÂ¯au Undeb', breadcrumbPath);
	toggleStandingContent(lang, 'Schedules', 'Atodlenni', breadcrumbPath);
	toggleStandingContent(lang, 'Union Collective', 'Cyfweithfa Undeb', breadcrumbPath);

	toggleStandingContent(lang, 'Jobs', 'Swyddi', breadcrumbPath);
	toggleStandingContent(lang, 'Add Your New Idea', 'Ychwanegu Eich Syniad Newydd', breadcrumbPath);
	toggleStandingContent(lang, 'Referendum', 'Refferendwm', breadcrumbPath);
	
	toggleStandingContent(lang, 'Support', 'Cefnogaeth', 				breadcrumbPath);
	
	toggleStandingContent(lang, 'Advice Centre', 'Canolfan Gyngor', 	breadcrumbPath);
	toggleStandingContent(lang, 'Academic', 'Academaidd', 				breadcrumbPath);
	toggleStandingContent(lang, 'Employment Issues', 'Materion Cyflogaeth', 	breadcrumbPath);
	toggleStandingContent(lang, 'Feedback', 'Adborth', 	breadcrumbPath);
	toggleStandingContent(lang, 'Health', 'Iechyd', 	breadcrumbPath);
	toggleStandingContent(lang, 'Alcohol and Drugs', 'Alcohol a Chyffuriau', 	breadcrumbPath);
	toggleStandingContent(lang, 'Liberation', 'Rhyddhad', 	breadcrumbPath);
	toggleStandingContent(lang, 'Zero Tolerance', 'Dim Goddefiad', 	breadcrumbPath);
	toggleStandingContent(lang, 'Living in Swansea', 'Byw yn Abertawe', 	breadcrumbPath);
	toggleStandingContent(lang, 'Community', 'Y Gymuned', 	breadcrumbPath);
	toggleStandingContent(lang, 'Getting Around', 'Teithio o gwmpas', 	breadcrumbPath);
	toggleStandingContent(lang, 'Househunting', 'Hela TÃ…Â·', 	breadcrumbPath);
	toggleStandingContent(lang, 'Rate Your Landlord', 'Rhowch eich barn am eich landlord', 	breadcrumbPath);
	toggleStandingContent(lang, 'Renting', 'Rhentu', 	breadcrumbPath);
	toggleStandingContent(lang, 'Renting in Swansea', 'Rhentu a Abertawe', 	breadcrumbPath);
	toggleStandingContent(lang, 'Deposits', 'Blaendaliadau', 	breadcrumbPath);
	toggleStandingContent(lang, 'Disrepair', 'Adfeiliad', 	breadcrumbPath);
	toggleStandingContent(lang, 'HMOs', 'Tai Amlfeddiannaeth', 	breadcrumbPath);
	toggleStandingContent(lang, 'Landlord Issues', 'Materion Landlord', 	breadcrumbPath);
	toggleStandingContent(lang, 'Paperwork & Contracts', 'Cytundebau Llety', 	breadcrumbPath);
	toggleStandingContent(lang, 'Recycling', 'Ailgylchu', 	breadcrumbPath);
	toggleStandingContent(lang, 'Safety', 'Diogelwch', 	breadcrumbPath);
	toggleStandingContent(lang, 'Safety Maps', 'Mapiau Diogelwch', 	breadcrumbPath);
	toggleStandingContent(lang, 'SAS Lettings', 'SAS Gosodiadau', 	breadcrumbPath);
	toggleStandingContent(lang, 'Money', 'Arian', 	breadcrumbPath);
	toggleStandingContent(lang, 'Parents & Carers', 'Rhieni a Gofalwyr', 	breadcrumbPath);
	toggleStandingContent(lang, 'Crime & Safety / Report Hate Crime', 'Troseddu a Diogelwch / Adroddiad Troseddau Casineb', 	breadcrumbPath);
	toggleStandingContent(lang, 'Get Home Safely', 'Hafan Ddiogel', 	breadcrumbPath);
	toggleStandingContent(lang, 'House or Halls Security', 'Diogelwch Ty neu Neueddau Preswyl', 	breadcrumbPath);
	toggleStandingContent(lang, 'The Police', 'Yr Heddlu', 	breadcrumbPath);
	toggleStandingContent(lang, 'Report a Hate Incident or Crime', 'Rhoi gwybod am digwyddiad neu drosedd casineb', 	breadcrumbPath);
	toggleStandingContent(lang, 'Stay Safe Online', 'Diogelwch ar y WÃƒÂª', 	breadcrumbPath);
	toggleStandingContent(lang, 'Mediation Service', 'Gwasanaeth Myfyrdod', 	breadcrumbPath);
	toggleStandingContent(lang, 'University Support Services', 'Gwasanaethau Cymorth Myfyrwyr', 	breadcrumbPath);
	toggleStandingContent(lang, 'Nursery', 'Meithrinfa', 	breadcrumbPath);
	toggleStandingContent(lang, 'About Us', 'Amdanom Ni', 	breadcrumbPath);
	toggleStandingContent(lang, 'Daily Routine', 'Trefn Ddyddiol', 	breadcrumbPath);
	toggleStandingContent(lang, 'Information', 'Gwybodaeth', 	breadcrumbPath);
	toggleStandingContent(lang, 'Menu', 'Dewislen', 	breadcrumbPath);
	toggleStandingContent(lang, 'Newsletters', 'Cylchlythyrau', 	breadcrumbPath);
	toggleStandingContent(lang, 'Opening Times & Prices', 'Amseroedd Agor a Phrisiau', 	breadcrumbPath);
	toggleStandingContent(lang, 'Our Curriculum Plans', 'Ein Cynlluniau Cwricwlwm', 	breadcrumbPath);
	toggleStandingContent(lang, 'Photo Gallery', 'Galeri Lluniau', 	breadcrumbPath);
	//toggleStandingContent(lang, 'Staff', 'Staff', 	breadcrumbPath);
	toggleStandingContent(lang, 'Testimonials', 'Cymeradwyaeth', 	breadcrumbPath);
	toggleStandingContent(lang, 'Health', 'Iechyd', 	breadcrumbPath);
	toggleStandingContent(lang, 'Health', 'Iechyd', 	breadcrumbPath);
	
	toggleStandingContent(lang, 'Societies', 'Cymdeithasau',  			breadcrumbPath);
	toggleStandingContent(lang, 'Sports', 'Cymdeithasau',  				breadcrumbPath);
	toggleStandingContent(lang, 'Sport Swansea', 'Cymdeithasau Abertawe',  				breadcrumbPath);
	
	breadcrumbPath = breadcrumbPath.concat(['div.activitiesItemName.society']);
	toggleStandingContent(lang, 'ACS', 'MAC', breadcrumbPath);
	toggleStandingContent(lang, 'Aerospace Engineering', 'Peirianneg Awyrofod', breadcrumbPath);
	//toggleStandingContent(lang, 'Aikido', 'Aikido', breadcrumbPath);
	toggleStandingContent(lang, 'American Football', 'PÃƒÂªl droed Americanaidd', breadcrumbPath);
	toggleStandingContent(lang, 'American Studies', 'Astudiaethau Americanaidd', breadcrumbPath);
	toggleStandingContent(lang, 'Amnesty International', 'Amnesty Rhyngwladol', breadcrumbPath);
	toggleStandingContent(lang, 'Ancient Studies', 'Astudiaethau Hynafol', breadcrumbPath);
	//toggleStandingContent(lang, 'Anime and Manga', 'Anime and Manga', breadcrumbPath);
	toggleStandingContent(lang, 'Archery', 'Saethyddiaeth', breadcrumbPath);
	toggleStandingContent(lang, 'Athletics and Cross Country', 'Athletau a rhedeg traws gwlad', breadcrumbPath);
	//toggleStandingContent(lang, 'Badminton', 'Badminton', breadcrumbPath);
	toggleStandingContent(lang, 'Baking Appreciation', 'Cymdeithas gwerthfawrogi pobi', breadcrumbPath);
	//toggleStandingContent(lang, 'Bar', 'Bar', breadcrumbPath);
	toggleStandingContent(lang, 'Basketball', 'PÃƒÂªl Basged', breadcrumbPath);
	toggleStandingContent(lang, 'Beer Pong', 'Pong cwrw', breadcrumbPath);
	toggleStandingContent(lang, 'Biochemistry & Genetics', 'Biocemeg a Geneteg', breadcrumbPath);
	toggleStandingContent(lang, 'Bioscience', 'Biowyddoniaeth', breadcrumbPath);
	toggleStandingContent(lang, 'Boxing', 'Paffio', breadcrumbPath);
	toggleStandingContent(lang, 'Brazilian', 'Brasilaidd', breadcrumbPath);
	toggleStandingContent(lang, 'Bright Futures', 'Dyfodol llewyrchus', breadcrumbPath);
	toggleStandingContent(lang, 'British Sign Language', ' Iaith arwyddion Prydeing', breadcrumbPath);
	//toggleStandingContent(lang, 'Brony', 'Brony', breadcrumbPath);
	toggleStandingContent(lang, 'Business', 'Busnes', breadcrumbPath);
	//toggleStandingContent(lang, 'C.L.A.S.H', 'C.L.A.S.H', breadcrumbPath);
	toggleStandingContent(lang, 'Canow Club', 'Clwb Canwio', breadcrumbPath);
	toggleStandingContent(lang, 'CathSoc', 'CymPab', breadcrumbPath);
	toggleStandingContent(lang, 'Charitable', 'Elusennol', breadcrumbPath);
	toggleStandingContent(lang, 'Cheerleding', 'TÃƒÂ®m codi hwyl', breadcrumbPath);
	toggleStandingContent(lang, 'Chemical and Environmental Engineering', 'Peirianneg Cemegol ac Amgylcheddol', breadcrumbPath);
	toggleStandingContent(lang, 'Chess', 'Gwyddbwyll', breadcrumbPath);
	toggleStandingContent(lang, 'Chinese', 'Tseinaidd', breadcrumbPath);
	toggleStandingContent(lang, 'Choral', 'Corau', breadcrumbPath);
	toggleStandingContent(lang, 'Christian Union', 'Yr Undeb Crisnogol', breadcrumbPath);
	toggleStandingContent(lang, 'Comedy', 'ComedÃƒÂ®', breadcrumbPath);
	toggleStandingContent(lang, 'Computer', 'Cyfrifiadurol', breadcrumbPath);
	toggleStandingContent(lang, 'Conservation Society', 'Y gymdeithas cadwraeth ', breadcrumbPath);
	toggleStandingContent(lang, 'Conservative Future', 'Dyfodol Ceidwadol', breadcrumbPath);
	//toggleStandingContent(lang, 'Coppa Feel ', 'Coppa Feel', breadcrumbPath);
	toggleStandingContent(lang, 'Cricket', 'Criced', breadcrumbPath);
	toggleStandingContent(lang, 'Criminology', 'Troseddeg', breadcrumbPath);
	toggleStandingContent(lang, 'Dance', 'Dawns', breadcrumbPath);
	toggleStandingContent(lang, 'Debating', 'Trafod', breadcrumbPath);
	toggleStandingContent(lang, 'Disney Appreciation', 'Gwerthfawrogiad Disney', breadcrumbPath);
	//toggleStandingContent(lang, 'Drama', 'Drama', breadcrumbPath);
	toggleStandingContent(lang, 'Economics', 'Economeg', breadcrumbPath);
	toggleStandingContent(lang, 'Egyptological', 'Eifftolegol', breadcrumbPath);
	toggleStandingContent(lang, 'Electrical & Electronic Engineering', 'Peirianneg Trydanol ac Electronig', breadcrumbPath);
	//toggleStandingContent(lang, 'Enactus', 'Enactus', breadcrumbPath);
	toggleStandingContent(lang, 'Engineering', 'Peirianneg', breadcrumbPath);
	toggleStandingContent(lang, 'English', 'Saesneg', breadcrumbPath);
	toggleStandingContent(lang, 'Equestrian', 'Marchogaeth', breadcrumbPath);
	toggleStandingContent(lang, 'EWB', 'PHR', breadcrumbPath);
	toggleStandingContent(lang, 'Fashion', 'Ffasiwn', breadcrumbPath);
	toggleStandingContent(lang, 'Fencing', 'Ffensio', breadcrumbPath);
	toggleStandingContent(lang, 'Film', 'Ffilm', breadcrumbPath);
	toggleStandingContent(lang, 'French', 'Ffrangeg', breadcrumbPath);
	toggleStandingContent(lang, 'Friends of medecins Sans Frontiers ', 'Ffrindiau o Medecins Sans Frontiers', breadcrumbPath);
	toggleStandingContent(lang, 'Gaming', 'Gemau fideo', breadcrumbPath);
	toggleStandingContent(lang, 'Geography', 'Daearyddiaeth', breadcrumbPath);
	toggleStandingContent(lang, 'Geology', 'Daeareg', breadcrumbPath);
	toggleStandingContent(lang, 'German', 'Almaeneg', breadcrumbPath);
	toggleStandingContent(lang, 'Golf', 'Golff', breadcrumbPath);
	toggleStandingContent(lang, 'Gospel Choir', 'CÃƒÂ´r Efengyl', breadcrumbPath);
	toggleStandingContent(lang, 'Guides & Scouts', 'Tywyswyr a sgowtiaid', breadcrumbPath);
	toggleStandingContent(lang, 'Hiking', 'Hecio', breadcrumbPath);
	toggleStandingContent(lang, 'Hispanic', 'Sbaenaidd', breadcrumbPath);
	toggleStandingContent(lang, 'History', 'Hanes', breadcrumbPath);
	toggleStandingContent(lang, 'Hitch', 'Hitch', breadcrumbPath);
	toggleStandingContent(lang, 'Hobbies and Interests', 'HobÃƒÂ¯au a Diddordebau', breadcrumbPath);
	toggleStandingContent(lang, 'Hogwarts', 'Hogwarts', breadcrumbPath);
	toggleStandingContent(lang, 'Hong Kong', 'Hong Kong', breadcrumbPath);
	toggleStandingContent(lang, 'Human & Health Sciences', 'Gwyddorau Dynol a Iechyd', breadcrumbPath);
	toggleStandingContent(lang, 'Human Rights Action', 'Ymgyrch dros Hawliau Dynol', breadcrumbPath);
	toggleStandingContent(lang, 'Indian', 'Indiaidd', breadcrumbPath);
	toggleStandingContent(lang, 'Intramural Football', 'PÃƒÂªl droed rhyngfurol', breadcrumbPath);
	toggleStandingContent(lang, 'Investment & Finance', 'Buddsoddi a chyllid', breadcrumbPath);
	toggleStandingContent(lang, 'Iranian', 'Iranaidd', breadcrumbPath);
	toggleStandingContent(lang, 'Islamic', 'Islamaidd', breadcrumbPath);
	toggleStandingContent(lang, 'Italian', 'Eidaleg', breadcrumbPath);
	toggleStandingContent(lang, 'Japanese', 'Siapanaid', breadcrumbPath);
	toggleStandingContent(lang, 'Jewish', 'Iddewig', breadcrumbPath);
	//toggleStandingContent(lang, 'Jiu Jitsu', 'Jiu Jitsu', breadcrumbPath);
	toggleStandingContent(lang, 'Jordiniad Palistinian', 'Cym Yr Iorddonen a Phalesteina', breadcrumbPath);
	//toggleStandingContent(lang, 'Karate', 'Karate', breadcrumbPath);
	toggleStandingContent(lang, 'Karting', 'Cartio', breadcrumbPath);
	toggleStandingContent(lang, 'Kickboxing', 'Cicfocsio', breadcrumbPath);
	toggleStandingContent(lang, 'Kitesurfing', 'Ceitsyrffio', breadcrumbPath);
	//toggleStandingContent(lang, 'Konetics', 'Konetics', breadcrumbPath);
	toggleStandingContent(lang, 'Kuwait', 'Coweit', breadcrumbPath);
	toggleStandingContent(lang, 'Labour Students', 'Myfyrwyr Llafur', breadcrumbPath);
	//toggleStandingContent(lang, 'Lacrosse', 'Lacrosse', breadcrumbPath);
	toggleStandingContent(lang, 'Law', 'Y Gyfraith', breadcrumbPath);
	toggleStandingContent(lang, 'LGBT+', 'LHDT+', breadcrumbPath);
	toggleStandingContent(lang, 'Liberal Youth', 'Ieuenctid Rhyddfrydol', breadcrumbPath);
	toggleStandingContent(lang, 'Lifesaving', 'Achub Bywyd', breadcrumbPath);
	toggleStandingContent(lang, 'Live Music Society', 'Cymdeithas Cerddoriaeth fyw', breadcrumbPath);
	toggleStandingContent(lang, 'Malaysian', 'Malaysiaidd', breadcrumbPath);
	toggleStandingContent(lang, 'Marine Biology', 'Bioleg MÃƒÂ´r', breadcrumbPath);
	//toggleStandingContent(lang, 'Marvel', 'Marvel', breadcrumbPath);
	toggleStandingContent(lang, 'Mens Football', 'PÃƒÂªl droed dynion', breadcrumbPath);
	toggleStandingContent(lang, 'Mens Hockey', 'Hoci Dynion', breadcrumbPath);
	toggleStandingContent(lang, 'Mens Rugby Union', 'Rygbi Undeb Dynion', breadcrumbPath);
	toggleStandingContent(lang, 'Mental Wealth', 'Cyfoeth Meddyliol', breadcrumbPath);
	toggleStandingContent(lang, 'Midwifery', 'Bidwreigiaeth', breadcrumbPath);
	toggleStandingContent(lang, 'Mountain Biking', 'Beicio mynydd', breadcrumbPath);
	toggleStandingContent(lang, 'Mountaineering', 'Mynydda', breadcrumbPath);
	toggleStandingContent(lang, 'Musicians', 'Cerddorion', breadcrumbPath);
	toggleStandingContent(lang, 'Netball', 'PÃƒÂªl Rhwyd', breadcrumbPath);
	toggleStandingContent(lang, 'Nigerian', 'Nigeraidd', breadcrumbPath);
	toggleStandingContent(lang, 'Osteopathy', 'Ostopathi', breadcrumbPath);
	toggleStandingContent(lang, 'Pagan', 'Paganaidd', breadcrumbPath);
	toggleStandingContent(lang, 'Pakistani', 'Pakistanaidd', breadcrumbPath);
	toggleStandingContent(lang, 'Palestinian Solidarity', 'Undod Palesteina', breadcrumbPath);
	toggleStandingContent(lang, 'People & Planet', 'Pobl aÃ¢â‚¬â„¢r ddaear', breadcrumbPath);
	toggleStandingContent(lang, 'Photography', 'Ffotograffiaeth', breadcrumbPath);
	toggleStandingContent(lang, 'Physics', 'Ffiseg', breadcrumbPath);
	toggleStandingContent(lang, 'Plaid Cymru', 'Plaid Cymru', breadcrumbPath);
	toggleStandingContent(lang, 'Poetry', 'Llenyddiaeth', breadcrumbPath);
	toggleStandingContent(lang, 'Politics', 'Gwleidyddiaeth', breadcrumbPath);
	toggleStandingContent(lang, 'Psychology', 'Seicoleg', breadcrumbPath);
	toggleStandingContent(lang, 'Rifle', 'Reiffl', breadcrumbPath);
	toggleStandingContent(lang, 'Roleplay', 'Chwarae rÃƒÂ´l', breadcrumbPath);
	toggleStandingContent(lang, 'Rowing', 'Rhwyfo', breadcrumbPath);
	toggleStandingContent(lang, 'Rugby Leauge', 'RygbiÃ¢â‚¬â„¢r Cynghair', breadcrumbPath);
	//toggleStandingContent(lang, 'S.I.F.E', 'S.I.F.E', breadcrumbPath);
	toggleStandingContent(lang, 'Sailing', 'Hwylio', breadcrumbPath);
	toggleStandingContent(lang, 'Scandinavian', 'Sgandinafaidd', breadcrumbPath);
	//toggleStandingContent(lang, 'Sceptics Society', 'Y gymdeithas amheuwyr', breadcrumbPath);
	toggleStandingContent(lang, 'Sci-Fi', 'Ffuglen-Gwyddonol', breadcrumbPath);
	toggleStandingContent(lang, 'Show Choir', 'Sioe CÃƒÂ´r', breadcrumbPath);
	toggleStandingContent(lang, 'Snowriders', 'Reidwyr eira', breadcrumbPath);
	toggleStandingContent(lang, 'Socialist Students', 'Myfyrwyr Sosialaidd', breadcrumbPath);
	toggleStandingContent(lang, 'Squash', 'Sboncen', breadcrumbPath);
	toggleStandingContent(lang, 'St. John links', 'Cysylltiadau Sn. John', breadcrumbPath);
	toggleStandingContent(lang, 'SU-TV', 'Teledu PA', breadcrumbPath);
	toggleStandingContent(lang, 'Sub Aqua', 'O Dan y Dwr', breadcrumbPath);
	toggleStandingContent(lang, 'SumSoc', 'Cerddoriaeth', breadcrumbPath);
	toggleStandingContent(lang, 'Surf', 'Syrffio', breadcrumbPath);
	toggleStandingContent(lang, 'SwanC', 'AberC', breadcrumbPath);
	toggleStandingContent(lang, 'Swimming Performance', 'Nofio Perfformiadol', breadcrumbPath);
	toggleStandingContent(lang, 'Swimming Social', 'Nofio Cymdeithasol', breadcrumbPath);
	//toggleStandingContent(lang, 'Tae Kwon Do', 'Tae Kwon Do', breadcrumbPath);
	toggleStandingContent(lang, 'Tennis', 'Tenis', breadcrumbPath);
	toggleStandingContent(lang, 'Triathlon', 'Treiathlon', breadcrumbPath);
	toggleStandingContent(lang, 'Ultimate Frisbee', 'Frisbi eithaf', breadcrumbPath);
	//toggleStandingContent(lang, 'UNICEF ', 'UNICEF', breadcrumbPath);
	toggleStandingContent(lang, 'UWAS', 'UWAS', breadcrumbPath);
	toggleStandingContent(lang, 'Volleyball', 'PÃƒÂªl foli', breadcrumbPath);
	toggleStandingContent(lang, 'Welsh University Officer Training Corps', 'Corff Hyfforddiant Swyddogion Prifysgolion Cymru', breadcrumbPath);
	toggleStandingContent(lang, 'War & Society', 'Rhyfel a Chymdeithas', breadcrumbPath);
	toggleStandingContent(lang, 'WarGaming', 'GemauRhyfel', breadcrumbPath);
	toggleStandingContent(lang, 'Watersports', 'Chwaraeon dÃ…Âµr', breadcrumbPath);
	toggleStandingContent(lang, 'Windsurfing', 'Gwyntsyrffio', breadcrumbPath);
	toggleStandingContent(lang, 'Womens Football', 'PÃƒÂªl Droed Merched', breadcrumbPath);
	toggleStandingContent(lang, 'Womens Hockey', 'Hoci Menywod', breadcrumbPath);
	toggleStandingContent(lang, 'Womens Rugby Union', 'Rygbi Undeb Menywod ', breadcrumbPath);
	toggleStandingContent(lang, 'WURNU', 'ULlBPC', breadcrumbPath);
	toggleStandingContent(lang, 'XtremeRadio', 'XtremeRadio', breadcrumbPath);
	toggleStandingContent(lang, 'Y Gym Gym', 'Y Gym Gym', breadcrumbPath);
	toggleStandingContent(lang, 'Yoga', 'Ioga', breadcrumbPath);
	
	//footer
	toggleStandingContent(lang, 'Swansea University Students\' Union is here to support students and to make your experience the best it can be.', 'Prifysgol Abertawe Undeb Myfyrwyr yma i gefnogi myfyrwyr ac i wneud eich profiad gorau y gall fod.', '#footer .two-column-left p');
	
	cOHTML = 'Students\' Union, Swansea University, Union House, Singleton Park, Swansea, SA2 8PP<br>By using this website, you agree to our <a href="/website/cookies/">Cookie Policy.</a>';
	cDHTML = 'Undeb y Myfyrwyr, Prifysgol Abertawe, TÃ…Â· Undeb, Parc Singleton, Abertawe, SA2 8PP<br>Drwy ddefnyddio\'r wefan hon, rydych yn cytuno i ein <a href="/website/cookies/">Polisi Cwci</a>';
	toggleComplexStandingContent(lang, 'Students\' Union, Swansea University', cOHTML, 'Undeb y Myfyrwyr, Prifysgol Abertawe', cDHTML, '#footer .two-column-middle p');
	
	cOHTML = '<div class="two-column-middle"><p><strong>Contact:</strong><br>t: 01792 295466<br>e: <a href="mailto:info@swansea-union.co.uk">info@swansea-union.co.uk</a></p><p><strong>Events &amp; Ticketing:</strong><br>t: 01792 606715<br>e: <a href="mailto:russellwade@swansea-union.co.uk">russellwade@swansea-union.co.uk</a></p><p><strong>PR Contact:</strong><br>t: 01792 602496<br>e: <a href="mailto:hannah.granton@swansea-union.co.uk">hannah.granton@swansea-union.co.uk</a></p></div>';
	cDHTML = '<div class="two-column-middle"><p><strong>Cyswllt:</strong><br>t: 01792 295466<br>e: <a href="mailto:info@swansea-union.co.uk">info@swansea-union.co.uk</a></p><p><strong>Events &amp; Tocynnau:</strong><br>t: 01792 606715<br>e: <a href="mailto:russellwade@swansea-union.co.uk">russellwade@swansea-union.co.uk</a></p><p><strong>CC Gyswllt:</strong><br>t: 01792 602496<br>e: <a href="mailto:hannah.granton@swansea-union.co.uk">hannah.granton@swansea-union.co.uk</a></p></div>';
	toggleComplexStandingContent(lang, '<p><strong>Contact', cOHTML, '<p><strong>Cyswllt', cDHTML, '#footer .two-column-middle');
}

function toggleStandingContent(destination_language, origin_string, destination_string, jQPath){
	var arr = [];
	if (!Array.isArray(jQPath)){
		arr.push(jQPath);
	}
	else{
		arr = jQPath;
	}
	////console.log('destination_language == ' + destination_language);
	if (destination_language == 'english')
	{
		var holder = origin_string;
		origin_string = destination_string;
		destination_string = holder;
	}
	for (x = 0; x < arr.length; x++){
		if (!$(arr[x]).length){
			////console.log('invalid path ' + arr[x]);
		}
		var temp = arr[x] + ':contains(\'' + origin_string + '\')'
		if ($(temp).length){
			////console.log('Persued path ' + jQPath + ', got a hit!');
			$(temp).html(destination_string);
		}
		else
		{
			////console.log('Persued path ' + jQPath + ', replacing ' + origin_string + ' with ' + destination_string + ', got no hits.');
		}
	}
}

function toggleComplexStandingContent(destination_language, origin_string, origin_html, destination_string, destination_html, jQPath){
	if (destination_language == 'english'){
		var holder = origin_string;
		origin_string = destination_string;
		destination_string = holder;
		
		holder = origin_html;
		origin_html = destination_html;
		destination_html = holder;
	}
	$(jQPath).each(function(){
		var j = ($(this).html() + ' ').replace(/\s\s+/g, ' ').trim();
		//console.log('raw jQPath = ' + $(this).html());
		//console.log('modified jQPath = ' + j);
		if (j.indexOf(origin_string) == 0){
			$(this).replaceWith(destination_html);
		}
		else
		{
			////console.log('Persued path ' + jQPath + ', replacing ' + origin_html + ' with ' + destination_html + ', got no hits.');
		}
	});
}

function toggleStandingButtonContent(destination_language, origin_string, destination_string, jQPath){
	if (destination_language == 'english'){
		var holder = origin_string;
		origin_string = destination_string;
		destination_string = holder;
	}
	//jQPath = jQPath + ':contains(\'' + origin_string + '\')'
	if ($(jQPath).attr('value') == origin_string){
		$(jQPath).attr('value', 'destination_string');
	}
	else
	{
		////console.log('!!BUTTON!!');
		////console.log('Persued path ' + jQPath + ', ');
		////console.log('replacing ' + origin_string + ' with ' + destination_string + ', got no hits.');
	}
}

function toggleDateAndTimeComponents(lang, jQPath){
	////console.log('toggleDateAndTimeComponents');
	$(jQPath).each(function(){
		dateWord = [{englishWord: 'Monday', welshWord : 'Dydd Llun'}];
		dateWord.push({englishWord: 'Tuesday', welshWord : 'Dydd Mawrth'});
		dateWord.push({englishWord: 'Wednesday', welshWord : 'Dydd Mercher'});
		dateWord.push({englishWord: 'Thursday', welshWord : 'Dydd Iau'});
		dateWord.push({englishWord: 'Friday', welshWord : 'Dydd Gwener'});
		dateWord.push({englishWord: 'Saturday', welshWord : 'Dydd Sadwrn'});
		dateWord.push({englishWord: 'Sunday', welshWord : 'Dydd Sul'});
		dateWord.push({englishWord: 'Monday,', welshWord : 'Dydd Llun,'});
		dateWord.push({englishWord: 'Tuesday,', welshWord : 'Dydd Mawrth,'});
		dateWord.push({englishWord: 'Wednesday,', welshWord : 'Dydd Mercher,'});
		dateWord.push({englishWord: 'Thursday,', welshWord : 'Dydd Iau,'});
		dateWord.push({englishWord: 'Friday,', welshWord : 'Dydd Gwener,'});
		dateWord.push({englishWord: 'Saturday,', welshWord : 'Dydd Sadwrn,'});
		dateWord.push({englishWord: 'Sunday,', welshWord : 'Dydd Sul.'});
		dateWord.push({englishWord: 'Mon', welshWord : 'Llun'});
		dateWord.push({englishWord: 'Tue', welshWord : 'Maw'});
		dateWord.push({englishWord: 'Wed', welshWord : 'Mer'});
		dateWord.push({englishWord: 'Thu', welshWord : 'Iau'});
		dateWord.push({englishWord: 'Fri', welshWord : 'Gwe'});
		dateWord.push({englishWord: 'Sat', welshWord : 'Sad'});
		dateWord.push({englishWord: 'Sun', welshWord : 'Sul'});
		dateWord.push({englishWord: 'January', welshWord : 'Ionawr'});
		dateWord.push({englishWord: 'February', welshWord : 'Chwefror'});
		dateWord.push({englishWord: 'March', welshWord : 'Mawrth'});
		dateWord.push({englishWord: 'April', welshWord : 'Ebrill'});
		dateWord.push({englishWord: 'May', welshWord : 'Mai'});
		dateWord.push({englishWord: 'June', welshWord : 'Mehefin'});
		dateWord.push({englishWord: 'July', welshWord : 'Gorffennaf'});
		dateWord.push({englishWord: 'August', welshWord : 'Awst'});
		dateWord.push({englishWord: 'September', welshWord : 'Medi'});
		dateWord.push({englishWord: 'October', welshWord : 'Hydref'});
		dateWord.push({englishWord: 'November', welshWord : 'Tachwedd'});
		dateWord.push({englishWord: 'December', welshWord : 'Rhagfyr'});
		dateWord.push({englishWord: 'Jan', welshWord : 'Ion'});
		dateWord.push({englishWord: 'Feb', welshWord : 'Chwef'});
		dateWord.push({englishWord: 'Mar', welshWord : 'Maw'});
		dateWord.push({englishWord: 'Apr', welshWord : 'Ebr'});
		dateWord.push({englishWord: 'May', welshWord : 'Mai'});
		dateWord.push({englishWord: 'Jun', welshWord : 'Meh'});
		dateWord.push({englishWord: 'Jul', welshWord : 'Gorff'});
		dateWord.push({englishWord: 'Aug', welshWord : 'Awst'});
		dateWord.push({englishWord: 'Sep', welshWord : 'Medi'});
		dateWord.push({englishWord: 'Sept', welshWord : 'Medi'});
		dateWord.push({englishWord: 'Oct', welshWord : 'Hyd'});
		dateWord.push({englishWord: 'Nov', welshWord : 'Tach'});
		/*
		 * Hard-coding this caused me physical pain. The alternative was more wasted time 
		 * and a lengthy attempt to replicate regex lookbehind in javascript/ jQuery. Sorry.
		 * -PH
		 */
		dateWord.push({englishWord: '1st', welshWord : '1af'});
		dateWord.push({englishWord: '2nd', welshWord : '2il'});
		dateWord.push({englishWord: '3rd', welshWord : '3ydd'});
		dateWord.push({englishWord: '4th', welshWord : '4ydd'});
		dateWord.push({englishWord: '5th', welshWord : '5ydd'});
		dateWord.push({englishWord: '6th', welshWord : '6ydd'});
		dateWord.push({englishWord: '7th', welshWord : '7ydd'});
		dateWord.push({englishWord: '8th', welshWord : '8ydd'});
		dateWord.push({englishWord: '9th', welshWord : '9ydd'});
		dateWord.push({englishWord: '10th', welshWord : '10ydd'});
		dateWord.push({englishWord: '11th', welshWord : '11ydd'});
		dateWord.push({englishWord: '12th', welshWord : '12ydd'});
		dateWord.push({englishWord: '13th', welshWord : '13ydd'});
		dateWord.push({englishWord: '14th', welshWord : '14ydd'});
		dateWord.push({englishWord: '15th', welshWord : '15ydd'});
		dateWord.push({englishWord: '16th', welshWord : '16ydd'});
		dateWord.push({englishWord: '17th', welshWord : '17ydd'});
		dateWord.push({englishWord: '18th', welshWord : '18ydd'});
		dateWord.push({englishWord: '19th', welshWord : '19ydd'});
		dateWord.push({englishWord: '20th', welshWord : '20ydd'});
		dateWord.push({englishWord: '21st', welshWord : '21af'});
		dateWord.push({englishWord: '22nd', welshWord : '22il'});
		dateWord.push({englishWord: '23rd', welshWord : '23ydd'});
		dateWord.push({englishWord: '24th', welshWord : '24ydd'});
		dateWord.push({englishWord: '25th', welshWord : '25ydd'});
		dateWord.push({englishWord: '26th', welshWord : '26ydd'});
		dateWord.push({englishWord: '27th', welshWord : '27ydd'});
		dateWord.push({englishWord: '28th', welshWord : '28ydd'});
		dateWord.push({englishWord: '29th', welshWord : '29ydd'});
		dateWord.push({englishWord: '30th', welshWord : '30ydd'});
		dateWord.push({englishWord: '31st', welshWord : '31af'});
		
		dateWord.push({englishWord: 'year', welshWord : 'blwyddyn'});
		dateWord.push({englishWord: 'years', welshWord : 'blynedd'});
		dateWord.push({englishWord: 'yr', welshWord : 'blwyddyn'});
		dateWord.push({englishWord: 'yrs', welshWord : 'blynedd'});
		dateWord.push({englishWord: 'month', welshWord : 'mis'});
		dateWord.push({englishWord: 'months', welshWord : 'mis'});
		dateWord.push({englishWord: 'hours', welshWord : 'oriau'});
		dateWord.push({englishWord: 'hrs', welshWord : 'oriau'});
		dateWord.push({englishWord: 'hour', welshWord : 'awr'});
		dateWord.push({englishWord: 'hr', welshWord : 'awr'});
		dateWord.push({englishWord: 'minutes', welshWord : 'cofnodion'});
		dateWord.push({englishWord: 'mins', welshWord : 'munud'});
		dateWord.push({englishWord: 'minute', welshWord : 'munud'});
		dateWord.push({englishWord: 'mins', welshWord : 'munud'});
		dateWord.push({englishWord: 'ago', welshWord : 'yn ÃƒÂ´l'});
		
		var inputString = $(this).html().trim();
		var stringChunks = inputString.split(' ');
		for (x = 0; x < stringChunks.length; x++){
			for (y = 0; y < dateWord.length; y++){
				if ((lang == 'cy') && (dateWord[y].englishWord == stringChunks[x].trim()))
				{
					stringChunks[x] = dateWord[y].welshWord;
				}
				if ((lang == 'english') && (dateWord[y].welshWord == stringChunks[x].trim()))
				{
					stringChunks[x] = dateWord[y].englishWord;
				}
				
			}
		}
		inputString = '';
		for (x = 0; x < stringChunks.length; x++){
			inputString = inputString.concat(stringChunks[x] + ' ');
		}
		inputString.trim();
		$(this).html(inputString);
	});
}