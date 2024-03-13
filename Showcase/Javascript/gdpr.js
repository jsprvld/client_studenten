class GDPR {

    constructor() {
        this.bindEvents();

        if(this.cookieStatus() !== 'accept') this.showGDPR();
    }

    bindEvents() {
        let buttonAccept = document.querySelector('.gdpr-consent__button--accept');
        buttonAccept.addEventListener('click', () => {
            this.cookieStatus('accept');
            this.hideGDPR();
        });

        let buttonReject = document.querySelector('.gdpr-consent__button--reject');
        buttonReject.addEventListener('click', () => {
            this.cookieStatus('reject');
            this.hideGDPR();
        });
    }

    cookieStatus(status) {
        if (status) localStorage.setItem('gdpr-consent-choice', status);

        let metadata = {
            datum : this.getDate(),
            tijd :  this.getTime()
        }
        
        if (status == 'accept') localStorage.setItem('gdpr-consent-metadata', JSON.stringify(metadata));

        return localStorage.getItem('gdpr-consent-choice');
    }

    getDate(){
        let date = new Date(); 
        let day = date.getDate(); 
        let month = date.getMonth() + 1;  
        let year = date.getFullYear();
        
        return day + "-" + month + "-" + year;
    }

    getTime(){
        let time = new Date(); 
        let hours = time.getHours(); 
        let minutes = time.getMinutes().toString();  
        
        if (minutes.length == 1) minutes = "0" + minutes; 

        return hours + ":" + minutes;
    }

    hideGDPR(){
        document.querySelector(`.gdpr-consent`).classList.add('hide');
        document.querySelector(`.gdpr-consent`).classList.remove('show');
    }

    showGDPR(){
        document.querySelector(`.gdpr-consent`).classList.add('show');
    }
}

const gdpr = new GDPR();


