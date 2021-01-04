var script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js';
document.body.appendChild(script);

browser.contextMenus.create({
    "title" : "短縮URLをコピー",
    "type"  : "normal",
    "contexts" : ["all"],
    "onclick" : function(info){

        console.log(info["pageUrl"]);
        $.ajax({
            url:'https://u.artspin.jp/p.php',
            type:'GET',
            data:{'url':info["pageUrl"]}
        }).done((data)=>{
            execCopy(data);
            console.log(data);
        }).fail((data)=>{

        }).always((data)=>{

        });
    }
});
function execCopy(string){
    var tmp=document.createElement("div");
    var pre=document.createElement('pre');
    pre.style.webkitUserSelect='auto';
    pre.style.userSelect='auto';
    tmp.appendChild(pre).textContent=string;
    var s=tmp.style;s.position='fixed';
    s.right='200%';
    document.body.appendChild(tmp);
    document.getSelection().selectAllChildren(tmp);
    var result=document.execCommand("copy");
    document.body.removeChild(tmp);
    return result;
}
