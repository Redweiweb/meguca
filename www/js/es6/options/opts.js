'use strict';System.register(['js-cookie','../util','../state','lang'],function(_export,_context){var Cookie,thumbStyles,resonableLastN,parseEl,config,isMobile,langApplied;return {setters:[function(_jsCookie){Cookie=_jsCookie;},function(_util){thumbStyles=_util.thumbStyles;resonableLastN=_util.resonableLastN;parseEl=_util.parseEl;},function(_state){config=_state.config;isMobile=_state.isMobile;},function(_lang){langApplied=_lang.langApplied;}],execute:function(){const notMobile=!isMobile;const opts=[{id:'lang',type:config.lang.enabled,tab:0,default:config.lang.default,execOnStart:false,exec(type){alert(langApplied);location.reload();}},{id:'inlinefit',type:['none','full','width','height','both'],tab:1,default:'width'},{id:'thumbs',type:thumbStyles,tab:1,default:'small'},{id:'imageHover',default:true,load:notMobile,tab:0},{id:'webmHover',load:notMobile,tab:0},{id:'autogif',load:notMobile,tab:1},{id:'spoilers',tab:1,default:true},{id:'linkify',tab:0,default:true},{id:'notification',load:notMobile,tab:0,exec(notifToggle){if(notifToggle&&Notification.permission!=="granted")Notification.requestPermission();}},{id:'anonymise',tab:0},{id:'relativeTime',tab:0,default:true},{id:'nowPlaying',load:notMobile&&config.radio,tab:3,default:true,exec(toggle){if(toggle){send({type:'radio'});}else {}}},{id:'illyaBGToggle',load:notMobile&&config.illyaDance,tab:3},{id:'illyaMuteToggle',load:notMobile&&config.illyaDance,tab:3},{id:'horizontalPosting',tab:3,exec:toggleHeadStyle('horizontal','article,aside{display:inline-block;}')},{id:'replyright',tab:1,exec:toggleHeadStyle('reply-at-right','section>aside{margin: -26px 0 2px auto;}')},{id:'theme',type:['moe','gar','mawaru','moon','ashita','console','tea','higan','ocean','rave','tavern','glass'],tab:1,default:config.defaultCSS,execOnStart:false,exec(theme){if(!theme){return;}document.getElementById('theme').setAttribute('href',`/ass/css/${ theme }.css`);}},{id:'userBG',load:notMobile,tab:1},{id:'userBGimage',load:notMobile,type:'image',tab:1,execOnStart:false,exec(upload){}},{id:'lastn',type:'number',tab:0,validation:resonableLastN,default:100},{id:'alwaysLock',tab:0}];for(let engine of ['google','iqdb','saucenao','desustorage','exhentai']){opts.push({id:engine,lang:'imageSearch',tab:2,default:engine==='google',exec:toggleHeadStyle(engine+'Toggle',`.${ engine }{display:initial;}`)});}const shorts=[{id:'new',default:78},{id:'togglespoiler',default:73},{id:'textSpoiler',default:68},{id:'done',default:83},{id:'expandAll',default:69},{id:'workMode',default:66}];for(let short of shorts){short.type='shortcut';short.tab=4;short.load=notMobile;opts.push(short);}function toggleHeadStyle(id,css){return toggle => {if(!document.getElementById(id)){document.head.appendChild(parseEl(`<style id="${ id }">${ css }</style>`));}document.getElementById(id).disabled=!toggle;};}_export('default',opts);}};});
//# sourceMappingURL=../maps/options/opts.js.map
