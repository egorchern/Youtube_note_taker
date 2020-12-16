"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _wrapRegExp(e,t){_wrapRegExp=function(e,t){return new n(e,void 0,t)};var a=_wrapNativeSuper(RegExp),i=RegExp.prototype,r=new WeakMap;function n(e,t,n){var o=a.call(this,e,t);return r.set(o,n||r.get(e)),o}function l(n,e){var o=r.get(e);return Object.keys(o).reduce(function(e,t){return e[t]=n[o[t]],e},Object.create(null))}return _inherits(n,a),n.prototype.exec=function(e){var t=i.exec.call(this,e);return t&&(t.groups=l(t,this)),t},n.prototype[Symbol.replace]=function(e,t){if("string"==typeof t){var n=r.get(this);return i[Symbol.replace].call(this,e,t.replace(/\$<([^>]+)>/g,function(e,t){return"$"+n[t]}))}if("function"!=typeof t)return i[Symbol.replace].call(this,e,t);var o=this;return i[Symbol.replace].call(this,e,function(){var e=[];return e.push.apply(e,arguments),"object"!==_typeof(e[e.length-1])&&e.push(l(e,o)),t.apply(this,e)})},_wrapRegExp.apply(this,arguments)}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _possibleConstructorReturn(e,t){return!t||"object"!==_typeof(t)&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _wrapNativeSuper(e){var n="function"==typeof Map?new Map:void 0;return(_wrapNativeSuper=function(e){if(null===e||!_isNativeFunction(e))return e;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==n){if(n.has(e))return n.get(e);n.set(e,t)}function t(){return _construct(e,arguments,_getPrototypeOf(this).constructor)}return t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),_setPrototypeOf(t,e)})(e)}function isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}function _construct(e,t,n){return(_construct=isNativeReflectConstruct()?Reflect.construct:function(e,t,n){var o=[null];o.push.apply(o,t);var a=new(Function.bind.apply(e,o));return n&&_setPrototypeOf(a,n.prototype),a}).apply(null,arguments)}function _isNativeFunction(e){return-1!==Function.toString.call(e).indexOf("[native code]")}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var nav_float_state,all_notes_data,current_note,player,player_time_interval,current_note_index_displayed=-1,selected_indexes=[],times_to_display=[],selected_dom_note_id="",interval_before_opacity=150,appear_animation_time="0.5s";function $(e){return document.querySelector(e)}function $all(e){return document.querySelectorAll(e)}var note=function e(t,n){_classCallCheck(this,e),this.note_heading_name=t,this.youtube_id=n,this.video_time=0,this.notes_text_array=[],this.notes_time_array=[],this.current_text=""};function import_notes_data(){load_help_page();var e=document.createElement("input");e.setAttribute("type","file"),e.setAttribute("id","file_dialog"),e.style.display="none",e.onchange=function(){this.files[0].text().then(function(e){try{var t=JSON.parse(e),n=t[0],o=Object.keys(n);!0===o.includes("note_heading_name")&&!0===o.includes("youtube_id")&&!0===o.includes("video_time")&&o.includes("notes_text_array")&&!0===o.includes("notes_time_array")&&!0===o.includes("current_text")?(all_notes_data=t,set_notes_data(),add_notes_to_nav()):alert("File corrupted, some headings missing.")}catch(e){alert("Selected file is not supported by this webpage. Please only select the file that you have previously exported from this page.")}})},document.body.appendChild(e),e.click()}function export_notes_data(){load_help_page();var e=JSON.stringify(all_notes_data,null,"\t"),t=document.createElement("a");t.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(e)),t.setAttribute("download","YTNote_data.txt"),t.style.display="none",document.body.appendChild(t),t.click(),document.body.removeChild(t)}function bind_appear_animation(e){var t=$(e);t.style.animationName="appear",t.style.animationDuration=appear_animation_time,t.style.animationFillMode="forwards"}function get_notes_data(){var e=localStorage.getItem("all_notes_data");return null===e&&(e="[]"),e=JSON.parse(e)}function add_notes_data(e){null!=all_notes_data?all_notes_data.push(e):all_notes_data=[e]}function set_notes_data(){var e=JSON.stringify(all_notes_data);localStorage.setItem("all_notes_data",e)}function extract_youtube_id(e){var t=e.match(_wrapRegExp(/^https:\/\/www\.youtube\.com\/watch\?v=([\0->@-\uFFFF]+)/,{id:1}));return null!=t?t[1]:null}function add_new_note(){var e,t=$("#search_input").value,n=$("#heading_input").value;""!=t&&""!=n?null!=(e=extract_youtube_id(t))?(add_notes_data(new note(n,e)),set_notes_data(),$("#add_modall").style.display="none",add_notes_to_nav()):alert("Invalid link inputted. Only input a valid youtube link such as: https://www.youtube.com/watch?v=uE1QkcG1-AM"):alert("Some fields were left empty. Please fill all of the fields.")}function get_user_preffered_float(){var e=localStorage.getItem("preffered_nav_float");return null!=e?e:(localStorage.setItem("preffered_nav_float","right"),e="right")}function set_user_preffered_float(e){localStorage.setItem("preffered_nav_float",e)}function add_notes_to_nav(){for(var e=$("#notes_container").innerHTML="",t=0;t<all_notes_data.length;t+=1){var n=all_notes_data[t];e+='\n        <div class="note nav_item" id="note_'.concat(t,'">\n            <span>').concat(n.note_heading_name,"</span>\n            \n        </div>\n        ")}e+='\n    <div class="nav_item" id="note_add_new">\n        <svg viewBox="0 0 16 16" class="bi bi-journal-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>\n            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>\n            <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"/>\n        </svg>\n        <span>Add new</span>\n    </div>\n    ',e+='\n    <div class="nav_item" id="note_delete">\n        <svg viewBox="0 0 16 16" class="bi bi-journal-minus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>\n            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>\n            <path fill-rule="evenodd" d="M5.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"/>\n        </svg>\n        <span>Delete</span>\n    </div>\n    ',$("#notes_container").innerHTML=e,bind_events_on_nav()}function add_notes_to_delete_menu(){for(var e=$("#notes_to_delete_container").innerHTML="",t=0;t<all_notes_data.length;t+=1){var n=all_notes_data[t];e+='\n        <div class="note_to_delete nav_item" id="note_delete_'.concat(t,'">\n            <span>').concat(n.note_heading_name,"</span>\n            \n        </div>\n        ")}$("#notes_to_delete_container").innerHTML=e}function delete_notes_at_indexes(e){for(var t=[],n=0;n<all_notes_data.length;n+=1)!1===e.includes(n)&&t.push(all_notes_data[n]);all_notes_data=t}function save_current_note(){var e=$("#note_input").value;current_note.current_text=e,current_note.video_time=player.getCurrentTime(),all_notes_data[current_note_index_displayed]=current_note,set_notes_data()}function remove_note_instance_from_current(e){current_note.notes_text_array.splice(e,1),current_note.notes_time_array.splice(e,1),times_to_display.splice(e,1),add_notes_to_main()}function load_help_page(){-1!=current_note_index_displayed&&save_current_note(),current_note=null,current_note_index_displayed=-1;$("#player_container").style.overflow="auto",$("#player_container").innerHTML='\n    <div id="player_div" style="display:flex; flex-flow: column; align-items: center; overflow:auto; opacity:0">\n        <p>To create a note-project, click on "Notes" button in the navigation menu and then click on "Add new" button. In the menu displayed, please enter a heading name for your note-project and a youtube link. After that, press "Create" button.</p>\n        <p>To open a specific note-project, click on "Notes" button in the navigation menu and then click on the individual note-project that you want to open. They will have the same name, as the one you inputted in the note-project creating menu.</p>\n        <p>To delete one or more note-projects, click on "Notes" button in the navigation menu and then click on the "Delete" button. In the menu displayed, click on note-project(s) that you want to delete. Then press "Delete button". This process is irreversible, and if you have not exported your data before doing this, notes for those specific note-projects that you selected will be lost! </p>\n        <p>This webpage utilizes LocalStorage to store all the data. Please note that cleaning browser\'s cache might erase the localStorage, but it depends on the browser. LocalStorage is unique to every browser, so you will not see any notes made when visiting this website from a different browser. You can export your data by clicking "Export" button in the navigation menu, this would let you download your notes data in JSON. You can then Import note data by pressing the "Import" button in the navigation Menu</p>\n        <p>You can exit or reload the page whenever you need to. All of the data (video time, currently typed text and notes) will be saved automatically</p>\n        <p>After launching a note-project, YouTube video will be here</p>\n        <img src="Images/video_pic.webp" style="max-width:95%">\n    </div>\n    ',$("#notes_div").innerHTML='\n    <div id="notes_body_container" style="display:flex; flex-flow: column; align-items: center; overflow:auto; opacity:0">\n        <p>Your notes will be here</p>\n        <img src="Images/note_pic.webp" style="max-width:95%">\n    </div>\n    ',$("#input_div").innerHTML='\n    <div id="input_container" style="display:flex; flex-flow: column; align-items: center; overflow:auto; opacity:0">\n        <p>You will be able to type a note here</p>\n        <img src="Images/input_pic.webp" style="max-width:95%">\n    </div>\n    '}function add_notes_to_main(){$("#notes_div").innerHTML='\n    <div id="notes_body_container">\n\n    </div>\n    ';for(var e="",t=0;t<current_note.notes_text_array.length;t+=1)e+='\n        <div class="individual_note" id="main_note_'.concat(t,'" style="position:relative">\n            <img src="Images/delete_icon.webp" class="delete_main_note_btn" title="delete this note">\n            <div>\n                <span class="individual_note_time">\n                    [').concat(times_to_display[t],']\n                </span>\n            </div>\n            <div style="margin-top:4px;">\n                <span class="individual_note_text">\n                    ').concat(current_note.notes_text_array[t],"\n                </span>\n            </div>\n            \n        </div>\n        ");$("#notes_body_container").innerHTML=e,$all(".individual_note").forEach(function(n){n.onclick=function(e){$all(".individual_note").forEach(function(e){e.classList.remove("selected"),$("#"+e.id+" .delete_main_note_btn").style.display="none"}),n.classList.toggle("selected");var t=_wrapRegExp(/main_note_([0-9]+)/,{index:1}).exec(n.id).groups.index,t=Number(t);player.seekTo(current_note.notes_time_array[t]),$("#"+n.id+" .delete_main_note_btn").style.display="inline",selected_dom_note_id=n.id}}),$all(".delete_main_note_btn").forEach(function(e){e.onclick=function(e){e.stopPropagation();var t=_wrapRegExp(/main_note_([0-9]+)/,{index:1}).exec(selected_dom_note_id).groups.index;remove_note_instance_from_current(t=Number(t))}})}function load_note(e){var t=_wrapRegExp(/note_([0-9]+)/,{index:1}).exec(e).groups.index;(t=Number(t))!=current_note_index_displayed&&(-1!=current_note_index_displayed&&save_current_note(),$("#player_container").style.overflow="unset",current_note=all_notes_data[current_note_index_displayed=t],compile_times_to_display(),add_notes_to_main(),player=null,$("#input_div").innerHTML='\n        <div id="input_container"style="opacity:0; display:flex; flex-direction:column; height:100%;" >\n            <textarea id="note_input"></textarea>\n            <div id="controls_container">\n                <div id="submit_note">\n                    <svg viewBox="0 0 16 16" class="bi bi-box-arrow-in-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n                        <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>\n                        <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>\n                    </svg>\n                </div>\n            </div>\n        </div>\n        ',$("#note_input").value=current_note.current_text,$("#notes_body_container").style.opacity="0",$("#submit_note").onclick=record_note,$("#player_container").innerHTML='\n        <div id="player_div">\n\n        </div>\n        ',$("#player_div").style.opacity="0",window.YT.ready(function(){var e;player=new YT.Player("player_div",(_defineProperty(e={height:"1",width:"1",videoId:current_note.youtube_id,playerVars:{autoplay:1,controls:1,autohide:1,wmode:"opaque"},autoplay:0},"autoplay","0"),_defineProperty(e,"autoplay","false"),_defineProperty(e,"autoplay",!1),_defineProperty(e,"events",{onReady:function(){player.seekTo(current_note.video_time),player.playVideo(),setTimeout(function(){player.pauseVideo()},100)},onStateChange:function(e){0===e.data&&player.seekTo(0)}}),e))}),window.onbeforeunload=function(){return-1!=current_note_index_displayed&&save_current_note(),null})}function convert_seconds_to_time(e){var t=Math.floor(Number(e)),n=Math.floor(t/60),o=Math.floor(n/60);n%=60,t%=60;var a="";return o<10&&(a+="0"),a+=String(o),a+=":",n<10&&(a+="0"),a+=String(n),a+=":",t<10&&(a+="0"),a+=String(t)}function sort_current_note_arrays(){for(var e=current_note.notes_text_array,t=current_note.notes_time_array,n=times_to_display,o=0;o<t.length;o+=1)for(var a,i,r,l=0;l<t.length-o-1;l+=1){t[l]>t[l+1]&&(a=t[l],t[l]=t[l+1],t[l+1]=a,i=e[l],e[l]=e[l+1],e[l+1]=i,r=n[l],n[l]=n[l+1],n[l+1]=r)}current_note.notes_text_array=e,current_note.notes_time_array=t,times_to_display=n}function compile_times_to_display(){times_to_display=[];for(var e=0;e<current_note.notes_text_array.length;e+=1){var t=convert_seconds_to_time(current_note.notes_time_array[e]);times_to_display.push(t)}}function record_note(){var e,t,n=$("#note_input").value;""!=n?(current_note.current_text=n,e=player.getCurrentTime(),current_note.notes_text_array.push(current_note.current_text),current_note.notes_time_array.push(e),t=convert_seconds_to_time(e),times_to_display.push(t),sort_current_note_arrays(),add_notes_to_main(),$("#note_input").value=""):alert("Can't save empty note!")}function bind_events_on_nav(){$("#expand_nav_btn").onclick=function(){$("nav").classList.toggle("collapsed")},$("#collapse_nav_btn").onclick=function(){$("nav").classList.toggle("collapsed")},$("#nav_float_left").onclick=function(){$("nav").classList.toggle("float_left"),$("nav").classList.toggle("float_right"),set_user_preffered_float(nav_float_state="left"),$("#collapse_nav_btn").id="expand_nav_btn",$("#expand_nav_btn").id="collapse_nav_btn"},$("#nav_float_right").onclick=function(){$("nav").classList.toggle("float_left"),$("nav").classList.toggle("float_right"),set_user_preffered_float(nav_float_state="right"),$("#expand_nav_btn").id="collapse_nav_btn",$("#collapse_nav_btn").id="expand_nav_btn"},$("#expand_notes").onclick=function(e){$("#notes_container").classList.toggle("shown")},$("#note_add_new").onclick=function(e){$("#add_modall").style.display="flex"},$("#create_note_btn").onclick=function(){add_new_note()},$("#note_delete").onclick=function(){load_help_page(),add_notes_to_delete_menu(),selected_indexes=[],$("#delete_modall").style.display="flex",document.querySelectorAll(".note_to_delete").forEach(function(n){n.onclick=function(){var e,t=_wrapRegExp(/note_delete_([0-9]+)/,{index:1}).exec(n.id).groups.index,t=Number(t);!0===n.classList.contains("selected")?(e=selected_indexes.findIndex(function(e){}),selected_indexes.splice(e,1)):selected_indexes.push(t),n.classList.toggle("selected")}})},$("#delete_notes_btn").onclick=function(){0===selected_indexes.length?alert("No notes are selected to be deleated. Please select notes to delete by clicking on them, or close the delete window."):(delete_notes_at_indexes(selected_indexes),set_notes_data(),add_notes_to_nav(),$("#delete_modall").style.display="none")},$("#export_btn").onclick=export_notes_data,$("#import_btn").onclick=import_notes_data,$("#help_page_btn").onclick=function(){load_help_page()},$all(".note").forEach(function(e){e.onclick=function(){load_note(e.id)}})}function init(){var e=get_user_preffered_float();"left"===(nav_float_state="left"===e?($("nav").classList.toggle("float_left"),"left"):($("nav").classList.toggle("float_right"),"right"))&&($("#collapse_nav_btn").id="expand_nav_btn",$("#expand_nav_btn").id="collapse_nav_btn"),document.querySelectorAll(".close_modall").forEach(function(t){t.onclick=function(e){t.parentElement.style.display="none"}}),all_notes_data=get_notes_data(),add_notes_to_nav(),load_help_page(),$("#body_wrapper").style.visibility="visible"}document.addEventListener("DOMContentLoaded",function(e){init()});