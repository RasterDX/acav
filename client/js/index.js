rootUrl = 'http://localhost:3000';
submitURL = 'http://localhost:3005';
add_button = document.getElementById('add-term_button');
search_form = document.getElementsByClassName("searchbar")[0];
placeholder_is_hidden = 0;
number_of_terms = 0;

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

// (function() {
//     setLoading(true);
//     fetch(rootUrl + '/index')
//     .then(response => response.text())
//     .then(data =>{ render(data); })
// })()

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
            if(item.childNodes[0].data == "Genre"){
                    JSON_to_send['genre'] = String(item.childNodes[1].value);
            }
            if(item.childNodes[0].data == "Region"){
                if(!JSON_to_send.region){
                    JSON_to_send['region'] = [String(item.childNodes[1].value)];
                }
                else
                JSON_to_send['region'].push(String(item.childNodes[1].value));
            }
            if(item.childNodes[0].data == "Start period"){
                JSON_to_send['startPeriod'] = Date(String(item.childNodes[1].value));
            }
            if(item.childNodes[0].data == "End period"){
                JSON_to_send['endPeriod'] = Date(String(item.childNodes[1].value));
            }
            if(item.childNodes[0].data == "Song"){
                JSON_to_send['song'] = String(item.childNodes[1].value);
            }
            if(item.childNodes[0].data == "Artist"){
                if(!JSON_to_send.artists){
                    JSON_to_send['artists'] = [String(item.childNodes[1].value)];
                }
                else
                JSON_to_send['artists'].push(String(item.childNodes[1].value));
            }
            if(item.childNodes[0].data == "Album"){
                JSON_to_send['album'] = String(item.childNodes[1].value);
            }
            if(item.childNodes[0].data == "Artist country"){
                JSON_to_send['artistCountry'] = String(item.childNodes[1].value);
            }
        }
    })
    fetch(submitURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(JSON_to_send)
      }).then(function(response){

      });
})