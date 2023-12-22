const form = document.getElementById('longUrlForm');
const input = document.getElementById('longUrl');
const shortenedLink = document.getElementById('theLink');
const copyBtn = document.getElementById('copyBtn');


form.addEventListener('submit',async(e)=>{
    const url= input.value;
    // if empty string do noting
    if(url.replace(/\s/g, '') === ""){ 
        input.value = ""; 
        e.preventDefault();
    }
})

function copyToclip(){
    const link = shortenedLink.textContent;
    navigator.clipboard.writeText(link);
    copyBtn.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
}