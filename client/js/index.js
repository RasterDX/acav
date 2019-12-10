rootUrl = 'http://localhost:3000';

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