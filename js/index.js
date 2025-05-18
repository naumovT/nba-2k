gsap.registerPlugin(ScrollSmoother, ScrollTrigger)

const sensitivity = 0.08

document.addEventListener("mousemove", (e) => {
    let dx = (e.clientX - window.innerWidth / 2) * sensitivity
    let dy = (e.clientY - window.innerHeight / 2) * sensitivity

    gsap.to(".layers_container", {
        duration: 1.5,
        x: dx,
        y: dy, 
        rotationX: dy / 10,
        rotationY: dx / 10,
        ease: "power2.out"
    })
    gsap.to(".head-text", {
        duration: 1.5,
        x: dx / 5,
        y: dy / 5,
        ease: "power2.out"
    })
})

ScrollSmoother.create({
    wrapper: ".wrapper",
    content: ".wrapper_content",
    smooth: 1.5,
    effects: true
})

gsap.utils.toArray("section").forEach(section => {
    gsap.fromTo(
        section,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, scrollTrigger: {
            trigger: section,
            start: "top center+=100",
            end: "bottom center",
            toggleActions: "play none none reverse"
        }}
    )
})

function initGallery() {
    let gallery = document.querySelector(".gallery")
    let galleryItems = document.querySelectorAll(".gallery-item")
    gallery.style.setProperty("--total-items", galleryItems.length)

    gallery.addEventListener("click", (event) => {
        let clicked = event.target.closest(".gallery-item")
        if (!clicked || clicked.classList.contains("active")) return
        galleryItems.forEach((item) => {
            item.classList.remove("active")
        })
        clicked.classList.add("active")
    })
}

document.addEventListener("DOMContentLoaded", initGallery)

const themeChanger = document.querySelector(".theme-change")
themeChanger.addEventListener("click", () => {
    let isLight = localStorage.getItem("theme") == "light"
    if (isLight) {
        localStorage.setItem("theme", "dark")
        themeChanger.innerHTML = '<i class="fas fa-moon"></i>'
        document.documentElement.style.setProperty("--black", "#f2f2f2")
        document.documentElement.style.setProperty("--white", "#2f2f2f")
        document.documentElement.style.setProperty("--yellow", "#2f2f2f")
        document.documentElement.style.setProperty("--transparent_white", "rgba(0, 0, 0, 0.6)")
        document.documentElement.style.setProperty("--transparent_yellow", "rgba(0, 0, 0, 0.6)")
    } else {
        localStorage.setItem("theme", "light")
        themeChanger.innerHTML = '<i class="fas fa-sun"></i>'
        document.documentElement.style.setProperty("--black", "black")
        document.documentElement.style.setProperty("--white", "#f2f2f2")
        document.documentElement.style.setProperty("--yellow", "rgb(255, 165, 0)")
        document.documentElement.style.setProperty("--transparent_white", "rgba(255, 255, 255, 0.6)")
        document.documentElement.style.setProperty("--transparent_yellow", "rgba(255, 165, 0, 0.6)")
    }
})

function initPlayer() {
    const btn = document.querySelector(".play-button")
    const audio = document.getElementById("audioPlayer")

    btn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play()
            btn.innerHTML = '<i class="fas fa-pause"></i>'
        } else {
            audio.pause()
            btn.innerHTML = '<i class="fas fa-play"></i>'
        }
    })

    const time = document.querySelector(".time")
    audio.addEventListener("timeupdate", () => {
        let minutes = Math.floor(audio.currentTime / 60)
        let seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, "0")
        let max_minutes = Math.floor(audio.duration / 60)
        let max_seconds = Math.floor(audio.duration % 60).toString().padStart(2, "0")
        time.innerHTML = `${max_minutes}:${max_seconds} / ${minutes}:${seconds}`
    })
}

document.addEventListener("DOMContentLoaded", initPlayer)