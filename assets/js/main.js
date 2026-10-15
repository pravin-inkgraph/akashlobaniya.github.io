/* ==========================================================================
   Akash Lobaniya — Portfolio scripts
   ========================================================================== */

/*
 * CONTACT FORM SETUP
 * Create a free form at https://formspree.io, copy its endpoint
 * (looks like https://formspree.io/f/abcdwxyz) and paste it below.
 * While this is empty, the form opens the visitor's email app with the
 * message pre-filled, so it still works before launch.
 */
const FORM_ENDPOINT = "";
const CONTACT_EMAIL = "akashlobaniya@gmail.com";

(function () {
  "use strict";

  /* ---------- Navbar: background on scroll + back-to-top ---------- */
  const nav = document.querySelector(".site-nav");
  const toTop = document.querySelector(".to-top");
  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle("scrolled", y > 30);
    if (toTop) toTop.classList.toggle("show", y > 700);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0 }));

  /* Close mobile menu after tapping a link */
  const collapseEl = document.getElementById("mainNav");
  if (collapseEl && window.bootstrap) {
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapseEl, { toggle: false });
    collapseEl.querySelectorAll(".nav-link").forEach((link) =>
      link.addEventListener("click", () => {
        if (collapseEl.classList.contains("show")) bsCollapse.hide();
      })
    );
  }

  /* ---------- Active nav link (homepage sections) ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll('.site-nav .nav-link[href^="#"]');
  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((l) =>
            l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id)
          );
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---------- Media slots: show a labelled placeholder until real files are added ---------- */
  const markMissing = (el) => {
    const box = el.closest(".media");
    if (box) box.classList.add("is-missing");
  };
  document.querySelectorAll(".media img").forEach((img) => {
    if (img.complete && img.naturalWidth === 0) markMissing(img);
    img.addEventListener("error", () => markMissing(img));
  });
  document.querySelectorAll(".media video").forEach((video) => {
    const check = () => markMissing(video);
    video.addEventListener("error", check, true);
    const src = video.querySelector("source:last-of-type");
    if (src) src.addEventListener("error", check);
    if (video.error) check();
  });

  /* Hero photo */
  const heroPhoto = document.querySelector(".hero-photo img");
  if (heroPhoto) {
    const box = heroPhoto.closest(".hero-photo");
    const ok = () => box.classList.add("has-image");
    const bad = () => { heroPhoto.remove(); box.classList.remove("has-image"); };
    if (heroPhoto.complete) (heroPhoto.naturalWidth ? ok() : bad());
    heroPhoto.addEventListener("load", ok);
    heroPhoto.addEventListener("error", bad);
  }

  /* Project covers */
  document.querySelectorAll(".project-card .cover img").forEach((img) => {
    const bad = () => img.closest(".cover").remove();
    if (img.complete && img.naturalWidth === 0) bad();
    img.addEventListener("error", bad);
  });

  /* ---------- Work filter ---------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const workItems = document.querySelectorAll(".work-item");
  const videoSoon = document.getElementById("videoSoon");
  const hasVideos = document.querySelector('.work-item[data-cat="video"]');
  const applyFilter = (f) => {
    workItems.forEach((it) => it.classList.toggle("hide", f !== "all" && it.dataset.cat !== f));
    if (videoSoon) videoSoon.hidden = !(f === "video" && !hasVideos);
  };
  filterBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      applyFilter(btn.dataset.filter);
    })
  );
  // show item counts on filter buttons
  filterBtns.forEach((btn) => {
    const f = btn.dataset.filter;
    const n = f === "all" ? workItems.length : document.querySelectorAll(`.work-item[data-cat="${f}"]`).length;
    if (n) btn.insertAdjacentHTML("beforeend", `<span class="count">${n}</span>`);
  });

  /* ---------- Lightbox for galleries ---------- */
  const lbEl = document.getElementById("lightbox");
  if (lbEl && window.bootstrap) {
    const lb = new bootstrap.Modal(lbEl);
    const lbImg = lbEl.querySelector("img");
    const lbCap = lbEl.querySelector(".lb-cap");
    document.querySelectorAll(".media.zoomable").forEach((box) => {
      box.setAttribute("tabindex", "0");
      box.setAttribute("role", "button");
      const open = () => {
        if (box.classList.contains("is-missing")) return;
        const img = box.querySelector("img");
        lbImg.src = img.currentSrc || img.src;
        lbImg.alt = img.alt;
        if (lbCap) lbCap.textContent = img.alt;
        lb.show();
      };
      box.addEventListener("click", open);
      box.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });
    });
  }

  /* ---------- Contact form ---------- */
  const form = document.getElementById("contactForm");
  if (form) {
    const status = document.getElementById("formStatus");
    const btn = form.querySelector('button[type="submit"]');
    const show = (msg, type) => {
      status.textContent = msg;
      status.className = "form-status show " + type;
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      form.classList.add("was-validated");
      if (!form.checkValidity()) {
        const firstBad = form.querySelector(":invalid");
        if (firstBad) firstBad.focus();
        return;
      }
      // Honeypot: bots fill hidden fields
      if (form.querySelector('[name="_gotcha"]').value) return;

      const data = new FormData(form);

      if (!FORM_ENDPOINT) {
        const subject = `New ${data.get("projectType")} enquiry from ${data.get("name")}`;
        const body =
          `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n` +
          `Project Type: ${data.get("projectType")}\n\n${data.get("message")}`;
        window.location.href =
          `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        show("Your email app should open with the message ready to send.", "ok");
        return;
      }

      btn.disabled = true;
      const label = btn.innerHTML;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Sending…';
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("Request failed");
        form.reset();
        form.classList.remove("was-validated");
        show("Thank you! Your message has been sent. I'll get back to you soon.", "ok");
      } catch (err) {
        show(`Sorry, the message could not be sent. Please email ${CONTACT_EMAIL} or message on WhatsApp.`, "err");
      } finally {
        btn.disabled = false;
        btn.innerHTML = label;
      }
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
