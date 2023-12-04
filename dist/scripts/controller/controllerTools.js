export function isIndexPage(){
    let url = new URL(window.location.href);
    let pathname = url.pathname;
    let fileName = pathname.split("/").pop();
    if(fileName == "index.html" || fileName == ""){
        return true;
    }
    else{
        return false;
    }
}