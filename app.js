// Variables
const buttons = document.querySelectorAll('.btn');
const equal = document.getElementById('eq-btn');
const clear = document.getElementById('clear-btn');
const numBtns = document.querySelectorAll('.num-btn');
const opBtns = document.querySelectorAll('.op-btn');
const display = document.getElementById('display');
const backSpace = document.getElementById('b-space');
const negative = document.getElementById('minus-btn');
const point = document.getElementById('point-btn');
/*-----------------------------------------------*/

// Event Listeners

clear.addEventListener('click', () => {
	display.textContent = '0';
});

numBtns.forEach(b => {
	b.addEventListener('click', () => {
		if (display.textContent == '0') {
			display.textContent = b.textContent;
		} else {
			display.textContent += b.textContent;
		}
	});
});

opBtns.forEach(b => {
	b.addEventListener('click', () => {
		if (/[+\-*÷.]/.test(display.textContent[display.textContent.length - 1])) return;
		if (display.textContent === '0') return;
		display.textContent += b.textContent;
	});
});

buttons.forEach(b => {
	b.addEventListener('mousedown', () => {
		b.classList.add('btn-click');
		b.classList.remove('h-btn');
	});
	b.addEventListener('mouseup', () => {
		b.classList.remove('btn-click');
		b.classList.add('h-btn');
	});
});

backSpace.addEventListener('click', () => {
	if (display.textContent == '0' || display.textContent === 'Error!') return;
	if (display.textContent.length === 1) {
		display.textContent = '0';
	} else {
		display.textContent = display.textContent.slice(0, -1);
	}
});

negative.addEventListener('click', () => {
	if (/[+\-*÷]/.test(display.textContent)) return;
	if (display.textContent === '0') {
		display.textContent = '-';
	} else {
		display.textContent = '-' + display.textContent;
	}
});

point.addEventListener('click', () => {
	if (/[+\-*÷.]/.test(display.textContent[display.textContent.length - 1])) return;
	display.textContent += '.';
	if (/(?<=\.)\d+(?<=\d)\./.test(display.textContent))
		display.textContent = display.textContent.slice(0, -1);
});

equal.addEventListener('click', () => {
	if (/[+\-*÷.]/.test(display.textContent[display.textContent.length - 1])) {
		display.textContent = display.textContent.slice(0, -1);
		if (display.textContent.match(/\d+/g).length < 2) return;
	}
	display.textContent = calculate(display.textContent);
});

// Operations

const add = (m, n) => m + n;
const subtract = (m, n) => m - n;
const multiply = (m, n) => m * n;
const divide = (m, n) => m / n;

const operate = (n1, n2, op) => {
	switch (op) {
		case '+':
			return add(n1, n2);
		case '-':
			return subtract(n1, n2);
		case 'x':
			return multiply(n1, n2);
		case '÷':
			return n2 == 0 ? 'Error!!!' : divide(n1, n2);
	}
};

const calculate = str => {
	const arr = str.split(/[+\-x÷]/).map(n => Number(n));
	let ops = str.match(/[+\-x÷]/g);
	while (arr.length > 1) {
		arr.splice(0, 2, operate(arr[0], arr[1], ops[0]));
		if (arr[0] === 'Error!!!') return arr[0];
		ops = ops.slice(1);
	}
	return arr[0] == parseInt(arr[0]) ? arr[0] : arr[0].toFixed(5).replace(/0+$/, '');
};
