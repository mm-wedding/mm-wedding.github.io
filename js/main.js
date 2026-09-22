// ================================
// Wedding invitation configuration
// ================================
const WEDDING_DATE = new Date("2026-12-20T14:50:00+09:00");

// QR destination:
// Leave as window.location.href while developing.
// After GitHub Pages is live, this automatically becomes your final URL.
const QR_URL = window.location.href.split("#")[0];

// Image filenames used by the design.
// Put your real images in /images/ using these names.
const imageFiles = {
  "hero.jpg": "images/hero.jpg",
  "invitation.jpg": "images/invitation.jpg",
  "countdown.jpg": "images/countdown.jpg",
  "story-1.jpg": "images/story-1.jpg",
  "story-2.jpg": "images/story-2.jpg",
  "gallery-1.jpg": "images/gallery-1.jpg",
  "gallery-2.jpg": "images/gallery-2.jpg",
  "gallery-3.jpg": "images/gallery-3.jpg",
  "gallery-4.jpg": "images/gallery-4.jpg",
  "gallery-5.jpg": "images/gallery-5.jpg",
  "gallery-6.jpg": "images/gallery-6.jpg",
  "venue.jpg": "images/venue.jpg"
};

// -------------------------------
// Apply images
// -------------------------------
document.querySelectorAll("[data-photo]").forEach(el => {
  const name = el.dataset.photo;
  const path = imageFiles[name];

  if (!path) return;

  const img = new Image();
  img.onload = () => {
    el.style.setProperty("--photo", `url("${path}")`);
    el.classList.add("has-image");
  };
  img.src = path;
});

// -------------------------------
// D-Day
// -------------------------------
function updateDDay() {
  const now = new Date();
  const diff = WEDDING_DATE - now;
  const target = document.getElementById("dday");

  if (!target) return;

  if (diff <= 0) {
    target.textContent = "TODAY";
    return;
  }

  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  target.textContent = `D-${days}`;
}

updateDDay();
setInterval(updateDDay, 60 * 1000);

// -------------------------------
// Scroll reveal
// -------------------------------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// -------------------------------
// Gallery modal
// -------------------------------
const galleryItems = [...document.querySelectorAll(".gallery-item")];
const modal = document.getElementById("galleryModal");
const modalImage = document.getElementById("modalImage");
const modalCounter = document.getElementById("modalCounter");
let currentIndex = 0;

function showGallery(index) {
  currentIndex = (index + galleryItems.length) % galleryItems.length;

  const name = galleryItems[currentIndex].dataset.photo;
  const path = imageFiles[name];

  modalImage.classList.remove("has-image");
  modalImage.style.removeProperty("--photo");

  if (path) {
    const img = new Image();
    img.onload = () => {
      modalImage.style.setProperty("--photo", `url("${path}")`);
      modalImage.classList.add("has-image");
    };
    img.src = path;
  }

  modalCounter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
}

function openModal(index = 0) {
  showGallery(index);
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => openModal(index));
});

document.getElementById("openGallery").addEventListener("click", () => openModal(0));
document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalPrev").addEventListener("click", () => showGallery(currentIndex - 1));
document.getElementById("modalNext").addEventListener("click", () => showGallery(currentIndex + 1));

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("open")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowLeft") showGallery(currentIndex - 1);
  if (e.key === "ArrowRight") showGallery(currentIndex + 1);
});

// Swipe support for mobile
let touchStartX = 0;

modal.addEventListener("touchstart", e => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

modal.addEventListener("touchend", e => {
  const diff = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(diff) < 45) return;
  if (diff > 0) showGallery(currentIndex - 1);
  else showGallery(currentIndex + 1);
}, { passive: true });

// =========================================
// Account copy
// =========================================
document.querySelectorAll(".copy-account").forEach(button => {
    button.addEventListener("click", async () => {
        const account = button.dataset.account;
        try {
            await navigator.clipboard.writeText(account);
            const originalText = button.textContent;
            button.textContent = "완료";
            setTimeout(() => {
                button.textContent = originalText;
            }, 1200);
        } catch (error) {
            alert("계좌번호: " + account);
        }
    });
});

// =========================================
// Account accordion
// =========================================
document.querySelectorAll(".account-group-title").forEach(button => {
    button.addEventListener("click", () => {
        const group = button.closest(".account-group");
        group.classList.toggle("open");
    });
});

// -------------------------------
// Top button
// -------------------------------
document.getElementById("topButton").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// -------------------------------
// QR code
// -------------------------------
function makeQRCode() {
  const target = document.getElementById("qrcode");
  if (!target || typeof QRCode === "undefined") return;

  target.innerHTML = "";

  new QRCode(target, {
    text: QR_URL,
    width: 102,
    height: 102,
    colorDark: "#111313",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.M
  });
}

makeQRCode();

// =========================================
// Share
// =========================================

const shareButton = document.getElementById("shareButton");

if (shareButton) {
    shareButton.addEventListener("click", async () => {

        const shareData = {
            title: "MINSEOK & MYEONGWON",
            text: "저희의 결혼식에 초대합니다.",
            url: window.location.href
        };

        // 모바일 공유 기능 지원
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                // 사용자가 공유창을 닫은 경우
                if (error.name !== "AbortError") {
                    console.error(error);
                }
            }
        } else {
            // 공유 기능이 없는 브라우저
            try {
                await navigator.clipboard.writeText(
                    window.location.href
                );
                alert("청첩장 링크가 복사되었습니다.");
            } catch (error) {
                alert(window.location.href);
            }
        }
    });
}

const mapContainer = document.getElementById("kakaoMap");

if (mapContainer && window.kakao?.maps) {
    const mapLockButton = document.getElementById("mapLockButton");
    const weddingPosition = new kakao.maps.LatLng(37.5606, 126.9676);
    const map = new kakao.maps.Map(mapContainer, {
        center: weddingPosition,
        level: 4
    });

    // 카카오맵 기본 마커를 예식장 위치(지도의 중심)에 표시합니다.
    const marker = new kakao.maps.Marker({
        position: weddingPosition,
        map
    });

    map.setCenter(marker.getPosition());
    map.setDraggable(false);
    map.setZoomable(false);

    const overlayContent = document.createElement("div");
    overlayContent.className = "wedding-map-overlay";
    overlayContent.innerHTML = `
        <div class="wedding-info">
            <div class="wedding-info-title">루이비스웨딩홀 중구점</div>
            <button class="wedding-info-close" type="button" aria-label="장소 정보 닫기">×</button>
            <div class="wedding-info-body">
                <div class="wedding-info-address">서울 중구 청파로 463 18층</div>
                <div class="wedding-info-sub">(지번) 서울 중구 중림동 441 18층</div>
            </div>
        </div>
    `;

    const infoOverlay = new kakao.maps.CustomOverlay({
        position: weddingPosition,
        content: overlayContent,
        yAnchor: 1,
        zIndex: 20
    });

    infoOverlay.setMap(map);

    const openInfoOverlay = () => infoOverlay.setMap(map);
    const closeInfoOverlay = () => infoOverlay.setMap(null);

    kakao.maps.event.addListener(marker, "click", openInfoOverlay);

    overlayContent.querySelector(".wedding-info-close").addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        closeInfoOverlay();
    });

    if (mapLockButton) {
        mapLockButton.addEventListener("click", () => {
            map.setDraggable(true);
            map.setZoomable(true);
            mapLockButton.remove();
        });
    }
}
