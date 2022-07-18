import $ from "jquery";
import "slick-carousel";

$(".carousel__image").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  arrows: false,
  dots: true,
  speed: 300,
  centerPadding: "0px",
  infinite: true,
  autoplaySpeed: 5000,
  autoplay: true,
  mobileFirst: true,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1340,
      settings: {
        slidesToShow: 5,
      },
    },
  ],
});

// BURGER-MENU =======================================================================
const burgerMenu = document.querySelector(".menu__burger");
const navMenu = document.querySelector(".header__menu");

if (burgerMenu) {
  burgerMenu.addEventListener("click", function (e) {
    document.body.classList.toggle("_luck");
    burgerMenu.classList.toggle("_active");
    navMenu.classList.toggle("_active");
  });
}
// ===================================================================================

// POPUP =============================================================================
const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", (e) => {
      const popupName = popupLink.getAttribute("href").replace("#", "");
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}

const popupCloseIcon = document.querySelectorAll(".close-popup");
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener("click", (e) => {
      popupClose(el.closest(".popup"));
      e.preventDefault();
    });
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector(".popup.open");
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    curentPopup.classList.add("open");
    curentPopup.addEventListener("click", (e) => {
      if (!e.target.closest(".popup__content")) {
        popupClose(e.target.closest(".popup"));
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove("open");
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add("lock");

  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(() => {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = "0px";
      }
    }
    body.style.paddingRight = "0px";
    body.classList.remove("lock");
  }, timeout);

  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, timeout);
}

// ===================================================================================

// DROPDOWN ========================================================================
let intervalId;

document.querySelectorAll(".btn-link").forEach((e) => {
  e.addEventListener("click", (e) => {
    const item = e.currentTarget.dataset.path;
    document.querySelectorAll(".dropdown-item").forEach((e) => {
      if (
        !document
          .querySelector(`[data-target=${item}]`)
          .classList.contains("open")
      ) {
        e.classList.remove("item-active");
        e.classList.remove("open");
        document
          .querySelector(`[data-target=${item}]`)
          .classList.add("item-active");
        intervalId = setTimeout(() => {
          document.querySelector(`[data-target=${item}]`).classList.add("open");
        }, 0);
      }

      if (
        document
          .querySelector(`[data-target=${item}]`)
          .classList.contains("open")
      ) {
        clearTimeout(intervalId);
        document
          .querySelector(`[data-target=${item}]`)
          .classList.remove("item-active");
        intervalId = setTimeout(() => {
          document
            .querySelector(`[data-target=${item}]`)
            .classList.remove("open");
        }, 0);
      }

      window.onclick = (e) => {
        if (
          e.target == document.querySelector(`[data-target=${item}]`) ||
          e.target == document.querySelector(`[data-path=${item}]`)
        ) {
          return;
        } else {
          document
            .querySelector(`[data-target=${item}]`)
            .classList.remove("item-active");
          document
            .querySelector(`[data-target=${item}]`)
            .classList.remove("open");
        }
      };
    });
  });
});
// ===================================================================================

// SLIDER-SLICK ===========================================================================
// $(document).ready(function () {
//   $(".carousel__image").slick({
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     centerMode: true,
//     arrows: false,
//     dots: true,
//     speed: 300,
//     centerPadding: "0px",
//     infinite: true,
//     autoplaySpeed: 5000,
//     autoplay: true,
//     mobileFirst: true,
//     responsive: [
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 1000,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 1340,
//         settings: {
//           slidesToShow: 5,
//         },
//       },
//     ],
//   });
// });

// =======================================================================

// SLIDER-2  ==============================================================
const slides = document.querySelectorAll(".slider__card");
const prev = document.getElementById("btn-prev");
const next = document.getElementById("btn-next");
const dots = document.querySelectorAll(".dot");

let index = 0;

const activeSlide = (n) => {
  console.log(n);
  for (let slide of slides) {
    slide.classList.remove("active");
  }
  slides[n].classList.add("active");
};

const activeDot = (n) => {
  for (let dot of dots) {
    dot.classList.remove("active");
  }
  dots[n].classList.add("active");
};

const prepareCurrentSlide = (ind) => {
  activeSlide(ind);
  activeDot(ind);
};

const nextSlide = () => {
  if (index == slides.length - 1) {
    index = 0;
    prepareCurrentSlide(index);
  } else {
    index++;
    prepareCurrentSlide(index);
  }
};

const prevSlide = () => {
  if (index == 0) {
    index = slides.length - 1;
    prepareCurrentSlide(index);
  } else {
    index--;
    prepareCurrentSlide(index);
  }
};

dots.forEach((item, indexDot) => {
  item.addEventListener("click", () => {
    index = indexDot;
    prepareCurrentSlide(index);
  });
});
next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);

// setInterval(nextSlide, 5000)

// ============================================================
