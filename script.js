//referencing elements to DOM
let quote = document.querySelector('#main-text');
let author = document.querySelector('#sub-text');
let next = document.querySelector('#nextButton');
let copyBtn = document.querySelector('#copyButton');
let catg = document.querySelector('.category');
let currentData;

//loading animation
const loadingRender = () =>{
    let loader = `
    <div class="text-container">

    <div class="spinner-border spinner" role="status">
        <span class="sr-only">Loading...</span>
    </div>

    </div>`;

    quote.insertAdjacentHTML("beforeend" , loader);
};

//function fetches API
function getAPIs(){

    fetch('http://api.quotable.io/random')

    .then(result => {
        return result.json();
    })

    .then(data => {

        if(catg.value === "null"){
            quote.textContent = 'Choose Category';
        }
        else if(data.tags.includes(catg.value)){

            displayData(data);
            //pass data into global variable to use it globally
            currentData = data;
        }
        else{
            getAPIs();
        }
        
    });

    let displayData = (data) =>{
        quote.textContent = `" ${data.content} " `;
        author.textContent = `- ${data.author} `;
    };

};

let copyText = () =>{

    try {
        let dataCopied = `"${currentData.content}" - ${currentData.author}`;
    
        //create element with textarea to execute copy operation
        //works on HTMLInputElement(textarea)
        const dummy = document.createElement('textarea');
        //pass the dataCopied as value to the element
        dummy.value = dataCopied;
        document.body.appendChild(dummy);
        //select the data
        dummy.select();
        //copy data to clipboard
        document.execCommand('copy');
        //remove the temporary element
        document.body.removeChild(dummy);
     
    } catch (error) {
        quote.textContent = "Choose Category";
    }
    
};

//controls all functions
let globalControl = ()=>{

    loadingRender();

    getAPIs();
};

//eventListeners
next.addEventListener('click' , globalControl);
copyBtn.addEventListener('click' , copyText);

