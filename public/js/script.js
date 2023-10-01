"use strict";
// const preLoader = function() {
// 	let preloaderWrapper = document.getElementById("preloader");
// 	window.onload = () => {
// 		preloaderWrapper.classList.add("loaded")
// 	}
// };
// preLoader();
var getSiblings = function (elem) {
		const siblings = [];
		let sibling = elem.parentNode.firstChild;
		for (; sibling;) 1 === sibling.nodeType && sibling !== elem && siblings.push(sibling), sibling = sibling.nextSibling;
		return siblings
	},
	slideUp = (target, time) => {
		const duration = time || 500;
		target.style.transitionProperty = "height, margin, padding", target.style.transitionDuration = duration + "ms", target.style.boxSizing = "border-box", target.style.height = target.offsetHeight + "px", target.offsetHeight, target.style.overflow = "hidden", target.style.height = 0, window.setTimeout(() => {
			target.style.display = "none", target.style.removeProperty("height"), target.style.removeProperty("overflow"), target.style.removeProperty("transition-duration"), target.style.removeProperty("transition-property")
		}, duration)
	},
	slideDown = (target, time) => {
		const duration = time || 500;
		target.style.removeProperty("display");
		let display = window.getComputedStyle(target).display;
		"none" === display && (display = "block"), target.style.display = display;
		const height = target.offsetHeight;
		target.style.overflow = "hidden", target.style.height = 0, target.offsetHeight, target.style.boxSizing = "border-box", target.style.transitionProperty = "height, margin, padding", target.style.transitionDuration = duration + "ms", target.style.height = height + "px", window.setTimeout(() => {
			target.style.removeProperty("height"), target.style.removeProperty("overflow"), target.style.removeProperty("transition-duration"), target.style.removeProperty("transition-property")
		}, duration)
	};

function TopOffset(el) {
	let rect = el.getBoundingClientRect(),
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return {
		top: rect.top + scrollTop
	}
}

$('.owl-menu').owlCarousel({
	loop: true,
	margin: 10,
	nav: true,
	navText: [
		"<i class='fa fa-caret-left'></i>",
		"<i class='fa fa-caret-right'></i>"
	],
	autoplay: true,
	autoplayHoverPause: true,
	pagination: false,
	dots: false,
	responsive: {
		0: {
			items: 2
		},
		600: {
			items: 3
		},
		1000: {
			items: 5
		}
	}
});
const scrollTop = document.getElementById("scroll__top");
scrollTop && (scrollTop.addEventListener("click", (function () {
	window.scroll({
		top: 0,
		left: 0,
		behavior: "smooth"
	})
})), window.addEventListener("scroll", (function () {
	window.scrollY > 300 ? scrollTop.classList.add("active") : scrollTop.classList.remove("active")
})));
var swiper = new Swiper(".hero__slider--activation", {
		slidesPerView: 1,
		loop: !0,
		clickable: !0,
		speed: 500,
		spaceBetween: 30,
		pagination: {
			el: ".swiper-pagination",
			clickable: !0
		}
	}),
	swiper = new Swiper(".hero__slider--nav__activation", {
		slidesPerView: 1,
		loop: !0,
		clickable: !0,
		speed: 500,
		spaceBetween: 30,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		}
	}),
	swiper = new Swiper(".product__swiper--activation", {
		slidesPerView: 4,
		loop: !0,
		clickable: !0,
		spaceBetween: 30,
		breakpoints: {
			992: {
				slidesPerView: 4
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 30
			},
			280: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			0: {
				slidesPerView: 1
			}
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		}
	}),
	swiper = new Swiper(".product__column5--activation", {
		slidesPerView: 5,
		loop: !0,
		clickable: !0,
		spaceBetween: 30,
		breakpoints: {
			1600: {
				slidesPerView: 5
			},
			1200: {
				slidesPerView: 4
			},
			576: {
				slidesPerView: 3,
				spaceBetween: 30
			},
			280: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			0: {
				slidesPerView: 1
			}
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		}
	}),
	swiper = new Swiper(".product__column6--activation", {
		slidesPerView: 6,
		loop: !0,
		clickable: !0,
		spaceBetween: 30,
		breakpoints: {
			1700: {
				slidesPerView: 6
			},
			1300: {
				slidesPerView: 5
			},
			992: {
				slidesPerView: 4
			},
			576: {
				slidesPerView: 3,
				spaceBetween: 30
			},
			280: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			0: {
				slidesPerView: 1
			}
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		}
	}),
	swiper = new Swiper(".blog__swiper--activation", {
		slidesPerView: 3,
		loop: !0,
		clickable: !0,
		spaceBetween: 30,
		breakpoints: {
			992: {
				slidesPerView: 3
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 30
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			0: {
				slidesPerView: 1
			}
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		}
	}),
	swiper = new Swiper(".testimonial__swiper--activation", {
		slidesPerView: 3,
		loop: !0,
		clickable: !0,
		spaceBetween: 30,
		breakpoints: {
			1400: {
				slidesPerView: 3
			},
			768: {
				spaceBetween: 30,
				slidesPerView: 2
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			0: {
				slidesPerView: 1
			}
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		}
	}),
	swiper = new Swiper(".categories2__swiper--activation", {
		slidesPerView: 6,
		loop: !0,
		clickable: !0,
		spaceBetween: 30,
		breakpoints: {
			1200: {
				slidesPerView: 6
			},
			992: {
				slidesPerView: 5
			},
			768: {
				slidesPerView: 4,
				spaceBetween: 30
			},
			500: {
				slidesPerView: 3,
				spaceBetween: 20
			},
			280: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			0: {
				slidesPerView: 1
			}
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		}
	}),
	swiper = new Swiper(".quickview__swiper--activation", {
		slidesPerView: 1,
		loop: !0,
		clickable: !0,
		spaceBetween: 30,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: !0
		}
	}),
	swiper = new Swiper(".instagram__swiper--activation", {
		slidesPerView: 7,
		loop: !0,
		clickable: !0,
		spaceBetween: 30,
		breakpoints: {
			1366: {
				slidesPerView: 7
			},
			1200: {
				slidesPerView: 6
			},
			992: {
				slidesPerView: 5
			},
			768: {
				slidesPerView: 4,
				spaceBetween: 30
			},
			576: {
				slidesPerView: 3,
				spaceBetween: 20
			},
			0: {
				slidesPerView: 2
			}
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		}
	}),
	swiper = new Swiper(".product__media--nav", {
		loop: !0,
		spaceBetween: 10,
		slidesPerView: 5,
		freeMode: !0,
		watchSlidesProgress: !0,
		breakpoints: {
			768: {
				slidesPerView: 5
			},
			480: {
				slidesPerView: 4
			},
			320: {
				slidesPerView: 3
			},
			200: {
				slidesPerView: 2
			},
			0: {
				slidesPerView: 1
			}
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		}
	}),
	swiper2 = new Swiper(".product__media--preview", {
		loop: !0,
		spaceBetween: 10,
		thumbs: {
			swiper: swiper
		}
	});
const tab = function (wrapper) {
	let tabContainer = document.querySelector(wrapper);
	tabContainer && tabContainer.addEventListener("click", (function (evt) {
		let listItem = evt.target;
		if (listItem.hasAttribute("data-toggle")) {
			let targetId = listItem.dataset.target,
				targetItem = document.querySelector(targetId);
			listItem.parentElement.querySelectorAll('[data-toggle="tab"]').forEach((function (list) {
				list.classList.remove("active")
			})), listItem.classList.add("active"), targetItem.classList.add("active"), setTimeout((function () {
				targetItem.classList.add("show")
			}), 150), getSiblings(targetItem).forEach((function (pane) {
				pane.classList.remove("show"), setTimeout((function () {
					pane.classList.remove("active")
				}), 150)
			}))
		}
	}))
};
tab(".product__tab--one"), document.querySelectorAll("[data-countdown]").forEach((function (elem) {
	const countDownItem = function (value, label) {
			return `<div class="countdown__item" ${label}"><span class="countdown__number">${value}</span><p class="countdown__text">${label}</p></div>`
		},
		date = new Date(elem.getAttribute("data-countdown")).getTime(),
		second = 1e3,
		minute = 6e4,
		hour = 36e5,
		day = 864e5,
		countDownInterval = setInterval((function () {
			let currentTime = (new Date).getTime(),
				timeDistance = date - currentTime,
				daysValue = Math.floor(timeDistance / day),
				hoursValue = Math.floor(timeDistance % day / 36e5),
				minutesValue = Math.floor(timeDistance % 36e5 / 6e4),
				secondsValue = Math.floor(timeDistance % 6e4 / 1e3);
			elem.innerHTML = countDownItem(daysValue, "days") + countDownItem(hoursValue, "hrs") + countDownItem(minutesValue, "mins") + countDownItem(secondsValue, "secs"), timeDistance < 0 && clearInterval(countDownInterval)
		}), 1e3)
}));
const activeClassAction = function (toggle, target) {
	const to = document.querySelector(toggle),
		ta = document.querySelector(target);
	to && ta && (to.addEventListener("click", (function (e) {
		e.preventDefault();
		let triggerItem = e.target;
		triggerItem.classList.contains("active") ? (triggerItem.classList.remove("active"), ta.classList.remove("active")) : (triggerItem.classList.add("active"), ta.classList.add("active"))
	})), document.addEventListener("click", (function (event) {
		event.target.closest(toggle) || event.target.classList.contains(toggle.replace(/\./, "")) || event.target.closest(target) || event.target.classList.contains(target.replace(/\./, "")) || (to.classList.remove("active"), ta.classList.remove("active"))
	})))
};

function offcanvsSidebar(openTrigger, closeTrigger, wrapper) {
	let OpenTriggerprimary__btn = document.querySelectorAll(openTrigger),
		closeTriggerprimary__btn = document.querySelector(closeTrigger),
		WrapperSidebar = document.querySelector(wrapper),
		wrapperOverlay = wrapper.replace(".", "");

	function handleBodyClass(evt) {
		let eventTarget = evt.target;
		eventTarget.closest(wrapper) || eventTarget.closest(openTrigger) || (WrapperSidebar.classList.remove("active"), document.querySelector("body").classList.remove(`${wrapperOverlay}_active`))
	}
	OpenTriggerprimary__btn && WrapperSidebar && OpenTriggerprimary__btn.forEach((function (singleItem) {
		singleItem.addEventListener("click", (function (e) {
			null != e.target.dataset.offcanvas && (WrapperSidebar.classList.add("active"), document.querySelector("body").classList.add(`${wrapperOverlay}_active`), document.body.addEventListener("click", handleBodyClass.bind(this)))
		}))
	})), closeTriggerprimary__btn && WrapperSidebar && closeTriggerprimary__btn.addEventListener("click", (function (e) {
		null != e.target.dataset.offcanvas && (WrapperSidebar.classList.remove("active"), document.querySelector("body").classList.remove(`${wrapperOverlay}_active`), document.body.removeEventListener("click", handleBodyClass.bind(this)))
	}))
}
activeClassAction(".categories__menu--header", ".dropdown__categories--menu"), activeClassAction(".offcanvas__account--currency__menu", ".offcanvas__account--currency__submenu"), activeClassAction(".account__currency--link", ".dropdown__currency"), activeClassAction(".language__switcher", ".dropdown__language"), activeClassAction(".offcanvas__language--switcher", ".offcanvas__dropdown--language"), offcanvsSidebar(".minicart__open--btn", ".minicart__close--btn", ".offCanvas__minicart"), offcanvsSidebar(".search__open--btn", ".predictive__search--close__btn", ".predictive__search--box"), offcanvsSidebar(".widget__filter--btn", ".offcanvas__filter--close", ".offcanvas__filter--sidebar");
const quantityWrapper = document.querySelectorAll(".quantity__box");


// quantityWrapper && quantityWrapper.forEach((function(singleItem) {
// 	let increaseButton = singleItem.querySelector(".increase"),
// 		decreaseButton = singleItem.querySelector(".decrease");

// 	increaseButton.addEventListener("click", (function(e) {
// 		let input = e.target.previousElementSibling.children[0];
// 		if (null != input.dataset.counter) {
// 			let value = parseInt(input.value, 10);
// 			value = isNaN(value) ? 0 : value, value++, input.value = value
// 		}
// 	})), decreaseButton.addEventListener("click", (function(e) {
// 		let input = e.target.nextElementSibling.children[0];
// 		if (null != input.dataset.counter) {
// 			let value = parseInt(input.value, 10);
// 			value = isNaN(value) ? 0 : value, value < 1 && (value = 1), value--, input.value = value
// 		}
// 	}))
// }));
const openEls = document.querySelectorAll("[data-open]"),
	closeEls = document.querySelectorAll("[data-close]"),
	isVisible = "is-visible";
for (const el of openEls) el.addEventListener("click", (function () {
	const modalId = this.dataset.open;
	document.getElementById(modalId).classList.add(isVisible)
}));
for (const el of closeEls) el.addEventListener("click", (function () {
	this.parentElement.parentElement.parentElement.classList.remove(isVisible)
}));

function customAccordion(accordionWrapper, singleItem, accordionBody) {
	let accoridonButtons;
	document.querySelectorAll(accordionWrapper).forEach((function (item) {
		item.addEventListener("click", (function (evt) {
			let itemTarget = evt.target;
			if (itemTarget.classList.contains("accordion__items--button") || itemTarget.classList.contains("widget__categories--menu__label")) {
				let singleAccordionWrapper = itemTarget.closest(singleItem),
					singleAccordionBody = singleAccordionWrapper.querySelector(accordionBody);
				singleAccordionWrapper.classList.contains("active") ? (singleAccordionWrapper.classList.remove("active"), slideUp(singleAccordionBody)) : (singleAccordionWrapper.classList.add("active"), slideDown(singleAccordionBody), getSiblings(singleAccordionWrapper).forEach((function (item) {
					let sibllingSingleAccordionBody = item.querySelector(accordionBody);
					item.classList.remove("active"), slideUp(sibllingSingleAccordionBody)
				})))
			}
		}))
	}))
}
document.addEventListener("click", e => {
	e.target == document.querySelector(".modal.is-visible") && document.querySelector(".modal.is-visible").classList.remove(isVisible)
}), document.addEventListener("keyup", e => {
	"Escape" == e.key && document.querySelector(".modal.is-visible") && document.querySelector(".modal.is-visible").classList.remove(isVisible)
}), customAccordion(".accordion__container", ".accordion__items", ".accordion__items--body"), customAccordion(".widget__categories--menu", ".widget__categories--menu__list", ".widget__categories--sub__menu");
let accordion = !0;

const customLightboxHTML = '<div id="glightbox-body" class="glightbox-container">\n    <div class="gloader visible"></div>\n    <div class="goverlay"></div>\n    <div class="gcontainer">\n    <div id="glightbox-slider" class="gslider"></div>\n    <button class="gnext gbtn" tabindex="0" aria-label="Next" data-customattribute="example">{nextSVG}</button>\n    <button class="gprev gbtn" tabindex="1" aria-label="Previous">{prevSVG}</button>\n    <button class="gclose gbtn" tabindex="2" aria-label="Close">{closeSVG}</button>\n    </div>\n    </div>',
	lightbox = GLightbox({
		touchNavigation: !0,
		lightboxHTML: customLightboxHTML,
		loop: !0
	}),
	wrapper = document.getElementById("funfactId");
if (wrapper) {
	const counters = wrapper.querySelectorAll(".js-counter"),
		duration = 1e3;
	let isCounted = !1;
	document.addEventListener("scroll", (function () {
		const wrapperPos = wrapper.offsetTop - window.innerHeight;
		!isCounted && window.scrollY > wrapperPos && (counters.forEach(counter => {
			const countTo = counter.dataset.count,
				countPerMs = countTo / duration;
			let currentCount = 0;
			const countInterval = setInterval((function () {
				currentCount >= countTo && clearInterval(countInterval), counter.textContent = Math.round(currentCount), currentCount += countPerMs
			}), 1)
		}), isCounted = !0)
	}))
}
const offcanvasHeader = function () {
	const offcanvasOpen = document.querySelector(".offcanvas__header--menu__open--btn"),
		offcanvasClose = document.querySelector(".offcanvas__close--btn"),
		offcanvasHeader = document.querySelector(".offcanvas__header"),
		offcanvasMenu = document.querySelector(".offcanvas__menu"),
		body = document.querySelector("body");
	offcanvasMenu && offcanvasMenu.querySelectorAll(".offcanvas__sub_menu").forEach((function (ul) {
		const subMenuToggle = document.createElement("button");
		subMenuToggle.classList.add("offcanvas__sub_menu_toggle"), ul.parentNode.appendChild(subMenuToggle)
	})), offcanvasOpen && offcanvasOpen.addEventListener("click", (function (e) {
		e.preventDefault(), null != e.target.dataset.offcanvas && (offcanvasHeader.classList.add("open"), body.classList.add("mobile_menu_open"))
	})), offcanvasClose && offcanvasClose.addEventListener("click", (function (e) {
		e.preventDefault(), null != e.target.dataset.offcanvas && (offcanvasHeader.classList.remove("open"), body.classList.remove("mobile_menu_open"))
	}));
	let mobileMenuWrapper = document.querySelector(".offcanvas__menu_ul");
	mobileMenuWrapper && mobileMenuWrapper.addEventListener("click", (function (e) {
		let targetElement = e.target;
		if (targetElement.classList.contains("offcanvas__sub_menu_toggle")) {
			const parent = targetElement.parentElement;
			parent.classList.contains("active") ? (targetElement.classList.remove("active"), parent.classList.remove("active"), parent.querySelectorAll(".offcanvas__sub_menu").forEach((function (subMenu) {
				subMenu.parentElement.classList.remove("active"), subMenu.nextElementSibling.classList.remove("active"), slideUp(subMenu)
			}))) : (targetElement.classList.add("active"), parent.classList.add("active"), slideDown(targetElement.previousElementSibling), getSiblings(parent).forEach((function (item) {
				item.classList.remove("active"), item.querySelectorAll(".offcanvas__sub_menu").forEach((function (subMenu) {
					subMenu.parentElement.classList.remove("active"), subMenu.nextElementSibling.classList.remove("active"), slideUp(subMenu)
				}))
			})))
		}
	})), offcanvasHeader && document.addEventListener("click", (function (event) {
		event.target.closest(".offcanvas__header--menu__open--btn") || event.target.classList.contains(".offcanvas__header--menu__open--btn".replace(/\./, "")) || event.target.closest(".offcanvas__header") || event.target.classList.contains(".offcanvas__header".replace(/\./, "")) || (offcanvasHeader.classList.remove("open"), body.classList.remove("mobile_menu_open"))
	})), offcanvasHeader && window.addEventListener("resize", (function () {
		window.outerWidth >= 992 && (offcanvasHeader.classList.remove("open"), body.classList.remove("mobile_menu_open"))
	}))
};
offcanvasHeader();
const categoryMobileMenu = function () {
	const CategorySubMenu = document.querySelector(".category__mobile--menu");
	CategorySubMenu && CategorySubMenu.querySelectorAll(".category__sub--menu").forEach((function (ul) {
		let catsubMenuToggle = document.createElement("button");
		catsubMenuToggle.classList.add("category__sub--menu_toggle"), ul.parentNode.appendChild(catsubMenuToggle)
	}));
	let categoryMenuWrapper = document.querySelector(".category__mobile--menu_ul");
	categoryMenuWrapper && categoryMenuWrapper.addEventListener("click", (function (e) {
		let targetElement = e.target;
		if (targetElement.classList.contains("category__sub--menu_toggle")) {
			const parent = targetElement.parentElement;
			parent.classList.contains("active") ? (targetElement.classList.remove("active"), parent.classList.remove("active"), parent.querySelectorAll(".category__sub--menu").forEach((function (subMenu) {
				subMenu.parentElement.classList.remove("active"), subMenu.nextElementSibling.classList.remove("active"), slideUp(subMenu)
			}))) : (targetElement.classList.add("active"), parent.classList.add("active"), slideDown(targetElement.previousElementSibling), getSiblings(parent).forEach((function (item) {
				item.classList.remove("active"), item.querySelectorAll(".category__sub--menu").forEach((function (subMenu) {
					subMenu.parentElement.classList.remove("active"), subMenu.nextElementSibling.classList.remove("active"), slideUp(subMenu)
				}))
			})))
		}
	}))
};
categoryMobileMenu();
const newsletterPopup = function () {
	let newsletterWrapper = document.querySelector(".newsletter__popup"),
		newsletterCloseButton = document.querySelector(".newsletter__popup--close__btn"),
		dontShowPopup = document.querySelector("#newsletter__dont--show"),
		popuDontShowMode = localStorage.getItem("newsletter__show");
	newsletterWrapper && null == popuDontShowMode && window.addEventListener("load", event => {
		setTimeout((function () {
			document.body.classList.add("overlay__active"), newsletterWrapper.classList.add("newsletter__show"), document.addEventListener("click", (function (event) {
				event.target.closest(".newsletter__popup--inner") || (document.body.classList.remove("overlay__active"), newsletterWrapper.classList.remove("newsletter__show"))
			})), newsletterCloseButton.addEventListener("click", (function () {
				document.body.classList.remove("overlay__active"), newsletterWrapper.classList.remove("newsletter__show")
			})), dontShowPopup.addEventListener("click", (function () {
				dontShowPopup.checked ? localStorage.setItem("newsletter__show", !0) : localStorage.removeItem("newsletter__show")
			}))
		}), 3e3)
	})
};

let resultCard = []
let subTotalOrder = 0
let totalOrder = 0
if (localStorage.getItem('resultCard')) {
	resultCard = JSON.parse(localStorage.getItem('resultCard'));
	$('.items__count').html(resultCard.length);
}

$(document).ready(function () {
	if (localStorage.getItem('tanggalOrder')) {
		$('#tanggalOrder').val(localStorage.getItem('tanggalOrder'))
		checkOrder(localStorage.getItem('tanggalOrder'), localStorage.getItem('jadwalwaktu') ? localStorage.getItem('jadwalwaktu') : "Pagi")
	}

	$('#tanggalOrder').change(function () {
		localStorage.setItem('tanggalOrder', $("#tanggalOrder").val());
	});

	if (localStorage.getItem('jadwalwaktu')) {
		$('#jadwalwaktu').val(localStorage.getItem('jadwalwaktu')).trigger('change')
	}

	$("#lanjutBayar").click(function () {
		localStorage.setItem('waktuBayar', $('#jadwalwaktu').val())
	})

	$(".addPaket").click(function () {
		if ($('#tanggalOrder').val()) {
			let newItem = {
				id: $(this).attr("paketID"),
				name: $(this).attr("paketName"),
				rate: $(this).attr("paketRate"),
				rateThousand: $(this).attr("paketRateThousand"),
				image1: $(this).attr("image1"),
				image2: $(this).attr("image2"),
				type: 'Premium'
			};
			let existingItem = resultCard.find(i => i.id === newItem.id);
			if (existingItem) {
				existingItem.count++;
			} else {
				resultCard.push({
					...newItem,
					count: 1
				});
			}
			localResultCard();
			updateCard();
			changeEmptyState();
			calculateTotal()
		} else {
			$('.isiCard').html("");
			$('.notEmptyCard').hide();
			$('.lanjutBayar').hide();
			$('.emptyCard').hide();
			$('.badDate').show();
			$('.closeChange').hide();
		}
	});

	$(".openCard").click(function () {
		updateCard();
		changeEmptyState();
	});

	$(".isiCard").on("click", ".increase", function (e) {
		let input = e.target.previousElementSibling.children[0];
		if ($(this).attr("jenis") == 'Premium') {
			if (null != input.dataset.counter) {
				let value = parseInt(input.value, 10);
				value = isNaN(value) ? 0 : value, value++, input.value = value

				let found = resultCard.find(item => item.id === $(this).attr("paketID"));
				if (found) {
					found.count = value
				}
				localResultCard();
				calculateTotal()
			}
		} else {
			if (input.value == 0) {
				if (null != input.dataset.counter) {
					let value = parseInt(input.value, 10);
					value = isNaN(value) ? 0 : value, value++, input.value = value

					let found = resultCard.find(item => item.id === $(this).attr("paketID"));
					if (found) {
						found.count = value
					}
					localResultCard();
					calculateTotal()
				}
			} else {
				swal('Notifikasi', 'Menu Reguler Tidak Boleh Lebih Dari 1!', 'error')
			}
		}
	});
	$(".isiCard").on("click", ".decrease", function (e) {
		let input = e.target.nextElementSibling.children[0];
		if (null != input.dataset.counter) {
			let value = parseInt(input.value, 10);
			value = isNaN(value) ? 0 : value, value < 1 && (value = 1), value--, input.value = value

			let found = resultCard.find(item => item.id === $(this).attr("paketID"));
			if (found) {
				found.count = value
			}
			localResultCard();
			calculateTotal()
		}
	});
	$(".isiCard").on("click", ".removeProduct", function (e) {
		resultCard = resultCard.filter(i => parseInt(i.id) !== parseInt($(this).attr("paketID")));
		localResultCard();
		updateCard();
	});

	$('#tanggalOrder').change(function () {
		checkOrder($('#tanggalOrder').val(), $("#jadwalwaktu").val())
	});

	$('#jadwalwaktu').change(function () {
		checkOrder($('#tanggalOrder').val(), $("#jadwalwaktu").val())
		localStorage.setItem('jadwalwaktu', $('#jadwalwaktu').val())
	});
	var new_date = moment(new Date(), "DD-MM-YYYY").add('days', 3);
	var day = new_date.format('DD');
	var month = new_date.format('MM');
	var year = new_date.format('YYYY');

	$("#tanggalOrder").attr('min', year + '-' + month + '-' + day)
});

function checkOrder(date, jadwalwaktu) {
	$.ajax({
		url: "/user/order/checkOrder",
		type: "GET",
		dataType: "json",
		data: {
			date: date,
			waktu: jadwalwaktu
		},
		success: function (ress) {
			if (ress.response == "Successful" || ress.response == "Existing" || ress.response == "Not Found") {
				let orderItemServer = ress.result
				if (ress.response == "Successful") {
					$("#stat").val('new')
					var orderItem = orderItemServer.map(item => {
						return {
							...item,
							id: item.id.toString(),
							rateThousand: thousandSeparator(parseFloat(item.rate)),
							free: true,
							tanggal: date,
							count: JSON.parse(localStorage.getItem('resultCard')) ? JSON.parse(localStorage.getItem('resultCard')).length > 0 ? JSON.parse(localStorage.getItem('resultCard'))[0].count : 1 : 1
						}
					})
					var hasRegulerStatus1 = orderItem.some(item => item.type === 'Reguler');
					var orderItemReguler = orderItem.find(obj => obj.type === "Reguler");
				} else if (ress.response == "Existing") {
					$("#stat").val('existing')
					if(JSON.parse(localStorage.getItem('resultCard')).length > 0){
						if(localStorage.getItem('remove_existing')){
							var a = JSON.parse(localStorage.getItem('resultCard'))
							var b = ress.last_order;
							a = a.filter(one => !b.find(two => one.id == two.paket_id && one.count == two.qty));
							localStorage.setItem('resultCard', JSON.stringify([]))
							localStorage.setItem('remove_existing', false);
						}
					}
					
					var orderItem = JSON.parse(localStorage.getItem('resultCard')) ? JSON.parse(localStorage.getItem('resultCard')).length > 0 ? JSON.parse(localStorage.getItem('resultCard')) : [] : [];
					var hasRegulerStatus1 = 'existing';
					var orderItemReguler = 'existing';
					$('.badDate').hide();
				}else{
					$("#stat").val('kosong')
					var orderItem = []
					var hasRegulerStatus1 = 'kosong';
					var orderItemReguler = 'kosong';
				}

				if (ress.complateorder.length > 0) {
					var htmlorder = '';
					$.each(ress.complateorder, function (index, val) {
						htmlorder += `<li class="widget__categories--menu__list cart-red mb-2" onclick="detailOrder('${val.id}')">
						<label class="widget__categories--menu__label d-flex align-items-center justify-content-between">
						<div class="d-flex align-items-center">
							<i class="fas fa-check i-cart"></i>
							<div class="ml-2">
							<span class="product__description--variant text-black">Tanggal Pembayaran : ${val.date.substring(0, 10)}</span>
							<span class="product__description--variant text-black">${val.waktu} - Rp ${thousandSeparator(parseFloat(val.total))}</span>
							</div>
						</div>
						<span> Paid</span>
						</label>
					</li>`
					})
					$("#riwayatOrder").html(htmlorder)
				} else {
					$("#riwayatOrder").html(`<li></li>`)
				}
				if (hasRegulerStatus1 == true || hasRegulerStatus1 == 'existing') {
					if (orderItemReguler.status == 1) {
						resultCard = resultCard.filter(obj => obj.type !== 'Reguler');
						resultCard = resultCard.concat(orderItem);
						updateCard();
						localResultCard();
						changeEmptyState();
					} else if (orderItemReguler.status == 2) {
						resultCard = orderItem
						updateCard();
						localResultCard();
						changeEmptyState();
					} else {
						resultCard = orderItem
						updateCard();
						localResultCard();
						changeEmptyState();
					}
				} else {
					updateCard();
					localResultCard();
					changeEmptyState();
				}
			} else {
				// swal("Notifikasi!", 'Cannot acces server', "error");
			}
		},
		error: function (err, data) {
			// swal("Notifikasi!", 'Cannot acces server', "error");
		}
	});
}

function changeEmptyState() {
	let orderItemReguler = resultCard.find(obj => obj.type === "Reguler");
	if (resultCard.length > 0) {
		if (orderItemReguler) {
			if ($("#stat").val() == 'new') {
				if (orderItemReguler.status == 1) {
					$('.notEmptyCard').show();
					$('.lanjutBayar').show();
					$('.emptyCard').hide();
					$('.badDate').hide();
					$('.closeChange').hide();
					$("#potonganKantor").removeClass('d-none');
					$("#potonganKantor").addClass('d-flex');
				} else if (orderItemReguler.status == 2) {
					$('.notEmptyCard').show();
					$('.lanjutBayar').hide();
					$('.emptyCard').hide();
					$('.badDate').hide();
					$('.closeChange').show();
					$("#potonganKantor").removeClass('d-none');
					$("#potonganKantor").addClass('d-flex');
				}
			}else if($("#stat").val() == 'kosong'){
				localStorage.setItem('resultCard', JSON.stringify([]));
				$('.notEmptyCard').hide();
				$('.lanjutBayar').hide();
				$('.emptyCard').hide();
				$('.badDate').show();
				$('.closeChange').hide();
				$("#potonganKantor").removeClass('d-flex');
				$("#potonganKantor").addClass('d-none');
			}
		} else {
			if ($("#stat").val() == 'existing') {
				$('.notEmptyCard').show();
				$('.lanjutBayar').show();
				$('.emptyCard').hide();
				$('.badDate').hide();
				$('.closeChange').hide();
				$("#potonganKantor").removeClass('d-flex');
				$("#potonganKantor").addClass('d-none');
			}else{
				$('.notEmptyCard').hide();
				$('.lanjutBayar').hide();
				$('.emptyCard').hide();
				$('.badDate').show();
				$('.closeChange').hide();
				$("#potonganKantor").removeClass('d-flex');
				$("#potonganKantor").addClass('d-none');
			}
		}
	} else {
		if ($("#stat").val() == 'existing') {
			$('.notEmptyCard').show();
			$('.lanjutBayar').show();
			$('.emptyCard').hide();
			$('.badDate').hide();
			$('.closeChange').hide();
			$("#potonganKantor").removeClass('d-flex');
			$("#potonganKantor").addClass('d-none');
		} else {
			localStorage.setItem('resultCard', JSON.stringify([]));
			$('.notEmptyCard').hide();
			$('.lanjutBayar').hide();
			$('.emptyCard').hide();
			$('.badDate').show();
			$('.closeChange').hide();
			$("#potonganKantor").removeClass('d-flex');
			$("#potonganKantor").addClass('d-none');
		}
	}
}

function localResultCard() {
	localStorage.setItem('resultCard', JSON.stringify(resultCard));
}

function updateCard() {
	$('.isiCard').html("");
	$('.items__count').html(resultCard.length);
	resultCard.sort(function (a, b) {
		if (a.type === 'Reguler' && b.type !== 'Reguler') {
			return -1; // move a to the front
		} else if (a.type !== 'Reguler' && b.type === 'Reguler') {
			return 1; // move b to the front
		} else {
			if($("#stat").val() == 'existing'){
				return -1;
			}else{
				return 0; // do nothing
			}
		}
	});

	resultCard.forEach(function (item, index) {
		let orderItemReguler = resultCard.find(obj => obj.type === "Reguler");
		if (orderItemReguler) {
			if (orderItemReguler.status == 1) {
				if (item.type == 'Reguler') {
					if($("#stat").val() == 'kosong'){
						return $('.isiCard').html('')
					}
					$('.isiCard').append(`<div class="minicart__product--items d-flex"> <div class="minicart__thumb"> <a href="#"> <img src="/img/product/${item.image1}" alt="prduct-img"> </a> </div> <div class="minicart__text"> <span class="current__price"><b>Menu Reguler</b></span> <h4 class="minicart__subtitle"> <a href="javascript:void(0)">${item.name}</a> </h4> <div class="minicart__price"> <span class="current__price">${item.rateThousand}</span> </div> <div class="minicart__text--footer d-flex align-items-center"> <div class="quantity__box minicart__quantity"> <button type="button" class="quantity__value decrease" paketID="${item.id}" aria-label="quantity value" jenis="Reguler" value="Decrease Value">-</button> <label> <input type="number" class="quantity__number" value="${item.count}" data-counter /> </label> <button type="button" class="quantity__value increase" paketID="${item.id}" aria-label="quantity value" value="Increase Value" jenis="Reguler">+</button> </div>  </div> </div> </div>`)
				} else {
					if($("#stat").val() == 'kosong'){
						return $('.isiCard').html('')
					}
					$('.isiCard').append('<div class="minicart__product--items d-flex"> <div class="minicart__thumb"> <a href="#"> <img src="/img/product/' + item.image1 + '" alt="prduct-img"> </a> </div> <div class="minicart__text"> <h4 class="minicart__subtitle"> <a href="javascript:void(0)">' + item.name + '</a> </h4> <div class="minicart__price"> <span class="current__price">' + item.rateThousand + '</span> </div> <div class="minicart__text--footer d-flex align-items-center"> <div class="quantity__box minicart__quantity"> <button type="button" class="quantity__value decrease" paketID="' + item.id + '" aria-label="quantity value" value="Decrease Value" jenis="Premium">-</button> <label> <input type="number" class="quantity__number" value="' + item.count + '" data-counter /> </label> <button type="button" class="quantity__value increase" paketID="' + item.id + '" aria-label="quantity value" value="Increase Value" jenis="Premium">+</button> </div> <button class="minicart__product--remove removeProduct" paketID="' + item.id + '" type="button">Remove</button> </div> </div> </div>')
				}
			} else if (orderItemReguler.status == 2) {
				if($("#stat").val() == 'kosong'){
					return $('.isiCard').html('')
				}
				$('.isiCard').append(`<div class="minicart__product--items d-flex"> <div class="minicart__thumb"> <a href="#"> <img src="/img/product/${item.image1}" alt="prduct-img"> </a> </div> <div class="minicart__text"> <span class="current__price"><b>Menu Reguler</b></span> <h4 class="minicart__subtitle"> <a href="javascript:void(0)">${item.name}</a> </h4> <div class="minicart__price"> <span class="current__price">${item.rateThousand}</span> </div> <div class="minicart__text--footer d-flex align-items-center"> <div class="quantity__box minicart__quantity"> <button type="button" class="quantity__value decrease" paketID="${item.id}" aria-label="quantity value" value="Decrease Value" disabled jenis="Reguler">-</button> <label> <input type="number" class="quantity__number" value="${item.count ? item.count : 1}" data-counter disabled/> </label> <button type="button" class="quantity__value increase" paketID="${item.id}" aria-label="quantity value" value="Increase Value" disabled jenis="Reguler">+</button> </div>  </div> </div> </div>`)
			}
		} else {
			if($("#stat").val() == 'existing'){
				$('.isiCard').append('<div class="minicart__product--items d-flex"> <div class="minicart__thumb"> <a href="#"> <img src="/img/product/' + item.image1 + '" alt="prduct-img"> </a> </div> <div class="minicart__text"> <h4 class="minicart__subtitle"> <a href="javascript:void(0)">' + item.name + '</a> </h4> <div class="minicart__price"> <span class="current__price">' + item.rateThousand + '</span> </div> <div class="minicart__text--footer d-flex align-items-center"> <div class="quantity__box minicart__quantity"> <button type="button" class="quantity__value decrease" paketID="' + item.id + '" aria-label="quantity value" value="Decrease Value" jenis="Premium">-</button> <label> <input type="number" class="quantity__number" value="' + item.count + '" data-counter /> </label> <button type="button" class="quantity__value increase" paketID="' + item.id + '" aria-label="quantity value" value="Increase Value" jenis="Premium">+</button> </div> <button class="minicart__product--remove removeProduct" paketID="' + item.id + '" type="button">Remove</button> </div> </div> </div>')
			}else{
				$('.isiCard').html('')
			}
		}
	})
	calculateTotal();
}

function calculateTotal() {
	let menuReguler = resultCard.find(obj => obj.type === 'Reguler');
	if (menuReguler) {
		$('.potonganKantor').html(thousandSeparator(parseInt(menuReguler.rate)))
	}

	let subtotal = 0;
	if (resultCard.length > 0) {
		resultCard.forEach(function (item, index) {
			if (typeof (item.count) == "undefined") {
				subtotal = subtotal + 15000
			}
			subtotal = subtotal + item.rate * (item.count > 0 ? item.count : 0)
		})
		$('.subtotal').html(thousandSeparator(subtotal))
	}

	let total = subtotal
	if (menuReguler) {
		total = subtotal - menuReguler.rate
	}

	if (total < 0) {
		total = 0
	} else {
		total
	}
	$('.total').html(thousandSeparator(total))

	subTotalOrder = subtotal
	totalOrder = total
}

function thousandSeparator(value) {
	const options = {
		// style: 'currency', 
		// currency: 'IDR', 
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	};
	const formattedNumber = value.toLocaleString('de-DE', options);
	return formattedNumber;
}

function detailOrder(order_id) {
	$('.listHistoryOrder').html("");
	$.ajax({
		url: "/user/order/detailOrder",
		type: "GET",
		dataType: "json",
		data: {
			order_id: order_id
		},
		success: function (ress) {
			if (ress.response == "Successful") {
				ress.result.forEach(function (item, index) {
					$('.listHistoryOrder').append('<div class="minicart__product"><div class="minicart__product--items d-flex"><div class="minicart__thumb"><div><img src="/img/product/' + item.image1 + '" alt="prduct-img"></div></div><div class="minicart__text"><h4 class="minicart__subtitle">' + item.paket + '</h4><div class="minicart__price"><span class="current__price">Rp. ' + thousandSeparator(parseInt(item.rate)) + '</span></div><div class="minicart__text--footer d-flex align-items-center"><p class="minicart__header--desc">Jumlah: ' + item.qty + '</p></div></div></div></div>')
					$(".detailorder").html(moment(item.date).format('DD MMMM YYYY'))
				})
				$('.totalHistoryOrder').html(thousandSeparator(parseInt(ress.result[0].total)))
				$("#orderModal").modal("show");
			} else {
				swal("Notifikasi!", 'Cannot acces server', "error");
			}
		},
		error: function (err, data) {
			swal("Notifikasi!", 'Cannot acces server', "error");
		}
	});
}