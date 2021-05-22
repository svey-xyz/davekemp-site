/*
*  Add sorting of projects
*/

var sortableCards = Array<projectCard>();
var tagButtons = Array<HTMLElement>();

window.onload = function (): void {
	initTagSort();
	initCards();

	var loadedTag = window.location.hash;
	if (loadedTag) {
		loadedTag = loadedTag.replace('#', '');

		tagSelect(loadedTag)
	} else {
		tagSelect('all')
	}
}

function initTagSort() : void {
	var buttonElements = document.getElementsByClassName('tag-button');
	for (let b of buttonElements) {
		tagButtons.push(<HTMLElement>b);
		b.addEventListener('mousedown', tagClick);
	}
}

function initCards(): void {
	var htmlCards = document.getElementsByName('sortable-card');

	for (let card of htmlCards) {
		sortableCards.push(new projectCard(<HTMLElement>card));
	}
}

function tagClick(e : Event) : void {
	const target = e.target as HTMLElement
	const tag = target.getAttribute('tag')!;
	
	tagSelect(tag)
}

function tagSelect(tag : string) : void {
	
	for (let b of tagButtons) {
		if (b.getAttribute('tag') != tag) b.style.setProperty('font-weight', '400');
		else b.style.setProperty('font-weight', '900');
	}
	
	tagSort(tag)
}

function tagSort(tag : string) {
	let all = false;
	let hashState = '#' + tag;

	if (tag == 'all') {
		all = true;
		hashState = '/work/';
	}

	history.replaceState(undefined, '', hashState)

	for (let card of sortableCards) {
		if (card.tags.includes(tag) || all) {
			card.container.style.display = "flex";
		} else {
			card.container.style.display = "none";
		}
	}
}

class projectCard {
	container : HTMLElement;
	tags : Array<string>;

	constructor(dom : HTMLElement) {
		this.container = dom;
		this.tags = dom.getAttribute('tags')!.split(',');
	}
}