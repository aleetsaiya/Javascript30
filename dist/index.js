"use strict";
const createElement = (type, className, innerHTML) => {
    const e = document.createElement(type);
    if (className)
        e.classList.add(className);
    if (innerHTML)
        e.innerHTML = innerHTML;
    return e;
};
const getSiteHref = (d) => {
    const folder = d < 10 ? '0' + d : String(d);
    const file = String(d) + '.html';
    return `./days/${folder}/${file}`;
};
const getImgHref = (d) => {
    const folder = d < 10 ? '0' + d : String(d);
    const file = String(d) + '.png';
    return `./days/${folder}/${file}`;
};
const createItemLink = (d) => {
    const a = createElement('a');
    a.setAttribute('href', getSiteHref(d));
    return a;
};
const createItemImg = (d) => {
    const img = createElement('img');
    img.setAttribute('src', getImgHref(d));
    img.setAttribute('alt', 'preview');
    img.setAttribute('class', 'item__img');
    return img;
};
const createItem = (d, title) => {
    const item = createElement('li', 'item');
    const link = createItemLink(d);
    link.appendChild(createItemImg(d));
    link.appendChild(createElement('span', 'item__title', title));
    item.append(link);
    return item;
};
const wrapper = document.querySelector(".wrapper");
const siteTitles = ['Drum kit', 'JS and CSS Clock', 'Update CSS variable with JS', 'Array Cardio Day 1', 'Flex Panel Gallery', 'Type Ahead', 'Array Cardio Day 2', 'Fun with HTML5 Canvas', 'Dev Tools Domination', 'Hold Shift and Check Checkboxes', 'Custom Video Player', 'Key Sequence Detection', 'Slide in on Scroll', 'JavaScript References VS Copying', 'LocalStorage and Event Delegate', 'Mouse Move Shadow', 'Sort Without Articles', 'Adding Up Time With Reduce', 'WebCam Fun', 'Speech Detection', 'Geolocation', 'Follow Along Link Highlight', 'Speech Synthesis', 'Sticky Nav', 'Event Capture, Propagation, Bubbling and Once', 'Stripe Follow Along Nav', 'Click and Drag', 'Video speed controller', 'Countdown Timer', 'Whack a Hole!'];
if (wrapper) {
    for (let d = 1; d <= 30; d++) {
        const item = createItem(d, siteTitles[d - 1]);
        wrapper.appendChild(item);
    }
}
