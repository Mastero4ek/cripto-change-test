
//header-menu

const headerNavBtn = document.querySelector('.header__nav-button'),
	  headerNavMenu = document.querySelector('.header__navigation');

	  headerNavBtn.addEventListener('click', () => {
	  	headerNavMenu.classList.toggle('header__navigation-open');
	  });

//modal

const overlay = document.querySelector('.overlay'),
	  modal = document.querySelector('.modal'),
	  closeBtn = document.querySelector('.form__button-close'),
	  heroBtn = document.querySelector('.hero__button');

	  overlay.style.transitionDuration = '0.36s';
	  modal.style.transitionDuration = '0.36s';

	  heroBtn.addEventListener('click', () => {
	  	overlay.classList.add('overlay-open');
	  	modal.classList.add('modal-open');
	  	heroBtn.classList.add('button--active');
	  });

	  overlay.addEventListener('click', (e) => {
	  	const target = e.target;
	  		if(target === overlay || target.closest('.form__button-close')) {
	  			overlay.classList.remove('overlay-open');
	  			modal.classList.remove('modal-open');
	  			heroBtn.classList.remove('button--active');
	  		}
	  });

//form

const form = document.querySelector('form'),
	  modalTitle = document.querySelector('.modal__title'),
	  formBtnClose = document.querySelector('.form__button-close'),
	  formBtnOrder = document.querySelector('.form__button-order');

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const data = {
		name: form.name.value,
		surname: form.surname.value,
		tel: form.tel.value,
	};

	fetch('https://api-form-order.herokuapp.com/api/order', {
		method: 'post',
		body: JSON.stringify(data)
	})
	.then(response => response.json())
	.then(person => {
		modalTitle.textContent = `${person.name}, ваша заявка успешно отправлена, номер: ${person.id}`;
		form.remove();

		setTimeout(() => {
			overlay.classList.remove('overlay-open');
			modal.classList.remove('modal-open');
		}, 3000) 
	});

	formBtnOrder.classList.add('button--active');
	heroBtn.classList.add('button--disabled');
	heroBtn.classList.remove('button--style');
	heroBtn.setAttribute('disabled', '');
	formBtnClose.style.display = 'none';
});

//tabs

const advantageBtns = document.querySelectorAll('.advantage__button'),
	  advantageItems = document.querySelectorAll('.advantage__item-content');

	  advantageBtns.forEach((advantageButton, i) => {
	  	advantageButton.addEventListener('click', () => {
	  		advantageItems.forEach((advantageItem, j) => {
	  			if(i === j) {
	  				advantageBtns[j].classList.add('advantage__button--active');
	  				advantageItems[j].classList.add('advantage__item-content--active');
	  			} else {
	  				advantageBtns[j].classList.remove('advantage__button--active');
	  				advantageItems[j].classList.remove('advantage__item-content--active');
	  			}
	  		});
	  	});
	  });

//exchange

/*const exchangeList = document.querySelector('.exchange-rates__list'),
	  socket = new WebSocket('ws://web-socket-current.herokuapp.com');
	  
const renderExchange = (wrapper, data) => {
	const {from, to, rate, change} = JSON.parse(data);

	const listItem = document.createElement('li');
		listItem.classList.add('exchange-rates__item',
	  	change === 1 ? 'exchange-rates__item--up' : 'exchange-rates__item--down');

	const currency = document.createElement('span');
	  	currency.classList.add('exchange-rates__currency');
	  	currency.textContent = `${from}/${to}`;

	const value = document.createElement('span');
		value.classList.add('exchange-rates__value');
	  	value.textContent = rate;
	  		  
	  	listItem.append(currency, value);
	  	wrapper.prepend(listItem);

	if(wrapper.children.length > 4) {
		wrapper.children[4].remove();
	}
}

	socket.addEventListener('message' , e => {
		renderExchange(exchangeList, e.data);
	});

	socket.addEventListener('error', err => {
		console.log(err);
	});*/

//accordion

const faqList = document.querySelector('.faq__list'),
      faqItem = document.querySelectorAll('.faq__item'),
      faqAnswer = document.querySelectorAll('.faq__answer'),
      faqQuestion = document.querySelectorAll('.faq__question'),
      faqArrow = document.querySelectorAll('.faq__button-img');

  faqList.addEventListener('click', (e) => {
    const target = e.target.closest('.faq__item');

    if (target) {

      faqItem.forEach((item, i) => {
        if (item === target && !target.classList.contains('faq__item--show')) {
        	faqItem[i].classList.add('faq__item--show');
        	
			faqAnswer[i].classList.add('faq__answer--show');
			const h = getComputedStyle(faqAnswer[i]).height;
    		faqAnswer[i].style.height = '0';
    		getComputedStyle(faqAnswer[i]).height; // reflow
    		faqAnswer[i].style.height = h;
    		setTimeout(function () { faqAnswer[i].style.height = '' }, 1000); // Когда закончится анимация

			faqQuestion[i].classList.add('faq__question--active');
			faqArrow[i].style.transform = 'rotate(180deg)';
			faqArrow[i].classList.add('faq__button-img--active');
        } else {
        	faqAnswer[i].style.height = getComputedStyle(faqAnswer[i]).height;
    		faqItem[i].classList.remove('faq__item--show');
    		getComputedStyle(faqAnswer[i]).height; // reflow
    		faqAnswer[i].style.height = '';
			faqAnswer[i].classList.remove('faq__answer--show');
			faqQuestion[i].classList.remove('faq__question--active');
			faqArrow[i].style.transform = 'rotate(0deg)';
			faqArrow[i].classList.remove('faq__button-img--active');
        }

      });
    }
  });