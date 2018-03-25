// import SwipeListener from 'swipe-listener';
// import WheelSwipe from 'wheel-swipe';
import ScrollSwipe from 'scroll-swipe';
import _ from 'lodash';

const canvases = [...document.querySelectorAll('.background__canvas')];
const ctxs = []
const videos = [...document.querySelectorAll('.project__video')];
const navItems = [...document.querySelectorAll('.nav__item')];
const sections = [...document.querySelectorAll('.section')];
const main = document.querySelector('.main');
let index = 0;
let ss;

const draw = () => {
	if (ctxs[index])
		ctxs[index].drawImage(videos[index], 0, 0, window.innerWidth, window.innerHeight);
	requestAnimationFrame(draw);
}

const onClickNavItem = (e, i) => {
	index = e ? parseInt(e.currentTarget.dataset.section) : i;
	if (!sections[index]) return

	document.querySelector('.nav__item--active').classList.remove('nav__item--active');
	document.querySelector('.section--active').classList.remove('section--active');
	if (document.querySelector('.background__canvas--active'))
		document.querySelector('.background__canvas--active').classList.remove('background__canvas--active');

	navItems[index].classList.add('nav__item--active');
	sections[index].classList.add('section--active');
	if (canvases[index])
		canvases[index].classList.add('background__canvas--active');

	const transform = `translate3d(0, ${window.innerHeight * index * -1}px, 0)`;
	main.style.transform = transform;
	main.style.webkitTransform = transform;
	main.style.mozTransform = transform;
	main.style.msTransform = transform;
	main.style.oTransform = transform;
};

const onSwipe = (data) => {
	// return console.log(data);
	setTimeout(() => ss.listen(), 999);
	if (data.direction === 'HORIZONTAL') return;

	const i = data.intent === 1 ? 1 : -1;
	if (index + i < 0) return; 
	if (index + i >= navItems.length) return;
	onClickNavItem(null, index + i);
}

const kickIt = () => {
	console.log('kick it');

	canvases.forEach(c => {
		const ctx = c.getContext('2d');
		ctx.canvas.height = window.innerHeight;
		ctx.canvas.width = window.innerWidth;
		ctxs.push(ctx);
	});


	// const listener = SwipeListener(document.body);
	// document.body.addEventListener('swipe', onSwipe);

	// const ws = new WheelSwipe({ debounceThreshold: 99, deltaThreshold: 1 });
	// window.addEventListener('wheelup', () => onSwipe(1));
	// window.addEventListener('wheeldown', () => onSwipe(-1));
	// 
	ss = new ScrollSwipe({
		target: document.body, // can be a div, or anything else you want to track scroll/touch events on
		scrollSensitivity: 5, // the lower the number, the more sensitive
		touchSensitivity: 0, // the lower the number, the more senitive,
		scrollPreventDefault: true, // prevent default option for scroll events
		touchPreventDefault: true, // prevent default option for touch events
		scrollCb: onSwipe,
		// touchCb: touchCb
	});
 	
 	window.addEventListener('keydown', e => {
 		let i = null;
 		if (e.keyCode === 40) i = 1;
 		if (e.keyCode === 38) i = -1;

 		if (!i) return
		if (index + i < 0) return; 
		if (index + i >= navItems.length) return;
		onClickNavItem(null, index + i);
 	});

	navItems.forEach(item => item.addEventListener('click', onClickNavItem));
	draw();
}



document.addEventListener('DOMContentLoaded', kickIt);