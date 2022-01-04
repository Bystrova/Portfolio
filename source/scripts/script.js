const info = document.querySelector('.info__list');
const infoItems = info.querySelectorAll('.info__text');
const contacts = info.querySelector('.contacts');
const infoLastItem = infoItems[infoItems.length - 1];
const TABLETWIDTH = 768;

const classChangeHandler = (evt) => {
	let target = evt.target;
	let nextElement = target.nextElementSibling;
	let infoInners = info.querySelectorAll('.info__inner');
	const mediaQuery = window.matchMedia(`(min-width: ${TABLETWIDTH}px)`);
	if (mediaQuery.matches) {
		for (let i = 0; i < infoInners.length; i++) {
			if (infoInners[i] !== nextElement && !infoInners[i].classList.contains('info__inner--hidden')) {
				infoInners[i].classList.add('info__inner--hidden');
				infoInners[i].previousElementSibling.classList.remove('info__text--opend');
			}
		}
	};

	if (target.classList.contains('info__text')) {
		nextElement.classList.toggle('info__inner--hidden');
		target.classList.toggle('info__text--opend');
	}
};

info.addEventListener('click', classChangeHandler);