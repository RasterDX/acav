rootUrl = 'http://localhost:3000';
submitURL = 'http://localhost:3005';
add_button = document.getElementById('add-term_button');
search_form = document.getElementsByClassName("searchbar")[0];
placeholder_is_hidden = 0;
number_of_terms = 0;

pickedInputs = [];
colors = ['#e288ac', '#4c8fbd', '#7ea461', '#8ea1cc', '#c84a28'];

function getAgeDemographicString(youthPreference, seniorPreference) {
     if (youthPreference > seniorPreference) {
         return `Younger demographics (<35) <i>are more likely</i> to enjoy this record.`;
     } else {
         return `Older demographics (35>) <i>are more likely</i> to enjoy this record.`;
     }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function checkErrors(){

}

function render(htmlContent) {
    document.querySelector(".content").innerHTML = htmlContent;
}

function setLoading(status = false) {
    
}

(function() {
    setLoading(true);
    fetch(rootUrl + '/index')
    .then(response => response.text())
    .then(data =>{ render(data); })
})()

add_button.addEventListener('click', function(){
    var placeholder = document.getElementById("placeholder");
    var newDiv = document.createElement('div');
    var div_class = document.createAttribute('class');
    div_class.value = 'querry-option'
    newDiv.setAttributeNode(div_class);

    var text = document.createTextNode(capitalizeFirstLetter(String(document.getElementById("select-categories").value)));

    var button = document.createElement('button');
    var type = document.createAttribute('type');
    type.value = 'button';
    button.setAttributeNode(type);
    button.addEventListener('click', function(){
        button.parentNode.remove();
        number_of_terms--;
        if (number_of_terms == 0){
            placeholder_is_hidden = 0;
            placeholder.setAttribute("style", "display: flex");
        }
    });

    var icon = document.createElement('i');
    var icon_class = document.createAttribute('class');
    icon_class.value = 'fa fa-close';
    icon.setAttributeNode(icon_class);
    button.appendChild(icon);    

    var textarea = document.createElement("input");
    var text_type = document.createAttribute('type');
    text_type.value = 'text';
    textarea.setAttributeNode(text_type);

    document.getElementsByClassName("searchbar")[0].prepend(newDiv);
    newDiv.appendChild(text);
    newDiv.appendChild(textarea);
    newDiv.appendChild(button);
    if (placeholder_is_hidden == 0){
        placeholder_is_hidden = 1;
        placeholder.setAttribute("style", "display: none");
    }
    number_of_terms ++;
})

search_form.addEventListener('submit', function(e){
    e.preventDefault();
    
    const JSON_to_send = {};
    var children = Array.from(document.getElementsByClassName("searchbar")[0].childNodes)

    children.forEach(function (item, index) {
        if(item.className == "querry-option"){
            //TODO
            checkErrors();
            if(item.childNodes[0].data == "Region"){
                if(!JSON_to_send.region){
                    JSON_to_send['region'] = [String(item.childNodes[1].value)];
                }
                else
                JSON_to_send['region'].push(String(item.childNodes[1].value));
            }
            if(item.childNodes[0].data == "Song" && !JSON_to_send['song']){
                JSON_to_send['song'] = String(item.childNodes[1].value);
            }
            if(item.childNodes[0].data == "Artist" && !JSON_to_send['artists']){
                if(!JSON_to_send.artists){
                    JSON_to_send['artists'] = [String(item.childNodes[1].value)];
                }
                else
                JSON_to_send['artists'].push(String(item.childNodes[1].value));
            }
            if(item.childNodes[0].data == "Album" && !JSON_to_send['album']){
                JSON_to_send['album'] = String(item.childNodes[1].value);
            }
        }
    })

    fetch(submitURL, {
        method: 'POST',
        body: JSON.stringify(JSON_to_send),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(response => {
        response.data.forEach((dataPair) => {
            dataPair.country = countryMapper[dataPair.country];
        });
        for (let i=0; i<response.searchQuery.region.length; i++) {
            response.searchQuery.region[i] = countryMapper[response.searchQuery.region[i]];
        }
        plot(response);
        console.log(response);
        const artContainer = document.querySelector('.artwork');
        artContainer.style.backgroundImage = `url(${response.features.artwork.url})`
        const resultsContainer = document.querySelector('.info');
        while (resultsContainer.firstChild) {
            resultsContainer.removeChild(resultsContainer.firstChild);
        }
        const recordTitle = document.createElement('h1');
        recordTitle.innerHTML = response.features.name;
        resultsContainer.appendChild(recordTitle);
        const artistName = document.createElement('h2');
        artistName.innerHTML = response.features.artist;
        resultsContainer.appendChild(artistName);
        const albumTitle = document.createElement('h2');
        albumTitle.innerHTML = response.features.album;
        resultsContainer.appendChild(albumTitle);

        response.features.genres.forEach(genre => {
            const genreSpan = document.createElement('span');
            genreSpan.innerHTML = genre;
            genreSpan.style.background = colors[Math.floor(Math.random() * colors.length)]
            document.querySelector(".genre-pool").appendChild(genreSpan);
        });

        const demoDiv = document.querySelector("#demoline");
        const demoParagraph = document.createElement('p');
        demoParagraph.innerHTML = getAgeDemographicString(response.youthPreference, response.seniorPreference);
        demoDiv.appendChild(demoParagraph);

        const youthPreference = response.youthPreference;
        const seniorPreference = response.seniorPreference;

        document.querySelector('#youthpref').innerHTML = `${youthPreference > 1 ? 100 : youthPreference.toFixed(2)}% of Youths (<35) are likely to enjoy this song.`;
        document.querySelector('#seniorpref').innerHTML = `${seniorPreference > 1 ? 100 : seniorPreference.toFixed(2)}% of Seniors and Middle Aged people (>35) are likely to enjoy this song.`;


        const similarTracksDiv = document.querySelector("#similartracks");
        response.features.similarTracks.items.forEach((item) => {
            const trackDiv = document.createElement('div');
            const trackImg = document.createElement('img');
            trackImg.src = response.features.artwork.url;
            trackImg.style.width = '150px';
            trackImg.style.height = '150px';
            trackDiv.style.display = 'flex';
            trackDiv.style.flexFlow = 'column';
            trackDiv.style.justifyContent = 'center';
            trackDiv.style.flexWrap = 'wrap';
            trackDiv.appendChild(trackImg);
            const trackTitle = document.createElement('p');
            trackTitle.style.textOverflow = 'elipsis';
            trackTitle.style.whiteSpace = 'nowrap';
            trackTitle.style.overflow = 'hidden';
            trackTitle.style.width = '140px';

            trackTitle.innerHTML = `<b>${item.track_number}. ${item.name}</b>`;
            trackDiv.appendChild(trackTitle);
            similarTracksDiv.appendChild(trackDiv);
        });

    }).catch(error => {console.error(error)});
});