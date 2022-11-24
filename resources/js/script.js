(() => {
  var isDarkReaderEnabled =
    "querySelector" in document &&
    !!document.querySelector("meta[name=darkreader]");

  if (isDarkReaderEnabled) $("html").addClass("dark-reader");
})();

(() => {
  // animate on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scrollShown");
      } else {
        entry.target.classList.remove("scrollShown");
      }
    });
  });
  const observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scrollShownLeft");
      } else {
        entry.target.classList.remove("scrollShownLeft");
      }
    });
  });
  const hiddenElements = document.querySelectorAll(".scrollHidden");
  hiddenElements.forEach((el) => observer.observe(el));

  const hiddenElements2 = document.querySelectorAll(".scrollHiddenLeft");
  hiddenElements2.forEach((el) => observer2.observe(el));
})();

(() => {
  // hide and show stuff with focus and backdrop

  animationsPair = {
    // name of animation and classes associated with it
    //0 = show and 1 =  hide
    slide: ["showSlide", "hideSlide"],
    zoom: ["showZoom", "hideZoom"],
  };
  // now js to show stuff

  //about me
  const aboutUs = document.querySelector("#about-me");
  const aboutUsBtn = document.querySelector("#aboutUsBtn");
  aboutUsBtn.addEventListener("click", () => show(aboutUs, "slide"));

  // contact me
  const contactMe = document.querySelector("#contact-me");
  const contactMeBtn = document.querySelector("#contactMeBtn");
  contactMeBtn.addEventListener("click", () => show(contactMe, "slide"));

  // ============== modals
  // go throught all project link click
  const projectLinks = document.querySelectorAll(".project-link");
  projectLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // if clicked, data-project herne and data target

      projectNo = link.dataset.project;
      target = link.dataset.target;

      // then take all modals and choose the one with data project same and data destination same
      modals = document.querySelectorAll(`.modal[data-project="${projectNo}"]`);
      modals.forEach((modal) => {
        if (modal.dataset.destination == target) {
          show(modal, "zoom");
        }
      });
    });
  });

  // function that show
  function show(obj, animation) {
    let animations = animationsPair[animation];
    obj.classList.remove(animations[1]);
    obj.classList.add(animations[0]);
    addBackdrop();
    document.querySelector("body").style = "overflow-y:hidden"; // no scroll
  }
  //backdrop
  var body = document.body,
    html = document.documentElement;

  var height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
  const backdrop = document.querySelector(".backdrop");
  // backdrop.style.height = `height:${height};`;
  function addBackdrop() {
    backdrop.classList.remove("notShownBackdrop");
    backdrop.classList.add("ShownBackdrop");
  }
  function removeBackdrop() {
    backdrop.classList.remove("ShownBackdrop");
    backdrop.classList.add("notShownBackdrop");
  }
  // hide stuff
  function hide(obj, animation) {
    let animations = animationsPair[animation];
    obj.classList.remove(animations[0]);
    obj.classList.add(animations[1]);
    removeBackdrop();
    document.querySelector("body").style = "overflow-y:scroll"; // scrollable
  }

  function hideAll() {
    // go thorugh all keys
    for (var key in animationsPair) {
      let animations = animationsPair[key];
      openedObjs = document.querySelectorAll(`.${animations[0]}`);
      for (i = 0; i < openedObjs.length; i++) {
        hide(openedObjs[i], key);
      }
    }
  }
  //Cross and escape and other event listeners to hide eveyrthing to hide everything
  const crosses = document.querySelectorAll(".cross");
  for (let i = 0; i < crosses.length; i++) {
    crosses[i].addEventListener("click", hideAll);
  }
  backdrop.addEventListener("click", hideAll);
  document.addEventListener("keydown", (event) => {
    if (event.key == "Escape") {
      hideAll();
    }
  });
})();

(() => {
  // chnage prev and next links
  // for later
})();
