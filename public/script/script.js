const form = document.getElementById('longUrlForm');
const input = document.getElementById('longUrl');


form.addEventListener('submit',async(e)=>{
    const url= input.value;
    // if empty string do noting
    if(url.replace(/\s/g, '') === ""){ 
        input.value = ""; 
        e.preventDefault();
    }
})