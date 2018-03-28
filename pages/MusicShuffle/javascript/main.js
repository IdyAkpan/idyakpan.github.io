/*

PARKING LOT OF ISSUES

> last song doesn't pause when next song starts playing

>Add to playlist button didn't inherit CSS design

> this error:

                widget-ca420f6-24beb581.js:12 GET https://api-widget.soundcloud.com/audio-ad?track_id=314764197&disgraceful=false&format=json&client_id=Iy5e1Ri4GTNgrafaXe4mLpmJLXbXEfBR&app_version=1522061011

                net::ERR_BLOCKED_BY_CLIENT

 

 

 

                */


// recognize the query on click enter or submit

document.querySelector(".js-submit").addEventListener('click',function(){

 

                var input = document.querySelector("input").value;

  //console.log(input);

  pushToDOM(input);

 

});

 

document.querySelector(".input-search").addEventListener('keyup',function(e){

 

                var input = document.querySelector("input").value;

                if(e.which === 13) {

                                pushToDOM(input);

                };

 

});

 

var SoundCloudAPI = {};

 

SoundCloudAPI.init = function (){

 

                SC.initialize({

                                client_id: 'cd9be64eeb32d1741c17cb39e41d254d'

                });

 

};

 

 

SoundCloudAPI.init();

 

SoundCloudAPI.getTrack = function(inputValue){

                                // find all sounds of buskers licensed under 'creative commons share alike'

                                SC.get('/tracks', {

                                                q: inputValue

                                }).then(function(tracks) {

                                                console.log(tracks);

                                                SoundCloudAPI.renderTracks(tracks);

                                });

 

                };

 

// push the query to the DOM

function pushToDOM(input) {

                SoundCloudAPI.getTrack(input); //this is the issue

};

 

SoundCloudAPI.renderTracks = function(tracks) {

 

                var searchResults = document.querySelector('.js-search-results');

                searchResults.innerHTML = "";

               

                tracks.forEach(function(track){

 

                // card

                var card = document.createElement('div');

                card.classList.add('card');

 

                //image

                var imageDiv = document.createElement("div");

                imageDiv.classList.add('image');

 

                var image_img = document.createElement('img');

                image_img.classList.add('image_img');

                image_img.src=track.artwork_url || 'https://i.pinimg.com/736x/df/b4/3f/dfb43f50abdac4a0f456f2bad34b48b1--gerhard-richter-colourful-art.jpg';

                imageDiv.appendChild(image_img);

 

                //content

                var content = document.createElement('div');

                content.classList.add('content');

 

                var header = document.createElement('div');

                content.classList.add('header');

                header.innerHTML=`<a href ="${track.permalink_url}" target="_blank"> ${track.title}</a>`;

               

                //button

                var button = document.createElement('div');

                content.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

               
               var atp = document.createElement('div2');

                content.classList.add('addtp');

                //icon

                var icon = document.createElement('i');

                content.classList.add('add', 'icon');

               

                var buttonText = document.createElement('span');

                buttonText.innerHTML="<a href = '#'>Add to playlist</a>";
                

 

 

                //create all

                // appendChild;

                
                content.appendChild(header);

                button.appendChild(icon);


                button.appendChild(buttonText);
                button.appendChild(atp);

 

                button.addEventListener("click", function(){

                                SoundCloudAPI.getEmbed(track.permalink_url);

                });

 

                card.appendChild(imageDiv);

                card.appendChild(content);

                card.appendChild(button);

 

                // results

               

                searchResults.appendChild(card);

 

});

 

 

 

 

                };

 

 

//SoundCloudAPI.renderTracks();

 

 

// 3. display the cards

 

 

 

//4. add to playlist & play

 

SoundCloudAPI.getEmbed = function(trackURL){

 

                SC.oEmbed(trackURL, {

  auto_play: true

}).then(function(embed){

                console.log('oEmbed response: ', embed);

                var sideBar = document.querySelector('.col-left', 'js-playlist');

                console.log(sideBar);

 

                var box = document.createElement('div');

                box.innerHTML= embed.html;

 

                sideBar.insertBefore(box, sideBar.firstChild);

                localStorage.setItem("key", sideBar.innerHTML);

               

});

 

};

 

 

var sideBar = document.querySelector('.js-playlist');

sideBar.innerHTML = localStorage.getItem("key");

 