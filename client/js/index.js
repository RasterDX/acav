rootUrl = 'http://localhost:3000';
add_button = document.getElementById('add-term_button');

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
    var newDiv = document.createElement('div');
    var div_class = document.createAttribute('class');
    div_class.value = 'querry-option'
    newDiv.setAttributeNode(div_class);

    var text = document.createTextNode(document.getElementById("select-categories").value);

    var button = document.createElement('button');
    var type = document.createAttribute('type');
    type.value = 'button';
    button.setAttributeNode(type);

    var icon = document.createElement('i');
    var icon_class = document.createAttribute('class');
    icon_class.value = 'fa fa-close';
    icon.setAttributeNode(icon_class);
    button.appendChild(icon);    

    var textarea = document.createElement("input");
    var text_type = document.createAttribute('type');
    type.value = 'text';
    // var placeholder = document.createAttribute('placeholder');
    // placeholder.value = 'Type here';
    textarea.setAttributeNode(text_type);
    // textarea.setAttributeNode(placeholder);

    document.getElementsByClassName("searchbar")[0].prepend(newDiv);
    newDiv.appendChild(text);
    newDiv.appendChild(textarea);
    newDiv.appendChild(button);
    console.log("I'm here");
})