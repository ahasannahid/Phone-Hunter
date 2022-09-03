const loadPhones = async(searchText, dataLimit) =>{
    const url =`https://openapi.programming-hero.com/api/phones?search=${searchText || 'iphone'}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) =>{  
        // console.log(phones);
        const phonesContainer = document.getElementById('phones-container');
        phonesContainer.textContent = '';
        // display 10 phones only
        const showAll = document.getElementById('show-all');
        if(dataLimit && phones.length > 10){
            phones = phones.slice(0, 10);           
            showAll.classList.remove('d-none');
        }
        else{
            showAll.classList.add('d-none');
        }
        

        // display no phone found
        const noPhone = document.getElementById('no-found-message');
        if(phones.length === 0){
            noPhone.classList.remove('d-none');
        }
        else{
            noPhone.classList.add('d-none');
        }
        // display all phones
        phones.forEach(phone =>{
            const phoneDiv = document.createElement('div')
            phoneDiv.classList.add('col');
            phoneDiv.innerHTML = `
            <div class="card p-4">
                <img src="${phone.image}" class="card-img-top w-25" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
            </div>
            `
            phonesContainer.appendChild(phoneDiv);
        });

        // stop spinner/loader
        toggleSpinner(false);

    
}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

// handle search button click
document.getElementById('btn-search').addEventListener('click', function(){
    // start loader/spinner
    processSearch(10);
})

// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        processSearch(10);
    }
})

// kono kisu dekhano ba bondho kora ba change korake toggle kora bole.

const toggleSpinner = (isLoading) => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}



// not the best way to show all

document.getElementById('btn-show-all').addEventListener('click', function(){
   processSearch();
})

const loadPhoneDetails =async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data =await res.json();
    displayPhoneDetail(data.data);
}

const displayPhoneDetail = phone => {
    const sensors = phone.mainFeatures.sensors;
    // let x = 10;
    // if(x=== undefined || x === null){
    //     console.log('its x')
    // }
    // else{
    //     console.log(';not 10')
    // }
    
    // console.log(phone);
    // console.log(sensors);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails= document.getElementById('phone-details');
    phoneDetails.innerHTML= `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'no release date found'}</p>
    <p>Stroge: ${phone.mainFeatures ? phone.mainFeatures.storage : 'no stroge information found'}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'no bluetooth information found'}</p>
    <p>Sensore: ${sensors ? sensors.map(sensor => sensor) : 'no sensor information found'}</p>
    <p>Sensore: ${sensors ? sensors.join(','): 'no sensor information found'}</p>
    `;
    // <p>Sensore: ${phone.mainFeatures ? phone.mainFeatures.sensors: 'no sensor information found'}</p>
}

 loadPhones('');
//  loadPhones('apple');