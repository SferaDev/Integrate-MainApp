const API = {
    Function: () => {
        return new Promise(function(resolve, reject){
            console.log('fgjsdusdg');
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
                    console.log("Soc API");
                    resolve("Soc RESOLVE");
                }

            }
            xmlHttp.open("GET", "http://localhost:8081", true);
            xmlHttp.send(null);
        });
    }
}

 export default API