function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}


function visaavgangar(siteId) {
    const ul = document.getElementById('departures');
    const url = "https://cors-anywhere.herokuapp.com/http://api.sl.se/api2/realtimedeparturesV4.json?key=f1b7512b0672495d93ef0037f5f1b297&siteid=" + siteId + "&timewindow=5";
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            let departures = data.ResponseData.Metros;
            return departures.map(function (departure) {
                let li = createNode('li'),
                    img = createNode('img'),
                    span = createNode('span');

                var devtext = "";
                if (departure.Deviations != null) {
                    for (var i = 0; i < departure.Deviations.length; i++) {
                        var obj = departure.Deviations[i];
                        devtext += obj.Text;
                    }
                }
                span.innerHTML = `${departure.GroupOfLine + ":" + departure.DisplayTime + ":" + departure.LineNumber + ":" + devtext}`;
                append(li, img);
                append(li, span);
                append(ul, li);
            })
        })
        .catch(function (error) {
            console.log(error);
        });
}