function route(event){
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({},"",event.target.href);
    urlLocationhandler();
}

const urlRoute = {
    "/product" : {
        "path" : "/pages/product.html",
        "js" : "/js/product.js"
    },
    "/sales" : {
        "path" : "/pages/sales.html",
        "js" : "/js/sales.js"
    }
}

async function urlLocationhandler(){
    const path = window.location.pathname;
    const route = urlRoute[path];
    console.log(route)
    const content = await fetch(route.path).then(data => data.text());
    document.getElementById("main-page").innerHTML = content;

    const scriptList = document.querySelectorAll("script");
    if(scriptList.length > 1) scriptList[1].remove();

    fileScript = document.createElement("script");
    fileScript.setAttribute("src",route.js);
    fileScript.setAttribute("type", "text/javascript");
    fileScript.setAttribute("async", true);
    
    document.body.appendChild(fileScript);
}

window.onpopstate = urlLocationhandler;
window.route = route;

urlLocationhandler();